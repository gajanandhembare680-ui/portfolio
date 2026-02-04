import { useState, useEffect, useRef } from 'react';
import { Send, User, Loader2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GuestbookApp() {
    const [entries, setEntries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [form, setForm] = useState({ name: '', message: '' });
    const scrollRef = useRef(null);

    // Fetch entries on mount
    useEffect(() => {
        fetchEntries();
    }, []);

    const fetchEntries = async () => {
        try {
            const res = await fetch('/api/guestbook');
            const data = await res.json();
            if (data.success) {
                setEntries(data.data);
            } else {
                setError('Failed to load entries');
            }
        } catch (err) {
            setError('Connection failed');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name.trim() || !form.message.trim()) return;

        setIsSubmitting(true);
        try {
            const res = await fetch('/api/guestbook', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            const data = await res.json();

            if (data.success) {
                setEntries([data.data, ...entries]); // Add new entry to top
                setForm({ name: '', message: '' });
                // scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                setError(data.error || 'Failed to sign guestbook');
            }
        } catch (err) {
            setError('Failed to send message');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col h-full bg-slate-900/90 text-white backdrop-blur-md">
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-slate-900">
                <div>
                    <h2 className="text-xl font-bold">Guestbook</h2>
                    <p className="text-xs text-slate-400">Leave a mark on the portfolio!</p>
                </div>
                <div className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-400 border border-white/5">
                    {entries.length} messages
                </div>
            </div>

            {/* Error Banner */}
            {error && (
                <div className="bg-red-500/10 text-red-400 p-2 text-sm text-center border-b border-red-500/20 flex items-center justify-center gap-2">
                    <AlertCircle size={14} /> {error}
                </div>
            )}

            {/* Messages List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center h-40 text-slate-500 gap-2">
                        <Loader2 className="animate-spin" />
                        <span className="text-sm">Loading thoughts...</span>
                    </div>
                ) : (
                    <AnimatePresence initial={false}>
                        {entries.map((entry) => (
                            <motion.div
                                key={entry._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/5 hover:bg-white/10 transition-colors"
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-[10px] font-bold">
                                        {entry.name[0]?.toUpperCase()}
                                    </div>
                                    <span className="font-medium text-sm text-blue-200">{entry.name}</span>
                                    <span className="text-xs text-slate-500 ml-auto">
                                        {new Date(entry.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                                    {entry.message}
                                </p>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                )}

                {!isLoading && entries.length === 0 && (
                    <div className="text-center text-slate-500 py-10">
                        No messages yet. Be the first!
                    </div>
                )}
            </div>

            {/* Input Form */}
            <div className="p-4 bg-slate-900 border-t border-white/10">
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                        type="text"
                        placeholder="Your Name"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        className="bg-slate-800 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                        disabled={isSubmitting}
                        maxLength={50}
                    />
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Write a message..."
                            value={form.message}
                            onChange={e => setForm({ ...form, message: e.target.value })}
                            className="flex-1 bg-slate-800 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                            disabled={isSubmitting}
                            maxLength={200}
                        />
                        <button
                            type="submit"
                            disabled={isSubmitting || !form.name || !form.message}
                            className="bg-blue-600 hover:bg-blue-500 text-white rounded-lg px-4 py-2 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
