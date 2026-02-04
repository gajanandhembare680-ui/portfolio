import { useRef } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { useOSStore } from '@/store/useOSStore';
import { Minimize2, Maximize2, X } from 'lucide-react';
import useWindowSize from '@/hooks/useWindowSize';

export default function Window({ id, children }) {
    const { windows, focusApp, closeApp, minimizeApp, toggleMaximize, updateWindowPosition } = useOSStore();
    const { width } = useWindowSize();
    const isMobile = width < 768;
    const winState = windows[id];

    // Drag controls to restricts dragging to header
    const dragControls = useDragControls();

    if (!winState || !winState.isOpen) return null;

    const isMaximized = winState.isMaximized;

    return (
        <motion.div
            drag={!isMobile && !isMaximized} // Disable drag on mobile OR if maximized
            dragListener={false}
            dragControls={dragControls}
            dragMomentum={false}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
                opacity: 1,
                scale: 1,
                // If Maximized OR Mobile: Force 0,0 position. Else use stored position.
                x: (isMobile || isMaximized) ? 0 : winState.position?.x || 0,
                y: (isMobile || isMaximized) ? 0 : winState.position?.y || 0,
                // If Maximized: Force full width/height. If Mobile: Force fixed full. 
                width: isMobile ? '100%' : (isMaximized ? '100%' : 800),
                height: isMobile ? 'calc(100% - 5rem)' : (isMaximized ? 'calc(100% - 2rem)' : 600), // Match top-8 (2rem) + bottom-12 (3rem) for mobile
            }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
            transition={{ type: "spring", damping: 30, stiffness: 350 }}
            onDragEnd={(_, info) => {
                if (isMaximized) return; // Don't update pos if maximized
                updateWindowPosition(id, {
                    x: (winState.position?.x || 0) + info.offset.x,
                    y: (winState.position?.y || 0) + info.offset.y
                });
            }}
            style={{ zIndex: winState.zIndex }}
            className={`absolute flex flex-col overflow-hidden bg-white dark:bg-slate-900 shadow-2xl border border-gray-200 dark:border-gray-700 pointer-events-auto
                ${isMobile || isMaximized
                    ? 'top-8 left-0 right-0 bottom-12 rounded-t-xl fixed !w-full border-0' // Fixed full screen minus status bar (top-8) and nav bar (bottom-12)
                    : 'rounded-xl' // Default desktop window look
                }
            `}
            onPointerDown={() => focusApp(id)}
        >
            {/* Window Header */}
            <div
                className="h-10 bg-gray-100 dark:bg-gray-800 flex items-center justify-between px-4 select-none cursor-default touch-none shrink-0"
                onPointerDown={(e) => {
                    focusApp(id);
                    if (!isMobile && !isMaximized) dragControls.start(e);
                }}
                onDoubleClick={() => !isMobile && toggleMaximize(id)}
            >
                <div className="flex gap-2 group">
                    <button
                        onClick={(e) => { e.stopPropagation(); closeApp(id); }}
                        className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-[8px] text-transparent group-hover:text-black/50 transition-colors"
                    >
                        <X size={6} />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); minimizeApp(id); }}
                        className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center text-[8px] text-transparent group-hover:text-black/50 transition-colors"
                    >
                        <Minimize2 size={6} />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); toggleMaximize(id); }}
                        className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center text-[8px] text-transparent group-hover:text-black/50 transition-colors"
                    >
                        <Maximize2 size={6} />
                    </button>
                </div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-widest pointer-events-none">
                    {id}
                </div>
                <div className="w-10" />
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden relative">
                {children}
            </div>
        </motion.div>
    );
}
