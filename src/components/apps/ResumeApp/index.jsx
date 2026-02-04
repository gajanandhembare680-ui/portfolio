import { Download, FileText, Check } from 'lucide-react';
import { useState } from 'react';

export default function ResumeApp() {
    const [downloading, setDownloading] = useState(false);
    const [downloaded, setDownloaded] = useState(false);

    const handleDownload = () => {
        setDownloading(true);
        // Simulate download delay
        setTimeout(() => {
            setDownloading(false);
            setDownloaded(true);
            setTimeout(() => setDownloaded(false), 3000);
        }, 1500);
    };

    return (
        <div className="flex flex-col h-full bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white overflow-hidden">
            {/* Toolbar */}
            <div className="h-14 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6 shadow-sm z-10">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-300">
                    <FileText size={18} />
                    <span>Gajanan_Dhembare_Resume.pdf</span>
                </div>

                <button
                    onClick={handleDownload}
                    disabled={downloading}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-white transition-all ${downloaded ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'
                        } ${downloading ? 'opacity-70 cursor-wait' : ''}`}
                >
                    {downloading ? (
                        <>Downloading...</>
                    ) : downloaded ? (
                        <> <Check size={16} /> Downloaded </>
                    ) : (
                        <> <Download size={16} /> Download PDF </>
                    )}
                </button>
            </div>

            {/* Resume Preview */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8 flex justify-center bg-gray-200 dark:bg-gray-950/50">
                <div className="w-full max-w-3xl bg-white text-slate-800 shadow-2xl min-h-[1000px] p-8 md:p-12 text-sm md:text-base origin-top transform transition-transform">
                    {/* Header */}
                    <div className="border-b-2 border-slate-800 pb-6 mb-8 flex justify-between items-end">
                        <div>
                            <h1 className="text-4xl font-black uppercase tracking-tight mb-2">Gajanan Dhembare</h1>
                            <p className="font-semibold text-slate-500">Full Stack Web & Mobile Developer</p>
                        </div>
                        <div className="text-right text-xs md:text-sm text-slate-600 space-y-1">
                            <p>contact@gajanan.dev</p>
                            <p>+91 98765 43210</p>
                            <p>github.com/gajanan</p>
                        </div>
                    </div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Left Column */}
                        <div className="md:col-span-2 space-y-8">
                            <section>
                                <h2 className="text-xl font-bold uppercase border-b border-gray-300 pb-2 mb-4">Experience</h2>
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="font-bold text-lg">Senior Web Developer</h3>
                                        <p className="text-slate-500 text-sm italic mb-2">TechCorp Solutions • 2023 - Present</p>
                                        <ul className="list-disc list-outside ml-4 space-y-1 text-slate-700">
                                            <li>Architected a scalable e-commerce platform serving 10k+ daily users.</li>
                                            <li>Reduced API response times by 40% using Redis caching strategies.</li>
                                            <li>Led a team of 4 junior developers, conducting code reviews and mentoring.</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">Mobile App Developer</h3>
                                        <p className="text-slate-500 text-sm italic mb-2">AppStudio • 2021 - 2023</p>
                                        <ul className="list-disc list-outside ml-4 space-y-1 text-slate-700">
                                            <li>Developed cross-platform mobile apps using React Native.</li>
                                            <li>Implemented offline-first architecture for remote data synchronization.</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold uppercase border-b border-gray-300 pb-2 mb-4">Projects</h2>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between items-baseline">
                                            <h3 className="font-bold">Mobile OS Portfolio</h3>
                                            <span className="text-xs bg-slate-200 px-2 py-0.5 rounded text-slate-600">Next.js</span>
                                        </div>
                                        <p className="text-slate-700 mt-1">Interactive portfolio mimicking a mobile operating system with window management.</p>
                                    </div>
                                    <div>
                                        <div className="flex justify-between items-baseline">
                                            <h3 className="font-bold">SaaS Dashboard</h3>
                                            <span className="text-xs bg-slate-200 px-2 py-0.5 rounded text-slate-600">React</span>
                                        </div>
                                        <p className="text-slate-700 mt-1">Analytics dashboard with D3.js visualizations and real-time data.</p>
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-8">
                            <section>
                                <h2 className="text-xl font-bold uppercase border-b border-gray-300 pb-2 mb-4">Skills</h2>
                                <div className="space-y-3">
                                    <div>
                                        <h4 className="font-bold text-sm text-slate-500 mb-1">Languages</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {['JavaScript', 'TypeScript', 'Python', 'SQL'].map(s => (
                                                <span key={s} className="bg-slate-100 px-2 py-1 rounded text-xs font-medium">{s}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm text-slate-500 mb-1">Frontend</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {['React', 'Next.js', 'Tailwind', 'Framer Motion', 'Redux'].map(s => (
                                                <span key={s} className="bg-slate-100 px-2 py-1 rounded text-xs font-medium">{s}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm text-slate-500 mb-1">Backend</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Firebase'].map(s => (
                                                <span key={s} className="bg-slate-100 px-2 py-1 rounded text-xs font-medium">{s}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-xl font-bold uppercase border-b border-gray-300 pb-2 mb-4">Education</h2>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="font-bold text-sm">BCA (Computer Applications)</h3>
                                        <p className="text-xs text-slate-500 mb-1">University of Technology</p>
                                        <p className="text-xs text-slate-400">2023 - Present</p>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
