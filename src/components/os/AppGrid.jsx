import { motion } from 'framer-motion';
import { APPS } from '@/lib/constants';
import { useOSStore } from '@/store/useOSStore';

export default function AppGrid() {
    const { openApp } = useOSStore();

    return (
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 p-6 pt-10 pb-32">
            {APPS.map((app, index) => (
                <AppIcon
                    key={app.id}
                    app={app}
                    index={index}
                    onClick={() => openApp(app.id)}
                />
            ))}
        </div>
    );
}

function AppIcon({ app, index, onClick }) {
    return (
        <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className="flex flex-col items-center gap-2 group"
        >
            <div className={`w-14 h-14 md:w-16 md:h-16 ${app.color} rounded-2xl flex items-center justify-center text-white shadow-xl group-hover:shadow-2xl transition-shadow`}>
                <app.icon size={32} />
            </div>
            <span className="text-xs md:text-sm font-medium text-white drop-shadow-md">
                {app.name}
            </span>
        </motion.button>
    );
}
