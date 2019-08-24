/*
example.js

this script will run a web-demo of github-crud

instruction
    1. save this script as example.js
    2. edit env vars below
    3. run the shell command:
        $ npm install kaizhu256/node-github-crud#alpha && node example.js
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



var gotoNext;
var gotoState;
var local;
gotoState = 0;
/* istanbul ignore next */
gotoNext = function (err, data) {
    if (err) {
        console.error(err);
    }
    gotoState += 1;
    switch (gotoState) {
    // init
    case 1:
        if (
            typeof window === "object"
            || global.utility2_rollup // jslint ignore:line
        ) {
            return;
        }
        local = require("github-crud");
        module.exports = local;
        if (
            process.env.npm_config_mode_auto_restart
            || process.env.npm_config_mode_test
        ) {
            return;
        }
        gotoNext();
        break;
    // test github-crud put
    case 2:
        console.error("\n\n\ngithub-crud put /foo/bar/hello.txt\n");
        local.githubCrudContentPut({
            content: "hello world\n",
            message: "commit message 1",
            url: "https://github.com/" + process.env.GITHUB_REPO + "/blob/"
            + process.env.BRANCH + "/foo/bar/hello.txt"
        }, gotoNext);
        break;
    // test github-crud get
    case 3:
        console.error("\n\n\ngithub-crud get /foo/bar/hello.txt\n");
        local.githubCrudContentGet({
            url: "https://github.com/" + process.env.GITHUB_REPO + "/blob/"
            + process.env.BRANCH + "/foo/bar/hello.txt"
        }, gotoNext);
        break;
    // test github-crud touch
    case 4:
        console.error(String(data));
        console.error("\n\n\ngithub-crud touch /foo/bar/hello.txt\n");
        local.githubCrudContentTouch({
            message: "commit message 2",
            url: "https://github.com/" + process.env.GITHUB_REPO + "/blob/"
            + process.env.BRANCH + "/foo/bar/hello.txt"
        }, gotoNext);
        break;
    // test github-crud delete
    case 5:
        console.error("\n\n\ngithub-crud delete /foo/bar/hello.txt\n");
        local.githubCrudContentDelete({
            message: "commit message 3",
            url: "https://github.com/" + process.env.GITHUB_REPO + "/blob/"
            + process.env.BRANCH + "/foo/bar/hello.txt"
        }, gotoNext);
        break;
    }
};
gotoNext();
}());
