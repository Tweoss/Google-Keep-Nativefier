#!/bin/bash

nativefier --name 'Google Keep Desktop' --icon application.icns "https://keep.google.com/" --inject inject.js --inject inject.css && rm -rf /Applications/Google\ Keep\ Desktop-darwin-arm64 && mv Google\ Keep\ Desktop-darwin-arm64 /Applications/Google\ Keep\ Desktop-darwin-arm64 && pkill "Google Keep Desktop"; open "/Applications/Google Keep Desktop-darwin-arm64/Google Keep Desktop.app/"
