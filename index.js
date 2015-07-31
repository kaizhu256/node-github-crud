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
             * this function will delete the github file
             * https://developer.github.com/v3/repos/contents/#delete-a-file
             */
            options.method = 'DELETE';
            if (options.modeDeleteTree) {
                local.github_crud.contentDeleteTree(options, onError);
                return;
            }
            local.github_crud.contentGet(options, onError);
        };

        local.github_crud.contentDeleteTree = function (options, onError) {
            /*
             * this function will recursively delete the github tree
             * https://developer.github.com/v3/git/trees/#get-a-tree-recursively
             */
            var modeNext, onNext, tree, xhr;
            modeNext = 0;
            onNext = function (error) {
                local.utility2.testTryCatch(function () {
                    modeNext = error
                        ? Infinity
                        : modeNext + 1;
                    switch (modeNext) {
                    case 1:
                        options.method = 'DELETE';
                        options.modeDeleteTree = true;
                        local.github_crud.contentGet(options);
                        // make ajax request
                        xhr = local.utility2.ajax({
                            agent: options.agent,
                            modeDebug: options.modeDebug,
                            headers: local.utility2.jsonCopy(options.headers),
                            method: 'GET',
                            timeout: options.timeout,
                            url: local.path.dirname(options.url) +
                                '?ref=' + encodeURIComponent(options.branch)
                        }, onNext);
                        break;
                    case 2:
                        // get tree-items
                        // https://developer.github.com/v3/git/trees/#get-a-tree-recursively
                        options.dirname = options.url.split('/').slice(0, 6).join('/');
                        options.basename =
                            options.url.replace(options.dirname + '/contents/', '');
                        JSON.parse(xhr.responseText).forEach(function (element) {
                            if (element.path === options.basename) {
                                xhr.sha = element.sha;
                            }
                        });
                        if (!xhr.sha) {
                            modeNext = Infinity;
                            onNext();
                            return;
                        }
                        // make ajax request
                        xhr = local.utility2.ajax({
                            agent: options.agent,
                            modeDebug: options.modeDebug,
                            headers: local.utility2.jsonCopy(options.headers),
                            method: 'GET',
                            url: options.dirname + '/git/trees/' + xhr.sha + '?recursive=1'
                        }, onNext);
                        break;
                    case 3:
                        // serially delete tree-items
                        tree = tree || JSON.parse(xhr.responseText).tree
                            .filter(function (element) {
                                return element.type === 'blob';
                            });
                        if (tree.length === 0) {
                            onNext();
                            return;
                        }
                        modeNext -= 1;
                        local.github_crud.contentDelete({
                            branch: options.branch,
                            url: options.url + '/' + tree.shift().path
                        }, onNext);
                        break;
                    default:
                        onError(error);
                    }
                }, onError);
            };
            onNext();
        };

        local.github_crud.contentGet = function (options, onError) {
            /*
             * this function will get the github file
             * https://developer.github.com/v3/repos/contents/#get-contents
             */
            var modeNext, onNext, xhr;
            modeNext = 0;
            onNext = function (error, data) {
                local.utility2.testTryCatch(function () {
                    modeNext = error && modeNext !== 1
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
                        console.error(
                            'github-crud ' + (options.method || 'GET') + ' ' + options.url
                        );
                        // init options
                        local.utility2.objectSetDefault(options, { headers: {
                            // github oauth authentication
                            Authorization: 'token ' + process.env.GITHUB_TOKEN,
                            // bug - github api requires user-agent header
                            'User-Agent': 'undefined'
                        } }, 8);
                        options.method = options.method || 'GET';
                        options.url = options.url
/* jslint-ignore-begin */
// parse https://github.com/:owner/:repo/blob/:branch/:path
.replace(
    (/^https:\/\/github.com\/([^\/]+?\/[^\/]+?)\/blob\/([^\/]+?)\/(.+)/),
    'https://api.github.com/repos/$1/contents/$3?branch=$2'
)
// parse https://github.com/:owner/:repo/tree/:branch/:path
.replace(
    (/^https:\/\/github.com\/([^\/]+?\/[^\/]+?)\/tree\/([^\/]+?)\/(.+)/),
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
                        // handle delete-tree case
                        if (options.modeDeleteTree) {
                            return;
                        }
                        // make ajax request
                        xhr = local.utility2.ajax({
                            agent: options.agent,
                            modeDebug: options.modeDebug,
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
                            data = new Buffer(JSON.parse(xhr.responseText).content, 'base64');
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
                            agent: options.agent,
                            data: JSON.stringify({
                                branch: options.branch,
                                content: options.method === 'DELETE'
                                    ? undefined
                                    : new Buffer(options.data).toString('base64'),
                                message: '[skip ci] ' + options.method + ' file ' + options.url,
                                sha: xhr.sha || undefined
                            }),
                            modeDebug: options.modeDebug,
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
             * this function will put the github file
             * https://developer.github.com/v3/repos/contents/#update-a-file
             */
            options.method = 'PUT';
            local.github_crud.contentGet(options, onError);
        };

        local.github_crud.urlResolve = function (url, file) {
            /*
             * this function will resolve the url with the file
             */
            return (/\/$/).test(url)
                ? url + local.path.basename(file)
                : url;
        };

        // export github_crud
        module.exports = local.github_crud;
        // require modules
        local.fs = require('fs');
        local.http = require('http');
        local.https = require('https');
        local.path = require('path');
        local.url = require('url');
        // run the cli
        local.cliRun = function (options) {
            /*
             * this function will run the cli
             */
            if (!(module === require.main || (options && options.run))) {
                return;
            }
            switch (process.argv[2]) {
            // delete file
            case 'contentDelete':
                local.github_crud.contentDelete({
                    url: process.argv[3]
                }, function (error) {
                    // validate no error occurred
                    local.utility2.assert(!error, error);
                });
                break;
            // delete tree
            case 'contentDeleteTree':
                local.github_crud.contentDeleteTree({
                    url: process.argv[3]
                }, function (error) {
                    // validate no error occurred
                    local.utility2.assert(!error, error);
                });
                break;
            // get file
            case 'contentGet':
                local.github_crud.contentGet({
                    responseType: 'blob',
                    url: process.argv[3]
                }, function (error, data) {
                    // validate no error occurred
                    local.utility2.assert(!error, error);
                    try {
                        process.stdout.write(data);
                    } catch (ignore) {
                    }
                });
                break;
            // put file to file
            case 'contentPutFile':
                local.github_crud.contentPut({
                    data: local.fs
                        .readFileSync(local.path.resolve(process.cwd(), process.argv[4])),
                    url: local.github_crud.urlResolve(process.argv[3], process.argv[4])
                }, function (error) {
                    // validate no error occurred
                    local.utility2.assert(!error, error);
                });
                break;
            // put string to file
            case 'contentPutString':
                local.github_crud.contentPut({
                    data: process.argv[4],
                    url: process.argv[3]
                }, function (error) {
                    // validate no error occurred
                    local.utility2.assert(!error, error);
                });
                break;
            // put url to file
            case 'contentPutUrl':
                local.utility2.ajax({ url: process.argv[4] }, function (error, xhr) {
                    // validate no error occurred
                    local.utility2.assert(!error, error);
                    local.github_crud.contentPut({
                        data: xhr.response,
                        url: local.github_crud.urlResolve(process.argv[3], process.argv[4])
                    }, function (error) {
                        // validate no error occurred
                        local.utility2.assert(!error, error);
                    });
                });
                break;
            }
        };
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
        // init github_crud
        local.github_crud = { local: local };
    }());
    return local;
}())));
