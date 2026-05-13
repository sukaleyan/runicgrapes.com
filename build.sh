#!/bin/bash
mkdir -p dist
find . -maxdepth 1 -not -name '.git' -not -name 'dist' -not -name '.' -exec cp -r {} dist/ \;
