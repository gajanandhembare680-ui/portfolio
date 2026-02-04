import { motion, AnimatePresence } from 'framer-motion';
import { APPS } from '@/lib/constants';
import { useOSStore } from '@/store/useOSStore';
import useWindowSize from '@/hooks/useWindowSize';
import { Grip } from 'lucide-react';

export default function Dock() {
    const { toggleMinimize, windows, activeApp, setAppDrawerOpen } = useOSStore();
    const { width } = useWindowSize();
    const isMobile = width < 768;

    // Logic to hide dock:
    const shouldHideDock = Object.values(windows).some(w => {
        if (!w.isOpen || w.isMinimized) return false;
        return isMobile || w.isMaximized;
    });

    // Mobile Dock items: Show max 3 "Favorites" + App Drawer Button
    // Let's pick Contact, Projects, Resume as favorites
    const mobileFavorites = ['contact', 'projects']; // just 2 for space? or 3?

    const displayedApps = isMobile
        ? APPS.filter(app => mobileFavorites.includes(app.id))
        : APPS;

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
                        {/* Regular Apps / Favorites */}
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

                        {/* App Drawer Button (Mobile Only) */}
                        {isMobile && (
                            <motion.button
                                whileHover={{ scale: 1.2, y: -10 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setAppDrawerOpen(true)}
                                className="relative group flex flex-col items-center gap-1"
                            >
                                <div className="w-12 h-12 bg-white/10 dark:bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white shadow-lg border border-white/10">
                                    <Grip size={24} />
                                </div>
                            </motion.button>
                        )}
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
