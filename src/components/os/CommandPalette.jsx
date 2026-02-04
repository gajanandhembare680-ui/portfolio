import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, AppWindow, Settings, Power, Monitor } from 'lucide-react';
import { useOSStore } from '@/store/useOSStore';
import { APPS } from '@/lib/constants';

export default function CommandPalette() {
    const { isCommandPaletteOpen, setCommandPaletteOpen, openApp, setLocked } = useOSStore();
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef(null);

    // Filtered Actions/Apps
    const actions = [
        ...APPS.map(app => ({
            id: app.id,
            title: app.name,
            icon: app.icon,
            type: 'App',
            action: () => openApp(app.id)
        })),
        { id: 'lock', title: 'Lock Screen', icon: Power, type: 'System', action: () => setLocked(true) },
        // Add more actions here
    ];

    const filteredItems = actions.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase())
    );

    useEffect(() => {
        if (isCommandPaletteOpen) {
            inputRef.current?.focus();
            setQuery('');
            setSelectedIndex(0);
        }
    }, [isCommandPaletteOpen]);

    // Keyboard Navigation
    useEffect(() => {
        if (!isCommandPaletteOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex(prev => (prev + 1) % filteredItems.length);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
            } else if (e.key === 'Enter') {
                e.preventDefault();
                const item = filteredItems[selectedIndex];
                if (item) {
                    item.action();
                    setCommandPaletteOpen(false);
                }
            } else if (e.key === 'Escape') {
                e.preventDefault();
                setCommandPaletteOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isCommandPaletteOpen, filteredItems, selectedIndex, setCommandPaletteOpen]);

    if (!isCommandPaletteOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-start justify-center pt-[20vh] bg-black/20 backdrop-blur-sm" onClick={() => setCommandPaletteOpen(false)}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.1 }}
                className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex items-center px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                    <Search className="text-gray-400 w-5 h-5 mr-3" />
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search apps and commands..."
                        className="flex-1 bg-transparent outline-none text-lg text-gray-900 dark:text-white placeholder-gray-400"
                        value={query}
                        onChange={e => { setQuery(e.target.value); setSelectedIndex(0); }}
                    />
                    <div className="flex items-center gap-1">
                        <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
                            Esc
                        </kbd>
                    </div>
                </div>

                <div className="max-h-[300px] overflow-y-auto py-2">
                    {filteredItems.length === 0 ? (
                        <div className="px-4 py-8 text-center text-gray-400 text-sm">No results found</div>
                    ) : (
                        filteredItems.map((item, index) => (
                            <div
                                key={item.id}
                                className={`flex items-center px-4 py-2 mx-2 rounded-lg cursor-pointer transition-colors ${index === selectedIndex
                                        ? 'bg-blue-500 text-white'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                    }`}
                                onClick={() => {
                                    item.action();
                                    setCommandPaletteOpen(false);
                                }}
                                onMouseEnter={() => setSelectedIndex(index)}
                            >
                                <item.icon size={18} className={`mr-3 ${index === selectedIndex ? 'text-white' : 'text-gray-500'}`} />
                                <div className="flex-1">
                                    <div className="text-sm font-medium">{item.title}</div>
                                </div>
                                <span className={`text-xs ${index === selectedIndex ? 'text-white/70' : 'text-gray-400'}`}>
                                    {item.type}
                                </span>
                            </div>
                        ))
                    )}
                </div>

                <div className="bg-gray-50 dark:bg-gray-800/50 px-4 py-2 text-[10px] text-gray-400 border-t border-gray-100 dark:border-gray-800 flex justify-between">
                    <span>Pro tip: Use arrow keys to navigate</span>
                    <span>Portfolio OS v1.1.0</span>
                </div>
            </motion.div>
        </div>
    );
}
