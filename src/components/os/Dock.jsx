import { motion, AnimatePresence } from 'framer-motion';
import { APPS, DESKTOP_APPS } from '@/lib/constants';
import { useOSStore } from '@/store/useOSStore';
import useWindowSize from '@/hooks/useWindowSize';

export default function Dock() {
    const { toggleMinimize, windows, activeApp } = useOSStore();
    const { width } = useWindowSize();
    const isMobile = width < 768;

    // Always hide dock now (we have pinned icons on desktop, apps on mobile home)
    // Dock is no longer needed in the new design
    const shouldHideDock = true;

    // Desktop only: show all apps
    const displayedApps = APPS;

    return (
        <AnimatePresence>
            {!shouldHideDock && (
                <motion.div
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    exit={{ y: 100 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                    className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50"
                >
                    <div className="flex items-end gap-3 px-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl">
                        {/* Regular Apps */}
                        {displayedApps.map((app) => {
                            const isOpen = windows[app.id]?.isOpen;
                            const isActive = activeApp === app.id;
                            const isMinimized = windows[app.id]?.isMinimized;

                            return (
                                <DockItem
                                    key={app.id}
                                    app={app}
                                    isOpen={isOpen}
                                    isActive={isActive}
                                    isMinimized={isMinimized}
                                    onClick={() => toggleMinimize(app.id)}
                                />
                            );
                        })}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

function DockItem({ app, onClick, isOpen, isActive, isMinimized }) {
    return (
        <motion.button
            whileHover={{ scale: 1.2, y: -10 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClick}
            className="relative group flex flex-col items-center gap-1"
        >
            <div className={`w-12 h-12 ${app.color} rounded-2xl flex items-center justify-center text-white shadow-lg transition-all duration-300
                ${isMinimized ? 'opacity-50 grayscale' : 'opacity-100'}
                ${isActive ? 'ring-2 ring-white/50' : ''}
            `}>
                <app.icon size={24} />
            </div>

            {/* Tooltip */}
            <span className="absolute -top-10 bg-black/70 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {app.name}
            </span>

            {/* Active Dot */}
            {isOpen && (
                <div className="w-1 h-1 bg-white rounded-full mt-1" />
            )}
        </motion.button>
    );
}
