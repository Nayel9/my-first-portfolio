// app/_sections/ProjectsServer.tsx (Server Component)
import React from "react";
import ProjectsClient from "./ProjectsClient";

// Déclare l'interface du projet
interface Project {
    id: number;
    name: string;
    description: string;
    html_url: string;
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
        next: { revalidate: 60 },
    });

    const data = await res.json();

    // Filtrer
    return data.filter((project: Project) =>
        !project.name.toLowerCase().includes("component") &&
        !project.name.toLowerCase().includes("portfolio")
    );
}

export default async function ProjectsServer() {
    // On récupère les projets côté serveur
    const projects = await fetchProjects();

    // On délègue le rendu et l'animation à un composant client
    return <ProjectsClient projects={projects}/>;
}
