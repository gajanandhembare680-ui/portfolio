import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useOSStore } from '@/store/useOSStore';
import { AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import Window from './Window';

// Loading Placeholder
const AppLoader = () => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 dark:bg-slate-900/50">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500 mb-2" />
        <span className="text-xs text-gray-500 font-medium">Loading App...</span>
    </div>
);

// Map app IDs to components using Lazy Loading
const APP_COMPONENTS = {
    about: dynamic(() => import('@/components/apps/AboutApp'), { loading: () => <AppLoader /> }),
    skills: dynamic(() => import('@/components/apps/SkillsApp'), { loading: () => <AppLoader /> }),
    projects: dynamic(() => import('@/components/apps/ProjectsApp'), { loading: () => <AppLoader /> }),
    playground: dynamic(() => import('@/components/apps/PlaygroundApp'), { loading: () => <AppLoader /> }),
    resume: dynamic(() => import('@/components/apps/ResumeApp'), { loading: () => <AppLoader /> }),
    contact: dynamic(() => import('@/components/apps/ContactApp'), { loading: () => <AppLoader /> }),
    settings: dynamic(() => import('@/components/apps/SettingsApp'), { loading: () => <AppLoader /> }),
    changelog: dynamic(() => import('@/components/apps/ChangelogApp'), { loading: () => <AppLoader /> }),
    terminal: dynamic(() => import('@/components/apps/TerminalApp'), { loading: () => <AppLoader /> }),
    guestbook: dynamic(() => import('@/components/apps/GuestbookApp'), { loading: () => <AppLoader /> }),
};

export default function WindowManager() {
    // We now iterate over the windows object
    const { windows } = useOSStore();

    // Lock body scroll if any window is open and not minimized (Mobile mostly, but good practice)
    // Actually for desktop "windowed" mode we might NOT want to lock body scroll if the background interacts?
    // But per requirements: "Disable body scroll when any app is open" to solve scroll conflicts.
    const isAnyWindowOpen = Object.values(windows).some(w => w.isOpen && !w.isMinimized);

    useEffect(() => {
        if (isAnyWindowOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isAnyWindowOpen]);

    return (
        <div className="absolute inset-0 pointer-events-none z-40 overflow-hidden">
            <AnimatePresence>
                {Object.values(windows).map((windowState) => {
                    const Component = APP_COMPONENTS[windowState.id];
                    if (!Component || !windowState.isOpen || windowState.isMinimized) return null;

                    return (
                        <Window key={windowState.id} id={windowState.id}>
                            <Component />
                        </Window>
                    );
                })}
            </AnimatePresence>
        </div>
    );
}
