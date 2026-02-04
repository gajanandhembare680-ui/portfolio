import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Lock, Unlock } from 'lucide-react';
import { useTime } from '@/hooks/useTime';
import { useOSStore } from '@/store/useOSStore';

export default function LockScreen() {
    const { setLocked } = useOSStore();
    const time = useTime();
    const y = useMotionValue(0);
    const opacity = useTransform(y, [0, -200], [1, 0]);
    const textOpacity = useTransform(y, [0, -100], [1, 0]);

    const handleDragEnd = (_, info) => {
        if (info.offset.y < -150) {
            setLocked(false);
        }
    };

    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-xl flex flex-col items-center justify-between py-20 text-white"
            style={{ opacity, y }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
        >
            <div className="flex flex-col items-center mt-20">
                <Lock size={24} className="mb-4 text-white/50" />
                <h1 className="text-8xl font-thin tracking-tighter">
                    {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                </h1>
                <p className="text-xl font-medium mt-2 text-white/80">
                    {time.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
                </p>
            </div>

            <motion.div
                className="flex flex-col items-center gap-2 mb-10"
                style={{ opacity: textOpacity }}
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
            >
                <div className="w-1 h-14 rounded-full bg-white/20 mb-2" />
                <span className="text-sm font-medium tracking-wide">Swipe up to unlock</span>
            </motion.div>
        </motion.div>
    );
}
