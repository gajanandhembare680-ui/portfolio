import { useOSStore } from '@/store/useOSStore';
import { Play, Pause, SkipBack, SkipForward, Volume2, Music } from 'lucide-react';
import { motion } from 'framer-motion';
import { TRACKS } from '@/components/os/GlobalAudio';

export default function MusicApp() {
    const {
        isMusicPlaying,
        setMusicPlaying,
        musicVolume,
        setMusicVolume,
        currentTrackIndex,
        nextTrack,
        prevTrack
    } = useOSStore();

    const currentTrack = TRACKS[currentTrackIndex];

    return (
        <div className="flex flex-col h-full bg-slate-900 text-white overflow-hidden">
            {/* Visualizer Area */}
            <div className="flex-1 relative flex items-center justify-center overflow-hidden">
                {/* Background Blur */}
                <div
                    className="absolute inset-0 opacity-30 bg-cover bg-center blur-3xl scale-125 transition-all duration-1000"
                    style={{ backgroundImage: `url(${currentTrack.cover})` }}
                />

                {/* Album Art */}
                <motion.div
                    key={currentTrack.title}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', damping: 20 }}
                    className="relative z-10 w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                >
                    <img
                        src={currentTrack.cover}
                        alt={currentTrack.title}
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                {/* Simulated Visualizer Bars */}
                <div className="absolute bottom-0 left-0 right-0 h-32 flex items-end justify-center gap-1 pb-4 opacity-50">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <div
                            key={i}
                            className={`w-2 bg-white/50 rounded-t-sm transition-all duration-150 ${isMusicPlaying ? 'animate-pulse' : 'h-2'}`}
                            style={{
                                height: isMusicPlaying ? `${Math.random() * 80 + 10}%` : '5%',
                                animationDelay: `${i * 0.05}s`
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Controls Area */}
            <div className="h-40 bg-slate-800/80 backdrop-blur-md border-t border-white/10 p-6 flex flex-col justify-between">

                {/* Track Info */}
                <div className="text-center">
                    <h3 className="text-xl font-bold truncate">{currentTrack.title}</h3>
                    <p className="text-sm text-slate-400">{currentTrack.artist}</p>
                </div>

                {/* Progress Bar (Mock) */}
                <div className="w-full h-1 bg-white/10 rounded-full mt-4 mb-2 overflow-hidden">
                    <div className="h-full bg-blue-500 w-1/3 rounded-full relative">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow" />
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => prevTrack(TRACKS.length)}
                            className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-300 hover:text-white"
                        >
                            <SkipBack size={24} />
                        </button>

                        <button
                            onClick={() => setMusicPlaying(!isMusicPlaying)}
                            className="w-12 h-12 bg-white text-slate-900 rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-white/20"
                        >
                            {isMusicPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
                        </button>

                        <button
                            onClick={() => nextTrack(TRACKS.length)}
                            className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-300 hover:text-white"
                        >
                            <SkipForward size={24} />
                        </button>
                    </div>

                    {/* Volume */}
                    <div className="flex items-center gap-2 w-32 group">
                        <Volume2 size={18} className="text-slate-400" />
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={musicVolume}
                            onChange={(e) => setMusicVolume(parseFloat(e.target.value))}
                            className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
