import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOSStore } from '@/store/useOSStore';
import { APPS } from '@/lib/constants';

export default function TaskSwitcher() {
    const { isTaskSwitcherOpen, setTaskSwitcherOpen, windows, activeApp, focusApp, closeApp, closeAllApps } = useOSStore();

    // Get list of open apps
    const openAppsList = Object.values(windows)
        .filter(w => w.isOpen)
        .map(w => {
            const appDef = APPS.find(a => a.id === w.id);
            return { ...w, ...appDef };
        })
        .sort((a, b) => b.zIndex - a.zIndex); // Sort by Z-Index (most recent first)

    // Close switcher if no apps open
    useEffect(() => {
        if (isTaskSwitcherOpen && openAppsList.length === 0) {
            setTaskSwitcherOpen(false);
        }
    }, [isTaskSwitcherOpen, openAppsList.length, setTaskSwitcherOpen]);

    if (!isTaskSwitcherOpen || openAppsList.length === 0) return null;

    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/60 backdrop-blur-md">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex gap-6 p-8 overflow-x-auto max-w-full items-center h-full snap-x"
            >
                <AnimatePresence>
                    {openAppsList.map((app) => (
                        <motion.div
                            key={app.id}
                            layout
                            drag="y"
                            dragConstraints={{ top: 0, bottom: 0 }}
                            dragElastic={{ top: 0.5, bottom: 0.1 }}
                            onDragEnd={(_, info) => {
                                if (info.offset.y < -100) { // Swipe up threshold
                                    closeApp(app.id);
                                }
                            }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8, y: -200, transition: { duration: 0.2 } }}
                            className={`
                                relative shrink-0 snap-center
                                w-64 h-96 rounded-2xl border-4 flex flex-col overflow-hidden cursor-pointer shadow-2xl transition-all bg-white dark:bg-slate-900
                                ${activeApp === app.id
                                    ? 'border-blue-500 shadow-blue-500/30'
                                    : 'border-transparent hover:scale-105'
                                }
                            `}
                            onClick={() => {
                                focusApp(app.id);
                                setTaskSwitcherOpen(false);
                            }}
                        >
                            {/* App Header Preview */}
                            <div className={`p-4 ${app.color} text-white flex items-center gap-3`}>
                                {app.icon && <app.icon size={20} />}
                                <span className="font-bold text-sm tracking-wide">{app.name}</span>
                            </div>

                            {/* Preview Body (Mockup) */}
                            <div className="flex-1 bg-gray-100 dark:bg-slate-800 p-4 flex flex-col gap-2 opacity-50">
                                <div className="w-full h-4 bg-gray-200 dark:bg-slate-700 rounded animate-pulse" />
                                <div className="w-3/4 h-4 bg-gray-200 dark:bg-slate-700 rounded animate-pulse" />
                                <div className="w-full h-4 bg-gray-200 dark:bg-slate-700 rounded animate-pulse" />
                            </div>

                            {/* Swipe Hint */}
                            <div className="absolute top-2 right-2 text-white/50 text-[10px] font-mono">
                                SWIPE UP TO CLOSE
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {/* Clear All Button */}
            <motion.button
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={closeAllApps}
                className="mb-20 px-6 py-2 bg-white/10 hover:bg-red-500/80 backdrop-blur-xl border border-white/20 rounded-full text-white font-medium text-sm transition-colors shadow-lg"
            >
                Clear All
            </motion.button>
        </div>
    );
}
