import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Send, CheckCircle, Mail, Linkedin, Github } from 'lucide-react';
import Section from './Section';

// JSX member expressions (<motion.div>) are not tracked by no-unused-vars,
// so bind the animated wrappers to capitalized identifiers.
const MotionDiv = motion.div;
const MotionForm = motion.form;

export default function Contact() {
    const [formState, setFormState] = useState({ name: '', email: '', purpose: 'Project', message: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => {
            setIsSubmitted(true);
            setFormState({ name: '', email: '', purpose: 'Project', message: '' });
            setTimeout(() => setIsSubmitted(false), 5000); // Reset after 5s
        }, 1000);
    };

    const handleChange = (e) => setFormState({ ...formState, [e.target.name]: e.target.value });

    return (
        <Section id="contact" className="bg-slate-900 overflow-hidden">
            <div className="max-w-4xl mx-auto relative">
                {/* Background Decorative */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-[80px] -z-10" />

                <div className="md:flex gap-12 items-start">
                    {/* Contact Info */}
                    <div className="md:w-1/3 mb-10 md:mb-0">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            Let's <span className="text-sky-400">Connect</span>
                        </h2>
                        <p className="text-slate-300 mb-8">
                            Open to full-stack development roles and interesting projects.
                        </p>

                        <div className="space-y-6">
                            <a href="mailto:avichalgoyal15@gmail.com" className="flex items-center gap-4 text-slate-300 hover:text-white transition-colors group">
                                <div className="p-3 bg-slate-800 rounded-lg group-hover:bg-sky-500/20 group-hover:text-sky-400 transition-colors">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">Email</div>
                                    <div className="font-medium">avichalgoyal15@gmail.com</div>
                                </div>
                            </a>

                            <a href="https://www.linkedin.com/in/avichalgoyal007/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-slate-300 hover:text-white transition-colors group">
                                <div className="p-3 bg-slate-800 rounded-lg group-hover:bg-blue-600/20 group-hover:text-blue-500 transition-colors">
                                    <Linkedin size={20} />
                                </div>
                                <div>
                                    <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">LinkedIn</div>
                                    <div className="font-medium">avichalgoyal007</div>
                                </div>
                            </a>

                            <a href="https://github.com/avichal15" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-slate-300 hover:text-white transition-colors group">
                                <div className="p-3 bg-slate-800 rounded-lg group-hover:bg-slate-700 hover:text-white transition-colors">
                                    <Github size={20} />
                                </div>
                                <div>
                                    <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">GitHub</div>
                                    <div className="font-medium">avichal15</div>
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="md:w-2/3 bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-xl relative overflow-hidden">
                        <AnimatePresence mode="wait">
                            {isSubmitted ? (
                                <MotionDiv
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="flex flex-col items-center justify-center py-12 text-center"
                                >
                                    <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-4">
                                        <CheckCircle size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                                    <p className="text-slate-400">Thanks for reaching out. I'll get back to you soon.</p>
                                    <button
                                        onClick={() => setIsSubmitted(false)}
                                        className="mt-6 px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                                    >
                                        Send another
                                    </button>
                                </MotionDiv>
                            ) : (
                                <MotionForm
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onSubmit={handleSubmit}
                                    className="space-y-6"
                                >
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            value={formState.name}
                                            onChange={handleChange}
                                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-hidden focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
                                            placeholder="Your Name"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            value={formState.email}
                                            onChange={handleChange}
                                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-hidden focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="purpose" className="block text-sm font-medium text-slate-300 mb-2">Purpose</label>
                                        <select
                                            id="purpose"
                                            name="purpose"
                                            value={formState.purpose}
                                            onChange={handleChange}
                                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-hidden focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
                                        >
                                            <option value="Project">Project Collaboration</option>
                                            <option value="Job">Job Opportunity</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            required
                                            rows={4}
                                            value={formState.message}
                                            onChange={handleChange}
                                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-hidden focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors resize-none"
                                            placeholder="How can I help you?"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                                    >
                                        Send Message
                                        <Send size={18} />
                                    </button>
                                </MotionForm>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </Section>
    );
}
