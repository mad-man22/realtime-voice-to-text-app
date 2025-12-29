
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PulsingButtonProps {
    isRecording: boolean;
    onClick: () => void;
}

export const PulsingButton: React.FC<PulsingButtonProps> = ({ isRecording, onClick }) => {
    return (
        <div className="relative flex items-center justify-center">
            <AnimatePresence>
                {isRecording && (
                    <>
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 2.5, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                            className="absolute w-16 h-16 rounded-full bg-violet-500/20 pointer-events-none"
                        />
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1.8, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
                            className="absolute w-16 h-16 rounded-full bg-cyan-400/20 pointer-events-none"
                        />
                    </>
                )}
            </AnimatePresence>
            
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClick}
                className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 overflow-hidden ${
                    isRecording 
                    ? 'bg-gradient-to-br from-red-500 to-rose-600 shadow-[0_0_40px_-10px_rgba(244,63,94,0.6)]' 
                    : 'bg-gradient-to-br from-violet-600 to-indigo-700 shadow-[0_0_40px_-10px_rgba(139,92,246,0.6)]'
                }`}
            >
                <motion.div 
                    animate={isRecording ? { borderRadius: "4px", scale: 0.8 } : { borderRadius: "50%", scale: 1 }}
                    className="w-7 h-7 bg-white shadow-sm"
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
                
                {/* Subtle shine effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 pointer-events-none" />
            </motion.button>
        </div>
    );
};
