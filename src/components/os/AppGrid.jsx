import { motion } from 'framer-motion';
import { APPS, DESKTOP_APPS } from '@/lib/constants';
import { useOSStore } from '@/store/useOSStore';
import useWindowSize from '@/hooks/useWindowSize';
import { Grid3x3 } from 'lucide-react';

export default function AppGrid() {
    const { openApp, setAppDrawerOpen } = useOSStore();
    const { width } = useWindowSize();
    const isMobile = width < 768;

    // On mobile: show 5 key portfolio apps at the bottom
    // On desktop: show pinned apps at bottom with drawer button
    const displayedApps = isMobile
        ? APPS.filter(app => DESKTOP_APPS.includes(app.id))
        : APPS.filter(app => ['resume', 'skills', 'projects', 'contact', 'about'].includes(app.id));

    if (isMobile) {
        // Mobile: 5 apps at bottom (Resume, Skills, Projects, Contact, About)
        return (
            <div className="absolute bottom-24 left-0 right-0 flex justify-center items-end px-4 z-30">
                <div className="flex gap-4 justify-center pb-4">
                    {displayedApps.map((app, index) => (
                        <AppIcon
                            key={app.id}
                            app={app}
                            index={index}
                            onClick={() => openApp(app.id)}
                        />
                    ))}
                </div>
            </div>
        );
    }

    // Desktop: Pinned icons at bottom center with app drawer button
    return (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30">
            <div className="flex items-center gap-4 px-6 py-4 bg-white/10 dark:bg-slate-800/30 backdrop-blur-xl border border-white/20 dark:border-gray-700 rounded-2xl shadow-2xl">
                {/* Pinned Apps */}
                {displayedApps.map((app, index) => (
                    <DesktopAppIcon
                        key={app.id}
                        app={app}
                        index={index}
                        onClick={() => openApp(app.id)}
                    />
                ))}

                {/* Divider */}
                <div className="w-px h-12 bg-white/20 dark:bg-gray-600" />

                {/* App Drawer Button */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setAppDrawerOpen(true)}
                    className="flex flex-col items-center gap-1 group relative"
                    title="All Apps"
                >
                    <div className="w-14 h-14 bg-gradient-to-br from-gray-500 to-gray-600 dark:from-gray-600 dark:to-gray-700 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-all">
                        <Grid3x3 size={28} />
                    </div>

                    {/* Tooltip on hover */}
                    <span className="absolute -top-12 bg-black/80 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        All Apps
                    </span>
                </motion.button>
            </div>
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
        </motion.button>
    );
}

function DesktopAppIcon({ app, index, onClick }) {
    return (
        <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className="flex flex-col items-center gap-1 group relative"
        >
            <div className={`w-14 h-14 ${app.color} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-all`}>
                <app.icon size={28} />
            </div>

            {/* Tooltip on hover */}
            <span className="absolute -top-12 bg-black/80 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {app.name}
            </span>
        </motion.button>
    );
}
