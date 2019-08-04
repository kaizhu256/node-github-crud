# github-crud
this zero-dependency package will provide a simple cli-tool to PUT / GET / DELETE github files

# live web demo
- none

![screenshot](https://kaizhu256.github.io/node-github-crud/build/screenshot.testExampleSh.svg)



[![travis-ci.org build-status](https://api.travis-ci.org/kaizhu256/node-github-crud.svg)](https://travis-ci.org/kaizhu256/node-github-crud) [![coverage](https://kaizhu256.github.io/node-github-crud/build/coverage.badge.svg)](https://kaizhu256.github.io/node-github-crud/build/coverage.html/index.html)

[![NPM](https://nodei.co/npm/github-crud.png?downloads=true)](https://www.npmjs.com/package/github-crud)

[![build commit status](https://kaizhu256.github.io/node-github-crud/build/build.badge.svg)](https://travis-ci.org/kaizhu256/node-github-crud)

| git-branch : | [master](https://github.com/kaizhu256/node-github-crud/tree/master) | [beta](https://github.com/kaizhu256/node-github-crud/tree/beta) | [alpha](https://github.com/kaizhu256/node-github-crud/tree/alpha)|
|--:|:--|:--|:--|
| test-report : | [![test-report](https://kaizhu256.github.io/node-github-crud/build..master..travis-ci.org/test-report.badge.svg)](https://kaizhu256.github.io/node-github-crud/build..master..travis-ci.org/test-report.html) | [![test-report](https://kaizhu256.github.io/node-github-crud/build..beta..travis-ci.org/test-report.badge.svg)](https://kaizhu256.github.io/node-github-crud/build..beta..travis-ci.org/test-report.html) | [![test-report](https://kaizhu256.github.io/node-github-crud/build..alpha..travis-ci.org/test-report.badge.svg)](https://kaizhu256.github.io/node-github-crud/build..alpha..travis-ci.org/test-report.html)|
| coverage : | [![coverage](https://kaizhu256.github.io/node-github-crud/build..master..travis-ci.org/coverage.badge.svg)](https://kaizhu256.github.io/node-github-crud/build..master..travis-ci.org/coverage.html/index.html) | [![coverage](https://kaizhu256.github.io/node-github-crud/build..beta..travis-ci.org/coverage.badge.svg)](https://kaizhu256.github.io/node-github-crud/build..beta..travis-ci.org/coverage.html/index.html) | [![coverage](https://kaizhu256.github.io/node-github-crud/build..alpha..travis-ci.org/coverage.badge.svg)](https://kaizhu256.github.io/node-github-crud/build..alpha..travis-ci.org/coverage.html/index.html)|
| build-artifacts : | [![build-artifacts](https://kaizhu256.github.io/node-github-crud/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-github-crud/tree/gh-pages/build..master..travis-ci.org) | [![build-artifacts](https://kaizhu256.github.io/node-github-crud/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-github-crud/tree/gh-pages/build..beta..travis-ci.org) | [![build-artifacts](https://kaizhu256.github.io/node-github-crud/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-github-crud/tree/gh-pages/build..alpha..travis-ci.org)|

[![npmPackageListing](https://kaizhu256.github.io/node-github-crud/build/screenshot.npmPackageListing.svg)](https://github.com/kaizhu256/node-github-crud)

![npmPackageDependencyTree](https://kaizhu256.github.io/node-github-crud/build/screenshot.npmPackageDependencyTree.svg)



# table of contents
1. [cdn download](#cdn-download)
1. [documentation](#documentation)
1. [quickstart shell example](#quickstart-shell-example)
1. [quickstart example.js](#quickstart-examplejs)
1. [extra screenshots](#extra-screenshots)
1. [package.json](#packagejson)
1. [changelog of last 50 commits](#changelog-of-last-50-commits)
1. [internal build script](#internal-build-script)
1. [misc](#misc)



# cdn download
- [https://kaizhu256.github.io/node-github-crud/build..beta..travis-ci.org/app/assets.github_crud.js](https://kaizhu256.github.io/node-github-crud/build..beta..travis-ci.org/app/assets.github_crud.js)



# documentation
#### cli help
![screenshot](https://kaizhu256.github.io/node-github-crud/build/screenshot.npmPackageCliHelp.svg)

#### api doc
- [https://kaizhu256.github.io/node-github-crud/build..beta..travis-ci.org/apidoc.html](https://kaizhu256.github.io/node-github-crud/build..beta..travis-ci.org/apidoc.html)

[![apidoc](https://kaizhu256.github.io/node-github-crud/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fapidoc.html.png)](https://kaizhu256.github.io/node-github-crud/build..beta..travis-ci.org/apidoc.html)

#### todo
- add web-demo
- none

#### changelog 2019.1.21
- npm publish 2019.1.21
- add functions githubRepoCreateList, githubRepoDeleteList
- rename functions githubBranchCreate -> githubRepoCreate, githubBranchDelete -> githubRepoDelete
- none

#### this package requires
- darwin or linux os



# quickstart shell example
#### to run this example, follow the instruction in the script below
- [example.sh](https://kaizhu256.github.io/node-elasticsearch-lite/build..beta..travis-ci.org/example.sh)
```shell
# example.sh

# this shell script will auto-generate documentation for the mysql npm-package with zero-config

# 1. npm install github-crud
cd /tmp && npm install github-crud
# 2. init env vars
export BRANCH=gh-pages
export GITHUB_REPO=kaizhu256/node-github-crud
# get $GITHUB_TOKEN from https://github.com/settings/tokens
export GITHUB_TOKEN="${GITHUB_TOKEN:-xxxxxxxx}"

# 3. test github-crud put
shPrintAndEval () {
    printf "\n\n\n"
    printf "\$ $*\n\n"
    eval "$@"
    return 0
}
printf "hello world\\n" > /tmp/hello.txt
shPrintAndEval \
/tmp/node_modules/.bin/github-crud put "https://github.com/$GITHUB_REPO/blob/$BRANCH/foo/bar/hello.txt /tmp/hello.txt commit-message-1"

# 4. test github-crud get
shPrintAndEval \
/tmp/node_modules/.bin/github-crud get "https://github.com/$GITHUB_REPO/blob/$BRANCH/foo/bar/hello.txt"

# 5. test github-crud touch
shPrintAndEval \
/tmp/node_modules/.bin/github-crud touch "https://github.com/$GITHUB_REPO/blob/$BRANCH/foo/bar/hello.txt commit-message-2"

# 6. test github-crud delete
shPrintAndEval \
/tmp/node_modules/.bin/github-crud delete "https://github.com/$GITHUB_REPO/blob/$BRANCH/foo/bar/hello.txt commit-message-3"
```

#### output from shell
![screenshot](https://kaizhu256.github.io/node-github-crud/build/screenshot.testExampleSh.svg)



# quickstart example.js
#### to run this example, follow the instruction in the script below
- [example.js](https://kaizhu256.github.io/node-github-crud/build..beta..travis-ci.org/example.js)
```javascript
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
        local = require("github-crud");
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
```

#### output from shell
![screenshot](https://kaizhu256.github.io/node-github-crud/build/screenshot.testExampleJs.svg)



# extra screenshots
1. [https://kaizhu256.github.io/node-github-crud/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fapidoc.html.png](https://kaizhu256.github.io/node-github-crud/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fapidoc.html.png)
[![screenshot](https://kaizhu256.github.io/node-github-crud/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fapidoc.html.png)](https://kaizhu256.github.io/node-github-crud/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fapidoc.html.png)

1. [https://kaizhu256.github.io/node-github-crud/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fcoverage.lib.html.png](https://kaizhu256.github.io/node-github-crud/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fcoverage.lib.html.png)
[![screenshot](https://kaizhu256.github.io/node-github-crud/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fcoverage.lib.html.png)](https://kaizhu256.github.io/node-github-crud/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Fcoverage.lib.html.png)

1. [https://kaizhu256.github.io/node-github-crud/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Ftest-report.html.png](https://kaizhu256.github.io/node-github-crud/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Ftest-report.html.png)
[![screenshot](https://kaizhu256.github.io/node-github-crud/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Ftest-report.html.png)](https://kaizhu256.github.io/node-github-crud/build/screenshot.buildCi.browser.%252Ftmp%252Fbuild%252Ftest-report.html.png)



# package.json
```json
{
    "author": "kai zhu <kaizhu256@gmail.com>",
    "bin": {
        "github-crud": "lib.github_crud.js"
    },
    "description": "this zero-dependency package will provide a simple cli-tool to PUT / GET / DELETE github files",
    "devDependencies": {
        "electron-lite": "kaizhu256/node-electron-lite#alpha",
        "utility2": "kaizhu256/node-utility2#alpha"
    },
    "engines": {
        "node": ">=10.0"
    },
    "homepage": "https://github.com/kaizhu256/node-github-crud",
    "keywords": [
        "github-crud"
    ],
    "license": "MIT",
    "main": "lib.github_crud.js",
    "name": "github-crud",
    "nameAliasPublish": "github-content-api github-content-lite",
    "nameLib": "github_crud",
    "nameOriginal": "github-crud",
    "os": [
        "darwin",
        "linux"
    ],
    "repository": {
        "type": "git",
        "url": "https://github.com/kaizhu256/node-github-crud.git"
    },
    "scripts": {
        "build-ci": "sh ./npm_scripts.sh",
        "env": "env",
        "eval": "sh ./npm_scripts.sh",
        "heroku-postbuild": "sh ./npm_scripts.sh",
        "postinstall": "sh ./npm_scripts.sh",
        "start": "sh ./npm_scripts.sh",
        "test": "sh ./npm_scripts.sh",
        "utility2": "sh ./npm_scripts.sh"
    },
    "version": "2019.1.21"
}
```



# changelog of last 50 commits
[![screenshot](https://kaizhu256.github.io/node-github-crud/build/screenshot.gitLog.svg)](https://github.com/kaizhu256/node-github-crud/commits)



# internal build script
- build_ci.sh
```shell
# build_ci.sh

# this shell script will run the build for this package

shBuildCiAfter () {(set -e
    shDeployCustom
    # shDeployGithub
    # shDeployHeroku
    shReadmeTest example.sh
    rm -fr /tmp/node_modules
)}

shBuildCiBefore () {(set -e
    shNpmTestPublished
    shReadmeTest example.js
)}

# run shBuildCi
eval "$(utility2 source)"
shBuildCi
```



# misc
- this package was created with [utility2](https://github.com/kaizhu256/node-utility2)
