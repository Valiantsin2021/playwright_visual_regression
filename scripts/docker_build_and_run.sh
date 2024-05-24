#!/bin/bash

VERSION=$(cat ./package.json | grep '@playwright/test' | awk -F: '{ print $2 }' | sed 's/[",]//g' |tr  -d ^ | xargs)

docker  build -t  playwright-test  -f ./utils/Docker/Dockerfile  --build-arg PW_VERSION="v$VERSION" .

docker run --rm -i -v $(pwd):/app -w /app playwright-test npx playwright test test.api.spec.ts