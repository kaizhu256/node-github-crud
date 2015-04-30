github-crud [![NPM](https://img.shields.io/npm/v/github-crud.svg?style=flat-square)](https://www.npmjs.org/package/github-crud)
===========
lightweight cli tool to PUT / GET / DELETE github files



# screen-capture
[![screen-capture](https://kaizhu256.github.io/node-github-crud/build/screen-capture.testExampleSh.png)](https://travis-ci.org/kaizhu256/node-github-crud)



# build-status [![travis-ci.org build-status](https://api.travis-ci.org/kaizhu256/node-github-crud.svg)](https://travis-ci.org/kaizhu256/node-github-crud)

[![build commit status](https://kaizhu256.github.io/node-github-crud/build/build.badge.svg)](https://travis-ci.org/kaizhu256/node-github-crud)

| git-branch | [master](https://github.com/kaizhu256/node-github-crud/tree/master) | [beta](https://github.com/kaizhu256/node-github-crud/tree/beta) | [alpha](https://github.com/kaizhu256/node-github-crud/tree/alpha)|
|:--|:--|:--|:--|
| test-report | [![test-report](https://kaizhu256.github.io/node-github-crud/build..master..travis-ci.org/test-report.badge.svg)](https://kaizhu256.github.io/node-github-crud/build..master..travis-ci.org/test-report.html) | [![test-report](https://kaizhu256.github.io/node-github-crud/build..beta..travis-ci.org/test-report.badge.svg)](https://kaizhu256.github.io/node-github-crud/build..beta..travis-ci.org/test-report.html) | [![test-report](https://kaizhu256.github.io/node-github-crud/build..alpha..travis-ci.org/test-report.badge.svg)](https://kaizhu256.github.io/node-github-crud/build..alpha..travis-ci.org/test-report.html)|
| coverage | [![istanbul-lite coverage](https://kaizhu256.github.io/node-github-crud/build..master..travis-ci.org/coverage.badge.svg)](https://kaizhu256.github.io/node-github-crud/build..master..travis-ci.org/coverage.html/node-github-crud/index.html) | [![istanbul-lite coverage](https://kaizhu256.github.io/node-github-crud/build..beta..travis-ci.org/coverage.badge.svg)](https://kaizhu256.github.io/node-github-crud/build..beta..travis-ci.org/coverage.html/node-github-crud/index.html) | [![istanbul-lite coverage](https://kaizhu256.github.io/node-github-crud/build..alpha..travis-ci.org/coverage.badge.svg)](https://kaizhu256.github.io/node-github-crud/build..alpha..travis-ci.org/coverage.html/node-github-crud/index.html)|
| build-artifacts | [![build-artifacts](https://kaizhu256.github.io/node-github-crud/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-github-crud/tree/gh-pages/build..master..travis-ci.org) | [![build-artifacts](https://kaizhu256.github.io/node-github-crud/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-github-crud/tree/gh-pages/build..beta..travis-ci.org) | [![build-artifacts](https://kaizhu256.github.io/node-github-crud/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-github-crud/tree/gh-pages/build..alpha..travis-ci.org)|



# quickstart cli example
#### to run this example, follow the instruction in the script below
```
# example.sh

# this shell script will
    # npm install github-crud
    # create local test file hello.txt with data "hello"
    # http PUT hello.txt to $GITHUB_CRUD_FILE
    # http GET $GITHUB_CRUD_FILE and print to stdout
    # validate $GITHUB_CRUD_FILE data is "hello"
    # http DELETE $GITHUB_CRUD_FILE
    # validate $GITHUB_CRUD_FILE is deleted

# instruction
    # 1. set env var $GITHUB_CRUD_FILE to test crud operations

        # uncomment line below, and set env var $GITHUB_CRUD_FILE
        # GITHUB_CRUD_FILE=https://github.com/john/my-repo/blob/master/hello.txt

    # 2. goto https://github.com/settings/tokens,
    #    and create env var $GITHUB_TOKEN with access to $GITHUB_CRUD_FILE

        # uncomment line below, and set env var $GITHUB_TOKEN
        # GITHUB_TOKEN=ffffffffffffffffffffffffffffffffffffffff

    # 3. after editing above lines,
    #    copy and paste this entire shell script into a console and press enter
    # 4. watch this script PUT / GET / DELETE $GITHUB_CRUD_FILE

shExampleSh() {
    # npm install github-crud
    npm install github-crud || return $?

    # create local test file hello.txt with data "hello"
    printf "hello" > hello.txt || return $?

    # http PUT hello.txt to $GITHUB_CRUD_FILE
    node_modules/.bin/github-crud contentPutFile $GITHUB_CRUD_FILE hello.txt \
        || return $?

    # http GET $GITHUB_CRUD_FILE and print to stdout
    DATA=$(node_modules/.bin/github-crud contentGet $GITHUB_CRUD_FILE) || \
        return $?
    printf "$DATA\n" || return $?

    # validate $GITHUB_CRUD_FILE data is "hello"
    [ "$DATA" = hello ] || return $?

    # http DELETE $GITHUB_CRUD_FILE
    node_modules/.bin/github-crud contentDelete $GITHUB_CRUD_FILE || return $?

    # validate $GITHUB_CRUD_FILE is deleted
    [ "$(node_modules/.bin/github-crud contentGet $GITHUB_CRUD_FILE)" = "" ] \
        || return $?
}
shExampleSh
```
#### output from shell
[![screen-capture](https://kaizhu256.github.io/node-github-crud/build/screen-capture.testExampleSh.png)](https://travis-ci.org/kaizhu256/node-github-crud)



# quickstart node example
#### to run this example, follow the instruction in the script below
```
/*
example.js

this node script will
- http PUT 'hello' to $GITHUB_CRUD_FILE
- http GET $GITHUB_CRUD_FILE
- validate $GITHUB_CRUD_FILE data is 'hello'
- http DELETE $GITHUB_CRUD_FILE
- validate deleted $GITHUB_CRUD_FILE does not exist

instruction
    1. set env var $GITHUB_CRUD_FILE to test crud operations,

        - e.g.
        - GITHUB_CRUD_FILE=https://github.com/john/my-repo/blob/master/hello.txt

    2. goto https://github.com/settings/tokens,
       and create env var $GITHUB_TOKEN with access to $GITHUB_CRUD_FILE

        - e.g.
        - GITHUB_TOKEN=ffffffffffffffffffffffffffffffffffffffff

    3. save this js script as example.js
    4. run the shell command:
        $ npm install github-crud && node example.js
    5. watch this script PUT / GET / DELETE $GITHUB_CRUD_FILE
*/

/*jslint
    maxerr: 8,
    maxlen: 80,
    node: true,
    nomen: true,
    stupid: true
*/

(function () {
    'use strict';
    // run node js-env code
    (function () {
        var github_crud, modeNext, onNext;
        // require modules
        github_crud = require('github-crud');
        // sequentially run crud operations
        modeNext = 0;
        onNext = function (error, data) {
            modeNext += 1;
            console.log('case ' + modeNext);
            switch (modeNext) {
            // http PUT 'hello' to $GITHUB_CRUD_FILE
            case 1:
                github_crud.contentPut({
                    data: 'hello',
                    url: process.env.GITHUB_CRUD_FILE
                }, onNext);
                break;
            case 2:
                // validate no error occurred
                console.assert(!error, error);
                onNext();
                break;
            // http GET $GITHUB_CRUD_FILE
            case 3:
                github_crud.contentGet({
                    url: process.env.GITHUB_CRUD_FILE
                }, onNext);
                break;
            // validate $GITHUB_CRUD_FILE data is 'hello'
            case 4:
                // validate no error occurred
                console.assert(!error, error);
                // validate http GET data
                console.assert(data === 'hello', data);
                console.log(data);
                onNext();
                break;
            // http DELETE $GITHUB_CRUD_FILE
            case 5:
                github_crud.contentDelete({
                    url: process.env.GITHUB_CRUD_FILE
                }, onNext);
                break;
            case 6:
                // validate no error occurred
                console.assert(!error, error);
                onNext();
                break;
            // validate deleted $GITHUB_CRUD_FILE does not exist
            case 7:
                github_crud.contentGet({
                    url: process.env.GITHUB_CRUD_FILE
                }, onNext);
                break;
            case 8:
                // validate no error occurred
                console.assert(!error, error);
                // validate deleted data does not exist
                console.assert(!data, data);
                break;
            }
        };
        onNext();
    }());
}());
```
#### output from shell
[![screen-capture](https://kaizhu256.github.io/node-github-crud/build/screen-capture.testExampleJs.png)](https://travis-ci.org/kaizhu256/node-github-crud)



# npm dependencies
- none



# package-listing
[![screen-capture](https://kaizhu256.github.io/node-github-crud/build/screen-capture.gitLsTree.png)](https://github.com/kaizhu256/node-github-crud)



# package.json
```
{
    "_packageJson": true,
    "author": "kai zhu <kaizhu256@gmail.com>",
    "bin": { "github-crud": "index.js" },
    "description": "lightweight cli tool to PUT / GET / DELETE github files",
    "dependencies": {
        "utility2": "2015.4.30-a"
    },
    "engines": { "node": ">=0.10 <=0.12" },
    "keywords": [
        "content", "crud",
        "github",
        "repo",
        "upload"
    ],
    "license": "MIT",
    "name": "github-crud",
    "os": ["darwin", "linux"],
    "repository" : {
        "type" : "git",
        "url" : "https://github.com/kaizhu256/node-github-crud.git"
    },
    "scripts": {
        "build-ci": "node_modules/.bin/utility2 shRun shReadmeBuild",
        "start": "npm_config_mode_auto_restart=1 \
node_modules/.bin/utility2 shRun node test.js",
        "test": "node_modules/.bin/utility2 shRun shReadmePackageJsonExport && \
node_modules/.bin/utility2 test test.js"
    },
    "version": "2015.4.30-c"
}
```



# todo
- add recursive delete
- none



# change since f11765e9
- npm publish 2015.4.30-c
- add quickstart node example
- add quickstart cli example
- none



# changelog of last 50 commits
[![screen-capture](https://kaizhu256.github.io/node-github-crud/build/screen-capture.gitLog.png)](https://github.com/kaizhu256/node-github-crud/commits)



# internal build-script
```
# build.sh
# this shell script will run the build for this package
shBuild() {
    # init env
export GITHUB_CRUD_FILE=https://github.com/kaizhu256/node-github-crud\
/blob/gh-pages\
/test/hello.build.$CI_BRANCH.$(node --version).txt || return $?
    export npm_config_mode_slimerjs=1 || return $?
    . node_modules/.bin/utility2 && shInit || return $?

    # run npm-test on published package
    shRun shNpmTestPublished || return $?

    # test example js script
    MODE_BUILD=testExampleJs \
        shRunScreenCapture shReadmeTestJs example.js || return $?

    # test example shell script
    MODE_BUILD=testExampleSh \
        shRunScreenCapture shReadmeTestSh example.sh || return $?

    # run npm-test
    MODE_BUILD=npmTest shRunScreenCapture npm test || return $?

    # do not continue if running legacy-node
    [ "$(node --version)" \< "v0.12" ] && return

    # if number of commits > 1024, then squash older commits
    shRun shGitBackupAndSquashAndPush 1024 > /dev/null || return $?
}
shBuild

# save exit-code
EXIT_CODE=$?

# do not continue if running legacy-node
[ "$(node --version)" \< "v0.12" ] && exit $EXIT_CODE

shBuildCleanup() {
    # this function will cleanup build-artifacts in local build dir
    # create package-listing
    MODE_BUILD=gitLsTree shRunScreenCapture shGitLsTree || return $?
    # create recent changelog of last 50 commits
    MODE_BUILD=gitLog shRunScreenCapture git log -50 --pretty="%ai\u000a%B" || \
        return $?
}
shBuildCleanup || exit $?

shBuildGithubUploadCleanup() {
    # this function will cleanup build-artifacts in local gh-pages repo
    return
}

# upload build-artifacts to github,
# and if number of commits > 256, then squash older commits
COMMIT_LIMIT=256 shRun shBuildGithubUpload || exit $?

# exit with $EXIT_CODE
exit $EXIT_CODE
```
