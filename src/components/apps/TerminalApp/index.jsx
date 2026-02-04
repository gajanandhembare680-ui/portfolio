import { useState, useEffect, useRef } from 'react';
import useTerminal from '@/hooks/useTerminal';
import { Terminal as TerminalIcon } from 'lucide-react';

export default function TerminalApp() {
    const { history, cwd, processCommand } = useTerminal();
    const [input, setInput] = useState('');
    const inputRef = useRef(null);
    const bottomRef = useRef(null);

    // Auto-scroll to bottom on new history
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    // Keep focus on input
    useEffect(() => {
        const handleFocus = () => inputRef.current?.focus();
        window.addEventListener('click', handleFocus);
        return () => window.removeEventListener('click', handleFocus);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        processCommand(input);
        setInput('');
    };

    return (
        <div className="flex flex-col h-full bg-[#1a1b26] text-[#a9b1d6] font-mono text-sm md:text-base overflow-hidden">
            {/* Simple toolbar-like header (optional, mostly for aesthetic) */}
            <div className="h-8 bg-[#16161e] flex items-center px-4 gap-2 text-xs select-none border-b border-[#24283b]">
                <TerminalIcon size={12} className="text-[#7aa2f7]" />
                <span>guest@gajanan-os:~</span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-1" onClick={() => inputRef.current?.focus()}>
                {/* History */}
                {history.map((line, i) => (
                    <div key={i} className="break-words">
                        {line.type === 'command' ? (
                            <div className="flex gap-2 text-[#7aa2f7]">
                                <span className="text-[#9ece6a]">➜</span>
                                <span className="font-bold">{cwd}</span>
                                <span className="text-white">{line.content}</span>
                            </div>
                        ) : line.type === 'error' ? (
                            <div className="text-[#f7768e]">{line.content}</div>
                        ) : (
                            <div className="whitespace-pre-wrap text-[#c0caf5]">{line.content}</div>
                        )}
                    </div>
                ))}

                {/* Input Line */}
                <form onSubmit={handleSubmit} className="flex gap-2 items-center">
                    <span className="text-[#9ece6a]">➜</span>
                    <span className="font-bold text-[#7aa2f7] whitespace-nowrap">{cwd}</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-1 bg-transparent border-none outline-none text-white caret-[#9ece6a]"
                        autoFocus
                    />
                </form>

                <div ref={bottomRef} />
            </div>
        </div>
    );
}
