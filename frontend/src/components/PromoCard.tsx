'use client'
import React, { useState, useEffect } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

const totalDurationSeconds = 7 * 24 * 60 * 60; // 7 días

export default function PromoCard() {
    const [timeLeft, setTimeLeft] = useState<number | null>(null);
    const [isBlocked, setIsBlocked] = useState(false);
    const [key, setKey] = useState(0);

    useEffect(() => {
        const storedEnd = localStorage.getItem('promoTrialEnd');
        if (storedEnd) {
            const endTime = parseInt(storedEnd);
            const now = Date.now();
            if (now < endTime) {
                const remaining = Math.floor((endTime - now) / 1000);
                setTimeLeft(remaining);
                setKey(prev => prev + 1);
            } else {
                setIsBlocked(true);
                setTimeLeft(0);
            }
        }
    }, []);

    const handleStart = () => {
        const endTime = Date.now() + totalDurationSeconds * 1000;
        localStorage.setItem('promoTrialEnd', endTime.toString());
        setTimeLeft(totalDurationSeconds);
        setIsBlocked(false);
        setKey(prev => prev + 1);
    };

    const handleComplete = () => {
        setIsBlocked(true);
        setTimeLeft(0);
        return { shouldRepeat: false, delay: 0 };
    };

    const scrapingImageURL = 'https://media.brightdata.es/2023/01/Web-scraping-with-R-1536x788.png';

    
    const timerColors = {
        0: '#3b82f6',
        0.5: '#facc15',
        1: '#ef4444',
        // eslint-disable-next-line
    } as unknown as any;

    return (
        <div
            className={`relative p-6 rounded-xl shadow-lg transition-all duration-300 ${isBlocked ? 'bg-gray-800 text-gray-400 pointer-events-none select-none' : 'bg-[#1E1E1E] text-white'
                }`}
            style={{ maxWidth: 520 }}
        >
            <img
                src={scrapingImageURL}
                alt="Scraping Icon"
                className="w-50 h-30 mb-4 mx-auto rounded-4xl"
            />

            <div className="mb-2 flex items-center justify-center space-x-2">
                <span className="text-lg font-bold">Proba</span>
                <span className="text-xs bg-white text-black px-2 py-0.5 rounded-sm">gratis</span>
                <span className="text-lg font-bold">7 días la</span>
            </div>
            <h3 className="text-lg font-bold mb-4 text-center">App de Scraping Web con IA</h3>

            <p className="text-sm text-gray-300 mb-6 text-center">
                Automatiza la búsqueda de nuevos clientes potenciales con nuestra herramienta de Scraping Web donde obtendrás leads de emails, teléfonos y redes sociales.
            </p>

            <div className="flex justify-center mb-4">
                {timeLeft !== null && timeLeft > 0 && !isBlocked ? (
                    <CountdownCircleTimer
                        key={key}
                        isPlaying
                        duration={timeLeft}
                        initialRemainingTime={timeLeft}
                        colors={timerColors}
                        onComplete={handleComplete}
                        size={120}
                        strokeWidth={8}
                    >
                        {({ remainingTime }) => {
                            const days = Math.floor(remainingTime / (24 * 3600));
                            const hours = Math.floor((remainingTime % (24 * 3600)) / 3600);
                            const minutes = Math.floor((remainingTime % 3600) / 60);
                            const seconds = remainingTime % 60;

                            return (
                                <div className="flex flex-col items-center text-white font-semibold text-sm">
                                    <span>{days}d {hours}h</span>
                                    <span>{minutes}m {seconds}s</span>
                                    <small className="text-xs mt-1">Tiempo restante</small>
                                </div>
                            );
                        }}
                    </CountdownCircleTimer>
                ) : isBlocked ? (
                    <div className="text-center">
                        <p className="mb-3">⏳ Tu periodo de prueba ha finalizado.</p>
                        <button
                            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-full transition"
                            onClick={() => alert('Función de upgrade no implementada')}
                        >
                            Upgrade ahora
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={handleStart}
                        className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition"
                    >
                        Empezá ahora
                    </button>
                )}
            </div>
        </div>
    );
}
