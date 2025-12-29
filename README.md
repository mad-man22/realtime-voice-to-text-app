# VoiceFlow 🎙️

[![Tauri](https://img.shields.io/badge/Tauri-2496ED?style=for-the-badge&logo=tauri&logoColor=white)](https://tauri.app/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Deepgram](https://img.shields.io/badge/Deepgram-FFB000?style=for-the-badge&logo=deepgram&logoColor=black)](https://deepgram.com/)

**VoiceFlow** is a high-performance, cross-platform voice-to-text desktop application. It combines the speed of **Tauri** (Rust) with a premium **React** frontend and the state-of-the-art **Deepgram Nova-2** model for real-time, low-latency transcription.

## ✨ Features

- 🛰️ **Real-time Transcription**: Leverages WebSockets and Deepgram's Streaming API for instant text-to-voice results.
- 🎨 **Premium UI/UX**: A sleek "Cyber-Lounge" dark theme with glassmorphism, blur effects, and smooth micro-animations.
- 🌊 **Audio Visualizer**: Real-time reactive waveform that responds to your voice input.
- 🛠️ **Local Security**: API keys are stored only on your machine.
- 📦 **Native Performance**: Lightweight desktop app footprint thanks to Tauri's Rust-based core.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+)
- [Rust](https://rustup.rs/) (Stable toolchain)
- **Windows Users**: [Visual Studio C++ Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/) (Desktop development with C++ workload)
- A [Deepgram API Key](https://console.deepgram.com/)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/mad-man22/realtime-voice-to-text-app.git
   cd realtime-voice-to-text-app/voice-to-text-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run in Development mode**:
   ```bash
   npm run tauri dev
   ```

---

## 📖 How to Use

1.  **Configure**: Click the **Settings (gear icon)** at the bottom right.
2.  **API Key**: Enter your Deepgram API Key and click **Save Changes**.
3.  **Transcribe**: Click the large **Pulsing Button** and start speaking.
4.  **Visualize**: Watch the real-time waveform and transcript bubbles flow.

---

## 🛠️ Architecture

- **Backend**: [Rust](https://www.rust-lang.org/) (Tauri core) for system-level integration.
- **Frontend**: [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/) for high-quality UI logic.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [Framer Motion](https://www.framer.com/motion/) for animations.
- **Transcription**: [@deepgram/sdk](https://github.com/deepgram/deepgram-js-sdk) for WebSocket-based AI transcription.

---

## ⚠️ Troubleshooting (Common Issues)

### 1. `linker link.exe not found` (Windows)
Ensure you have installed the **Visual Studio Build Tools** with the "Desktop development with C++" workload selected.

### 2. `output path is not a writable directory`
This usually happens when the project is inside a **OneDrive** folder. Move the project to a local directory like `C:\Projects\voice-to-text-app` to resolve file-locking conflicts.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

Developed with ❤️ by [mad-man22](https://github.com/mad-man22)
