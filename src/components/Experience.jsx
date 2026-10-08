import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import Section from './Section';

// JSX member expressions (<motion.div>) are not tracked by no-unused-vars,
// so bind the animated wrapper to a capitalized identifier.
const MotionDiv = motion.div;

const ExperienceItem = ({ role, company, date, bullets, index }) => (
    <MotionDiv
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.2 }}
        viewport={{ once: true }}
        className="relative pl-8 md:pl-0"
    >
        {/* Timeline Line (Desktop: Center, Mobile: Left) */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-slate-700 -translate-x-1/2" />
        <div className="md:hidden absolute left-0 top-0 bottom-0 w-px bg-slate-700" />

        {/* Timeline Dot */}
        <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-sky-500 rounded-full border-4 border-slate-900 -translate-x-[7px] md:-translate-x-1/2 mt-1.5 z-10" />

        <div className={`md:flex items-center justify-between ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} group`}>
            <div className="md:w-5/12" />
            <div className="md:w-5/12 mb-8 md:mb-0">
                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-sky-500/50 transition-colors shadow-lg relative group-hover:-translate-y-1 duration-300">
                    <div className="flex items-center gap-2 mb-2 text-sky-400">
                        <Briefcase size={16} />
                        <span className="text-xs font-bold uppercase tracking-wider">{date}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">{company}</h3>
                    <h4 className="text-base font-medium text-slate-300 mb-4">{role}</h4>
                    <ul className="space-y-2">
                        {bullets.map((bullet, i) => (
                            <li key={i} className="text-slate-400 text-sm flex items-start gap-2">
                                <span className="w-1.5 h-1.5 bg-sky-500 rounded-full mt-1.5 shrink-0" />
                                {bullet}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    </MotionDiv>
);

export default function Experience() {
    const experiences = [
        {
            role: "Associate – Product & Platform Operations",
            company: "Medi Study Go",
            date: "Jun 2025 – Present",
            bullets: [
                "Coordinated 50+ scrums, achieving 95% issue-resolution rate",
                "Owned onboarding workflows; reduced friction by 35%",
                "Built 15+ operational dashboards with 70% visibility improvement",
                "Implemented customer engagement automations for 1,500+ users"
            ]
        },
        // Adding inferred/placeholder based on typical grad profile if needed, 
        // but USER provided only one specific experience block.
        // I will stick to what was provided exactly.
    ];

    return (
        <Section id="experience" className="bg-slate-900">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-16 text-center">
                Professional <span className="text-sky-400">Experience</span>
            </h2>
            <div className="space-y-12 relative">
                {experiences.map((exp, index) => (
                    <ExperienceItem key={index} {...exp} index={index} />
                ))}
            </div>
        </Section>
    );
}
