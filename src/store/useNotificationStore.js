import { create } from 'zustand';

export const useNotificationStore = create((set, get) => ({
    notifications: [],

    addNotification: ({ title, message, type = 'info', duration = 3000 }) => {
        const id = Date.now();
        const newNotification = { id, title, message, type };

        set((state) => ({
            notifications: [...state.notifications, newNotification]
        }));

        if (duration > 0) {
            setTimeout(() => {
                get().removeNotification(id);
            }, duration);
        }
    },

    removeNotification: (id) => set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id)
    })),
}));
