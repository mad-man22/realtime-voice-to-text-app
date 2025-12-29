
import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Transcript } from "./types";
import { DeepgramService } from "./services/DeepgramService";
import { useAudioCapture } from "./hooks/useAudioCapture";
import { PulsingButton } from "./components/PulsingButton";
import { TranscriptList } from "./components/TranscriptList";
import { Waveform } from "./components/Waveform";
import { Settings } from "./components/Settings";
import { Mic2, Activity, ShieldCheck } from "lucide-react";

function App() {
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('deepgram_api_key') || '');
  const [transcripts, setTranscripts] = useState<Transcript[]>([]);
  const dgServiceRef = useRef<DeepgramService | null>(null);

  const handleTranscript = useCallback((text: string, isFinal: boolean) => {
    setTranscripts(prev => {
      const last = prev[prev.length - 1];
      if (last && !last.isFinal) {
        const updated = [...prev];
        updated[updated.length - 1] = { ...last, text, isFinal };
        return updated;
      }
      return [...prev, { id: Math.random().toString(), text, isFinal, timestamp: Date.now() }];
    });
  }, []);

  const { isRecording, startRecording, stopRecording, analyser } = useAudioCapture((chunk) => {
    dgServiceRef.current?.sendAudio(chunk);
  });

  const toggleRecording = async () => {
    if (isRecording) {
      stopRecording();
      dgServiceRef.current?.disconnect();
    } else {
      if (!apiKey) {
        alert("Please configure your Deepgram API Key in settings!");
        return;
      }
      dgServiceRef.current = new DeepgramService(apiKey);
      await dgServiceRef.current.connect(handleTranscript, (err) => {
        console.error(err);
        stopRecording();
      });
      startRecording();
    }
  };

  return (
    <div className="relative h-screen w-full flex flex-col items-center bg-[#030712] text-zinc-100 overflow-hidden font-['Outfit']">
      {/* Dynamic Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-600/10 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[35%] h-[35%] bg-cyan-500/10 rounded-full blur-[100px] animate-float" style={{ animationDelay: '-3s' }} />

      <Settings apiKey={apiKey} setApiKey={setApiKey} />

      <header className="relative z-10 w-full max-w-4xl flex items-center justify-between px-8 py-10">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className={`p-3 rounded-2xl glass border-white/10 ${isRecording ? 'border-violet-500/50 shadow-[0_0_20px_rgba(139,92,246,0.3)]' : ''} transition-all duration-500`}>
              <Mic2 className={`w-6 h-6 ${isRecording ? 'text-violet-400' : 'text-zinc-500'}`} />
            </div>
            {isRecording && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-violet-500"></span>
              </span>
            )}
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Voice<span className="text-violet-500">Flow</span></h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-medium">Neural Transcription Engine</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6 px-4 py-2 rounded-full glass border-white/5">
          <div className="flex items-center gap-2 text-xs font-light text-zinc-400">
            <Activity className={`w-3 h-3 ${isRecording ? 'text-emerald-400 animate-pulse' : 'text-zinc-600'}`} />
            <span>{isRecording ? 'Stream Active' : 'Standby'}</span>
          </div>
          <div className="w-px h-4 bg-white/10" />
          <div className="flex items-center gap-2 text-xs font-light text-zinc-400">
            <ShieldCheck className="w-3 h-3 text-violet-400/70" />
            <span>RSA-256 Encrypted</span>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-1 w-full flex flex-col items-center justify-between py-6">
        <TranscriptList transcripts={transcripts} />

        <div className="w-full flex flex-col items-center gap-6 pb-12 pt-4">
          <Waveform analyser={analyser} isRecording={isRecording} />
          <PulsingButton isRecording={isRecording} onClick={toggleRecording} />

          <AnimatePresence mode="wait">
            <motion.div
              key={isRecording ? 'recording' : 'idle'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center"
            >
              <p className="text-sm font-light tracking-widest text-zinc-500 uppercase">
                {isRecording ? "Capturing Audio..." : "Click to initialize"}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Subtle border overlay */}
      <div className="fixed inset-0 pointer-events-none border-[20px] border-white/[0.01]" />
    </div>
  );
}

export default App;
