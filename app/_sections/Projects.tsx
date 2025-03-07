import {useState, useEffect} from "react";
import {motion} from "framer-motion";
import {useInView} from "react-intersection-observer";
import axios from "axios";
import Image from "next/image";

const GITHUB_USERNAME = "nayel9"; // Remplace par ton pseudo GitHub
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;

interface Project {
    id: number;
    name: string;
    description: string;
    html_url: string;
}

export default function Projects() {
    const {ref, inView} = useInView({triggerOnce: true, threshold: 0.2});
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get(GITHUB_API_URL, {
                    headers: {
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
                    },
                });
                const filteredProjects = response.data.filter((project: Project) =>
                    !project.name.toLowerCase().includes("component") &&
                    !project.name.toLowerCase().includes("portfolio")
                );
                setProjects(filteredProjects);
            } catch (error) {
                console.error("Erreur lors de la récupération des projets GitHub", error);
            }
        };

        fetchProjects();
    }, []);

    return (
        <section id="projects" ref={ref} className="py-20 px-6 text-gray-900 dark:text-white">
            <motion.h2
                initial={{opacity: 0, y: -30}}
                animate={inView ? {opacity: 1, y: 0} : {opacity: 0, y: -30}}
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
                        animate={inView ? {opacity: 1, scale: 1} : {opacity: 0, scale: 0.8}}
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
                        <p className="text-sm text-gray-700 dark:text-gray-200 mt-2">{project.description || "Pas de description disponible."}</p>
                        <a
                            href={project.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block  text-xl mt-4 text-green-600 hover:text-green-800"
                        >
                            Voir sur GitHub
                        </a>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}