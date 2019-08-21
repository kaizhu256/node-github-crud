






















































































































/*
example.js

this script will run a web-demo of github-crud

instruction
    1. save this script as example.js
    2. edit env vars below
    3. run the shell command:
        $ npm install github-crud && node example.js
    4. edit this script to suit your needs
*/



/* istanbul instrument in package github_crud */
/* jslint utility2:true */
(function () {
"use strict";



/*
 * edit begin
 * edit env vars below
 */
process.env.BRANCH = "gh-pages";
process.env.GITHUB_REPO = "kaizhu256/node-github-crud";
// get $GITHUB_TOKEN from https://github.com/settings/tokens
process.env.GITHUB_TOKEN = process.env.GITHUB_TOKEN || "xxxxxxxx";
/*
 * edit end
 */



var local;
var modeNext;
var onNext;
modeNext = 0;
/* istanbul ignore next */
onNext = function (error, data) {
    if (error) {
        console.error(error);
    }
    modeNext += 1;
    switch (modeNext) {
    // init
    case 1:
        if (
            typeof window === "object"
            || global.utility2_rollup // jslint ignore:line
        ) {
            return;
        }
        local = globalThis.utility2_moduleExports;
        module.exports = local;
        if (
            process.env.npm_config_mode_auto_restart
            || process.env.npm_config_mode_test
        ) {
            return;
        }
        onNext();
        break;
    // test github-crud put
    case 2:
        console.error("\n\n\ngithub-crud put /foo/bar/hello.txt\n");
        local.githubCrudContentPut({
            content: "hello world\n",
            message: "commit message 1",
            url: "https://github.com/" + process.env.GITHUB_REPO + "/blob/"
            + process.env.BRANCH + "/foo/bar/hello.txt"
        }, onNext);
        break;
    // test github-crud get
    case 3:
        console.error("\n\n\ngithub-crud get /foo/bar/hello.txt\n");
        local.githubCrudContentGet({
            url: "https://github.com/" + process.env.GITHUB_REPO + "/blob/"
            + process.env.BRANCH + "/foo/bar/hello.txt"
        }, onNext);
        break;
    // test github-crud touch
    case 4:
        console.error(String(data));
        console.error("\n\n\ngithub-crud touch /foo/bar/hello.txt\n");
        local.githubCrudContentTouch({
            message: "commit message 2",
            url: "https://github.com/" + process.env.GITHUB_REPO + "/blob/"
            + process.env.BRANCH + "/foo/bar/hello.txt"
        }, onNext);
        break;
    // test github-crud delete
    case 5:
        console.error("\n\n\ngithub-crud delete /foo/bar/hello.txt\n");
        local.githubCrudContentDelete({
            message: "commit message 3",
            url: "https://github.com/" + process.env.GITHUB_REPO + "/blob/"
            + process.env.BRANCH + "/foo/bar/hello.txt"
        }, onNext);
        break;
    }
};
onNext();
}());