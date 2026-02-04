import { useOSStore } from '@/store/useOSStore';
import useWindowSize from '@/hooks/useWindowSize';
import { Triangle, Circle, Square } from 'lucide-react';

export default function AndroidNavBar() {
    const {
        width
    } = useWindowSize();

    // Only show on mobile
    if (width >= 768) return null;

    return <NavBarContent />;
}

function NavBarContent() {
    const {
        activeApp,
        minimizeApp,
        minimizeAll,
        isTaskSwitcherOpen,
        setTaskSwitcherOpen,
        isAppDrawerOpen,
        setAppDrawerOpen,
        isCommandPaletteOpen,
        setCommandPaletteOpen,
        backHandlers
    } = useOSStore();

    const handleBack = () => {
        // Priority order for "Back" action

        // 1. Close Command Palette if open
        if (isCommandPaletteOpen) {
            setCommandPaletteOpen(false);
            return;
        }

        // 2. Close App Drawer if open
        if (isAppDrawerOpen) {
            setAppDrawerOpen(false);
            return;
        }

        // 3. Close Task Switcher if open
        if (isTaskSwitcherOpen) {
            setTaskSwitcherOpen(false);
            return;
        }

        // 4. Check for custom app back handler (e.g. going back within an app)
        if (activeApp && backHandlers[activeApp]) {
            const handled = backHandlers[activeApp]();
            if (handled) return;
        }

        // 5. Minimize active app (simulate going back to home)
        if (activeApp) {
            minimizeApp(activeApp);
            return;
        }
    };

    const handleHome = () => {
        minimizeAll();
    };

    const handleRecents = () => {
        if (isAppDrawerOpen) setAppDrawerOpen(false);
        if (isCommandPaletteOpen) setCommandPaletteOpen(false);
        setTaskSwitcherOpen(!isTaskSwitcherOpen);
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 h-12 bg-black/90 backdrop-blur-xl flex items-center justify-around z-[9999] px-10 pb-2 pt-2 border-t border-white/10">
            {/* Back Button */}
            <button
                onClick={handleBack}
                className="p-4 active:bg-white/10 rounded-full transition-colors"
            >
                <Triangle size={20} className="fill-white/80 text-transparent -rotate-90" />
            </button>

            {/* Home Button */}
            <button
                onClick={handleHome}
                className="p-4 active:bg-white/10 rounded-full transition-colors"
            >
                <Circle size={18} className="fill-white/80 text-transparent" />
            </button>

            {/* Recents Button */}
            <button
                onClick={handleRecents}
                className="p-4 active:bg-white/10 rounded-full transition-colors"
            >
                <Square size={18} className="fill-white/80 text-transparent" />
            </button>
        </div>
    );
}
