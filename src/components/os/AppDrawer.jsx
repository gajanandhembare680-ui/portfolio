import { motion, AnimatePresence } from 'framer-motion';
import { useOSStore } from '@/store/useOSStore';
import { APPS } from '@/lib/constants';
import { X } from 'lucide-react';

export default function AppDrawer() {
    const { isAppDrawerOpen, setAppDrawerOpen, openApp } = useOSStore();

    return (
        <AnimatePresence>
            {isAppDrawerOpen && (
                <motion.div
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="fixed inset-0 z-[60] bg-gray-100/90 dark:bg-slate-900/90 backdrop-blur-xl flex flex-col"
                >
                    {/* Header */}
                    <div className="p-4 flex justify-end">
                        <button
                            onClick={() => setAppDrawerOpen(false)}
                            className="p-2 bg-gray-200 dark:bg-slate-800 rounded-full"
                        >
                            <X size={20} className="text-gray-600 dark:text-gray-300" />
                        </button>
                    </div>

                    {/* Search Bar (Optional) */}
                    <div className="px-6 mb-6">
                        <input
                            type="text"
                            placeholder="Search apps..."
                            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        />
                    </div>

                    {/* Apps Grid */}
                    <div className="flex-1 overflow-y-auto px-6 pb-20">
                        <div className="grid grid-cols-4 gap-y-8 gap-x-4">
                            {APPS.map((app) => (
                                <button
                                    key={app.id}
                                    onClick={() => {
                                        openApp(app.id);
                                        setAppDrawerOpen(false);
                                    }}
                                    className="flex flex-col items-center gap-2 group"
                                >
                                    <div className={`w-14 h-14 ${app.color} rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/10 transition-transform group-hover:scale-105 active:scale-95`}>
                                        <app.icon size={28} />
                                    </div>
                                    <span className="text-xs text-center font-medium text-gray-700 dark:text-gray-200 leading-tight">
                                        {app.name}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
