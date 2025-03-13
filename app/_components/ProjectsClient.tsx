"use client";

import React from "react";
import {motion} from "framer-motion";
import Carousel from "./Carousel";
import {Button} from "@/components/ui/button";
import Loader from "@/components/ui/loader";

const MotionButton = motion(Button);

interface Project {
    id: number;
    name: string;
    description: string;
    html_url: string;
    demo_url?: string;
}

export default function ProjectsClient({projects}: { projects: Project[] }) {
    const [isStudy, setIsStudy] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {

        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    // Filtrer les projets selon le mode
    const filteredProjects = projects.filter((project) =>
        isStudy
            ? project.name.toLowerCase().includes("opc") &&
            !project.name.toLowerCase().includes("component")
            : project.name.toLowerCase().includes("")
    );

    return (
        <section id="projects" className="py-10 px-6 text-gray-900 dark:text-white">
            <motion.h2
                initial={{opacity: 0, y: -30}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
                transition={{duration: 0.6}}
                className="text-4xl font-bold text-center mb-1"
            >
                Mes Projets
            </motion.h2>
            <div className="flex justify-center">
                <MotionButton
                    onClick={() => {
                        setIsLoading(true);
                        setIsStudy(!isStudy);
                        setTimeout(() => {
                            setIsLoading(false);
                        }, 1000);
                    }}
                    initial={{opacity: 0, x: -80}}
                    whileInView={{opacity: 1, x: 0}}
                    viewport={{once: true}}
                    whileHover={{scale: 1.05, boxShadow: "0px 0px 8px rgba(0,0,0,0.3)"}}
                    transition={{duration: 0.6, type: "spring", stiffness: 300}}
                    className="place-items-center bg-green-700 hover:bg-green-800 text-white mt-10"
                >
                    {isStudy
                        ? "Afficher tous les projets"
                        : "Afficher les projets formations"}
                </MotionButton>
            </div>
            <motion.div
                initial={{opacity: 0, y: 60}}
                animate={isLoading ? {opacity: 1, y: 0} : {opacity: 1, y: 0}}
                viewport={{once: true}}
                transition={{duration: 0.2, delay: 0}}
            >
                {isLoading ? <Loader/> : <Carousel key={isStudy ? "study" : "pro"} projects={filteredProjects}/>}
            </motion.div>
        </section>
    );
}