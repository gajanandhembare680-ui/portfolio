import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ArrowLeft, Layers, Zap } from 'lucide-react';

const PROJECTS_DATA = [
    {
        id: 1,
        title: 'E-commerce Platform',
        description: 'A full-stack marketplace with real-time inventory and Stripe payments.',
        tech: ['Next.js', 'Node.js', 'MongoDB', 'Stripe'],
        stats: { users: '1.2k+', uptime: '99.9%' },
        problem: 'Slow page loads caused 40% bounce rate.',
        solution: 'Implemented ISR and Optimistic UI updates.',
        result: 'Reduced load time to 0.8s, increasing conversion by 25%.',
        color: 'bg-emerald-500',
    },
    {
        id: 2,
        title: 'Fitness Tracker App',
        description: 'Mobile-first PWA for tracking workouts and nutrition plans.',
        tech: ['React', 'PWA', 'Firebase', 'Tailwind'],
        stats: { users: '500+', uptime: '99.5%' },
        problem: 'Users needed offline access in gyms.',
        solution: 'Used Service Workers and IndexedDB for local sync.',
        result: '100% offline functionality for core features.',
        color: 'bg-blue-500',
    },
    {
        id: 3,
        title: 'AI Code Assistant',
        description: 'VS Code extension that uses LLMs to refactor code automatically.',
        tech: ['TypeScript', 'Python', 'OpenAI API'],
        stats: { users: '5k+', uptime: '99.9%' },
        problem: 'Context window limits truncated large files.',
        solution: 'Implemented RAG (Retrieval Augmented Generation) pipeline.',
        result: 'Can now process entire codebases for context.',
        color: 'bg-purple-500',
    },
];

export default function ProjectsApp() {
    const [selectedProject, setSelectedProject] = useState(null);

    return (
        <div className="flex flex-col h-full bg-gray-50 dark:bg-slate-900 text-slate-900 dark:text-white">
            <AnimatePresence mode="wait">
                {selectedProject ? (
                    <ProjectDetail
                        key="detail"
                        project={selectedProject}
                        onBack={() => setSelectedProject(null)}
                    />
                ) : (
                    <ProjectList
                        key="list"
                        projects={PROJECTS_DATA}
                        onSelect={setSelectedProject}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

function ProjectList({ projects, onSelect }) {
    return (
        <div className="flex-1 overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Recent Projects</h1>
                <span className="text-sm text-gray-500">{projects.length} Apps</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        layoutId={`project-${project.id}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => onSelect(project)}
                        className="group cursor-pointer bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm hover:shadow-xl border border-gray-200 dark:border-gray-700 transition-all border-none"
                    >
                        <div className={`h-32 mb-4 rounded-xl ${project.color} flex items-center justify-center text-white text-4xl font-bold opacity-90 group-hover:opacity-100 transition-opacity`}>
                            {project.title.charAt(0)}
                        </div>
                        <h3 className="font-bold text-lg mb-1">{project.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{project.description}</p>

                        <div className="flex flex-wrap gap-2 mt-4">
                            {project.tech.slice(0, 3).map(t => (
                                <span key={t} className="px-2 py-1 text-[10px] uppercase tracking-wider font-semibold bg-gray-100 dark:bg-gray-700 rounded-md">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

function ProjectDetail({ project, onBack }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col h-full bg-white dark:bg-slate-900"
        >
            {/* Hero Header */}
            <div className={`relative h-48 ${project.color} text-white p-6 flex flex-col justify-end`}>
                <button
                    onClick={onBack}
                    className="absolute top-4 left-4 w-10 h-10 bg-black/20 hover:bg-black/40 rounded-full flex items-center justify-center backdrop-blur-md transition-colors"
                >
                    <ArrowLeft size={20} />
                </button>
                <motion.h1 layoutId={`project-${project.id}`} className="text-3xl font-bold mb-2">
                    {project.title}
                </motion.h1>
                <div className="flex gap-4 text-sm opacity-90 font-medium">
                    <span>⭐ {project.stats.users} Users</span>
                    <span>⚡ {project.stats.uptime} Uptime</span>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {/* Description */}
                <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                    {project.description}
                </p>

                {/* Tech Stack */}
                <div>
                    <h3 className="flex items-center gap-2 text-sm font-bold uppercase text-gray-500 tracking-wider mb-3">
                        <Layers size={16} /> Tech Stack
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {project.tech.map(t => (
                            <span key={t} className="px-3 py-1 text-sm bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-lg font-medium border border-blue-100 dark:border-blue-800">
                                {t}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Problem & Solution (The "Senior Dev" part) */}
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-5 border border-gray-100 dark:border-gray-700">
                    <h3 className="flex items-center gap-2 text-sm font-bold uppercase text-gray-500 tracking-wider mb-4">
                        <Zap size={16} /> Engineering Challenge
                    </h3>

                    <div className="space-y-4">
                        <div>
                            <span className="text-xs font-bold text-red-500 uppercase">Problem</span>
                            <p className="text-sm mt-1">{project.problem}</p>
                        </div>
                        <div>
                            <span className="text-xs font-bold text-green-500 uppercase">Solution</span>
                            <p className="text-sm mt-1">{project.solution}</p>
                        </div>
                        <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                            <span className="text-xs font-bold text-purple-500 uppercase">Result</span>
                            <p className="text-sm font-medium mt-1 text-gray-900 dark:text-white">{project.result}</p>
                        </div>
                    </div>
                </div>

                {/* Links */}
                <div className="flex gap-3 pt-4">
                    <button className="flex-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                        <Github size={18} /> View Code
                    </button>
                    <button className="flex-1 bg-blue-500 text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors">
                        <ExternalLink size={18} /> Live Demo
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
