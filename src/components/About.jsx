import React, { useEffect, useState } from 'react';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Section from './Section';

const Counter = ({ value, label, suffix = "" }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const end = parseFloat(value);
            const duration = 2000;
            const incrementTime = 20;
            const step = end / (duration / incrementTime);

            const timer = setInterval(() => {
                start += step;
                if (start >= end) {
                    setCount(end);
                    clearInterval(timer);
                } else {
                    setCount(start);
                }
            }, incrementTime);
            return () => clearInterval(timer);
        }
    }, [isInView, value]);

    return (
        <div ref={ref} className="text-center p-6 bg-slate-800/50 rounded-2xl border border-slate-700 hover:border-sky-500/50 transition-colors">
            <div className="text-4xl md:text-5xl font-bold text-sky-400 mb-2 font-mono">
                {Math.floor(count)}{suffix}
            </div>
            <div className="text-slate-400 text-sm font-medium uppercase tracking-wider">{label}</div>
        </div>
    );
};

export default function About() {
    return (
        <Section id="about" className="bg-slate-900">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Bio */}
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        About <span className="text-sky-400">Me</span>
                    </h2>
                    <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                        I am a Computer Science Engineering graduate and a Product & Platform Operations Engineer. I design integrations, automation workflows, and full-stack applications to improve user experience and operational efficiency.
                    </p>
                    <div className="space-y-4 text-slate-400">
                        <p>
                            With a strong foundation in full-stack development and operational strategy, I bridge the gap between technical implementation and business goals. My work focuses on building scalable systems that solve real-world problems.
                        </p>
                        <p>
                            Currently, I'm focused on <span className="text-white font-medium">MicroCoach</span>, exploring how technology can democratize personal development through micro-learning.
                        </p>
                    </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4">
                    <Counter value="85" suffix="%" label="Automation Success" />
                    <Counter value="60" suffix="%" label="Reduction in Manual Work" />
                    <Counter value="99.8" suffix="%" label="Data Accuracy" />
                    <Counter value="1500" suffix="+" label="Users Impacted" />
                </div>
            </div>
        </Section>
    );
}
