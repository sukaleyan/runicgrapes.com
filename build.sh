#!/bin/bash
mkdir -p dist
rsync -av --exclude='.git' --exclude='node_modules' --exclude='build.sh' --exclude='dist' . dist/
