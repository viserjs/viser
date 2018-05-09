#!/bin/bash
set -e

# publish viser
lerna exec --scope viser -- rm -rf node_modules package-lock.json
lerna bootstrap --scope viser
lerna exec --scope viser -- npm run build
lerna publish --scope viser

# publish viser modules
lerna exec --ignore viser --parallel -- rm -rf node_modules package-lock.json
lerna bootstrap --ignore viser
lerna exec --ignore viser -- npm run build
lerna publish --ignore viser
