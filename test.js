/* istanbul instrument in package github_crud */
/* istanbul ignore next */
/* jslint utility2:true */
(function (globalThis) {
    "use strict";
    var consoleError;
    var local;
    // init globalThis
    (function () {
        try {
            globalThis = Function("return this")(); // jslint ignore:line
        } catch (ignore) {}
    }());
    globalThis.globalThis = globalThis;
    // init debug_inline
    if (!globalThis["debug\u0049nline"]) {
        consoleError = console.error;
        globalThis["debug\u0049nline"] = function () {
        /*
         * this function will both print <arguments> to stderr
         * and return <arguments>[0]
         */
            var argList;
            argList = Array.from(arguments); // jslint ignore:line
            // debug arguments
            globalThis["debug\u0049nlineArguments"] = argList;
            consoleError("\n\ndebug\u0049nline");
            consoleError.apply(console, argList);
            consoleError("\n");
            // return arg0 for inspection
            return argList[0];
        };
    }
    // init local
    local = {};
    local.local = local;
    globalThis.globalLocal = local;
    // init isBrowser
    local.isBrowser = (
        typeof window === "object"
        && window === globalThis
        && typeof window.XMLHttpRequest === "function"
        && window.document
        && typeof window.document.querySelector === "function"
    );
    // init function
    local.assertThrow = function (passed, message) {
    /*
     * this function will throw error <message> if <passed> is falsy
     */
        var error;
        if (passed) {
            return;
        }
        error = (
            // ternary-condition
            (
                message
                && typeof message.message === "string"
                && typeof message.stack === "string"
            )
            // if message is an error-object, then leave it as is
            ? message
            : new Error(
                typeof message === "string"
                // if message is a string, then leave it as is
                ? message
                // else JSON.stringify message
                : JSON.stringify(message, null, 4)
            )
        );
        throw error;
    };
    local.functionOrNop = function (fnc) {
    /*
     * this function will if <fnc> exists,
     * them return <fnc>,
     * else return <nop>
     */
        return fnc || local.nop;
    };
    local.identity = function (value) {
    /*
     * this function will return <value>
     */
        return value;
    };
    local.nop = function () {
    /*
     * this function will do nothing
     */
        return;
    };
    local.objectAssignDefault = function (target, source) {
    /*
     * this function will if items from <target> are
     * null, undefined, or empty-string,
     * then overwrite them with items from <source>
     */
        Object.keys(source).forEach(function (key) {
            if (
                target[key] === null
                || target[key] === undefined
                || target[key] === ""
            ) {
                target[key] = target[key] || source[key];
            }
        });
        return target;
    };
    // require builtin
    if (!local.isBrowser) {
        local.assert = require("assert");
        local.buffer = require("buffer");
        local.child_process = require("child_process");
        local.cluster = require("cluster");
        local.crypto = require("crypto");
        local.dgram = require("dgram");
        local.dns = require("dns");
        local.domain = require("domain");
        local.events = require("events");
        local.fs = require("fs");
        local.http = require("http");
        local.https = require("https");
        local.net = require("net");
        local.os = require("os");
        local.path = require("path");
        local.querystring = require("querystring");
        local.readline = require("readline");
        local.repl = require("repl");
        local.stream = require("stream");
        local.string_decoder = require("string_decoder");
        local.timers = require("timers");
        local.tls = require("tls");
        local.tty = require("tty");
        local.url = require("url");
        local.util = require("util");
        local.vm = require("vm");
        local.zlib = require("zlib");
    }
}(this));



