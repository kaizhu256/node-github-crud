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
  var global, local, mainApp;
  $$options.githubUploadTestFileUrl =
    'https://github.com/kaizhu256/node-github-upload/blob/sandbox/test-file';
  // init global object
  global = $$options.global;
  // init local shared object
  local = {};
  local._ajax_default_test = function (onError) {
    /*
      this function tests ajax's default handling behavior
    */
    var onParallel;
    onParallel = mainApp.onParallel(onError);
    onParallel.counter += 1;
    [{
      // test 404 error handling behavior
      url: '/test/undefined?modeErrorIgnore=1'
    }, {
      // test 500 internal server error handling behavior
      url: '/test/error?modeErrorIgnore=1'
    }].forEach(function (options) {
      onParallel.counter += 1;
      mainApp.ajax(options, function (error) {
        mainApp.testTryCatch(function () {
          // validate error occurred
          mainApp.assert(error instanceof Error, error);
          onParallel();
        }, onParallel);
      });
    });
    onParallel();
  };
  switch ($$options.modeJs) {
  // init browser js env
  case 'browser':
    // init mainApp
    mainApp = global.mainApp = global.$$mainApp;
    // init local browser object
    local._name = 'github-upload.test.browser';
    local.githubUploadFile = function (options, onError) {
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
          onError = onError || mainApp.nop;
          // init options
          options.file = options.file || mainApp.githubUploadFileInput.files[0];
          options.data = options.data || options.file;
          options.method = 'PUT';
          options.url = '/test/github-upload?' + options.query;
          // if no file was selected, then return
          if (!options.file) {
            onError();
            return;
          }
          // upload file to github
          mainApp.ajax(options, onIo);
          break;
        default:
          // update upload status
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
            elementLi.innerText = 'success - ' + options.file.name + ' uploaded to ';
            elementLi.innerHTML += '<a href="' + $$options.githubUploadTestFileUrl + '">' +
              $$options.githubUploadTestFileUrl + '</a>';
          }
          document.querySelector('ol').insertAdjacentHTML('afterBegin', elementLi.outerHTML);
          onError(error);
        }
      };
      onIo();
    };
    local._githubUploadFile_default_test = function (onError) {
      /*
        this function tests githubUploadFile's default handling behavior
      */
      var onParallel;
      onParallel = mainApp.onParallel(onError);
      onParallel.counter += 1;
      // test no file and no callback handling behavior
      mainApp.githubUploadFile({});
      // test default handling behavior
      onParallel.counter += 1;
      mainApp.githubUploadFile({
        data: 'hello',
        file: { name: 'test.default.txt'},
        query: 'modeErrorIgnore=1&_testSecret=' + mainApp._testSecret
      }, onParallel);
      // test rate-limit handling behavior
      onParallel.counter += 1;
      mainApp.githubUploadFile({
        data: 'hello',
        file: { name: 'test.rate-limit.txt'},
        query: 'modeErrorIgnore=1',
        // test timeout handling behavior
        timeout: 1
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
        data: new Array(8192).join(' '),
        file: { name: 'test.data-limit.txt' },
        query: 'modeErrorIgnore=1&_testSecret=' + mainApp._testSecret
      }, function (error) {
        mainApp.testTryCatch(function () {
          // validate error occurred
          mainApp.assert(error instanceof Error, error);
          onParallel();
        }, onParallel);
      });
      onParallel();
    };
    mainApp.localExport(local, mainApp);
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
    mainApp.testRun();
    break;
  // init node js env
  case 'node':
    // init mainApp
    mainApp = module.exports;
    // require modules
    mainApp.github_upload = require('./index.js');
    mainApp.utility2 = require('utility2');
    // init local node object
    local._name = 'github-upload.test.node';
    local._githubUpload_data_test = function (onError) {
      /*
        this function tests githubUpload's data handling behavior
      */
      var onParallel;
      onParallel = mainApp.onParallel(onError);
      onParallel.counter += 1;
      // test data-file handling behavior
      onParallel.counter += 1;
      mainApp.github_upload.initCli({
        argv: [null, null, null, 'package.json'],
        modeCli: true,
        modeTestData: true
      }, function (error, data) {
        mainApp.testTryCatch(function () {
          // validate no error occurred
          mainApp.assert(!error, error);
          // validate data
          data = JSON.parse(String(data));
          mainApp.assert(data.name === 'github-upload', data.name);
          onParallel();
        }, onParallel);
      });
      // test http data-url handling behavior
      onParallel.counter += 1;
      mainApp.github_upload.initCli({
        argv: [null, null, null, 'http://localhost:' + process.env.npm_config_server_port +
          '/test/hello'],
        modeCli: true,
        modeTestData: true
      }, function (error, data) {
        mainApp.testTryCatch(function () {
          // validate no error occurred
          mainApp.assert(!error, error);
          // validate data
          data = String(data);
          mainApp.assert(data === 'hello', data);
          onParallel();
        }, onParallel);
      });
      // test https data-url handling behavior
      onParallel.counter += 1;
      mainApp.github_upload.initCli({
        argv: [
          null,
          null,
          null,
          'https://raw.githubusercontent.com/kaizhu256/node-github-upload/beta/package.json'
        ],
        modeCli: true,
        modeTestData: true
      }, function (error, data) {
        mainApp.testTryCatch(function () {
          // validate no error occurred
          mainApp.assert(!error, error);
          // validate data
          data = JSON.parse(String(data));
          mainApp.assert(data.name === 'github-upload', data.name);
          onParallel();
        }, onParallel);
      });
      onParallel();
    };
    local._githubUpload_error_test = function (onError) {
      /*
        this function tests githubUpload's error handling behavior
      */
      var onParallel;
      onParallel = mainApp.onParallel(onError);
      onParallel.counter += 1;
      [{
        // test invalid url handling behavior
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
    };
    local._githubUploadRateLimitClear = function () {
      /*
        this function clears the github-upload rate-limit
      */
      mainApp.githubUploadRateLimit = null;
    };
    local._onErrorThrow_default_test = function (onError) {
      /*
        this function tests onErrorThrow's default handling behavior
      */
      var onParallel;
      onParallel = mainApp.onParallel(onError);
      onParallel.counter += 1;
      // test no error occurred handling behavior
      onParallel.counter += 1;
      mainApp.github_upload.onErrorThrow();
      onParallel();
      // test error occurred handling behavior
      onParallel.counter += 1;
      try {
        mainApp.github_upload.onErrorThrow(mainApp.utility2._errorDefault);
      } catch (error) {
        // validate error occurred
        mainApp.assert(error instanceof Error, error);
        onParallel();
      }
      onParallel();
    };
    local._testPhantom_default_test = function (onError) {
      /*
        this function tests testPhantom's default handling behavior
      */
      mainApp.testPhantom('http://localhost:' + process.env.npm_config_server_port +
        '/?modeTest=phantom&_testSecret={{_testSecret}}&_timeoutDefault=' +
        mainApp.utility2._timeoutDefault, onError);
    };
    mainApp.utility2.localExport(local, mainApp);
    // init process.env.npm_config_server_port
    mainApp.serverPortInit();
    // clear github-upload rate-limit
    local._githubUploadRateLimitClear();
    // init server
    mainApp.http.createServer(function (request, response) {
      mainApp.middlewareTest(request, response, function () {
        /*
          this function is the main test middleware
        */
        var modeIo, next, onIo;
        next = function (error) {
          mainApp.middlewareError(error, request, response);
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
              setTimeout(local._githubUploadRateLimitClear, 10000).unref();
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
        mainApp.testRun();
      });
    // watch the following files, and if they are modified, then cache and parse them
    [{
      cache: '/assets/test.js',
      coverage: 'github-upload',
      file: __dirname + '/test.js'
    }].forEach(function (options) {
      console.log('auto-cache and auto-parse ' + options.file);
      // cache and parse the file
      mainApp.fileCacheAndParse(options);
      // if the file is modified, then cache and parse it
      mainApp.onFileModifiedCacheAndParse(options);
    });
    // watch the following files, and if they are modified, then jslint them
    mainApp.fs.readdirSync(__dirname).forEach(function (file) {
      switch (mainApp.path.extname(file)) {
      case '.js':
      case '.json':
        file = __dirname + '/' + file;
        console.log('auto-jslint ' + file);
        // jslint the file
        mainApp.jslint_lite.jslintPrint(mainApp.fs.readFileSync(file, 'utf8'), file);
        // if the file is modified, then jslint it
        mainApp.onFileModifiedJslint(file);
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
