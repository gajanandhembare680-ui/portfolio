'use client';

import { useState, useEffect } from 'react';

export default function AdminPage() {
    const [authorized, setAuthorized] = useState(false);
    const [messages, setMessages] = useState([]);
    const [secret, setSecret] = useState('');
    const [error, setError] = useState('');

    const fetchMessages = async (key) => {
        try {
            const res = await fetch(`/api/contact?secret=${key}`);
            const data = await res.json();

            if (data.success) {
                setMessages(data.data);
                setAuthorized(true);
                setError('');
            } else {
                setError('Invalid Secret');
            }
        } catch (e) {
            setError('Failed to fetch');
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        fetchMessages(secret);
    };

    if (!authorized) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
                <form onSubmit={handleLogin} className="flex flex-col gap-4 p-8 border border-slate-700 rounded-xl">
                    <h1 className="text-xl font-bold">Admin Access</h1>
                    <input
                        type="password"
                        value={secret}
                        onChange={(e) => setSecret(e.target.value)}
                        placeholder="Enter Secret Code"
                        className="px-4 py-2 bg-slate-800 rounded border border-slate-700 underline-none focus:border-blue-500"
                    />
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button type="submit" className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500">Access</button>
                </form>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-8 text-slate-900 dark:text-white">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Messages ({messages.length})</h1>

                <div className="grid gap-4">
                    {messages.map((msg) => (
                        <div key={msg._id} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h2 className="font-bold text-lg">{msg.name}</h2>
                                    <p className="text-sm text-gray-500">{msg.email}</p>
                                </div>
                                <span className="text-xs text-gray-400">
                                    {new Date(msg.date).toLocaleDateString()} {new Date(msg.date).toLocaleTimeString()}
                                </span>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 mt-4 whitespace-pre-wrap">{msg.message}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
