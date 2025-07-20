# Live cursors

This is a simple web application I've built to learn more about the WebSocket API.
It creates a new websocket connection when a new user fills their username into the form, and send constant messages about the connected user cursor's x and y positions to the server. This allowed me to build these simple Figma-like cursor animations.

## Core libraries
- NodeJS v20.19.4
- WebSocket API
- ReactJS v19
- [React useWebSocket](https://www.npmjs.com/package/react-use-websocket)
- [Lodash](https://lodash.com/)
- [Perfect cursors](https://www.npmjs.com/package/perfect-cursors)

## Running locally

### Server
- In a terminal, go to /server
- Run `npm i` to install dependencies
- Then, run `node index.js` to start the server

### Client
- In a terminal, go to /client
- Run `npm i` to install dependencies
- Then, run `npm run dev` to start the client
- Open the browser in the port specified in the terminal

## Video demonstration
https://github.com/user-attachments/assets/b552c6b9-f9a3-4670-8a9b-12bd4ca0e024
