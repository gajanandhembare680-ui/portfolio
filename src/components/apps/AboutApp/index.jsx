import { motion } from 'framer-motion';
import { Briefcase, Users, Award, MapPin, Mail, Calendar, Code2, Heart, User as UserIcon, Sparkles, Star, Trophy } from 'lucide-react';
import useWindowSize from '@/hooks/useWindowSize';

export default function AboutApp() {
    const { width } = useWindowSize();
    const isMobile = width < 768;

    return isMobile ? <MobileLayout /> : <DesktopLayout />;
}

// Desktop Window-Style Layout
function DesktopLayout() {
    return (
        <div className="flex h-full bg-gradient-to-br from-gray-50 to-white dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-white">
            {/* Sidebar */}
            <div className="w-72 bg-gradient-to-b from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 border-r border-gray-200 dark:border-gray-700 p-6 shadow-xl">
                {/* Profile Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-6"
                >
                    {/* Profile Image with Glow */}
                    <div className="relative w-28 h-28 mx-auto mb-4">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-xl opacity-50 animate-pulse" />
                        <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-500 flex items-center justify-center text-white text-4xl font-bold shadow-2xl border-4 border-white dark:border-slate-700">
                            GD
                        </div>
                    </div>

                    <h2 className="font-bold text-xl mb-1 bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
                        Gajanan Dhembare
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Full Stack Developer</p>

                    {/* Status Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-full">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-xs font-medium text-green-700 dark:text-green-400">Available for Work</span>
                    </div>
                </motion.div>

                {/* Quick Stats */}
                <div className="space-y-3 mb-6">
                    <StatItem icon={Briefcase} label="Projects" value="15+" color="text-blue-500" bgColor="bg-blue-50 dark:bg-blue-900/20" />
                    <StatItem icon={Users} label="Clients" value="12+" color="text-purple-500" bgColor="bg-purple-50 dark:bg-purple-900/20" />
                    <StatItem icon={Award} label="Certifications" value="8+" color="text-emerald-500" bgColor="bg-emerald-50 dark:bg-emerald-900/20" />
                </div>

                {/* Contact Info */}
                <div className="pt-6 border-t border-gray-200 dark:border-gray-700 space-y-3">
                    <h3 className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400 tracking-wider mb-3">Contact Info</h3>
                    <ContactItem icon={MapPin} text="India" />
                    <ContactItem icon={Calendar} text="3+ Years Experience" />
                    <ContactItem icon={Mail} text="Open to Opportunities" />
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto">
                <div className="p-8 max-w-4xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
                            About Me
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400">Passionate developer crafting digital experiences</p>
                    </motion.div>

                    {/* Bio Section */}
                    <motion.section
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="mb-8 bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
                    >
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                                <UserIcon size={20} className="text-white" />
                            </div>
                            Introduction
                        </h2>
                        <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                            <p>
                                I'm a passionate <span className="font-semibold text-gray-900 dark:text-white">Full Stack Developer</span> with expertise in building modern web and mobile applications.
                                I specialize in creating scalable, user-friendly solutions using cutting-edge technologies like
                                <span className="font-semibold text-blue-600 dark:text-blue-400"> React, Next.js, Node.js,</span> and
                                <span className="font-semibold text-blue-600 dark:text-blue-400"> React Native</span>.
                            </p>
                            <p>
                                With over <span className="font-semibold text-gray-900 dark:text-white">3 years of experience</span>, I've successfully delivered
                                <span className="font-semibold text-gray-900 dark:text-white"> 15+ projects</span> for clients worldwide,
                                ranging from e-commerce platforms to mobile apps. I'm committed to writing clean, maintainable code
                                and staying updated with the latest industry trends.
                            </p>
                        </div>
                    </motion.section>

                    {/* What I Love */}
                    <motion.section
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mb-8 bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
                    >
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center">
                                <Heart size={20} className="text-white" />
                            </div>
                            What I Love
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            <LoveCard icon={Star} title="Problem Solving" description="Elegant solutions to complex challenges" gradient="from-blue-500 to-cyan-500" />
                            <LoveCard icon={Sparkles} title="Learning" description="Exploring new technologies daily" gradient="from-purple-500 to-pink-500" />
                            <LoveCard icon={Heart} title="User Experience" description="Creating delightful interfaces" gradient="from-red-500 to-orange-500" />
                            <LoveCard icon={Trophy} title="Collaboration" description="Building amazing products together" gradient="from-emerald-500 to-teal-500" />
                        </div>
                    </motion.section>

                    {/* Tech Stack */}
                    <motion.section
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
                    >
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                                <Code2 size={20} className="text-white" />
                            </div>
                            Core Technologies
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {['React', 'Next.js', 'Node.js', 'TypeScript', 'React Native', 'MongoDB', 'PostgreSQL', 'Tailwind CSS', 'Firebase', 'AWS'].map((tech) => (
                                <span
                                    key={tech}
                                    className="px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 text-blue-700 dark:text-blue-300 rounded-xl text-sm font-semibold border border-blue-200 dark:border-blue-800 hover:shadow-md hover:scale-105 transition-all cursor-default"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </motion.section>
                </div>
            </div>
        </div>
    );
}

// Mobile App-Style Layout
function MobileLayout() {
    return (
        <div className="flex flex-col h-full bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 text-slate-900 dark:text-white overflow-y-auto">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-cyan-500 via-blue-500 to-blue-600 text-white p-8 pb-90 overflow-hidden">
                {/* Decorative Circles */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative text-center z-10"
                >
                    {/* Profile Image with Glow - Larger Size */}
                    <div className="relative w-40 h-40 mx-auto mb-4">
                        <div className="absolute inset-0 bg-white/30 rounded-full blur-2xl animate-pulse" />
                        <div className="relative w-40 h-40 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/40 flex items-center justify-center overflow-hidden shadow-2xl">
                            <div className="w-full h-full bg-gradient-to-br from-cyan-400 via-blue-400 to-purple-400 flex items-center justify-center text-6xl font-bold">
                                GD
                            </div>
                        </div>
                    </div>

                    {/* Name & Title */}
                    <h1 className="text-3xl font-bold mb-2 drop-shadow-lg">Gajanan Dhembare</h1>
                    <p className="text-white/90 text-lg mb-4 drop-shadow">Full Stack Developer</p>

                    {/* Quick Info Pills */}
                    <div className="flex flex-wrap gap-2 justify-center">
                        <InfoPill icon={MapPin} text="India" />
                        <InfoPill icon={Calendar} text="3+ Years" />
                        <InfoPill icon={Sparkles} text="Available" />
                    </div>
                </motion.div>
            </div>

            {/* Stats Cards */}
            <div className="px-5 -mt-12 mb-6 relative z-20">
                <div className="grid grid-cols-3 gap-3">
                    <MobileStatCard icon={Briefcase} value="15+" label="Projects" gradient="from-blue-500 to-blue-600" />
                    <MobileStatCard icon={Users} value="12+" label="Clients" gradient="from-purple-500 to-purple-600" />
                    <MobileStatCard icon={Award} value="8+" label="Certs" gradient="from-emerald-500 to-emerald-600" />
                </div>
            </div>

            {/* Content Cards */}
            <div className="px-5 pb-8 space-y-5">
                {/* About Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-gray-700"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg">
                            <UserIcon className="text-white" size={24} />
                        </div>
                        <h2 className="text-xl font-bold">About Me</h2>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                        I'm a passionate <span className="font-semibold text-gray-900 dark:text-white">Full Stack Developer</span> specializing in
                        <span className="font-semibold text-blue-600 dark:text-blue-400"> React, Next.js, Node.js,</span> and
                        <span className="font-semibold text-blue-600 dark:text-blue-400"> React Native</span>.
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        With <span className="font-semibold text-gray-900 dark:text-white">3+ years</span> of experience, I've delivered
                        <span className="font-semibold text-gray-900 dark:text-white"> 15+ projects</span> for clients worldwide.
                    </p>
                </motion.div>

                {/* What I Love Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-gray-700"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center shadow-lg">
                            <Heart className="text-white" size={24} />
                        </div>
                        <h2 className="text-xl font-bold">What I Love</h2>
                    </div>
                    <div className="space-y-3">
                        <MobileLoveItem icon={Star} title="Problem Solving" gradient="from-blue-500 to-cyan-500" />
                        <MobileLoveItem icon={Sparkles} title="Learning New Tech" gradient="from-purple-500 to-pink-500" />
                        <MobileLoveItem icon={Heart} title="User Experience" gradient="from-red-500 to-orange-500" />
                        <MobileLoveItem icon={Trophy} title="Team Collaboration" gradient="from-emerald-500 to-teal-500" />
                    </div>
                </motion.div>

                {/* Tech Stack Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-gray-700"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg">
                            <Code2 className="text-white" size={24} />
                        </div>
                        <h2 className="text-xl font-bold">Technologies</h2>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {['React', 'Next.js', 'Node.js', 'TypeScript', 'React Native', 'MongoDB'].map((tech) => (
                            <span
                                key={tech}
                                className="px-3 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 text-blue-700 dark:text-blue-300 rounded-xl text-sm font-semibold border border-blue-200 dark:border-blue-800"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

// Helper Components
function StatItem({ icon: Icon, label, value, color, bgColor }) {
    return (
        <div className={`flex items-center gap-3 p-4 ${bgColor} rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow`}>
            <div className={`w-11 h-11 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center ${color} shadow-sm`}>
                <Icon size={20} />
            </div>
            <div className="flex-1">
                <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">{label}</div>
                <div className="text-lg font-bold">{value}</div>
            </div>
        </div>
    );
}

function ContactItem({ icon: Icon, text }) {
    return (
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Icon size={16} className="text-gray-400 dark:text-gray-500" />
            <span>{text}</span>
        </div>
    );
}

function LoveCard({ icon: Icon, title, description, gradient }) {
    return (
        <div className="p-5 bg-gradient-to-br from-gray-50 to-white dark:from-slate-900 dark:to-slate-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all group">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform`}>
                <Icon size={20} className="text-white" />
            </div>
            <h3 className="font-bold mb-2 text-sm">{title}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{description}</p>
        </div>
    );
}

function InfoPill({ icon: Icon, text }) {
    return (
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
            <Icon size={14} />
            <span className="text-sm font-medium">{text}</span>
        </div>
    );
}

function MobileStatCard({ icon: Icon, value, label, gradient }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-xl text-center border border-gray-100 dark:border-gray-700"
        >
            <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}>
                <Icon className="text-white" size={20} />
            </div>
            <div className="text-2xl font-bold mb-1">{value}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">{label}</div>
        </motion.div>
    );
}

function MobileLoveItem({ icon: Icon, title, gradient }) {
    return (
        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-900 rounded-xl">
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center shadow-md shrink-0`}>
                <Icon size={16} className="text-white" />
            </div>
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{title}</span>
        </div>
    );
}
