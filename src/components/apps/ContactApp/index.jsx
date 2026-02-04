import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { motion } from 'framer-motion';

const INITIAL_MESSAGES = [
    { id: 1, text: "Hi there! I'm Gajanan's AI assistant. 👋", sender: 'bot' },
    { id: 2, text: "What's your name?", sender: 'bot' },
];

export default function ContactApp() {
    const [messages, setMessages] = useState(INITIAL_MESSAGES);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef(null);

    const [formStep, setFormStep] = useState(0); // 0: Name, 1: Email, 2: Message, 3: Done

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        // User Message
        const userMsg = { id: Date.now(), text: input, sender: 'user' };
        setMessages((prev) => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Bot Response Logic
        // Bot Response Logic
        setTimeout(async () => {
            let botText = '';

            switch (formStep) {
                case 0:
                    botText = `Nice to meet you, ${userMsg.text}! What's your email so I can get back to you?`;
                    setFormStep(1);
                    break;
                case 1:
                    botText = "Got it. So, what's on your mind? (Project details, Hiring, or just saying hi?)";
                    setFormStep(2);
                    break;
                case 2:
                    botText = "Thanks! Sending your message...";
                    setFormStep(3);

                    // Extract data from history
                    // Simple logic: Assuming flow is standard
                    // Name is at messages[2] (User's first reply)
                    // Email is at messages[4] (User's second reply - assuming standard flow)
                    // But we can filter by 'user' sender for robustness
                    const userReplies = [...messages, userMsg].filter(m => m.sender === 'user');
                    const name = userReplies[0]?.text || "Unknown";
                    const email = userReplies[1]?.text || "no-email";
                    const message = userMsg.text;

                    try {
                        const res = await fetch('/api/contact', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ name, email, message }),
                        });

                        if (res.ok) {
                            botText = "Sent! 🚀 Gajanan will reply via email shortly.";
                        } else {
                            throw new Error('Failed');
                        }
                    } catch (err) {
                        botText = "Oops! Something went wrong. Please email directly at contact@gajanan.dev";
                    }
                    break;
                default:
                    botText = "I've already sent your info! Feel free to email directly at contact@gajanan.dev";
            }

            setMessages((prev) => [...prev, { id: Date.now() + 1, text: botText, sender: 'bot' }]);
            setIsTyping(false);
        }, 1000);
    };

    return (
        <div className="flex flex-col h-full bg-gray-50 dark:bg-slate-900 border-l border-r border-gray-200 dark:border-gray-800 mx-auto max-w-2xl w-full">
            {/* Messages Area */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 space-y-4"
            >
                {messages.map((msg) => (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={msg.id}
                        className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.sender === 'bot' ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-600'
                            }`}>
                            {msg.sender === 'bot' ? <Bot size={16} /> : <User size={16} />}
                        </div>
                        <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${msg.sender === 'bot'
                            ? 'bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-tl-none'
                            : 'bg-blue-500 text-white rounded-tr-none'
                            }`}>
                            {msg.text}
                        </div>
                    </motion.div>
                ))}

                {isTyping && (
                    <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                            <Bot size={16} />
                        </div>
                        <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-1">
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                        </div>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-4 bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-gray-700 flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 bg-gray-100 dark:bg-gray-900 border-none rounded-full px-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
                <button
                    type="submit"
                    disabled={!input.trim() || isTyping}
                    className="w-10 h-10 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-colors"
                >
                    <Send size={18} />
                </button>
            </form>
        </div>
    );
}
