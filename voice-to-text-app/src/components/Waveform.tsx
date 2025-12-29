
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface WaveformProps {
    analyser: AnalyserNode | null;
    isRecording: boolean;
}

export const Waveform: React.FC<WaveformProps> = ({ analyser, isRecording }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!isRecording || !analyser || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        let animationId: number;

        const draw = () => {
            animationId = requestAnimationFrame(draw);
            analyser.getByteFrequencyData(dataArray);

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const barWidth = (canvas.width / bufferLength) * 2.5;
            let barHeight;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                barHeight = (dataArray[i] / 255) * canvas.height;

                const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
                gradient.addColorStop(0, 'rgba(139, 92, 246, 0.2)');
                gradient.addColorStop(1, 'rgba(6, 182, 212, 0.8)');

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.roundRect(x, canvas.height - barHeight, barWidth - 2, barHeight, 4);
                ctx.fill();

                x += barWidth;
            }
        };

        draw();
        return () => cancelAnimationFrame(animationId);
    }, [analyser, isRecording]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isRecording ? 1 : 0 }}
            className="w-full h-16 max-w-lg mb-8"
        >
            <canvas
                ref={canvasRef}
                width={512}
                height={64}
                className="w-full h-full opacity-60"
            />
        </motion.div>
    );
};
