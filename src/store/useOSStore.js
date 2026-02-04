import { create } from 'zustand';

export const useOSStore = create((set) => ({
    wallpaper: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2670&auto=format&fit=crop',
    setWallpaper: (url) => set({ wallpaper: url }),
    isLocked: true,
    setLocked: (locked) => set({ isLocked: locked }),

    openApps: [], // Array of app IDs
    activeApp: null, // ID of the currently focused app
    minimizedApps: [], // Array of minimized app IDs

    openApp: (appId) => set((state) => {
        if (state.openApps.includes(appId)) {
            return { activeApp: appId, minimizedApps: state.minimizedApps.filter(id => id !== appId) };
        }
        return {
            openApps: [...state.openApps, appId],
            activeApp: appId,
            minimizedApps: state.minimizedApps.filter(id => id !== appId)
        };
    }),

    closeApp: (appId) => set((state) => ({
        openApps: state.openApps.filter((id) => id !== appId),
        activeApp: state.activeApp === appId ? null : state.activeApp,
        minimizedApps: state.minimizedApps.filter(id => id !== appId)
    })),

    minimizeApp: (appId) => set((state) => ({
        minimizedApps: [...state.minimizedApps, appId],
        activeApp: null
    })),

    focusApp: (appId) => set({ activeApp: appId }),
}));
