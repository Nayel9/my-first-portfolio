"use client";

import React from "react";
import {motion} from "framer-motion";
import Image from "next/image";

interface Project {
    id: number;
    name: string;
    description: string;
    html_url: string;
}

export default function ProjectsClient({projects}: { projects: Project[] }) {
    return (
        <section id="projects" className="py-20 px-6 text-gray-900 dark:text-white">
            <motion.h2
                initial={{opacity: 0, y: -30}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
                transition={{duration: 0.6}}
                className="text-4xl font-bold text-center"
            >
                Mes Projets
            </motion.h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <motion.div
                        key={project.id}
                        initial={{opacity: 0, scale: 0.8}}
                        whileInView={{opacity: 1, scale: 1}}
                        viewport={{once: true}}
                        transition={{duration: 0.4, delay: 0.2}}
                        className="bg-gray-100 dark:bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-xl h-auto max-w-xl"
                    >
                        <Image
                            src={`/${project.name}.png`}
                            alt={project.name}
                            width={500}
                            height={500}
                            className="w-full h-64 object-top object-cover rounded-lg mb-4"
                        />
                        <h3 className="text-2xl font-semibold">{project.name}</h3>
                        <p className="text-sm text-gray-700 dark:text-gray-200 mt-2">
                            {project.description || "Pas de description disponible."}
                        </p>
                        <a
                            href={project.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block text-xl mt-4 text-green-600 hover:text-green-800"
                        >
                            Voir sur GitHub
                        </a>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
