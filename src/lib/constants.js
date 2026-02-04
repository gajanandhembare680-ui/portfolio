import {
    Brain,
    Briefcase,
    Gamepad2,
    User,
    FileText,
    Settings,
    Mail,
    History
} from 'lucide-react';

export const APPS = [
    {
        id: 'skills',
        name: 'Skills',
        icon: Brain,
        color: 'bg-blue-500',
    },
    {
        id: 'projects',
        name: 'Projects',
        icon: Briefcase,
        color: 'bg-emerald-500',
    },
    {
        id: 'playground',
        name: 'Playground',
        icon: Gamepad2,
        color: 'bg-purple-500',
    },
    {
        id: 'resume',
        name: 'Resume',
        icon: FileText,
        color: 'bg-orange-500',
    },
    {
        id: 'contact',
        name: 'Contact',
        icon: Mail,
        color: 'bg-green-500',
    },
    {
        id: 'settings',
        name: 'Settings',
        icon: Settings,
        color: 'bg-gray-500',
    },
    {
        id: 'changelog',
        name: 'System Updates',
        icon: History,
        color: 'bg-slate-700',
    },
];
