# Dylux WhatsApp Bot

## Overview
A customizable WhatsApp Bot built with Node.js using the Baileys library for WhatsApp Web API integration.

## Project Structure
- `index.js` - Main entry point that starts the Express server and spawns the bot worker
- `main.js` - Core bot logic and WhatsApp connection handling
- `handler.js` - Message handler and command processing
- `server.js` - QR code web server for WhatsApp pairing
- `config.js` - Bot configuration settings
- `plugins/` - Plugin system for extending bot commands
- `lib/` - Utility libraries
- `src/` - Source code modules

## Running the Application
The bot runs on port 5000 and displays a connection prompt. Users can connect via:
1. QR Code scan
2. 8-digit pairing code

## Dependencies
- @whiskeysockets/baileys - WhatsApp Web API
- express - Web server
- Various media/utility packages for bot features

## Notes
- The bot requires a WhatsApp account to pair with
- Session data is stored locally for reconnection
