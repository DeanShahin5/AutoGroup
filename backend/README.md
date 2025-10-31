# Backend API

node.js serverless functions for slack integration.

## functions

### api/index.js
posts messages to slack channels.

### api/createSlackGroups.js
creates slack group conversations in batches with retry logic.

## deployment

deployed on firebase app hosting (cloud run).

## environment

requires `SLACK_BOT_TOKEN` environment variable.
