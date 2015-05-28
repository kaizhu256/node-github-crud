/*jslint
    browser: true,
    maxerr: 8,
    maxlen: 96,
    node: true,
    nomen: true,
    stupid: true
*/
(function (local) {
    'use strict';



    // run node js-env code
    switch (local.modeJs) {
    case 'node':
        // init tests
        local._testCase_contentDelete_default = function (options, onError) {
            /*
                this function will test contentDelete's default handling behavior
            */
            var modeNext, onNext;
            modeNext = 0;
            onNext = function (error, data) {
                local.utility2.testTryCatch(function () {
                    modeNext += 1;
                    switch (modeNext) {
                    case 1:
                        // test delete handling behavior
                        local.github_crud.contentDelete({
                            modeDeleteTree: options.modeDeleteTree,
                            url: options.url
                        }, onNext);
                        break;
                    case 2:
                        // validate no error occurred
                        local.utility2.assert(!error, error);
                        // validate data is deleted
                        local.github_crud.contentGet({ url: options.url }, onNext);
                        break;
                    case 3:
                        // validate no error occurred
                        local.utility2.assert(!error, error);
                        // validate data is deleted
                        local.utility2.assert(!data, data);
                        onNext();
                        break;
                    case 4:
                        if (options.repeat) {
                            options.repeat = null;
                            modeNext = 0;
                        }
                        onNext();
                        break;
                    default:
                        onError(error);
                    }
                }, onError);
            };
            onNext();
        };

        local._testCase_contentPut_default = function (options, onError) {
            /*
                this function will test contentPut's default handling behavior
            */
            var modeNext, onNext, repeated;
            modeNext = 0;
            onNext = function (error, data) {
                local.utility2.testTryCatch(function () {
                    modeNext += 1;
                    switch (modeNext) {
                    case 1:
                        // test put handling behavior
                        local.github_crud.contentPut({
                            data: options.data,
                            url: options.url
                        }, onNext);
                        break;
                    case 2:
                        // validate no error occurred
                        local.utility2.assert(!error, error);
                        // validate put data
                        local.github_crud.contentGet({ url: options.url }, onNext);
                        break;
                    case 3:
                        // validate no error occurred
                        local.utility2.assert(!error, error);
                        // validate put data
                        local.utility2.assert(data === options.data, data);
                        onNext();
                        break;
                    case 4:
                        if (!repeated) {
                            repeated = true;
                            modeNext = 0;
                        }
                        onNext();
                        break;
                    default:
                        onError(error);
                    }
                }, onError);
            };
            onNext();
        };

        local.testCase_cliRun_default = function (onError) {
            /*
                this function will test cliRun's default handling behavior
            */
            var callCallback;
            callCallback = function (options, onError) {
                // jslint-hack
                local.utility2.nop(options);
                onError(null, '');
            };
            local.utility2.testMock([
                [local.github_crud, {
                    contentDelete: callCallback,
                    contentDeleteTree: callCallback,
                    contentGet: callCallback,
                    contentPut: callCallback
                }],
                [local.utility2, {
                    ajax: callCallback
                }],
                [process, { argv: ['', '', '', '', __filename] }]
            ], function (onError) {
                [
                    'contentDelete',
                    'contentDeleteTree',
                    'contentGet',
                    'contentPutFile',
                    'contentPutString',
                    'contentPutUrl'
                ].forEach(function (key) {
                    [
                        // test urlResolve dir handling behavior
                        '/',
                        // test urlResolve file handling behavior
                        __filename
                    ].forEach(function (url) {
                        process.argv[2] = key;
                        process.argv[3] = url;
                        local.github_crud.local.cliRun({ run: true });
                    });
                });
                onError();
            }, onError);
        };

        local.testCase_contentGet_default = function (onError) {
            /*
                this function will test contentGet's default handling behavior
            */
            var onTaskEnd;
            onTaskEnd = local.utility2.onTaskEnd(onError);
            onTaskEnd.counter += 1;
            [{
                // test url-parse handling behavior
                url: 'https://github.com/kaizhu256/node-github-crud/blob/gh-pages' +
                    '/test/hello.txt'
            }, {
                // test url-parse handling behavior
                url: 'https://raw.githubusercontent.com/kaizhu256/node-github-crud/gh-pages/' +
                    '/test/hello.txt'
            }, {
                // test url-parse handling behavior
                url: 'https://kaizhu256.github.io/node-github-crud/' +
                    '/test/hello.txt'
            }, {
                branch: 'gh-pages',
                // test blob handling behavior
                responseType: 'blob',
                // test no url-parse handling behavior
                url: 'https://api.github.com/repos/kaizhu256/node-github-crud/contents/' +
                    '/test/hello.txt'
            }].forEach(function (options) {
                onTaskEnd.counter += 1;
                local.github_crud.contentGet(options, function (error, data) {
                    local.utility2.testTryCatch(function () {
                        // validate no error occurred
                        local.utility2.assert(!error, error);
                        // validate data
                        local.utility2.assert(data.toString() === 'hello', data);
                        onTaskEnd();
                    }, onTaskEnd);
                });
            });
            onTaskEnd();
        };

        local.testCase_contentCrud_error = function (onError) {
            /*
                this function will test contentCrud's error handling behavior
            */
            var onTaskEnd, url;
            // test error handling behavior
            onTaskEnd = local.utility2.onTaskEnd(onError);
            onTaskEnd.counter += 1;
            // init url
            url = 'https://github.com/kaizhu256/node-github-crud/blob/gh-pages/test/error';
            [{
                headers: { Authorization: 'undefined' },
                onTask: local.github_crud.contentDelete,
                url: url
            }, {
                headers: { Authorization: 'undefined' },
                onTask: local.github_crud.contentDeleteTree,
                url: url
            }, {
                headers: { Authorization: 'undefined' },
                onTask: local.github_crud.contentGet,
                url: url
            }, {
                headers: { Authorization: 'undefined' },
                onTask: local.github_crud.contentPut,
                url: url
            }, {
                headers: {},
                onTask: local.github_crud.contentDelete,
                url: local.path.dirname(url)
            }, {
                headers: {},
                onTask: local.github_crud.contentPut,
                url: local.path.dirname(url)
            }, {
                headers: { Authorization: 'undefined' },
                onTask: local.github_crud.contentDelete,
                url: '/'
            }, {
                headers: { Authorization: 'undefined' },
                onTask: local.github_crud.contentPut,
                url: '/'
            }].forEach(function (options) {
                onTaskEnd.counter += 1;
                options.onTask(options, function (error) {
                    local.utility2.testTryCatch(function () {
                        // validate error occurred
                        local.utility2.assert(error, error);
                        onTaskEnd();
                    }, onTaskEnd);
                });
            });
            onTaskEnd();
        };

        local.testCase_contentCrud_default = function (onError) {
            /*
                this function will test contentCrud's default handling behavior
            */
            var modeNext, onNext, url;
            modeNext = 0;
            onNext = function (error) {
                local.utility2.testTryCatch(function () {
                    modeNext += 1;
                    switch (modeNext) {
                    case 1:
                        // init url
                        url = 'https://github.com/kaizhu256/node-github-crud/blob/gh-pages' +
                            '/test/random.' + process.env.CI_BRANCH + '.' + process.version +
                            '/data.txt';
                        onNext();
                        break;
                    case 2:
                        // test delete handling behavior
                        local._testCase_contentDelete_default(
                            { repeat: true, url: url },
                            onNext
                        );
                        break;
                    case 3:
                        // validate no error occurred
                        local.utility2.assert(!error, error);
                        onNext();
                        break;
                    case 4:
                        // test put handling behavior
                        local._testCase_contentPut_default({
                            data: Math.random().toString(),
                            url: url
                        }, onNext);
                        break;
                    case 5:
                        // validate no error occurred
                        local.utility2.assert(!error, error);
                        onNext();
                        break;
                    case 6:
                        // test delete-tree handling behavior
                        local._testCase_contentDelete_default({
                            modeDeleteTree: true,
                            repeat: true,
                            url: local.path.dirname(url)
                        }, onNext);
                        break;
                    default:
                        onError(error);
                    }
                }, onError);
            };
            onNext();
        };

        // init middleware
        local.middleware = local.utility2.middlewareGroupCreate([
            local.utility2.middlewareInit,
            function (request, response, nextMiddleware) {
                /*
                    this function will run the main test-middleware
                */
                if (request.method === 'GET') {
                    response.end('hello');
                    return;
                }
                // default to nextMiddleware
                nextMiddleware();
            }
        ]);
        // init middleware error-handler
        local.onMiddlewareError = local.utility2.onMiddlewareError;
        // run server-test
        local.utility2.testRunServer(local);
        // jslint dir
        [
            __dirname
        ].forEach(function (dir) {
            local.fs.readdirSync(dir).forEach(function (file) {
                file = dir + '/' + file;
                // if the file is modified, then restart the process
                local.utility2.onFileModifiedRestart(file);
                switch (local.path.extname(file)) {
                case '.js':
                case '.json':
                    // jslint file
                    local.utility2.jslint_lite
                        .jslintAndPrint(local.fs.readFileSync(file, 'utf8'), file);
                    break;
                }
            });
        });
        // init repl debugger
        local.utility2.replStart({});
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
        // export local
        local.global.local = local;
        // init utility2
        local.utility2 = require('utility2');
        // init onReady
        local.utility2.onReadyInit();
        // init github_crud
        local.github_crud = require('./index.js');
        // import github_crud.local
        Object.keys(local.github_crud.local).forEach(function (key) {
            local[key] = local[key] || local.github_crud.local[key];
        });
    }());
    return local;
}())));
