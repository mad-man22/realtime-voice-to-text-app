# VoiceFlow 🎙️

A high-performance, cross-platform voice-to-text desktop application built with **Tauri**, **React**, and **Deepgram**.

## Features

- **Real-time Transcription**: Powered by Deepgram's Streaming API (Nova-2 model).
- **Premium UI**: Modern dark-mode interface with sleek animations and waveform effects.
- **Cross-Platform**: Native desktop experience leveraging Tauri.
- **Micro-animations**: Pulsing recording state and smooth transcript transitions.

## Tech Stack

- **Framework**: [Tauri](https://tauri.app/) (Rust + React)
- **Frontend**: Vite, TypeScript, Tailwind CSS
- **Transcription**: [Deepgram SDK](https://deepgram.com/)
- **Icons**: Lucide React

## Setup

1. **Prerequisites**:
   - Node.js & npm
   - Rust (via [rustup](https://rustup.rs/))
   - Deepgram API Key

2. **Installation**:
   ```bash
   npm install
   ```

3. **Development**:
   ```bash
   npm run tauri dev
   ```

4. **API Key**:
   When the app opens, click the settings icon (bottom right) to enter your **Deepgram API Key**. The key is stored locally and used for real-time transcription.

## Build

To build the production-ready application for your current OS:
```bash
npm run tauri build
```

## License

MIT
