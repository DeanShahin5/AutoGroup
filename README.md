# AutoGroup

a full-stack group matching application for organizing members into groups and creating slack conversations.

## structure

```
├── frontend/          react + typescript app
├── backend/           node.js slack api functions
└── docs/              documentation
```

## tech stack

**frontend**: react + typescript + vite + ant design + firebase
**backend**: node.js + slack api + firebase functions
**database**: firestore

## features

- create and manage group matching events
- organize members with profiles and team assignments
- smart grouping with drag-and-drop interface
- automatic slack group conversation creation
- batch processing with retry logic

## setup

```bash
# install all dependencies
npm run install-all

# copy environment template
cp .env.example .env
# add your SLACK_BOT_TOKEN to .env

# run development server
npm run dev
```

## build

```bash
npm run build
```

## deployment

**frontend** → firebase hosting or vercel
**backend** → firebase app hosting (cloud run)
