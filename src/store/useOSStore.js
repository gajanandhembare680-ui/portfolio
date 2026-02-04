import { create } from 'zustand';

export const useOSStore = create((set, get) => ({
    wallpaper: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2670&auto=format&fit=crop',
    setWallpaper: (url) => set({ wallpaper: url }),

    isLocked: true,
    setLocked: (locked) => set({ isLocked: locked }),

    isCommandPaletteOpen: false,
    setCommandPaletteOpen: (isOpen) => set({ isCommandPaletteOpen: isOpen }),

    isTaskSwitcherOpen: false,
    isTaskSwitcherOpen: false,
    setTaskSwitcherOpen: (isOpen) => set({ isTaskSwitcherOpen: isOpen }),

    isAppDrawerOpen: false,
    setAppDrawerOpen: (isOpen) => set({ isAppDrawerOpen: isOpen }),



    // Window System State
    windows: {}, // { [appId]: { id, isOpen, isMinimized, isMaximized, zIndex, position: {x,y}, size: {w,h} } }
    activeApp: null,
    zIndexCounter: 100, // Starts at 100 to be above desktop icons

    openApp: (appId) => {
        const state = get();
        const existingWindow = state.windows[appId];
        const newZIndex = state.zIndexCounter + 1;

        if (existingWindow) {
            // If already open, just bring to front and restore if minimized
            set({
                windows: {
                    ...state.windows,
                    [appId]: {
                        ...existingWindow,
                        isOpen: true,
                        isMinimized: false,
                        zIndex: newZIndex
                    }
                },
                activeApp: appId,
                zIndexCounter: newZIndex
            });
        } else {
            // Open new window
            set({
                windows: {
                    ...state.windows,
                    [appId]: {
                        id: appId,
                        isOpen: true,
                        isMinimized: false,
                        isMaximized: false,
                        zIndex: newZIndex,
                        position: { x: Math.random() * 50 + 50, y: Math.random() * 50 + 50 } // Random offset
                    }
                },
                activeApp: appId,
                zIndexCounter: newZIndex
            });
        }
    },

    closeApp: (appId) => set((state) => ({
        windows: {
            ...state.windows,
            [appId]: { ...state.windows[appId], isOpen: false }
        },
        activeApp: state.activeApp === appId ? null : state.activeApp
    })),

    minimizeApp: (appId) => set((state) => ({
        windows: {
            ...state.windows,
            [appId]: { ...state.windows[appId], isMinimized: true }
        },
        activeApp: null
    })),

    minimizeAll: () => set((state) => {
        const newWindows = { ...state.windows };
        Object.keys(newWindows).forEach(key => {
            if (newWindows[key].isOpen) {
                newWindows[key] = { ...newWindows[key], isMinimized: true }; // properly update the object
            }
        });
        return {
            windows: newWindows,
            activeApp: null,
            isAppDrawerOpen: false,
            isTaskSwitcherOpen: false,
            isCommandPaletteOpen: false
        };
    }),

    toggleMinimize: (appId) => {
        const state = get();
        const win = state.windows[appId];
        if (!win || !win.isOpen) {
            state.openApp(appId);
            return;
        }

        if (win.isMinimized) {
            // Restore
            state.focusApp(appId);
            set(s => ({
                windows: { ...s.windows, [appId]: { ...s.windows[appId], isMinimized: false } }
            }));
        } else if (state.activeApp === appId) {
            // Minimize if currently active
            state.minimizeApp(appId);
        } else {
            // Just bring to front
            state.focusApp(appId);
        }
    },

    focusApp: (appId) => {
        const state = get();
        // Only update if not already top (optimization)
        if (state.activeApp === appId) return;

        const newZIndex = state.zIndexCounter + 1;
        set({
            activeApp: appId,
            zIndexCounter: newZIndex,
            windows: {
                ...state.windows,
                [appId]: { ...state.windows[appId], zIndex: newZIndex, isMinimized: false }
            }
        });
    },

    updateWindowPosition: (appId, position) => set((state) => ({
        windows: {
            ...state.windows,
            [appId]: { ...state.windows[appId], position }
        }
    })),

    // Custom Back Handler Registry
    backHandlers: {}, // { [appId]: callback }
    registerBackHandler: (appId, handler) => set(state => ({
        backHandlers: { ...state.backHandlers, [appId]: handler }
    })),
    unregisterBackHandler: (appId) => set(state => {
        const newHandlers = { ...state.backHandlers };
        delete newHandlers[appId];
        return { backHandlers: newHandlers };
    }),

    closeAllApps: () => set((state) => {
        const newWindows = { ...state.windows };
        Object.keys(newWindows).forEach(key => {
            newWindows[key] = { ...newWindows[key], isOpen: false, isMinimized: false };
        });
        return {
            windows: newWindows,
            activeApp: null,
            isAppDrawerOpen: false,
            isTaskSwitcherOpen: false,
            isCommandPaletteOpen: false
        };
    }),

    toggleMaximize: (appId) => set((state) => {
        const win = state.windows[appId];
        if (!win) return state;

        const isMaximized = !win.isMaximized;

        return {
            windows: {
                ...state.windows,
                [appId]: {
                    ...win,
                    isMaximized,
                    // If we are restoring (not maximizing), we might want to restore original pos?
                    // Actually, for simple MVP, we just toggle the flag.
                    // The Window component will handle the size/pos override based on this flag.
                }
            },
            activeApp: appId, // Bring to focus when maximizing/restoring
            zIndexCounter: state.zIndexCounter + 1,
        };
    }),
}));
