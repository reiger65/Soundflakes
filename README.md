# Soundflakes

A beautiful master-slave audio system for creating meditative soundscapes across multiple devices.

## Features

- 🎵 Multiple sound presets (sine, warm pads, flutes, bowls, drones)
- 📱 Master-slave architecture for multi-device playback
- 🎨 Beautiful visualizations synchronized with audio
- 📊 Individual volume control for each device
- 💾 Save and load custom presets
- 📖 Built-in tutorial system

## Quick Start

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

3. Open in browser:
- Master: `http://localhost:3000`
- Slave: `http://localhost:3000?slave=true`

## Deployment

See [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md) for Railway deployment instructions.

## Technology

- Vue.js 3 (frontend framework)
- WebSocket (real-time communication)
- Web Audio API (sound synthesis)
- Tailwind CSS (styling)
- Node.js + Express (server)

## License

MIT

