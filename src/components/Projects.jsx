import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Github, ExternalLink, X, Layers, Database, Globe } from 'lucide-react';
import Section from './Section';

// JSX member expressions are not tracked by no-unused-vars,
// so bind the animated wrapper to a capitalized identifier.
const MotionDiv = motion.div;

const ProjectModal = ({ project, onClose }) => (
    <MotionDiv
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm"
        onClick={onClose}
    >
        <MotionDiv
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-700 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
        >
            <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-slate-700 hover:bg-slate-600 rounded-full text-white transition-colors"
            >
                <X size={20} />
            </button>

            <div className="p-8">
                <h3 className="text-3xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-sky-400 font-medium mb-6">{project.role}</p>

                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">System Architecture</h4>
                        {/* Animated Diagram Mockup */}
                        <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 aspect-video flex items-center justify-center relative overflow-hidden">
                            <MotionDiv
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="absolute top-4 left-4 p-3 bg-slate-800 rounded border border-slate-600 flex flex-col items-center"
                            >
                                <Globe size={24} className="text-blue-400 mb-1" />
                                <span className="text-[10px] text-slate-400">Client</span>
                            </MotionDiv>

                            <MotionDiv
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ delay: 0.5, duration: 1 }}
                                className="absolute w-20 h-[2px] bg-slate-600 top-16 left-24"
                            />

                            <MotionDiv
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                                className="p-4 bg-slate-800 rounded border border-slate-600 flex flex-col items-center z-10"
                            >
                                <Layers size={32} className="text-sky-400 mb-2" />
                                <span className="text-xs text-slate-300 font-mono">API Gateway</span>
                            </MotionDiv>

                            <MotionDiv
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ delay: 1.2, duration: 1 }}
                                className="absolute w-20 h-[2px] bg-slate-600 top-16 right-24"
                            />

                            <MotionDiv
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1.5 }}
                                className="absolute top-4 right-4 p-3 bg-slate-800 rounded border border-slate-600 flex flex-col items-center"
                            >
                                <Database size={24} className="text-green-400 mb-1" />
                                <span className="text-[10px] text-slate-400">DB</span>
                            </MotionDiv>
                        </div>
                        <p className="text-xs text-slate-500 mt-2 text-center">* Simplified Architecture Visualization</p>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Project Overview</h4>
                        <p className="text-slate-300 mb-6 leading-relaxed text-sm">
                            {project.summary}
                        </p>

                        <div className="mb-6">
                            <h5 className="text-sm font-semibold text-slate-400 mb-2">Tech Stack</h5>
                            <div className="flex flex-wrap gap-2">
                                {project.stack.map(tech => (
                                    <span key={tech} className="px-3 py-1 bg-slate-700/50 text-sky-300 text-xs rounded-full border border-slate-600">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-4">
                            {project.link && (
                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex-1 bg-sky-500 hover:bg-sky-600 text-white text-center py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                                    <ExternalLink size={18} />
                                    Launch Live App
                                </a>
                            )}
                            {project.github && (
                                <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex-1 bg-slate-700 hover:bg-slate-600 text-white text-center py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                                    <Github size={18} />
                                    View Code
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </MotionDiv>
    </MotionDiv>
);

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState(null);

    const projects = [
        {
            title: "MicroCoach",
            summary: "A personal micro-learning & coaching app with scheduling, progress tracking, and a mobile-first UI. Enables users to achieve goals through small, manageable daily tasks.",
            stack: ["React", "Node.js", "Express", "MongoDB", "Tailwind"],
            role: "Full-Stack Developer",
            link: "https://projectmicrocoach.netlify.app",
            github: null, // Assuming private or not provided, keeping safe
            featured: true
        },
        {
            title: "Unified CRM & Ecommerce Integration",
            summary: "Built integrations across Zoho CRM, Shopify, Amazon, Shiprocket, India Post & MediStudyGo app. Automated 20+ workflows and reduced manual work by 80%.",
            stack: ["APIs", "Deluge", "Webhooks", "Automation"],
            role: "Automation Engineer",
            link: null,
            github: null
        },
        {
            title: "SigmaGPT — AI Assistant",
            summary: "AI assistant supporting 1000+ concurrent chats with onboarding automation. Seamlessly handles customer queries and routes complex issues to human agents.",
            stack: ["OpenAI API", "Node.js", "MongoDB"],
            role: "Backend Developer",
            link: null,
            github: null
        },
        {
            title: "Weather App",
            summary: "Real-time weather lookup using API & React UI. Provides accurate forecasts with a clean, responsive interface.",
            stack: ["React", "WeatherAPI", "CSS"],
            role: "Frontend Developer",
            link: null,
            github: null
        },
        {
            title: "Cryptocurrency Price Tracker",
            summary: "Live crypto price dashboard with charts & alerts. Monitors market trends in real-time.",
            stack: ["React", "Chart.js", "CoinGecko API"],
            role: "Frontend Developer",
            link: null,
            github: null
        },
        {
            title: "Object Detection (TensorFlow)",
            summary: "ML object detection prototype for real-time detection. Identifies objects in video streams with high accuracy.",
            stack: ["Python", "TensorFlow", "OpenCV"],
            role: "ML Engineer",
            link: null,
            github: null
        }
    ];

    return (
        <Section id="projects" className="bg-slate-900">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
                Featured <span className="text-sky-400">Projects</span>
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                    <MotionDiv
                        key={index}
                        layoutId={`project-card-${index}`}
                        className={`group relative bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-sky-500/50 transition-all hover:shadow-2xl hover:shadow-sky-500/10 flex flex-col ${project.featured ? 'md:col-span-2 lg:col-span-2' : ''}`}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <div className="p-6 flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-bold text-white group-hover:text-sky-400 transition-colors">
                                    {project.title}
                                </h3>
                                {project.featured && (
                                    <span className="px-3 py-1 bg-sky-500/20 text-sky-300 text-xs font-bold rounded-full uppercase tracking-wider">
                                        Featured
                                    </span>
                                )}
                            </div>

                            <p className="text-slate-400 text-sm mb-6 flex-1">
                                {project.summary}
                            </p>

                            <div className="mt-auto">
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.stack.slice(0, 3).map(tech => (
                                        <span key={tech} className="text-xs text-slate-500 font-mono">#{tech}</span>
                                    ))}
                                    {project.stack.length > 3 && (
                                        <span className="text-xs text-slate-500 font-mono">+{project.stack.length - 3}</span>
                                    )}
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setSelectedProject(project)}
                                        className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium rounded-lg transition-colors"
                                    >
                                        View Details
                                    </button>
                                    {project.link && (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium rounded-lg transition-colors"
                                        >
                                            Live
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Hover Gradient Overlay */}
                        <div className="absolute inset-0 bg-linear-to-t from-sky-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    </MotionDiv>
                ))}
            </div>

            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
                )}
            </AnimatePresence>
        </Section>
    );
}
