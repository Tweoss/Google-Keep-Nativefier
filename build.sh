#!/bin/bash

nativefier --name 'Google Keep Desktop Testing' --icon application.icns "https://keep.google.com/" --inject inject.js --inject inject.css && rm -rf /Applications/Google\ Keep\ Desktop-darwin-arm64-testing && mv Google\ Keep\ Desktop\ Testing-darwin-arm64 /Applications/Google\ Keep\ Desktop-darwin-arm64-testing && pkill "Google Keep Desktop Testing"; open "/Applications/Google Keep Desktop-darwin-arm64-testing/Google Keep Desktop Testing.app/"
