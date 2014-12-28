# set $GITHUB_TOKEN from https://github.com/settings/applications
# export GITHUB_TOKEN=xxxxxxxx

# npm install github-upload
npm install github-upload

# upload a file to github
node_modules/.bin/github-upload\
  https://github.com/kaizhu256/node-github-upload/blob/sandbox/test-file\
  node_modules/github-upload/package.json
# upload a url resource to github
node_modules/.bin/github-upload\
  https://github.com/kaizhu256/node-github-upload/blob/sandbox/test-file\
  https://raw.githubusercontent.com/kaizhu256/node-github-upload/master/package.json

# run server and browser tests with code-coverage
cd node_modules/github-upload && npm install && npm test

# start test server on port 8080
# npm start --server-port=8080
# open browser to http://localhost:8080
