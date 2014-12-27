/*jslint
  bitwise: true, browser: true,
  indent: 2,
  maxerr: 8,
  node: true, nomen: true,
  regexp: true,
  stupid: true,
  todo: true
*/
(function test($$options) {
  /*
    this function tests this module
  */
  'use strict';
  var global, mainApp;
  $$options.githubUploadTestFileUrl =
    'https://github.com/kaizhu256/node-github-upload/blob/sandbox/test-file';
  // init global object
  global = $$options.global;
  switch ($$options.modeJs) {
  // init browser js env
  case 'browser':
    // init mainApp
    mainApp = global.mainApp = global.$$mainApp;
    // init local object
    mainApp.localExport({
      _name: 'github-upload.test.browser',

      githubUploadFile: function (options, onError) {
        /*
          this function uploads the data to the github url
        */
        var elementLi, modeIo, onIo;
        modeIo = 0;
        onIo = function (error, data) {
          modeIo += 1;
          switch (modeIo) {
          case 1:
            // wait for dom to sync
            setTimeout(onIo);
            break;
          case 2:
            // init file
            options.file = options.file || mainApp.githubUploadFileInput.files[0];
            // if no file was chosen, then return
            if (!options.file) {
              return;
            }
            // upload file to github
            mainApp.ajax({
              data: options.file,
              method: 'PUT',
              url: '/test/github-upload?' + options.query
            }, onIo);
            break;
          default:
            // update status
            elementLi = document.createElement('li');
            elementLi.setAttribute('style', 'background-color: ' + (error ? '#fbb' : '#bfb') +
              ';' +
              'border-radius: 5px;' +
              'margin-top: 10px;' +
              'padding: 5px;');
            if (error) {
              elementLi.innerText = 'failure - ' +
                options.file.name + ' not uploaded - ' +
                (data || mainApp.errorStack(error));
            } else {
              elementLi.innerText = 'success - ' +
                options.file.name + ' uploaded to ' +
                $$options.githubUploadTestFileUrl;
            }
            document.querySelector('ol').appendChild(elementLi);
            (onError || mainApp.nop)(error);
          }
        };
        onIo();
      },

      _githubUploadFile_default_test: function (onError) {
        /*
          this function tests githubUploadFile's default handling behavior
        */
        var onParallel;
        onParallel = mainApp.onParallel(onError);
        onParallel.counter += 1;
        onParallel.counter += 1;
        // test default handling behavior
        mainApp.githubUploadFile({
          file: 'hello',
          query: 'modeErrorIgnore=1&_testSecret=' + mainApp._testSecret
        }, onParallel);
        // test  rate-limit handling behavior
        onParallel.counter += 1;
        mainApp.githubUploadFile({
          file: 'hello',
          query: 'modeErrorIgnore=1'
        }, function (error) {
          mainApp.testTryCatch(function () {
            // validate error occurred
            mainApp.assert(error instanceof Error, error);
            onParallel();
          }, onParallel);
        });
        // test data-limit handling behavior
        onParallel.counter += 1;
        mainApp.githubUploadFile({
          file: new Array(8192).join(' '),
          query: 'modeErrorIgnore=1&_testSecret=' + mainApp._testSecret
        }, function (error) {
          mainApp.testTryCatch(function () {
            // validate error occurred
            mainApp.assert(error instanceof Error, error);
            onParallel();
          }, onParallel);
        });
        onParallel();
      }
    }, mainApp);
    // init html
    document.querySelector('.mainAppDiv').innerHTML += '<div style="' +
        'display: inline-block;' +
        'border: 1px solid;' +
        'border-radius: 5px;' +
        'padding: 15px 10px 0 10px;' +
      '">\n' +
      '<div>select file to upload <input class="githubUploadFileInput" type="file" style="' +
        'background-color: #ddf;' +
        'cursor: pointer;' +
      '"></div>\n' +
      '<ol style="' +
        'margin-top: 0;' +
      '"></ol>\n' +
      '</div>\n';
    // init githubUploadFileInput
    mainApp.githubUploadFileInput = document.querySelector('.githubUploadFileInput');
    // init event-handling
    mainApp.githubUploadFileInput.addEventListener('change', mainApp.githubUploadFile);
    // init browser test
    if (mainApp.modeTest) {
      mainApp.testRun();
    }
    break;
  // init node js env
  case 'node':
    // init mainApp
    mainApp = module.exports;
    // require modules
    mainApp.github_upload = require('./index.js');
    mainApp.utility2 = require('utility2');
    // init local object
    mainApp.utility2.localExport({
      _name: 'github-upload.test.node',

      _githubUpload_error_test: function (onError) {
        /*
          this function tests githubUpload's error handling behavior
        */
        var onParallel;
        onParallel = mainApp.onParallel(onError);
        onParallel.counter += 1;
        [{
          // test invalid url handling behavior
          url: null
        }, {
          // test 404 handling behavior
          url: 'https://raw.githubusercontent.com/owner/branch/file'
        }, {
          // test timeout handling behavior
          timeout: 1,
          url: 'https://raw.githubusercontent.com/owner/branch/file'
        }].forEach(function (options) {
          onParallel.counter += 1;
          mainApp.github_upload.githubUpload(options, function (error) {
            mainApp.testTryCatch(function () {
              // validate error occurred
              mainApp.assert(error instanceof Error, error);
              onParallel();
            }, onParallel);
          });
        });
        onParallel();
      },

      _testPhantom_default_test: function (onError) {
        /*
          this function tests testPhantom' default handling behavior
        */
        mainApp.testPhantom('http://localhost:' + process.env.npm_config_server_port +
          '/?modeTest=phantom&_testSecret={{_testSecret}}&_timeoutDefault=' +
          mainApp.utility2._timeoutDefault, onError);
      }
    }, mainApp);
    // cache test.* files
    [{
      cache: '/assets/test.js',
      coverage: 'github-upload',
      file: __dirname + '/test.js'
    }].forEach(function (options) {
      mainApp.fileCacheAndParse(options);
    });
    // if process.env.npm_config_server_port is undefined,
    // then assign it a random port in inclusive range 0x1000 to 0xffff
    process.env.npm_config_server_port = process.env.npm_config_server_port ||
      ((Math.random() * 0x10000) | 0x8000).toString();
    // validate process.env.npm_config_server_port
    // is a positive-definite integer less then 0x10000
    (function () {
      var serverPort;
      serverPort = Number(process.env.npm_config_server_port);
      mainApp.assert(
        (serverPort | 0) === serverPort && 0 < serverPort && serverPort < 0x10000,
        'invalid server-port ' + serverPort
      );
    }());
    // init server
    mainApp.http.createServer(function (request, response) {
      mainApp.testMiddleware(request, response, function () {
        /*
          this function is the main test middleware
        */
        var modeIo, next, onIo;
        next = function (error) {
          mainApp.serverRespondDefault(request, response, error ? 500 : 404, error);
        };
        switch (request.urlPathNormalized) {
        // test github upload handling behavior
        case '/test/github-upload':
          modeIo = 0;
          onIo = function (error, data) {
            modeIo = error instanceof Error ? -1 : modeIo + 1;
            switch (modeIo) {
            case 1:
              // uploads rate-limited to one request per 10 seconds
              if (mainApp.githubUploadRateLimit && !request.testSecretValid) {
                onIo(new Error('uploads rate-limited to one request per 10 seconds'));
                return;
              }
              mainApp.githubUploadRateLimit = true;
              setTimeout(function () {
                mainApp.githubUploadRateLimit = null;
              }, 10000);
              // uploads data-limited to 4096 bytes per request
              request.on('data', function (chunk) {
                request.bytesRead = request.bytesRead || 0;
                request.bytesRead += chunk.length;
                if (request.bytesRead > 4096) {
                  onIo(new Error('uploads data-limited to 4096 bytes per request'));
                  return;
                }
              });
              mainApp.streamReadAll(request, onIo);
              break;
            case 2:
              mainApp.github_upload.githubUpload({
                data: data,
                url: $$options.githubUploadTestFileUrl
              }, onIo);
              break;
            default:
              mainApp.serverRespondDefault(request, response, error ? 500 : 200, error);
              // cleanup request
              request.destroy();
              // cleanup response
              response.destroy();
            }
          };
          onIo();
          break;
        // fallback to 404 Not Found
        default:
          next();
        }
      });
    })
      // start server on port process.env.npm_config_server_port
      .listen(process.env.npm_config_server_port, function () {
        console.log('server listening on port ' + process.env.npm_config_server_port);
        // init node test
        if (process.env.npm_config_mode_npm_test) {
          mainApp.testRun();
        }
      });
    // watch and auto-cache the following files when modified
    [{
      cache: '/assets/test.js',
      coverage: 'github-upload',
      file: __dirname + '/test.js'
    }].forEach(function (options) {
      console.log('auto-cache ' + options.file);
      mainApp.fs.watchFile(options.file, {
        interval: 1000,
        persistent: false
      }, function (stat2, stat1) {
        if (stat2.mtime > stat1.mtime) {
          mainApp.fileCacheAndParse(options);
        }
      });
    });
    // watch and auto-jslint the files in __dirname when modified
    mainApp.fs.readdirSync(__dirname).forEach(function (file) {
      switch (mainApp.path.extname(file)) {
      case '.js':
      case '.json':
        file = __dirname + '/' + file;
        console.log('auto-jslint ' + file);
        // jslint file
        mainApp.jslint_lite.jslintPrint(mainApp.fs.readFileSync(file, 'utf8'), file);
        // if the file is modified, then auto-jslint it
        mainApp.fs.watchFile(file, {
          interval: 1000,
          persistent: false
        }, function (stat2, stat1) {
          if (stat2.mtime > stat1.mtime) {
            mainApp.jslint_lite.jslintPrint(mainApp.fs.readFileSync(file, 'utf8'), file);
          }
        });
        break;
      }
    });
    // init repl debugger
    mainApp.replStart({ mainApp: mainApp });
    break;
  }
}((function initOptions() {
  /*
    this function passes js env options to the calling function
  */
  'use strict';
  try {
    // init node js env
    return {
      global: global,
      modeJs: module.exports && typeof process.versions.node === 'string' &&
        typeof require('child_process').spawn === 'function' && 'node'
    };
  } catch (errorCaughtNode) {
    // init browser js env
    return {
      global: window,
      modeJs: typeof navigator.userAgent === 'string' &&
        typeof document.querySelector('body') === 'object' && 'browser'
    };
  }
}())));
