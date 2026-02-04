import { AnimatePresence, motion } from 'framer-motion';
import { useNotificationStore } from '@/store/useNotificationStore';
import { X, Info, CheckCircle, AlertTriangle } from 'lucide-react';

const icons = {
    info: <Info size={18} className="text-blue-500" />,
    success: <CheckCircle size={18} className="text-green-500" />,
    warning: <AlertTriangle size={18} className="text-yellow-500" />,
    error: <AlertTriangle size={18} className="text-red-500" />,
};

export default function NotificationContainer() {
    const { notifications, removeNotification } = useNotificationStore();

    return (
        <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
            <AnimatePresence>
                {notifications.map((notification) => (
                    <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: 50, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 50, scale: 0.9 }}
                        layout
                        className="pointer-events-auto bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-xl shadow-lg border border-white/20 dark:border-gray-700 p-4 w-80 flex gap-3 items-start"
                    >
                        <div className="mt-1 shrink-0">
                            {icons[notification.type] || icons.info}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                                {notification.title}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300 break-words leading-relaxed">
                                {notification.message}
                            </p>
                        </div>
                        <button
                            onClick={() => removeNotification(notification.id)}
                            className="p-1 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors shrink-0"
                        >
                            <X size={14} className="text-gray-400" />
                        </button>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
