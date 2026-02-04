import { useOSStore } from '@/store/useOSStore';
import { Image as ImageIcon, Monitor, RotateCcw } from 'lucide-react';

const WALLPAPERS = [
    { id: 1, name: 'Mountain', url: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2670&auto=format&fit=crop' },
    { id: 2, name: 'Desert', url: 'https://images.unsplash.com/photo-1682687982501-1e58ab814714?q=80&w=2670&auto=format&fit=crop' },
    { id: 3, name: 'Ocean', url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=2674&auto=format&fit=crop' },
    { id: 4, name: 'Abstract', url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop' },
];

export default function SettingsApp() {
    const { wallpaper, setWallpaper } = useOSStore();

    const handleReset = () => {
        window.location.reload();
    };

    return (
        <div className="flex flex-col h-full bg-gray-50 dark:bg-slate-900 text-slate-900 dark:text-white overflow-hidden">
            <div className="flex-1 overflow-y-auto p-6">
                <h1 className="text-2xl font-bold mb-6">Settings</h1>

                {/* Wallpaper Section */}
                <section className="mb-8">
                    <h2 className="text-sm font-bold uppercase text-gray-500 mb-4 flex items-center gap-2">
                        <ImageIcon size={16} /> Wallpaper
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        {WALLPAPERS.map((wp) => (
                            <button
                                key={wp.id}
                                onClick={() => setWallpaper(wp.url)}
                                className={`relative aspect-video rounded-xl overflow-hidden border-2 transition-all ${wallpaper === wp.url ? 'border-blue-500 shadow-lg scale-105' : 'border-transparent opacity-80 hover:opacity-100'
                                    }`}
                            >
                                <img src={wp.url} alt={wp.name} className="w-full h-full object-cover" />
                                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs py-1 px-2">
                                    {wp.name}
                                </div>
                            </button>
                        ))}
                    </div>
                </section>

                {/* System Section */}
                <section>
                    <h2 className="text-sm font-bold uppercase text-gray-500 mb-4 flex items-center gap-2">
                        <Monitor size={16} /> System
                    </h2>
                    <div className="space-y-2">
                        <button
                            onClick={handleReset}
                            className="w-full bg-white dark:bg-slate-800 p-4 rounded-xl flex items-center justify-between hover:bg-red-50 dark:hover:bg-red-900/20 group transition-colors"
                        >
                            <span className="font-medium group-hover:text-red-500 transition-colors">Restart System</span>
                            <RotateCcw size={18} className="text-gray-400 group-hover:text-red-500" />
                        </button>
                        <div className="text-xs text-center text-gray-400 mt-4">
                            OS Version 1.0.0 • Built with Next.js
                        </div>
                    </div>
                </section>

                {/* Spacer for mobile nav */}
                <div className="h-12 md:h-0" />
            </div>
        </div>
    );
}
