// app/_sections/ProjectsServer.tsx (Server Component)
import React from "react";
import ProjectsClient from "@/app/_components/ProjectsClient";


// Déclare l'interface du projet
interface Project {
    id: number;
    name: string;
    description: string;
    html_url: string;
    demo_url?: string;
}

// Ta fonction de fetch SSR
async function fetchProjects(): Promise<Project[]> {
    const GITHUB_USERNAME = "nayel9";
    const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;

    // fetch côté serveur
    const res = await fetch(GITHUB_API_URL, {
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        },
        // Optionnel : si tu veux mettre en cache / revalider
        next: {revalidate: 60},
    });

    if (!res.ok) {
        throw new Error(`Erreur de fetch GitHub: ${res.status}`);
    }

    const data: Project[] = await res.json();

    // Ajouter la demo_url
    return await Promise.all(
        data.map(async (project) => {
            const DEMO_API_URL = `https://api.github.com/repos/${GITHUB_USERNAME}/${project.name}/pages`;

            try {
                const demoRes = await fetch(DEMO_API_URL, {
                    headers: {
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
                    },
                });

                if (demoRes.ok) {
                    const demoData = await demoRes.json();
                    project.demo_url = demoData.html_url;
                }
            } catch (error) {
                console.error(`Erreur lors de la récupération de la démo ${project.name}:`, error);
            }
            return project;
        })
    );
}

export default async function ProjectsServer() {
    // On récupère les projets côté serveur
    const projects = await fetchProjects();
    // On délègue le rendu et l'animation à un composant client
    return <ProjectsClient projects={projects}/>;
}
