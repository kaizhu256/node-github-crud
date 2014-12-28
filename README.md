github-upload [![NPM](https://img.shields.io/npm/v/github-upload.svg?style=flat-square)](https://www.npmjs.org/package/github-upload)
=============
lightweight nodejs script to upload binary file to github repo



## build status [![travis.ci-org build status](https://api.travis-ci.org/kaizhu256/node-github-upload.svg)](https://travis-ci.org/kaizhu256/node-github-upload)

[![build commit status](https://kaizhu256.github.io/node-github-upload/build.badge.svg)](https://travis-ci.org/kaizhu256/node-github-upload)

| git branch | test server | test report | coverage report | build artifact |
|:----------:|:-----------:|:-----------:|:---------------:|:--------------:|
|[master](https://github.com/kaizhu256/node-github-upload/tree/master) | [![heroku.com test server](https://kaizhu256.github.io/node-github-upload/heroku-logo.75x25.png)](https://hrku01-github-upload-master.herokuapp.com/?modeTest=1) | [![test-report](https://kaizhu256.github.io/node-github-upload/build.travis-ci.org/master/test-report.badge.svg)](https://kaizhu256.github.io/node-github-upload/build.travis-ci.org/master/test-report.html) | [![istanbul coverage report](https://kaizhu256.github.io/node-github-upload/build.travis-ci.org/master/coverage-report.badge.svg)](https://kaizhu256.github.io/node-github-upload/build.travis-ci.org/master/coverage-report.html/node-github-upload/index.html) | [![build artifacts](https://kaizhu256.github.io/node-github-upload/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-github-upload/tree/gh-pages/build.travis-ci.org/master)|
|[beta](https://github.com/kaizhu256/node-github-upload/tree/beta) | [![heroku.com test server](https://kaizhu256.github.io/node-github-upload/heroku-logo.75x25.png)](https://hrku01-github-upload-beta.herokuapp.com/?modeTest=1) | [![test-report](https://kaizhu256.github.io/node-github-upload/build.travis-ci.org/beta/test-report.badge.svg)](https://kaizhu256.github.io/node-github-upload/build.travis-ci.org/beta/test-report.html) | [![istanbul coverage report](https://kaizhu256.github.io/node-github-upload/build.travis-ci.org/beta/coverage-report.badge.svg)](https://kaizhu256.github.io/node-github-upload/build.travis-ci.org/beta/coverage-report.html/node-github-upload/index.html) | [![build artifacts](https://kaizhu256.github.io/node-github-upload/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-github-upload/tree/gh-pages/build.travis-ci.org/beta)|
|[alpha](https://github.com/kaizhu256/node-github-upload/tree/alpha) | [![heroku.com test server](https://kaizhu256.github.io/node-github-upload/heroku-logo.75x25.png)](https://hrku01-github-upload-alpha.herokuapp.com/?modeTest=1) | [![test-report](https://kaizhu256.github.io/node-github-upload/build.travis-ci.org/alpha/test-report.badge.svg)](https://kaizhu256.github.io/node-github-upload/build.travis-ci.org/alpha/test-report.html) | [![istanbul coverage report](https://kaizhu256.github.io/node-github-upload/build.travis-ci.org/alpha/coverage-report.badge.svg)](https://kaizhu256.github.io/node-github-upload/build.travis-ci.org/alpha/coverage-report.html/node-github-upload/index.html) | [![build artifacts](https://kaizhu256.github.io/node-github-upload/glyphicons_144_folder_open.png)](https://github.com/kaizhu256/node-github-upload/tree/gh-pages/build.travis-ci.org/alpha)|

| test server screenshot |
|:---------------------- |
|[![heroku.com test server](https://kaizhu256.github.io/node-github-upload/build.travis-ci.org/beta/test-report.screenshot.herokuDeploy.phantomjs.png)](https://hrku01-github-upload-beta.herokuapp.com/?modeTest=1)|



## usage example
```
# npm install github-upload
npm install github-upload

# set $GITHUB_TOKEN env variable for the github repo you wish to upload to
export GITHUB_TOKEN=xxxxxxxx

# upload a file to github
node_modules/.bin/github-upload\
  https://github.com/kaizhu256/node-github-upload/blob/sandbox/test-file\
  /tmp/test.png
# upload a url resource to github
node_modules/.bin/github-upload\
  https://github.com/kaizhu256/node-github-upload/blob/sandbox/test-file\
  https://raw.githubusercontent.com/kaizhu256/node-github-upload/master/README.md

# run server and browser tests on self with code-coverage
cd node_modules/github-upload && npm install && npm test
# start example test server on port 8080
npm start --server-port=8080
# open browser to http://localhost:8080
```



## package content
- .gitignore
  - git ignore file
- .travis.yml
  - travis-ci config file
- Procfile
  - heroku deploy script
- README.md
  - readme file
- index.js
  - main nodejs app
- package.json
  - npm config file
- test.js
  - nodejs test script



## package dependencies
- none



## faq
- i can't upload to the private github repo with the given $GITHUB_TOKEN
  - in https://github.com/settings/applications, verify the $GITHUB_TOKEN is defined and has the 'repo' scope



## todo
- add example.js



## changelog
#### 2014.12.21
- add modeData option in githubUpload
- add shell command
- initial commit
