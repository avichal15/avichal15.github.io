import React from 'react';
import { motion } from 'framer-motion';

// JSX member expressions (<motion.div>) are not tracked by no-unused-vars,
// so bind the animated wrapper to a capitalized identifier.
const MotionDiv = motion.div;

export default function Section({ id, children, className = "" }) {
    return (
        <section id={id} className={`py-20 md:py-32 relative ${className}`}>
            <MotionDiv
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
            >
                {children}
            </MotionDiv>
        </section>
    );
}
