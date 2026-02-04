import { useState } from 'react';
import { motion } from 'framer-motion';

const SKILLS_DATA = {
    Frontend: [
        { name: 'React', level: 90 },
        { name: 'Next.js', level: 85 },
        { name: 'Tailwind CSS', level: 95 },
        { name: 'Framer Motion', level: 80 },
    ],
    Backend: [
        { name: 'Node.js', level: 85 },
        { name: 'Express', level: 80 },
        { name: 'MongoDB', level: 75 },
        { name: 'PostgreSQL', level: 70 },
    ],
    Mobile: [
        { name: 'React Native', level: 85 },
        { name: 'Flutter', level: 60 },
    ],
};

export default function SkillsApp() {
    const [activeTab, setActiveTab] = useState('Frontend');

    return (
        <div className="flex flex-col h-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-slate-900 dark:text-white">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
                <h1 className="text-2xl font-bold">My Skills</h1>
            </div>

            {/* Tabs */}
            <div className="flex p-2 gap-2 overflow-x-auto">
                {Object.keys(SKILLS_DATA).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === tab
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-6">
                    {SKILLS_DATA[activeTab].map((skill, index) => (
                        <SkillBar key={skill.name} skill={skill} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function SkillBar({ skill, index }) {
    return (
        <div className="space-y-1">
            <div className="flex justify-between text-sm font-medium">
                <span>{skill.name}</span>
                <span>{skill.level}%</span>
            </div>
            <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                />
            </div>
        </div>
    );
}
