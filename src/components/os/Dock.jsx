import { motion } from 'framer-motion';
import { APPS } from '@/lib/constants';
import { useOSStore } from '@/store/useOSStore';

export default function Dock() {
    const { openApp } = useOSStore();

    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
            <div className="flex items-end gap-3 px-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl">
                {APPS.map((app) => (
                    <DockItem
                        key={app.id}
                        app={app}
                        onClick={() => openApp(app.id)}
                    />
                ))}
            </div>
        </div>
    );
}

function DockItem({ app, onClick }) {
    return (
        <motion.button
            whileHover={{ scale: 1.2, y: -10 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClick}
            className="relative group flex flex-col items-center gap-1"
        >
            <div className={`w-12 h-12 ${app.color} rounded-x1 rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                <app.icon size={24} />
            </div>

            {/* Tooltip */}
            <span className="absolute -top-10 bg-black/70 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                {app.name}
            </span>

            {/* Active Dot (optional, can add logic later) */}
            <div className="w-1 h-1 bg-white/50 rounded-full mt-1 opacity-0" />
        </motion.button>
    );
}
