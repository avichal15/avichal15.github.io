import React from 'react';
import { motion } from 'framer-motion';
import Section from './Section';

// JSX member expressions (<motion.div>) are not tracked by no-unused-vars,
// so bind the animated wrapper to a capitalized identifier.
const MotionDiv = motion.div;

const SkillBar = ({ skill, level, tooltip }) => (
    <div className="relative group mb-6">
        <div className="flex justify-between mb-1">
            <span className="text-base font-medium text-slate-200">{skill}</span>
            <span className="text-sm font-medium text-slate-400">{level}%</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2.5 overflow-hidden">
            <MotionDiv
                initial={{ width: 0 }}
                whileInView={{ width: `${level}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                viewport={{ once: true }}
                className="bg-sky-500 h-2.5 rounded-full group-hover:bg-sky-400 transition-colors"
            />
        </div>
        {/* Tooltip */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-slate-700">
            {tooltip}
        </div>
    </div>
);

export default function Skills() {
    const skills = {
        Frontend: [
            { name: "React.js", level: 90 },
            { name: "JavaScript", level: 90 },
            { name: "Tailwind CSS", level: 95 },
        ],
        Backend: [
            { name: "Node.js", level: 85 },
            { name: "Express.js", level: 85 },
            { name: "REST APIs", level: 90 },
        ],
        Databases: [
            { name: "MongoDB", level: 85 },
            { name: "SQL", level: 75 },
        ],
        "Integrations & Automation": [
            { name: "Zoho CRM", level: 90 },
            { name: "Make/Zapier (Webhooks)", level: 85 },
            { name: "Shopify API", level: 80 },
        ]
    };

    return (
        <Section id="skills" className="bg-slate-900">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
                Technical <span className="text-sky-400">Skills</span>
            </h2>

            {/* Visual Skills (Animated) */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {Object.entries(skills).map(([category, items]) => (
                    <div key={category} className="bg-slate-800/30 p-6 rounded-xl border border-slate-700/50">
                        <h3 className="text-xl font-semibold text-white mb-6 border-b border-slate-700 pb-2">{category}</h3>
                        {items.map((skill) => (
                            <SkillBar
                                key={skill.name}
                                skill={skill.name}
                                level={skill.level}
                                tooltip={`Proficiency in ${skill.name}`}
                            />
                        ))}
                    </div>
                ))}
            </div>

            {/* ATS-Friendly Plain Text (Hidden Visually) */}
            <div className="sr-only">
                <h3>Frontend Skills</h3>
                <ul>
                    <li>React.js</li>
                    <li>JavaScript</li>
                    <li>HTML</li>
                    <li>CSS</li>
                    <li>Tailwind</li>
                </ul>
                <h3>Backend Skills</h3>
                <ul>
                    <li>Node.js</li>
                    <li>Express.js</li>
                    <li>REST APIs</li>
                </ul>
                <h3>Databases</h3>
                <ul>
                    <li>MongoDB</li>
                    <li>SQL</li>
                </ul>
                <h3>Integrations & Automation</h3>
                <ul>
                    <li>Zoho CRM</li>
                    <li>Deluge</li>
                    <li>ManyChat</li>
                    <li>Shopify</li>
                    <li>Shiprocket</li>
                    <li>Webhooks</li>
                </ul>
                <h3>Other Skills</h3>
                <ul>
                    <li>Java</li>
                    <li>Python</li>
                    <li>TensorFlow</li>
                </ul>
                <h3>Soft Skills</h3>
                <ul>
                    <li>Teamwork</li>
                    <li>Problem solving</li>
                    <li>Product thinking</li>
                    <li>Operations</li>
                </ul>
            </div>
        </Section>
    );
}
