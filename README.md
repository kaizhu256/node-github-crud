github-crud [![NPM](https://img.shields.io/npm/v/github-crud.svg?style=flat-square)](https://www.npmjs.org/package/github-crud)
===========
lightweight cli tool to get / set / delete github files



# screen-capture
![screen-capture](https://kaizhu256.github.io/node-github-crud/build/screen-capture.slimerjs.png)



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
    # create foo.js
    # create bar.css
    # jslint foo.js and bar.css

# instruction
    # 1. copy and paste this entire shell script into a console and press enter
    # 2. view jslint in console

shExampleSh() {
    # npm install github-crud
    npm install github-crud || return $?

    # create foo.js
    printf "console.log('hello');" > foo.js || return $?

    # create bar.css
    printf "body { margin: 0px; }" > bar.css || return $?

    # jslint foo.js and bar.css
    node_modules/.bin/github-crud foo.js bar.css || :
}
shExampleSh
```
#### output from shell
[![screen-capture](https://kaizhu256.github.io/node-github-crud/build/screen-capture.testExampleSh.png)](https://travis-ci.org/kaizhu256/node-github-crud)



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
    "description": "lightweight cli tool to get / set / delete github files",
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
    "version": "2015.4.30-a"
}
```



# todo
- add quickstart cli example
- add quickstart node example
- add recursive delete
- none



# change since 854516ec
- npm publish 2015.4.30-a
- improve test-coverage
- add ajaxContentDelete, ajaxContentGet, ajaxContentPut
- add testCase_contentGet_default
- update README.md
- migrate from github-upload to github-crud
- none



# changelog of last 50 commits
[![screen-capture](https://kaizhu256.github.io/node-github-crud/build/screen-capture.gitLog.png)](https://github.com/kaizhu256/node-github-crud/commits)



# internal build-script
```
# build.sh
# this shell script will run the build for this package
shBuild() {
    # init env
    export npm_config_mode_slimerjs=1 || return $?
    . node_modules/.bin/utility2 && shInit || return $?

    #!! # run npm-test on published package
    #!! shRun shNpmTestPublished || return $?

    #!! # test example js script
    #!! MODE_BUILD=testExampleJs \
        #!! shRunScreenCapture shReadmeTestJs example.js || return $?
    #!! # copy phantomjs screen-capture to $npm_config_dir_build
    #!! cp /tmp/app/tmp/build/screen-capture.*.png $npm_config_dir_build || \
        #!! return $?

    #!! # test example shell script
    #!! MODE_BUILD=testExampleSh \
        #!! shRunScreenCapture shReadmeTestSh example.sh || return $?

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
# and if number of commits > 64, then squash older commits
COMMIT_LIMIT=64 shRun shBuildGithubUpload || exit $?

# exit with $EXIT_CODE
exit $EXIT_CODE
```
