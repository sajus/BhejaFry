@echo off
node tools/r.js -o tools/build.js
cls
cd publish
node server
