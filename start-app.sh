#!/bin/bash

set -e

cd /app

# Inject environment variables into the app
env > ./.env

npm run start
