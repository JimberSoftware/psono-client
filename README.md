# Jimber Client Psono Client

## Description

password manager client: the web-based frontend application built with React and Material-UI. The client connects to the Jimber psono Server and provides a user interface for managing passwords, secure sharing, and authentication via the Jimber OIDC Identity Provider.

## Quick Start

```bash
cd /psono-client
npm install
npm run dev
```

## Port Information

- **Port**: `9000`
- **URL**: `http://localhost:9000`
- **Note**: Webpack dev server with hot reload enabled

## Development

- **Start development server**: `npm run dev`
- **Build for Chrome extension**: `npm run buildchrome`
- **Build for Firefox extension**: `npm run buildfirefox`
- **Build for web client**: `npm run buildwebclient`
- **Build for Electron**: `npm run buildelectron`

## Tech Stack

- **Framework**: React 17
- **UI Library**: Material-UI (MUI)
- **Build Tool**: Webpack
- **State Management**: Redux

---

# PSONO Client - Password Manager

[![coverage report](https://gitlab.com/esaqa/psono/psono-client/badges/master/coverage.svg)](https://gitlab.com/esaqa/psono/psono-client/commits/master)
[![build status](https://img.shields.io/docker/pulls/psono/psono-client.svg)](https://hub.docker.com/r/psono/psono-client/)
[![Discord](https://img.shields.io/badge/Discord-join%20chat-738bd7.svg)](https://discord.gg/VmBMzTSbGV)
[![POEditor](https://img.shields.io/badge/POEditor-Help%20translate-brightgreen.svg)](https://poeditor.com/join/project?hash=Aiea8D0WIr)

# Canonical source

The canonical source of PSONO Client is [hosted on GitLab.com](https://gitlab.com/esaqa/psono/psono-client).

# Documentation

The documentation for the psono server can be found here:

[Psono Documentation](https://doc.psono.com/)


## Support

[![Browserstack](https://i.imgur.com/hPwc0jS.png)](https://www.browserstack.com/)

Browserstack provides us the ability to test our client on various devices.


## LICENSE

Visit the [License.md](/LICENSE.md) for more details

## Other

- Websocket behind reverse proxy with SSL

    npx webpack serve --client-web-socket-url wss://psonoclient.chickahoona.com/ws --config webpack.environment.dev.js
    
    
