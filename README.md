github-crud
===========
simple cli tool to PUT / GET / DELETE github files

[![NPM](https://img.shields.io/npm/v/github-crud.svg?style=flat-square)](https://www.npmjs.org/package/github-crud)



# screen-capture
[![screen-capture](https://kaizhu256.github.io/node-github-crud/build/screen-capture.testExampleSh.png)](https://travis-ci.org/kaizhu256/node-github-crud)



# build-status [![travis-ci.org build-status](https://api.travis-ci.org/kaizhu256/node-github-crud.svg)](https://travis-ci.org/kaizhu256/node-github-crud)

[![build commit status](https://kaizhu256.github.io/node-github-crud/build/build.badge.svg)](https://travis-ci.org/kaizhu256/node-github-crud)

| git-branch : | [master](https://github.com/kaizhu256/node-github-crud/tree/master) | [beta](https://github.com/kaizhu256/node-github-crud/tree/beta) | [alpha](https://github.com/kaizhu256/node-github-crud/tree/alpha)|
|--:|:--|:--|:--|
| test-report : | [![test-report](https://kaizhu256.github.io/node-github-crud/build..master..travis-ci.org/test-report.badge.svg)](https://kaizhu256.github.io/node-github-crud/build..master..travis-ci.org/test-report.html) | [![test-report](https://kaizhu256.github.io/node-github-crud/build..beta..travis-ci.org/test-report.badge.svg)](https://kaizhu256.github.io/node-github-crud/build..beta..travis-ci.org/test-report.html) | [![test-report](https://kaizhu256.github.io/node-github-crud/build..alpha..travis-ci.org/test-report.badge.svg)](https://kaizhu256.github.io/node-github-crud/build..alpha..travis-ci.org/test-report.html)|
| coverage : | [![istanbul-lite coverage](https://kaizhu256.github.io/node-github-crud/build..master..travis-ci.org/coverage.badge.svg)](https://kaizhu256.github.io/node-github-crud/build..master..travis-ci.org/coverage.html/node-github-crud/index.html) | [![istanbul-lite coverage](https://kaizhu256.github.io/node-github-crud/build..beta..travis-ci.org/coverage.badge.svg)](https://kaizhu256.github.io/node-github-crud/build..beta..travis-ci.org/coverage.html/node-github-crud/index.html) | [![istanbul-lite coverage](https://kaizhu256.github.io/node-github-crud/build..alpha..travis-ci.org/coverage.badge.svg)](https://kaizhu256.github.io/node-github-crud/build..alpha..travis-ci.org/coverage.html/node-github-crud/index.html)|
| build-artifacts : | [![build-artifacts](https://kaizhu256.github.io/node-github-crud/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-github-crud/tree/gh-pages/build..master..travis-ci.org) | [![build-artifacts](https://kaizhu256.github.io/node-github-crud/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-github-crud/tree/gh-pages/build..beta..travis-ci.org) | [![build-artifacts](https://kaizhu256.github.io/node-github-crud/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-github-crud/tree/gh-pages/build..alpha..travis-ci.org)|

#### master branch
- stable branch
- HEAD should be tagged, npm-published package

#### beta branch
- stable branch
- HEAD should be latest, npm-published package

#### alpha branch
- unstable branch
- HEAD is arbitrary
- commit history may be rewritten



# quickstart cli example

#### to run this example, follow the instruction in the script below
- example.sh

```
# example.sh

# this shell script will
    # npm install github-crud
    # create local test file hello.txt with data "hello"
    # http PUT hello.txt to $GITHUB_CRUD_FILE
    # http GET $GITHUB_CRUD_FILE and print to stdout
    # validate $GITHUB_CRUD_FILE data is "hello"
    # http DELETE $GITHUB_CRUD_FILE
    # validate deleted $GITHUB_CRUD_FILE does not exist

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
    alias github-crud=node_modules/.bin/github-crud || return $?

    # create local test file hello.txt with data "hello"
    printf "hello" > hello.txt || return $?

    # http PUT hello.txt to $GITHUB_CRUD_FILE
    github-crud contentPutFile $GITHUB_CRUD_FILE hello.txt || return $?

    # http GET $GITHUB_CRUD_FILE and print to stdout
    DATA=$(github-crud contentGet $GITHUB_CRUD_FILE) || return $?
    printf "$DATA\n" || return $?

    # validate $GITHUB_CRUD_FILE data is "hello"
    [ "$DATA" = hello ] || return $?

    # http DELETE $GITHUB_CRUD_FILE
    github-crud contentDelete $GITHUB_CRUD_FILE || return $?

    # validate deleted $GITHUB_CRUD_FILE does not exist
    [ "$(github-crud contentGet $GITHUB_CRUD_FILE)" = "" ] || return $?
}
shExampleSh
```

#### output from shell
[![screen-capture](https://kaizhu256.github.io/node-github-crud/build/screen-capture.testExampleSh.png)](https://travis-ci.org/kaizhu256/node-github-crud)



# quickstart node example

#### to run this example, follow the instruction in the script below
- example.js

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
- [utility2](https://www.npmjs.com/package/utility2)



# package-listing
[![screen-capture](https://kaizhu256.github.io/node-github-crud/build/screen-capture.gitLsTree.png)](https://github.com/kaizhu256/node-github-crud)



# package.json
```
{
    "_packageJson": true,
    "author": "kai zhu <kaizhu256@gmail.com>",
    "bin": { "github-crud": "index.js" },
    "description": "simple cli tool to PUT / GET / DELETE github files",
    "dependencies": {
        "utility2": "2015.5.15-f"
    },
    "engines": { "node": ">=0.10 <=0.12" },
    "keywords": [
        "api",
        "cli", "content", "crud",
        "delete",
        "get", "git", "github",
        "put",
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
        "test": "node_modules/.bin/utility2 shRun shReadmeExportPackageJson && \
npm_config_mode_timeout_default=60000 \
node_modules/.bin/utility2 test test.js"
    },
    "version": "2015.5.28-a"
}
```



# todo
- extract branch from /repos/:owner/:repo/contents/:path?ref=:branch
- none



# change since 7a4a4445
- npm publish 2015.5.28-a
- add recursive-delete function contentDeleteTree
- add shell command contentPutUrl
- rename shell command contentPut to contentPutString
- add method urlResolve
- remove "instanceof Error" check for error validation tests
- require explicit creation of deferred task utility2.onReady
- delete unused demo.sh
- fix multi-build race conditions
- none



# changelog of last 50 commits
[![screen-capture](https://kaizhu256.github.io/node-github-crud/build/screen-capture.gitLog.png)](https://github.com/kaizhu256/node-github-crud/commits)



# internal build-script
- build.sh

```
# build.sh

# this shell script will run the build for this package
shBuild() {
    # this function will run the main build
    # init env
    export npm_config_mode_slimerjs=1 || return $?
    . node_modules/.bin/utility2 && shInit || return $?
export GITHUB_CRUD_FILE=https://github.com/kaizhu256/node-github-crud\
/blob/gh-pages\
/test/hello.build.$CI_BRANCH.$(node --version).txt || return $?

    # if running legacy-node, then wait 30 seconds
    [ "$(node --version)" \< "v0.12" ] && sleep 30

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

    # if running legacy-node, then do not continue
    [ "$(node --version)" \< "v0.12" ] && return

    # if number of commits > 1024, then squash older commits
    shRun shGitBackupAndSquashAndPush 1024 > /dev/null || return $?
}
shBuild

# save exit-code
EXIT_CODE=$?

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

# if running legacy-node, then do not continue
[ "$(node --version)" \< "v0.12" ] && exit $EXIT_CODE

# upload build-artifacts to github,
# and if number of commits > 256, then squash older commits
COMMIT_LIMIT=256 shRun shBuildGithubUpload || exit $?

# exit with $EXIT_CODE
exit $EXIT_CODE
```
