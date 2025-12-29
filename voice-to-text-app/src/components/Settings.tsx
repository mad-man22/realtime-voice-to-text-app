
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings as SettingsIcon, X, Key, CheckCircle2 } from 'lucide-react';

interface SettingsProps {
    apiKey: string;
    setApiKey: (key: string) => void;
}

export const Settings: React.FC<SettingsProps> = ({ apiKey, setApiKey }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [tempKey, setTempKey] = useState(apiKey);
    const [isSaved, setIsSaved] = useState(false);

    const handleSave = () => {
        setApiKey(tempKey);
        localStorage.setItem('deepgram_api_key', tempKey);
        setIsSaved(true);
        setTimeout(() => {
            setIsSaved(false);
            setIsOpen(false);
        }, 1500);
    };

    return (
        <>
            <motion.button
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(true)}
                className="fixed bottom-8 right-8 p-4 rounded-full glass border-white/10 hover:border-violet-500/50 transition-colors z-40"
            >
                <SettingsIcon className="w-6 h-6 text-violet-400" />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        />

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative w-full max-w-md p-8 glass-morphism rounded-3xl overflow-hidden"
                        >
                            {/* Decorative gradient corner */}
                            <div className="absolute -top-12 -right-12 w-24 h-24 bg-violet-600/20 blur-2xl rounded-full" />

                            <div className="flex items-center justify-between mb-8">
                                <div className="space-y-1">
                                    <h2 className="text-2xl font-semibold tracking-tight">Configuration</h2>
                                    <p className="text-xs text-zinc-500 font-light">Manage your Deepgram API settings</p>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-white/5 rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5 text-zinc-400" />
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                                        <Key className="w-4 h-4 text-violet-400" />
                                        Deepgram API Key
                                    </label>
                                    <input
                                        type="password"
                                        value={tempKey}
                                        onChange={(e) => setTempKey(e.target.value)}
                                        placeholder="Paste your key here..."
                                        className="w-full p-4 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-violet-500/50 transition-all text-sm font-mono placeholder:text-zinc-700"
                                    />
                                    <p className="text-[10px] text-zinc-500 leading-relaxed italic">
                                        Your key is stored locally in your browser and never leaves your machine.
                                    </p>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleSave}
                                    disabled={isSaved}
                                    className={`w-full py-4 rounded-xl font-medium tracking-wide transition-all flex items-center justify-center gap-2 ${isSaved
                                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                            : 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-violet-500/20'
                                        }`}
                                >
                                    {isSaved ? (
                                        <>
                                            <CheckCircle2 className="w-5 h-5" />
                                            Settings Applied
                                        </>
                                    ) : 'Save Changes'}
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};
