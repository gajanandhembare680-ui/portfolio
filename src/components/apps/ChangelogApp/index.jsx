import { History, Star, Zap, Layout, Command, Cpu } from 'lucide-react';

const VERSIONS = [
    {
        version: '1.1.0',
        date: 'February 4, 2026',
        title: 'The "Pro" Update',
        description: 'Major system architecture upgrade focusing on performance and power-user features.',
        features: [
            { icon: Command, text: 'Spotlight Search (Ctrl + K)' },
            { icon: Layout, text: 'Advanced Window Manager (Drag, Snap, Resize)' },
            { icon: Zap, text: 'Lazy Loading Architecture for 50% faster boot' },
            { icon: Cpu, text: 'System Notifications & Toasts' },
        ],
        tags: ['Performance', 'UX']
    },
    {
        version: '1.0.0',
        date: 'January 25, 2026',
        title: 'Genesis',
        description: 'Initial release of the Portfolio OS.',
        features: [
            { icon: Star, text: 'Desktop Environment in Browser' },
            { icon: Layout, text: 'Functional Dock & App Grid' },
            { icon: Cpu, text: 'Resume & Project Apps' },
        ],
        tags: ['Release']
    }
];

export default function ChangelogApp() {
    return (
        <div className="h-full bg-white dark:bg-slate-900 flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-slate-900/50 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-700 flex items-center justify-center text-white shadow-lg">
                        <History size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">System Updates</h1>
                        <p className="text-sm text-gray-500">Track the evolution of this OS</p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {VERSIONS.map((v, i) => (
                    <div key={v.version} className="relative pl-8 before:absolute before:left-[11px] before:top-2 before:bottom-[-32px] before:w-[2px] before:bg-gray-100 dark:before:bg-gray-800 last:before:hidden">
                        {/* Timeline Dot */}
                        <div className="absolute left-0 top-2 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-500 flex items-center justify-center z-10">
                            <div className="w-2 h-2 rounded-full bg-blue-500" />
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-baseline justify-between">
                                <h2 className="text-xl font-bold flex items-center gap-3 text-gray-900 dark:text-white">
                                    v{v.version}
                                    <span className="text-sm font-normal text-gray-400">({v.date})</span>
                                </h2>
                                <div className="flex gap-2">
                                    {v.tags.map(tag => (
                                        <span key={tag} className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-[10px] uppercase font-bold text-gray-500 tracking-wider">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-gray-50 dark:bg-slate-800/50 rounded-2xl p-5 border border-gray-100 dark:border-gray-700/50 hover:shadow-sm transition-shadow">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">{v.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                                    {v.description}
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {v.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white dark:hover:bg-slate-700/50 transition-colors">
                                            <div className="text-blue-500">
                                                <feature.icon size={18} />
                                            </div>
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                {feature.text}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                <div className="pt-8 text-center">
                    <p className="text-xs text-gray-400 uppercase tracking-widest">End of timeline</p>
                </div>
            </div>
        </div>
    );
}
