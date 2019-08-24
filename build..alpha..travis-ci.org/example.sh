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
shPrintAndEval /tmp/node_modules/.bin/github-crud put "https://github.com/$GITHUB_REPO/blob/$BRANCH/foo/bar/hello.txt /tmp/hello.txt commit-message-1"


# 4. test github-crud get
shPrintAndEval /tmp/node_modules/.bin/github-crud get "https://github.com/$GITHUB_REPO/blob/$BRANCH/foo/bar/hello.txt"


# 5. test github-crud touch
shPrintAndEval /tmp/node_modules/.bin/github-crud touch "https://github.com/$GITHUB_REPO/blob/$BRANCH/foo/bar/hello.txt commit-message-2"


# 6. test github-crud delete
shPrintAndEval /tmp/node_modules/.bin/github-crud delete "https://github.com/$GITHUB_REPO/blob/$BRANCH/foo/bar/hello.txt commit-message-3"
