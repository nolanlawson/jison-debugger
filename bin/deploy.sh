#!/bin/sh

gulp clean build

git checkout -b build
mv dist/* .
git add -A
git commit -a -m 'build'
git push --force origin build:gh-pages
git checkout -
git branch -D build
