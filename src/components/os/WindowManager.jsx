import { useOSStore } from '@/store/useOSStore';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Minus, Maximize2 } from 'lucide-react';
import SkillsApp from '@/components/apps/SkillsApp';
import ProjectsApp from '@/components/apps/ProjectsApp';
import ResumeApp from '@/components/apps/ResumeApp';
import PlaygroundApp from '@/components/apps/PlaygroundApp';
import ContactApp from '@/components/apps/ContactApp';
import SettingsApp from '@/components/apps/SettingsApp';

// Map app IDs to components
const APP_COMPONENTS = {
    skills: SkillsApp,
    projects: ProjectsApp,
    playground: PlaygroundApp,
    resume: ResumeApp,
    contact: ContactApp,
    settings: SettingsApp,
};

function PlaceholderApp({ name }) {
    return (
        <div className="flex items-center justify-center h-full text-2xl font-bold opacity-50">
            {name} App Coming Soon
        </div>
    );
}

export default function WindowManager() {
    const { openApps, activeApp, focusApp, closeApp, minimizeApp } = useOSStore();

    return (
        <div className="absolute inset-0 pointer-events-none z-40 overflow-hidden">
            <AnimatePresence>
                {openApps.map((appId) => {
                    const Component = APP_COMPONENTS[appId];
                    if (!Component) return null;

                    const isActive = activeApp === appId;

                    return (
                        <AppWindow
                            key={appId}
                            id={appId}
                            isActive={isActive}
                            onFocus={() => focusApp(appId)}
                            onClose={() => closeApp(appId)}
                            onMinimize={() => minimizeApp(appId)}
                        >
                            <Component />
                        </AppWindow>
                    );
                })}
            </AnimatePresence>
        </div>
    );
}

function AppWindow({ id, isActive, children, onFocus, onClose, onMinimize }) {
    return (
        <motion.div
            layoutId={`window-${id}`}
            initial={{ scale: 0.8, opacity: 0, y: 100 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 100 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`absolute inset-4 md:inset-10 pointer-events-auto flex flex-col overflow-hidden rounded-xl shadow-2xl border border-white/20 bg-white dark:bg-slate-900 ${isActive ? 'z-50 ring-2 ring-blue-500/50' : 'z-40 opacity-90'
                }`}
            onClick={onFocus}
        >
            {/* Window Title Bar */}
            <div
                className="h-10 bg-gray-100 dark:bg-gray-800 flex items-center justify-between px-4 select-none"
                onDoubleClick={onMinimize} // Simple maximize/minimize logic placeholder
            >
                <div className="flex gap-2">
                    <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600" />
                    <button onClick={onMinimize} className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600" />
                    <button className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600" />
                </div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-widest">
                    {id}
                </div>
                <div className="w-10" />
            </div>

            {/* App Content */}
            <div className="flex-1 overflow-hidden relative">
                {children}
            </div>
        </motion.div>
    );
}
