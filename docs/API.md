# Backend API

Node.js serverless functions for Slack integration.

## Functions

### index.js
Posts messages to Slack channels.

**Endpoint**: `POST /api`

**Request Body**:
```json
{
  "message": "Your message text"
}
```

### createSlackGroups.js
Creates Slack group conversations in batches with retry logic.

**Endpoint**: `POST /api/createSlackGroups`

**Request Body**:
```json
{
  "groups": [
    {
      "id": "group-1",
      "members": [
        { "slackId": "U123456" },
        { "slackId": "U789012" }
      ]
    }
  ],
  "message": "Welcome message for the group"
}
```

**Features**:
- Batch processing (5 groups at a time)
- Automatic retry with exponential backoff
- Error handling for failed group creations

## Deployment

Deployed on Firebase App Hosting (Cloud Run).

## Configuration

Requires `SLACK_BOT_TOKEN` environment variable.
