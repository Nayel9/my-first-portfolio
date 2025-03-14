"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import profile from "@/public/profile.jpg";
import { useInView } from "react-intersection-observer";
import { FaReact, FaJsSquare, FaHtml5, FaCss3Alt, FaGitAlt, FaNpm } from 'react-icons/fa';
import { SiTypescript, SiNextdotjs } from 'react-icons/si';
import { useTranslation } from "next-i18next";

const skills = [
    { name: "React", icon: FaReact, className: "text-cyan-600 dark:text-[#61DBFB]" },
    { name: "JavaScript", icon: FaJsSquare, className: "text-[#F0DB4F]" },
    { name: "TypeScript", icon: SiTypescript, className: "text-[#3178c6]" },
    { name: "Next.js", icon: SiNextdotjs, className: "text-gray-900" },
    { name: "HTML5", icon: FaHtml5, className: "text-[#E34F26]" },
    { name: "CSS3", icon: FaCss3Alt, className: "text-[#1572B6]" },
    { name: "GIT", icon: FaGitAlt, className: "text-[#F05032]" },
    { name: "NPM", icon: FaNpm, className: "text-[#CB3837]" },
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function About() {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
    const { t } = useTranslation('common');

    return (
        <section id="about" ref={ref} className="py-20 px-6 text-gray-900 dark:text-white">
            <motion.h2
                initial={{ opacity: 0, y: -30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
                transition={{ duration: 0.8 }}
                className="text-4xl font-bold text-center"
            >
                {t('about.title')}
            </motion.h2>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="mt-4 text-lg text-center max-w-3xl mx-auto text-gray-600 dark:text-gray-300"
            >
                {t('about.description')}
            </motion.p>
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: 0.15 }}
                className="mt-6 flex justify-center"
            >
                <Image
                    src={profile}
                    alt="Profile picture"
                    className="w-40 h-40 rounded-full shadow-lg border-4 border-green-700 dark:border-gray-900 object-cover"
                />
            </motion.div>

            {/* Skills subsection */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="mt-12"
            >
                <motion.h3 variants={itemVariants} className="text-3xl font-bold text-center mb-6">
                    {t('about.skillsTitle')}
                </motion.h3>
                <motion.div
                    variants={containerVariants}
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
                >
                    {skills.map((skill) => {
                        const Icon = skill.icon;
                        return (
                            <motion.div
                                key={skill.name}
                                variants={itemVariants}
                                className={`flex flex-col items-center font-bold dark:bg-transparent ${skill.className || "text-gray-700 dark:text-gray-200"} p-4 rounded-lg shadow-md`}
                            >
                                <Icon size={64} className={`mb-2 ${skill.className || ""}`} />
                                <span className="text-sm">{skill.name}</span>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </motion.div>
        </section>
    );
}
