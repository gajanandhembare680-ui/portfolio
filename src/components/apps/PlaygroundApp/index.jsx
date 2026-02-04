import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Code, Image as ImageIcon, Check, WifiOff, LogOut } from 'lucide-react';

const DEMOS = [
    { id: 'auth', name: 'JWT Auth', icon: Lock, color: 'bg-red-500' },
    { id: 'api', name: 'API Tester', icon: Code, color: 'bg-blue-500' },
    { id: 'upload', name: 'File Upload', icon: ImageIcon, color: 'bg-purple-500' },
];

export default function PlaygroundApp() {
    const [activeDemo, setActiveDemo] = useState(null);

    return (
        <div className="flex flex-col h-full bg-gray-50 dark:bg-slate-900 text-slate-900 dark:text-white">
            <AnimatePresence mode="wait">
                {activeDemo ? (
                    <div key="demo" className="flex flex-col h-full">
                        <button
                            onClick={() => setActiveDemo(null)}
                            className="p-4 text-sm font-bold text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                            ← Back to Demos {activeDemo && `/ ${activeDemo}`}
                        </button>
                        <div className="flex-1 p-4 md:p-8 overflow-y-auto">
                            {activeDemo === 'auth' && <AuthDemo />}
                            {activeDemo !== 'auth' && (
                                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                    <Code size={48} className="mb-4 opacity-50" />
                                    <p className="font-medium">Demo Under Construction</p>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div key="list" className="flex-1 p-6 overflow-y-auto">
                        <h1 className="text-2xl font-bold mb-6">Interactive Playground</h1>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {DEMOS.map((demo) => (
                                <motion.button
                                    key={demo.id}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setActiveDemo(demo.id)}
                                    className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm hover:shadow-lg border border-gray-200 dark:border-gray-700 transition-all flex flex-col items-center gap-3"
                                >
                                    <div className={`w-12 h-12 ${demo.color} rounded-full flex items-center justify-center text-white`}>
                                        <demo.icon size={24} />
                                    </div>
                                    <span className="font-semibold text-sm">{demo.name}</span>
                                </motion.button>
                            ))}
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

function AuthDemo() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('demo@example.com');
    const [password, setPassword] = useState('password');
    const [status, setStatus] = useState(null); // 'success', 'error'

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        // Fake API Call
        setTimeout(() => {
            setLoading(false);
            if (email && password.length > 5) {
                setUser({ name: 'Test User', email, token: 'eyJhbGciOiJIUzI1NiIsIn...' });
                setStatus('success');
            } else {
                setStatus('error');
            }
        }, 1500);
    };

    if (user) {
        return (
            <div className="max-w-md mx-auto bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-4 mb-6 text-green-500">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                        <Check size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white">Authenticated</h3>
                        <p className="text-xs">Session active</p>
                    </div>
                </div>

                <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg font-mono text-xs break-all text-gray-600 dark:text-gray-400 mb-6">
                    {user.token}
                </div>

                <button
                    onClick={() => setUser(null)}
                    className="w-full py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
                >
                    <LogOut size={18} /> Logout
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-sm mx-auto">
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl mx-auto flex items-center justify-center mb-4">
                    <Lock size={32} />
                </div>
                <h2 className="text-xl font-bold">JWT Authentication Demo</h2>
                <p className="text-sm text-gray-500 mt-2">Try logging in to receive a mock token.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
                <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 focus:border-blue-500 outline-none transition-colors"
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 focus:border-blue-500 outline-none transition-colors"
                    />
                </div>

                {status === 'error' && (
                    <div className="text-red-500 text-sm font-medium text-center">Invalid credentials. Try generic values.</div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <>Processing...</>
                    ) : (
                        <>Login & Get Token</>
                    )}
                </button>
            </form>
        </div>
    );
}
