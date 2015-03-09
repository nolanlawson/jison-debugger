#!/bin/sh

gulp clean build

git checkout -b build
git add -f dist
git commit -a -m 'build'
git push origin build:gh-pages
git checkout -
git branch -D build
