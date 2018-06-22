#!/bin/bash
set -e

# publish viser
lerna exec --scope viser -- npm run build
lerna exec --scope viser-cell -- npm run build
lerna publish --scope viser
lerna publish --scope viser-cell

# publish viser modules
lerna exec --scope viser-* --ignore viser-cell* -- npm run build
lerna exec --scope viser-cell-* -- npm run build
lerna publish --scope viser-* --ignore viser-cell*
lerna publish --scope viser-cell-*
