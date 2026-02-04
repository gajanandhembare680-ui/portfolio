import { useState, useEffect } from 'react';
import { Send, Mail, User, MessageSquare, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOSStore } from '@/store/useOSStore';

export default function ContactApp() {
    const { registerBackHandler, unregisterBackHandler } = useOSStore();
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    // Register Back Handler to reset form if in success/error state
    useEffect(() => {
        if (status === 'success' || status === 'error') {
            registerBackHandler('contact', () => {
                setStatus('idle');
                setFormData({ name: '', email: '', message: '' }); // Optional: clear form
                return true;
            });
        } else {
            unregisterBackHandler('contact');
        }
        return () => unregisterBackHandler('contact');
    }, [status, registerBackHandler, unregisterBackHandler]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setStatus('success');
            } else {
                throw new Error('Failed to send');
            }
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-gray-50 dark:bg-slate-900">
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6"
                >
                    <CheckCircle size={40} />
                </motion.div>
                <h2 className="text-2xl font-bold mb-2 dark:text-white">Message Sent!</h2>
                <p className="text-gray-500 mb-8 max-w-sm">
                    Thanks for reaching out, {formData.name}. I'll get back to you as soon as possible.
                </p>
                <button
                    onClick={() => {
                        setStatus('idle');
                        setFormData({ name: '', email: '', message: '' });
                    }}
                    className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold transition-colors"
                >
                    Send Another
                </button>
            </div>
        );
    }

    return (
        <div className="h-full overflow-y-auto bg-gray-50 dark:bg-slate-900 p-4 md:p-8">
            <div className="max-w-2xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2 dark:text-white">Get in Touch</h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        Have a project in mind or just want to say hi? Fill out the form below.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:text-white"
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:text-white"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Message</label>
                        <div className="relative">
                            <MessageSquare className="absolute left-4 top-4 text-gray-400" size={18} />
                            <textarea
                                required
                                rows={6}
                                value={formData.message}
                                onChange={e => setFormData({ ...formData, message: e.target.value })}
                                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none dark:text-white"
                                placeholder="Tell me about your project..."
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="flex-1 md:flex-none px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {status === 'loading' ? (
                                <>
                                    <Loader2 size={20} className="animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                <>
                                    Send Message
                                    <Send size={18} />
                                </>
                            )}
                        </button>

                        {status === 'error' && (
                            <span className="text-red-500 flex items-center gap-2 text-sm font-medium">
                                <AlertCircle size={16} />
                                Failed to send. Please try again.
                            </span>
                        )}
                    </div>
                </form>

                {/* Direct Contact Info */}
                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-500">
                    <div>
                        <span className="block font-semibold text-gray-900 dark:text-gray-200 mb-1">Email directly</span>
                        <a href="mailto:contact@gajanan.dev" className="hover:text-blue-500 transition-colors">contact@gajanan.dev</a>
                    </div>
                </div>
            </div>
            {/* Bottom spacer for mobile nav */}
            <div className="h-20 md:h-0" />
        </div>
    );
}
