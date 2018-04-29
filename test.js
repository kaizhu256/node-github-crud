/* istanbul instrument in package github_crud */
/* jslint-utility2 */
/*jslint
    bitwise: true,
    browser: true,
    maxerr: 4,
    maxlen: 100,
    node: true,
    nomen: true,
    regexp: true,
    stupid: true
*/
(function () {
    'use strict';
    var local;



    // run shared js-env code - init-before
    (function () {
        // init local
        local = {};
        // init modeJs
        local.modeJs = (function () {
            try {
                return typeof navigator.userAgent === 'string' &&
                    typeof document.querySelector('body') === 'object' &&
                    typeof XMLHttpRequest.prototype.open === 'function' &&
                    'browser';
            } catch (errorCaughtBrowser) {
                return module.exports &&
                    typeof process.versions.node === 'string' &&
                    typeof require('http').createServer === 'function' &&
                    'node';
            }
        }());
        // init global
        local.global = local.modeJs === 'browser'
            ? window
            : global;
        // re-init local
        local = local.global.local = (local.global.utility2 ||
            require('utility2')).requireReadme();
        // init test
        local.testRunInit(local);
    }());



    // run shared js-env code - function
    (function () {
        local.testCase_githubContentDelete_tree = function (options, onError) {
        /*
         * this function will test githubContentDelete's tree handling-behavior
         */
            var httpRequest;
            if (local.modeJs !== 'node') {
                onError(null, options);
                return;
            }
            httpRequest = function (urlParsed, onResponse) {
                setTimeout(function () {
                    onResponse(httpRequest, urlParsed);
                });
                return httpRequest;
            };
            httpRequest.end = local.nop;
            httpRequest.ii = -1;
            httpRequest.on = function (type, onError) {
                switch (type) {
                case 'data':
                    httpRequest.ii += 1;
                    onError(new Buffer(httpRequest.ii
                        ? '{"sha":"aa"}'
                        : '[{"url":"https://github.com/:owner/:repo/blob/:branch/:path"}]'));
                    break;
                case 'end':
                    setTimeout(onError);
                    break;
                }
                return httpRequest;
            };
            local.githubContentDelete({
                httpRequest: httpRequest,
                url: 'https://github.com/:owner/:repo/blob/:branch/:path'
            }, onError);
        };

        local.testCase_githubContentXxx_default = function (options, onError) {
        /*
         * this function will test githubContentXxx's default handling-behavior
         */
            if (local.modeJs !== 'node') {
                onError(null, options);
                return;
            }
            local.onParallelList({ list: [
                'githubContentAjax',
                'githubContentDelete',
                'githubContentGet',
                'githubContentPut',
                'githubContentPutFile',
                'githubContentTouch',
                'githubContentTouchList'
            ] }, function (options2, onParallel) {
                var httpRequest;
                httpRequest = function (urlParsed, onResponse) {
                    setTimeout(function () {
                        onResponse(httpRequest, urlParsed);
                    });
                    return httpRequest;
                };
                httpRequest.end = local.nop;
                httpRequest.on = function (type, onError) {
                    switch (type) {
                    case 'data':
                        onError(new Buffer('{"sha":"aa"}'));
                        break;
                    case 'end':
                        setTimeout(onError);
                        break;
                    }
                    return httpRequest;
                };
                onParallel.counter += 1;
                local[options2.element]({
                    content: 'aa',
                    file: 'https://github.com/:owner/:repo/blob/:branch/:path',
                    httpRequest: httpRequest,
                    url: 'https://github.com/:owner/:repo/blob/:branch/:path',
                    urlList: ['https://github.com/:owner/:repo/blob/:branch/:path']
                }, function (error) {
                    // validate no error occurred
                    local.assert(!error, error);
                    onParallel(null, options);
                });
            }, onError);
        };

        local.testCase_githubContentXxx_error = function (options, onError) {
        /*
         * this function will test githubContentXxx's error handling-behavior
         */
            if (local.modeJs !== 'node') {
                onError(null, options);
                return;
            }
            local.onParallelList({ list: [
                'githubContentAjax',
                'githubContentGet',
                'githubContentPut',
                'githubContentPutFile',
                'githubContentTouch',
                'githubContentTouchList'
            ] }, function (options2, onParallel) {
                var httpRequest;
                httpRequest = function (urlParsed, onResponse) {
                    setTimeout(function () {
                        onResponse(httpRequest, urlParsed);
                    });
                    return httpRequest;
                };
                httpRequest.end = local.nop;
                httpRequest.on = function (type, onError) {
                    switch (type) {
                    case 'data':
                        onError(new Buffer('{}'));
                        break;
                    case 'end':
                        setTimeout(onError);
                        break;
                    case 'error':
                        onError(local.errorDefault);
                        break;
                    }
                    return httpRequest;
                };
                onParallel.counter += 1;
                local[options2.element]({
                    file: 'package.json',
                    httpRequest: httpRequest,
                    url: 'https://github.com/:owner/:repo/blob/:branch/:path/',
                    urlList: ['error']
                }, function (error) {
                    // validate error occurred
                    local.assert(error, options2);
                    onParallel(null, options);
                });
            }, onError);
        };
    }());
}());
