#!/usr/bin/env node
/*jslint
  bitwise: true, browser: true,
  indent: 2,
  maxerr: 8,
  node: true, nomen: true,
  regexp: true,
  stupid: true,
  todo: true
*/
(function () {
  'use strict';
  var local;

  // init local shared object
  local = {};

  // require modules
  local.fs = require('fs');
  local.http = require('http');
  local.https = require('https');
  local.path = require('path');
  local.url = require('url');

  local.initCli = exports.initCli = function (options, onError) {
    /*
      this function uploads the file/url to github from cli
    */
    if (!options.modeCli) {
      onError();
      return;
    }
    options.data = options.argv[3];
    options.modeData = local.url.parse(options.data).protocol ? 'url' : 'file';
    options.url = options.argv[2];
    local.githubUpload(options, onError);
  };

  local.githubUpload = exports.githubUpload = function (options, onError) {
    /*
      this function uploads the data to the github url
    */
    var chunkList,
      finished,
      modeIo,
      onIo,
      request,
      response,
      responseText,
      timerTimeout,
      urlParsed;
    modeIo = 0;
    // init request and response
    request = response = { destroy: local.nop };
    onIo = function (error, data) {
      modeIo = error instanceof Error ? -1 : modeIo + 1;
      // cleanup request socket
      request.destroy();
      // cleanup response socket
      response.destroy();
      switch (modeIo) {
      case 1:
        // set timerTimeout
        timerTimeout = setTimeout(function () {
          error = new Error('timeout error - 30000 ms - githubUpload - ' + options.url);
          onIo(error);
        }, Number(options.timeout) || 30000);
        switch (options.modeData) {
        // get data from file
        case 'file':
          modeIo += 1;
          local.fs.readFile(local.path.resolve(process.cwd(), options.data), onIo);
          break;
        // get data from url
        case 'url':
          urlParsed = local.url.parse(String(options.data));
          request = (urlParsed.protocol === 'https:' ? local.https : local.http)
            .request(urlParsed, onIo);
          request.on('error', onIo).end();
          break;
        default:
          modeIo += 1;
          onIo(null, options.data);
        }
        break;
      case 2:
        chunkList = [];
        response = error;
        response
          // on data event, push the buffer chunk to chunkList
          .on('data', function (chunk) {
            chunkList.push(chunk);
          })
          // on end event, pass concatenated read buffer to onIo
          .on('end', function () {
            onIo(null, Buffer.concat(chunkList));
          })
          // on error event, pass error to onIo
          .on('error', onIo);
        break;
      case 3:
        if (options.modeTestData) {
          modeIo = -1;
          onIo(null, data);
          return;
        }
        options.data = data;
        // parse url
        urlParsed = (/^https:\/\/github.com\/([^\/]+\/[^\/]+)\/blob\/([^\/]+)\/(.+)/)
          .exec(options.url) ||
          (/^https:\/\/raw.githubusercontent.com\/([^\/]+\/[^\/]+)\/([^\/]+)\/(.+)/)
          .exec(options.url) || {};
        // init options
        options.headers = {
          // github oauth authentication
          authorization: 'token ' + process.env.GITHUB_TOKEN,
          // bug - github api requires user-agent header
          'user-agent': 'undefined'
        };
        options.hostname = 'api.github.com';
        options.path = '/repos/' + urlParsed[1] + '/contents/' + urlParsed[3] +
          '?ref=' + urlParsed[2];
        request = local.https.request(options, onIo);
        request.on('error', onIo);
        request.end();
        break;
      case 4:
        response = error;
        responseText = '';
        response
          .on('data', function (chunk) {
            responseText += chunk.toString();
            options.sha = (/"sha":"([^"]+)"/).exec(responseText);
            // read response stream until we get the sha hash,
            // then close the response stream
            if (options.sha) {
              options.sha = options.sha[1];
              onIo();
            }
          })
          .on('end', function () {
            // handle case where sha hash does not exist
            if (!options.sha) {
              onIo();
            }
          })
          .on('error', onIo);
        break;
      case 5:
        options.data = JSON.stringify({
          branch: urlParsed[2],
          content: new Buffer(options.data || '').toString('base64'),
          message: '[skip ci] update file ' + options.url,
          // update-file-mode - update old file specified by the sha
          sha: options.sha || undefined
        });
        options.method = 'PUT';
        options.path = '/repos/' + urlParsed[1] + '/contents/' + urlParsed[3];
        request = local.https.request(options, onIo);
        request.on('error', onIo);
        request.end(options.data);
        break;
      case 6:
        response = error;
        responseText = '';
        response
          .on('data', function (chunk) {
            responseText += chunk.toString();
          })
          .on('end', onIo)
          .on('error', onIo);
        break;
      default:
        // if already finished, then ignore error / data
        if (finished) {
          return;
        }
        finished = true;
        // cleanup timerTimeout
        clearTimeout(timerTimeout);
        if (response.statusCode > 201) {
          error = error || new Error(responseText);
        }
        if (error) {
          // add http method / statusCode / url debug info to error.message
          error.message = options.method + ' ' + (response && response.statusCode) +
            ' - https://api.github.com' + options.path + '\n' + error.message;
          // debug status code
          error.statusCode = response && response.statusCode;
        }
        onError(error, data);
      }
    };
    onIo();
  };

  local.nop = function () {
    /*
      this function performs no operation - nop
    */
    return;
  };

  local.onErrorThrow = exports.onErrorThrow = function (error) {
    /*
      this function throws the error if it exists
    */
    if (error) {
      throw error;
    }
  };

  // upload to the github url process.argv[2], the file/url process.argv[3]
  (function initModule() {
    /*
      this function inits this module
    */
    // upload file/url to github from cli
    local.initCli({ argv: process.argv, modeCli: module === require.main }, local.onErrorThrow);
  }());
}());
