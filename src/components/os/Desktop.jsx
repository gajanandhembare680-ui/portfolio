import { useOSStore } from '@/store/useOSStore';
import { motion } from 'framer-motion';
import useWindowSize from '@/hooks/useWindowSize';

export default function Desktop({ children }) {
    const { wallpaper, setAppDrawerOpen } = useOSStore();
    const { width } = useWindowSize();
    const isMobile = width < 768;

    // Handle swipe up gesture on mobile to open app drawer
    const handleDragEnd = (event, info) => {
        if (!isMobile) return;

        // If swiped up more than 100px, open app drawer
        if (info.offset.y < -100) {
            setAppDrawerOpen(true);
        }
    };

    return (
        <motion.div
            className="absolute inset-0 bg-cover bg-center overflow-hidden transition-all duration-500"
            style={{
                backgroundImage: `url('${wallpaper}')`
            }}
            drag={isMobile ? "y" : false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            dragDirectionLock
        >
            {/* Overlay for better readability */}
            <div className="absolute inset-0 bg-black/20 pointer-events-none" />

            {/* Swipe Indicator (Mobile Only) */}
            {isMobile && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                    <div className="w-12 h-1 bg-white/40 rounded-full shadow-lg" />
                </div>
            )}

            {/* Content Layer */}
            <div className="relative z-10 w-full h-full pointer-events-none">
                <div className="pointer-events-auto">
                    {children}
                </div>
            </div>
        </motion.div>
    );
}
