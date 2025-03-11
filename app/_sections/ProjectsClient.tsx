"use client";

import React from "react";
import {motion} from "framer-motion";
import Carousel from "@/app/_components/Carousel";

interface Project {
    id: number;
    name: string;
    description: string;
    html_url: string;
    demo_url?: string;
}

export default function ProjectsClient({projects}: { projects: Project[] }) {
    return (
        <section id="projects" className="py-20 px-6 text-gray-900 dark:text-white">
            <motion.h2
                initial={{opacity: 0, y: -30}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
                transition={{duration: 0.6}}
                className="text-4xl font-bold text-center mb-0"
            >
                Mes Projets
            </motion.h2>
            <motion.div
                initial={{opacity: 0, y: 60}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
                transition={{duration: 0.6, delay: 0.2}}
                >
                <Carousel projects={projects}/>
            </motion.div>
        </section>
    );
}
