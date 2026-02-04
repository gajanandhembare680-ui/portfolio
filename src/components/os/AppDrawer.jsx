import { motion, AnimatePresence } from 'framer-motion';
import { useOSStore } from '@/store/useOSStore';
import { APPS } from '@/lib/constants';
import { X } from 'lucide-react';
import { useState } from 'react';

export default function AppDrawer() {
    const { isAppDrawerOpen, setAppDrawerOpen, openApp } = useOSStore();
    const [searchQuery, setSearchQuery] = useState('');

    // Filter apps based on search query
    const filteredApps = APPS.filter(app =>
        app.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Reset search when drawer closes
    const handleClose = () => {
        setAppDrawerOpen(false);
        setSearchQuery('');
    };

    return (
        <AnimatePresence>
            {isAppDrawerOpen && (
                <motion.div
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="fixed inset-0 z-60 bg-gray-100/90 dark:bg-slate-900/90 backdrop-blur-xl flex flex-col"
                >
                    {/* Header */}
                    <div className="p-4 flex justify-between items-center">
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">All Apps</h2>
                        <button
                            onClick={handleClose}
                            className="p-2 bg-gray-200 dark:bg-slate-800 rounded-full"
                        >
                            <X size={20} className="text-gray-600 dark:text-gray-300" />
                        </button>
                    </div>

                    {/* Search Bar */}
                    <div className="px-6 mb-6">
                        <input
                            type="text"
                            placeholder="Search apps..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        />
                    </div>

                    {/* Apps Grid */}
                    <div className="flex-1 overflow-y-auto px-6 pb-20">
                        {filteredApps.length > 0 ? (
                            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-y-6 gap-x-3">
                                {filteredApps.map((app) => (
                                    <button
                                        key={app.id}
                                        onClick={() => {
                                            openApp(app.id);
                                            handleClose();
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
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
                                <p className="text-sm">No apps found</p>
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
