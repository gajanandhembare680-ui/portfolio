import {
    Brain,
    Briefcase,
    Gamepad2,
    User,
    FileText,
    Settings,
    Mail,
    Book,
    History,
    Terminal
} from 'lucide-react';

// All apps sorted alphabetically for app drawer
export const APPS = [
    {
        id: 'about',
        name: 'About',
        icon: User,
        color: 'bg-cyan-500',
    },
    {
        id: 'changelog',
        name: 'Changelog',
        icon: History,
        color: 'bg-slate-700',
    },
    {
        id: 'contact',
        name: 'Contact',
        icon: Mail,
        color: 'bg-green-500',
    },
    {
        id: 'guestbook',
        name: 'Guestbook',
        icon: Book,
        color: 'bg-indigo-500',
    },
    {
        id: 'playground',
        name: 'Playground',
        icon: Gamepad2,
        color: 'bg-purple-500',
    },
    {
        id: 'projects',
        name: 'Projects',
        icon: Briefcase,
        color: 'bg-emerald-500',
    },
    {
        id: 'resume',
        name: 'Resume',
        icon: FileText,
        color: 'bg-orange-500',
    },
    {
        id: 'settings',
        name: 'Settings',
        icon: Settings,
        color: 'bg-gray-500',
    },
    {
        id: 'skills',
        name: 'Skills',
        icon: Brain,
        color: 'bg-blue-500',
    },
    {
        id: 'terminal',
        name: 'Terminal',
        icon: Terminal,
        color: 'bg-slate-900',
    },
];

// Key apps to show on mobile desktop (bottom of screen) - same as desktop pinned
export const DESKTOP_APPS = ['resume', 'skills', 'projects', 'contact', 'about'];
