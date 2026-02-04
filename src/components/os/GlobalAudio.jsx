import { useEffect, useRef } from 'react';
import { useOSStore } from '@/store/useOSStore';

export const TRACKS = [
    {
        title: "Lofi Study",
        artist: "Chill Hop",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        cover: "https://images.unsplash.com/photo-1516280440614-6697288d5d38?q=80&w=1000&auto=format&fit=crop"
    },
    {
        title: "Night Coding",
        artist: "Synthwave",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        cover: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop"
    },
    {
        title: "Focus Flow",
        artist: "Ambient",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        cover: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=1000&auto=format&fit=crop"
    },
    {
        title: "Deep Work",
        artist: "Piano Vibe",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        cover: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=1000&auto=format&fit=crop"
    },
    {
        title: "Cyberpunk City",
        artist: "Neon Grid",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
        cover: "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=1000&auto=format&fit=crop"
    },
    {
        title: "Coffee Shop",
        artist: "Jazzy Beats",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
        cover: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1000&auto=format&fit=crop"
    },
    {
        title: "Dreamscape",
        artist: "Ethereal",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
        cover: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=1000&auto=format&fit=crop"
    },
    {
        title: "Retro Game",
        artist: "8-Bit Hero",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
        cover: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop"
    },
    {
        title: "Space Voyage",
        artist: "Cosmic",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
        cover: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop"
    },
    {
        title: "Ocean Breeze",
        artist: "Nature Sounds",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
        cover: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop"
    }
];

export default function GlobalAudio() {
    const { isMusicPlaying, setMusicPlaying, musicVolume, currentTrackIndex, nextTrack } = useOSStore();
    const audioRef = useRef(null);
    const playPromiseRef = useRef(null);

    // Handle Volume
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = musicVolume;
        }
    }, [musicVolume]);

    // 1. Handle Track Change (Load Source)
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const trackUrl = TRACKS[currentTrackIndex].url;

        // Only change src if it's actually different
        if (audio.src !== trackUrl) {
            audio.src = trackUrl;
            audio.load(); // Explicitly load

            // If it was playing, we want to keep playing the new track
            if (isMusicPlaying) {
                // Wait for load to be ready? usually play() handles it, 
                // but let's be safe and let the second effect handle the actual play trigger
                // actually, changing src might reset pause state, so we need to force play
                const promise = audio.play();
                playPromiseRef.current = promise;
                promise.catch(e => {
                    if (e.name !== 'AbortError') console.error("Audio play failed on track change", e);
                });
            }
        }
    }, [currentTrackIndex]);

    // 2. Handle Play/Pause State Change
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isMusicPlaying) {
            const promise = audio.play();
            playPromiseRef.current = promise;
            promise.catch(e => {
                // Ignore abort errors (happens if we pause quickly after play)
                if (e.name !== 'AbortError') console.error("Audio play failed", e);
            });
        } else {
            // Check if a play promise is pending before pausing
            if (playPromiseRef.current) {
                playPromiseRef.current.then(() => {
                    audio.pause();
                }).catch(() => {
                    // If play failed, we can still ensure it's paused
                    audio.pause();
                });
            } else {
                audio.pause();
            }
        }
    }, [isMusicPlaying]);

    return (
        <audio
            ref={audioRef}
            onEnded={() => nextTrack(TRACKS.length)}
            className="hidden"
            onError={(e) => console.error("Audio Error:", e)}
        />
    );
}
