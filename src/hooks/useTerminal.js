import { useState, useCallback } from 'react';
import { useOSStore } from '@/store/useOSStore';

const FILE_SYSTEM = {
    '~': {
        type: 'dir',
        children: {
            'projects': { type: 'dir', children: {} },
            'skills': { type: 'dir', children: {} },
            'about.md': {
                type: 'file',
                content: `Hi, I'm Gajanan! \nI'm a Full Stack Developer passionate about building interactive experiences.\nCheck out my projects to see what I can do.`
            },
            'contact.txt': {
                type: 'file',
                content: 'Email: contact@gajanan.dev\nPhone: +91 98765 43210\nGitHub: github.com/gajanan'
            },
            'secret.txt': {
                type: 'file',
                content: 'You found the secret! 🕵️‍♂️\nTry typing "matrix" for a surprise.'
            }
        }
    },
    '~/projects': {
        type: 'dir',
        children: {
            'readme.md': { type: 'file', content: 'Type "open projects" to see the GUI version.' }
        }
    },
    '~/skills': {
        type: 'dir',
        children: {
            'frontend.txt': { type: 'file', content: 'React, Next.js, Tailwind, Redux, Three.js' },
            'backend.txt': { type: 'file', content: 'Node.js, Express, MongoDB, PostgreSQL, Python' }
        }
    }
};

export default function useTerminal() {
    const { openApp } = useOSStore();
    const [history, setHistory] = useState([
        { type: 'output', content: 'Welcome to Gajanan OS v1.0.0' },
        { type: 'output', content: 'Type "help" to see available commands.' }
    ]);
    const [cwd, setCwd] = useState('~');

    const addToHistory = (cmd, output, type = 'output') => {
        setHistory(prev => [...prev, { type: 'command', content: cmd }, { type, content: output }]);
    };

    const processCommand = useCallback((cmd) => {
        const trimmedCmd = cmd.trim();
        if (!trimmedCmd) return;

        const parts = trimmedCmd.split(' ');
        const command = parts[0].toLowerCase();
        const args = parts.slice(1);

        switch (command) {
            case 'help':
                setHistory(prev => [
                    ...prev,
                    { type: 'command', content: trimmedCmd },
                    { type: 'output', content: 'Available commands:\n  help      - Show this help message\n  ls        - List directory contents\n  cd <dir>  - Change directory\n  cat <file>- Read file content\n  clear     - Clear screen\n  open <app>- Open a GUI app (projects, resume, contact)\n  whoami    - Print current user' }
                ]);
                break;

            case 'clear':
                setHistory([]);
                break;

            case 'ls': {
                const currentDir = FILE_SYSTEM[cwd];
                const contents = Object.keys(currentDir.children || {}).join('  ');
                addToHistory(trimmedCmd, contents || '(empty)');
                break;
            }

            case 'cd': {
                const target = args[0];
                if (!target || target === '~') {
                    setCwd('~');
                    addToHistory(trimmedCmd, '');
                    return;
                }
                if (target === '..') {
                    // Simple parent logic for MVP (only goes back to ~)
                    setCwd('~');
                    addToHistory(trimmedCmd, '');
                    return;
                }

                // Check if simple child dir
                const path = cwd === '~' ? `~/${target}` : `${cwd}/${target}`;
                if (FILE_SYSTEM[path]) {
                    setCwd(path);
                    addToHistory(trimmedCmd, '');
                } else {
                    addToHistory(trimmedCmd, `cd: no such directory: ${target}`, 'error');
                }
                break;
            }

            case 'cat': {
                const filename = args[0];
                if (!filename) {
                    addToHistory(trimmedCmd, 'Usage: cat <filename>', 'error');
                    return;
                }

                const currentDir = FILE_SYSTEM[cwd];
                const file = currentDir.children?.[filename];

                if (file && file.type === 'file') {
                    addToHistory(trimmedCmd, file.content);
                } else {
                    addToHistory(trimmedCmd, `cat: ${filename}: No such file`, 'error');
                }
                break;
            }

            case 'whoami':
                addToHistory(trimmedCmd, 'guest');
                break;

            case 'open':
                const appName = args[0];
                if (!appName) {
                    addToHistory(trimmedCmd, 'Usage: open <app_name>', 'error');
                    return;
                }

                // Map common names to IDs if needed, or just pass simple ID
                const validApps = ['projects', 'skills', 'contact', 'resume', 'settings', 'playground'];
                if (validApps.includes(appName.toLowerCase())) {
                    openApp(appName.toLowerCase());
                    addToHistory(trimmedCmd, `Opening ${appName}...`);
                } else {
                    addToHistory(trimmedCmd, `App '${appName}' not found. Try: ${validApps.join(', ')}`, 'error');
                }
                break;

            default:
                addToHistory(trimmedCmd, `Command not found: ${command}`, 'error');
        }
    }, [cwd, openApp]);

    return {
        history,
        cwd,
        processCommand
    };
}
