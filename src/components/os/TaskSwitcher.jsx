import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOSStore } from '@/store/useOSStore';
import { APPS } from '@/lib/constants';

export default function TaskSwitcher() {
    const { isTaskSwitcherOpen, setTaskSwitcherOpen, windows, activeApp, focusApp } = useOSStore();

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
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 backdrop-blur-md">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex gap-4 p-8 overflow-x-auto max-w-full"
            >
                {openAppsList.map((app) => (
                    <div
                        key={app.id}
                        className={`
                            w-48 h-32 rounded-xl border-2 flex flex-col items-center justify-center gap-3 cursor-pointer shadow-2xl transition-all
                            ${activeApp === app.id
                                ? 'bg-white dark:bg-slate-800 border-blue-500 scale-110 shadow-blue-500/20'
                                : 'bg-white/80 dark:bg-slate-800/80 border-transparent hover:scale-105'
                            }
                        `}
                        onClick={() => {
                            focusApp(app.id);
                            setTaskSwitcherOpen(false);
                        }}
                    >
                        <div className={`p-2 rounded-lg ${app.color} text-white shadow-md`}>
                            {app.icon && <app.icon size={24} />}
                        </div>
                        <span className="font-semibold text-gray-800 dark:text-white text-sm">
                            {app.name}
                        </span>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
