# AutoGroup

A full-stack group matching application for organizing members into groups and creating Slack conversations.

## Project Structure

```
├── src/                    # Frontend (React + TypeScript)
│   ├── pages/             # Page components
│   │   ├── DonutPage/     # Donut event management
│   │   ├── MemberPage/    # Member management
│   │   └── GroupPage/     # Group organization interface
│   ├── components/        # Reusable components & providers
│   ├── firebase/          # Firebase configuration
│   ├── donuts/            # Donut data models & functions
│   ├── members/           # Member data models & functions
│   ├── groups/            # Group data models & functions
│   └── matchmaker/        # Group matching algorithm
│
├── api/                   # Backend (Node.js)
│   ├── index.js          # Slack messaging endpoint
│   └── createSlackGroups.js  # Slack group creation with retry logic
│
└── public/               # Static assets

```

## Tech Stack

### Frontend
- React 18 + TypeScript
- Vite (build tool)
- Ant Design (UI components)
- React Router (routing)
- Firebase SDK (database)

### Backend
- Node.js
- Slack Web API
- Firebase Cloud Functions

### Database
- Firebase Firestore

## Features

- **Donut Management**: Create and manage group matching events
- **Member Management**: Add, edit, and organize members with profiles
- **Smart Grouping**: Organize members into groups with drag-and-drop
- **Slack Integration**: Automatically create group conversations
- **Batch Processing**: Handle large group creations with retry logic

## Environment Variables

Create a `.env` file with:

```
SLACK_BOT_TOKEN=your_slack_bot_token_here
```

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deployment

- **Frontend**: Firebase Hosting or Vercel
- **Backend**: Firebase App Hosting (Cloud Run)
