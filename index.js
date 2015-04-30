#!/usr/bin/env node
/*jslint
    maxerr: 8,
    maxlen: 96,
    node: true,
    nomen: true,
    regexp: true,
    stupid: true
*/
(function (local) {
    'use strict';
    switch (local.modeJs) {



    // run node js-env code
    case 'node':
        local.github_crud.contentDelete = function (options, onError) {
            /*
                this function will delete the github file
                https://developer.github.com/v3/repos/contents/#delete-a-file
            */
            options.method = 'DELETE';
            local.github_crud.contentGet(options, onError);
        };

        local.github_crud.contentGet = function (options, onError) {
            /*
                this function will get the github file
                https://developer.github.com/v3/repos/contents/#get-contents
            */
            var modeNext, onNext, xhr;
            modeNext = 0;
            onNext = function (error, data) {
                local.utility2.testTryCatch(function () {
                    modeNext = error instanceof Error && modeNext !== 1
                        ? Infinity
                        : modeNext + 1;
                    // cleanup response
                    if (modeNext > 2 && xhr.response && xhr.response.removeListener) {
                        xhr.response.removeListener('error', onNext);
                        xhr.response.removeListener('end', onNext);
                        local.utility2.requestResponseCleanup(null, xhr.response);
                    }
                    switch (modeNext) {
                    case 1:
                        // init options
                        local.utility2.objectSetDefault(options, { headers: {
                            // github oauth authentication
                            Authorization: 'token ' + process.env.GITHUB_TOKEN,
                            // bug - github api requires user-agent header
                            'User-Agent': 'undefined'
                        } }, -1);
                        options.method = options.method || 'GET';
                        options.url = options.url
/* jslint-ignore-begin */
// parse https://github.com/:owner/:repo/blob/:branch/:path
.replace(
    (/^https:\/\/github.com\/([^\/]+?\/[^\/]+?)\/blob\/([^\/]+?)\/(.+)/),
    'https://api.github.com/repos/$1/contents/$3?branch=$2'
)
// parse https://raw.githubusercontent.com/:owner/:repo/:branch/:path
.replace(
(/^https:\/\/raw.githubusercontent.com\/([^\/]+?\/[^\/]+?)\/([^\/]+?)\/(.+)/),
    'https://api.github.com/repos/$1/contents/$3?branch=$2'
)
// parse https://:owner.github.io/:repo/:path
.replace(
    (/^https:\/\/([^\.]+?)\.github\.io\/([^\/]+?)\/(.+)/),
    'https://api.github.com/repos/$1/$2/contents/$3?branch=gh-pages'
)
/* jslint-ignore-end */
                            .replace((/\?branch=(.*)/), function (match0, match1) {
                                // jslint-hack
                                local.utility2.nop(match0);
                                options.branch = match1;
                                return '';
                            });
                        // make ajax request
                        local.utility2.ajax({
                            agent: options.agent,
                            debug: options.debug,
                            headers: local.utility2.jsonCopy(options.headers),
                            method: 'GET',
                            responseType: options.method === 'GET'
                                ? 'text'
                                : 'response',
                            timeout: options.timeout,
                            url: options.url + '?ref=' + encodeURIComponent(options.branch)
                        }, onNext);
                        break;
                    case 2:
                        xhr = data;
                        if (error) {
                            if (error.statusCode === 404) {
                                switch (options.method) {
                                case 'DELETE':
                                case 'GET':
                                    modeNext = Infinity;
                                    onNext();
                                    return;
                                case 'PUT':
                                    onNext();
                                    return;
                                }
                            }
                            onNext(error, data);
                            return;
                        }
                        switch (options.method) {
                        // get sha hash from response-stream
                        case 'DELETE':
                        case 'PUT':
                            xhr.responseText = '';
                            xhr.response
                                .on('data', function (chunk) {
                                    xhr.responseText += chunk.toString();
                                    xhr.sha = (/"sha":"([^"]+)"/).exec(xhr.responseText);
                                    if (xhr.responseText[0] === '[') {
                                        xhr.sha = {};
                                    }
                                    if (xhr.sha) {
                                        xhr.sha = xhr.sha[1];
                                        onNext();
                                    }
                                })
                                .on('end', onNext)
                                .on('error', onNext);
                            break;
                        case 'GET':
                            data = new Buffer(JSON.parse(data.responseText).content, 'base64');
                            modeNext = Infinity;
                            onNext(null, options.responseType === 'blob'
                                ? data
                                : data.toString());
                            break;
                        }
                        break;
                    case 3:
                        // make ajax request
                        local.utility2.ajax({
                            data: JSON.stringify({
                                branch: options.branch,
                                content: options.method === 'DELETE'
                                    ? undefined
                                    : new Buffer(options.data).toString('base64'),
                                message: '[skip ci] ' + options.method + ' file ' + options.url,
                                sha: xhr.sha || undefined
                            }),
                            debug: options.debug,
                            headers: local.utility2.jsonCopy(options.headers),
                            method: options.method,
                            url: options.url
                        }, onNext);
                        break;
                    default:
                        onError(error, data);
                    }
                }, onError);
            };
            onNext();
        };

        local.github_crud.contentPut = function (options, onError) {
            /*
                this function will put the github file
                https://developer.github.com/v3/repos/contents/#update-a-file
            */
            options.method = 'PUT';
            local.github_crud.contentGet(options, onError);
        };

        // export github_crud
        module.exports = local.github_crud;
        // require modules
        local.fs = require('fs');
        local.http = require('http');
        local.https = require('https');
        local.path = require('path');
        local.url = require('url');
        local.cliRun = function (options) {
            /*
                this function will run the main cli program
            */
            if (!(module === require.main || (options && options.run))) {
                return;
            }
            switch (process.argv[2]) {
            case 'contentDelete':
                local.github_crud.contentDelete({
                    url: process.argv[3]
                }, function (error) {
                    // validate no error occurred
                    local.utility2.assert(!error, error);
                });
                break;
            case 'contentGet':
                local.github_crud.contentGet({
                    url: process.argv[3]
                }, function (error, xhr) {
                    // jslint-hack
                    local.utility2.nop(error);
                    process.stdout.write((xhr && xhr.responseData) || '');
                });
                break;
            case 'contentPut':
                local.github_crud.contentPut({
                    data: process.argv[4],
                    url: process.argv[3]
                }, function (error) {
                    // validate no error occurred
                    local.utility2.assert(!error, error);
                });
                break;
            case 'contentPutFile':
                local.github_crud.contentPut({
                    data: local.fs
                        .readFileSync(local.path.resolve(process.cwd(), process.argv[4])),
                    url: process.argv[3]
                }, function (error) {
                    // validate no error occurred
                    local.utility2.assert(!error, error);
                });
                break;
            }
        };
        // run main cli program
        local.cliRun();
        break;
    }
}((function () {
    'use strict';
    var local;



    // run node js-env code
    (function () {
        // init local
        local = {};
        local.modeJs = (function () {
            return module.exports &&
                typeof process.versions.node === 'string' &&
                typeof require('http').createServer === 'function' &&
                'node';
        }());
        // init global
        local.global = global;
        // init utility2
        local.utility2 = require('utility2');
        // init istanbul_lite
        local.istanbul_lite = local.utility2.local.istanbul_lite;
        // init jslint_lite
        local.jslint_lite = local.utility2.local.jslint_lite;
        // init github_crud
        local.github_crud = { local: local };
    }());
    return local;
}())));
