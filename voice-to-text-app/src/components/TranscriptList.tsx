
import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Transcript } from '../types';

interface TranscriptListProps {
    transcripts: Transcript[];
}

export const TranscriptList: React.FC<TranscriptListProps> = ({ transcripts }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [transcripts]);

    return (
        <div
            ref={scrollRef}
            className="flex-1 w-full max-w-3xl overflow-y-auto px-4 py-8 space-y-6 custom-scrollbar"
        >
            <AnimatePresence initial={false}>
                {transcripts.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="h-full flex flex-col items-center justify-center text-gray-500 italic space-y-4"
                    >
                        <div className="w-12 h-12 rounded-full border-2 border-dashed border-gray-700 flex items-center justify-center">
                            <div className="w-2 h-2 bg-gray-600 rounded-full animate-ping" />
                        </div>
                        <p className="text-sm font-light tracking-wide">Ready to capture your thoughts...</p>
                    </motion.div>
                ) : (
                    transcripts.map((t, index) => (
                        <motion.div
                            key={t.id}
                            initial={{ opacity: 0, y: 20, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            layout
                            className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-start'}`}
                        >
                            <div className={`max-w-[85%] px-6 py-4 rounded-2xl glass-morphism transition-all duration-500 ${t.isFinal
                                    ? 'text-white border-white/20 shadow-[0_4px_20px_-5px_rgba(255,255,255,0.1)]'
                                    : 'text-zinc-400 italic border-transparent'
                                }`}>
                                <p className="text-lg leading-relaxed font-light">
                                    {t.text}
                                    {!t.isFinal && <span className="inline-flex ml-1 w-1 h-5 bg-cyan-400/50 animate-pulse align-middle" />}
                                </p>
                            </div>
                        </motion.div>
                    ))
                )}
            </AnimatePresence>
        </div>
    );
};
