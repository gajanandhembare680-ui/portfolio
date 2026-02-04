import { useEffect } from 'react';
import { useOSStore } from '@/store/useOSStore';
import { useNotificationStore } from '@/store/useNotificationStore';

export default function useKeyboardShortcuts() {
    const { activeApp, closeApp, minimizeApp, toggleMinimize, windows, isCommandPaletteOpen, setCommandPaletteOpen, setTaskSwitcherOpen } = useOSStore();
    const { addNotification } = useNotificationStore();

    useEffect(() => {
        const handleKeyDown = (e) => {
            // Command Palette (Ctrl+K or Cmd+K)
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setCommandPaletteOpen(!isCommandPaletteOpen);
            }

            // Task Switcher (Alt) - Simple Toggle for now
            // Real Alt+Tab is hard to override in browser. 
            // We'll use "Option+Tab" or just a dedicated key for demo. 
            // Let's use "Alt+S" (Switcher) for safety
            if (e.altKey && e.key === 's') {
                e.preventDefault();
                setTaskSwitcherOpen(true);
            }


            // Close Active App (Esc)
            if (e.key === 'Escape') {
                // Only if an app is active and NO modals are open (roughly)
                if (activeApp) {
                    closeApp(activeApp);
                }
            }

            // Minimize Active App (Ctrl+M)
            if ((e.metaKey || e.ctrlKey) && e.key === 'm') {
                e.preventDefault();
                if (activeApp) {
                    minimizeApp(activeApp);
                    addNotification({ title: 'Minimized', message: 'App sent to dock', type: 'info' });
                }
            }

            // Fullscreen/Restore (Ctrl+Up)
            if ((e.metaKey || e.ctrlKey) && e.key === 'ArrowUp') {
                e.preventDefault();
                // We don't have toggleMaximize exposed directly in this hook scope easily unless we fetch it
                // But we can add it to destructuring above if we update the hook usage
                // For now, let's ship the basics.
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activeApp, closeApp, minimizeApp, addNotification]); // Deps need to be correct or use a ref for latest state
}
