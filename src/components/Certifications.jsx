import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';
import Section from './Section';

// JSX member expressions (<motion.a>) are not tracked by no-unused-vars,
// so bind the animated wrapper to a capitalized identifier.
const MotionLink = motion.a;

export default function Certifications() {
    const certs = [
        {
            name: "Data Structures & Algorithms (Java)",
            issuer: "Apna College",
            date: "Jan 2023 – Jun 2023",
            link: "https://drive.google.com/file/d/1XW-d99bUjhoESE_QPKTfft6neT_WcdFQ/view"
        },
        {
            name: "Foundations of Business Intelligence",
            issuer: "Google / Coursera",
            date: "Apr 2024 – May 2024",
            link: "https://www.coursera.org/account/accomplishments/verify/GD9A2LQJSAG2"
        }
    ];

    return (
        <Section id="certifications" className="bg-slate-900">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
                Certifications
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {certs.map((cert, index) => (
                    <MotionLink
                        key={index}
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-4 p-6 bg-slate-800 rounded-xl border border-slate-700 hover:border-sky-500/50 hover:bg-slate-800/80 transition-all group"
                    >
                        <div className="p-3 bg-sky-500/10 rounded-lg text-sky-400 group-hover:text-sky-300 group-hover:scale-110 transition-transform">
                            <Award size={24} />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-white group-hover:text-sky-400 transition-colors">
                                {cert.name}
                            </h3>
                            <p className="text-sm text-slate-400">{cert.issuer} • {cert.date}</p>
                        </div>
                        <ExternalLink size={18} className="text-slate-500 group-hover:text-white transition-colors" />
                    </MotionLink>
                ))}
            </div>
        </Section>
    );
}