(function (local) {
"use strict";



// run shared js-env code - init-before
(function () {
// init local
local = (globalThis.utility2 || require("utility2")).requireReadme();
globalThis.local = local;
// init test
local.testRunDefault(local);
}());



// run shared js-env code - function
(function () {
local.testCase_githubCrudContentDelete_tree = function (options, onError) {
/*
 * this function will test githubCrudContentDelete's tree handling-behavior
 */
    var httpRequest;
    if (local.isBrowser) {
        onError(null, options);
        return;
    }
    httpRequest = function (urlParsed, onResponse) {
        onResponse(httpRequest, urlParsed);
        return httpRequest;
    };
    httpRequest.end = local.nop;
    httpRequest.ii = -1;
    httpRequest.on = function (type, onError) {
        httpRequest.ii += 1;
        switch (type) {
        case "data":
            onError(Buffer.from(
                httpRequest.ii
                ? "{\"sha\":\"aa\"}"
                : (
                    "[{\"url\":\"https://github.com"
                    + "/:owner/:repo/blob/:branch/:path\"}]"
                )
            ));
            break;
        case "end":
            onError();
            break;
        }
        return httpRequest;
    };
    local.githubCrudContentDelete({
        httpRequest: httpRequest,
        url: "https://github.com/:owner/:repo/blob/:branch/:path"
    }, onError);
};

local.testCase_githubCrudContentXxx_default = function (options, onError) {
/*
 * this function will test githubCrudContentXxx's default handling-behavior
 */
    if (local.isBrowser) {
        onError(null, options);
        return;
    }
    local.onParallelList({
        list: [
            "githubCrudAjax",
            "githubCrudContentDelete",
            "githubCrudContentGet",
            "githubCrudContentPut",
            "githubCrudContentPutFile",
            "githubCrudContentTouch",
            "githubCrudContentTouchList"
        ]
    }, function (options2, onParallel) {
        var httpRequest;
        httpRequest = function (urlParsed, onResponse) {
            setTimeout(onResponse, 0, httpRequest, urlParsed);
            return httpRequest;
        };
        httpRequest.end = local.nop;
        httpRequest.on = function (type, onError) {
            switch (type) {
            case "data":
                onError(Buffer.from("{\"sha\":\"aa\"}"));
                break;
            case "end":
                setTimeout(onError);
                break;
            }
            return httpRequest;
        };
        onParallel.counter += 1;
        local[options2.element]({
            content: "aa",
            file: "https://github.com/:owner/:repo/blob/:branch/:path",
            httpRequest: httpRequest,
            url: "https://github.com/:owner/:repo/blob/:branch/:path",
            urlList: ["https://github.com/:owner/:repo/blob/:branch/:path"]
        }, function (error) {
            // validate no error occurred
            local.assertThrow(!error, error);
            onParallel(null, options);
        });
    }, onError);
};

local.testCase_githubCrudContentXxx_error = function (options, onError) {
/*
 * this function will test githubCrudContentXxx's error handling-behavior
 */
    if (local.isBrowser) {
        onError(null, options);
        return;
    }
    local.onParallelList({
        list: [
            "githubCrudAjax",
            "githubCrudContentGet",
            "githubCrudContentPut",
            "githubCrudContentPutFile",
            "githubCrudContentTouch",
            "githubCrudContentTouchList"
        ]
    }, function (options2, onParallel) {
        var httpRequest;
        httpRequest = function (urlParsed, onResponse) {
            setTimeout(onResponse, 0, httpRequest, urlParsed);
            return httpRequest;
        };
        httpRequest.end = local.nop;
        httpRequest.on = function (type, onError) {
            switch (type) {
            case "data":
                onError(Buffer.from("{}"));
                break;
            case "end":
                setTimeout(onError);
                break;
            case "error":
                setTimeout(onError, null, local.errorDefault);
                break;
            }
            return httpRequest;
        };
        onParallel.counter += 1;
        local[options2.element]({
            file: "package.json",
            httpRequest: httpRequest,
            url: "https://github.com/:owner/:repo/blob/:branch/:path/",
            urlList: ["error"]
        }, function (error) {
            // validate error occurred
            local.assertThrow(error, options2);
            onParallel(null, options);
        });
    }, onError);
};

local.testCase_githubCrudRepoXxxList_default = function (options, onError) {
/*
 * this function will test githubCrudRepoXxxList's default handling-behavior
 */
    if (local.isBrowser) {
        onError(null, options);
        return;
    }
    options = {};
    options.statusCode = 404;
    local.onParallelList({
        list: [
            "githubCrudRepoCreateList",
            "githubCrudRepoDeleteList"
        ]
    }, function (options2, onParallel) {
        var httpRequest;
        onParallel.counter += 1;
        httpRequest = function (urlParsed, onResponse) {
            var requestObj;
            requestObj = {};
            requestObj.statusCode = options.statusCode;
            options.statusCode = 0;
            requestObj.end = local.nop;
            requestObj.on = function (type, onError) {
                switch (type) {
                case "end":
                    setTimeout(onError);
                    break;
                }
                return requestObj;
            };
            setTimeout(onResponse, 0, requestObj, urlParsed);
            return requestObj;
        };
        local[options2.element]({
            httpRequest: httpRequest,
            urlList: ["aa/bb"]
        }, function (error) {
            // validate no error occurred
            local.assertThrow(!error, error);
            onParallel(null, options);
        });
    }, onError);
};

local.testCase_githubCrudRepoXxx_error = function (options, onError) {
/*
 * this function will test githubCrudRepoXxx's error handling-behavior
 */
    if (local.isBrowser) {
        onError(null, options);
        return;
    }
    local.onParallelList({
        list: [
            "githubCrudRepoCreateList",
            "githubCrudRepoDeleteList"
        ]
    }, function (options2, onParallel) {
        onParallel.counter += 1;
        local[options2.element]({
            urlList: ["undefined"]
        }, function (error) {
            // validate error occurred
            local.assertThrow(error, error);
            onParallel(null, options);
        });
    }, onError);
};
}());



}());
