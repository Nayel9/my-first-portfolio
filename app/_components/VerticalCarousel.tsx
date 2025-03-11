import React, {useEffect, useRef} from 'react';
import gsap from 'gsap';
import Image from "next/image";

interface Project {
    id: number;
    name: string;
    description: string;
    html_url: string;
    demo_url?: string;
}

interface CarouselProps {
    projects: Project[];
}

const VerticalCarousel: React.FC<CarouselProps> = ({projects}) => {
    // Référence du conteneur du carrousel
    const containerRef = useRef<HTMLDivElement>(null);
    // Objet de rotation pour GSAP (rotationZ)
    const rotation = useRef({value: 0}).current;
    // Pour gérer les gestes tactiles
    const touchStartY = useRef<number>(0);
    const touchStartRotation = useRef<number>(0);

    // Fonction d'animation générale pour mettre à jour la rotation
    const animateRotation = (newRotation: number, duration: number = 0.5) => {
        gsap.to(rotation, {
            value: newRotation,
            duration: duration,
            ease: 'power2.out',
            overwrite: 'auto',
            onUpdate: () => {
                if (containerRef.current) {
                    containerRef.current.style.transform = `rotateX(0deg) rotateY(90deg) rotateZ(${rotation.value}deg)`;
                }
            },
        });
    };

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;


        // Gestion des événements tactiles pour mobile
        const handleTouchStart = (e: TouchEvent) => {
            touchStartY.current = e.touches[0].clientY;
            touchStartRotation.current = rotation.value;
        };

        const handleTouchMove = (e: TouchEvent) => {
            const deltaY = e.touches[0].clientY - touchStartY.current;
            // Ajuster la sensibilité pour le tactile
            const newRotation = touchStartRotation.current + deltaY * 0.5;
            animateRotation(newRotation, 0.1);
        };

        container.addEventListener('touchstart', handleTouchStart, {passive: true});
        container.addEventListener('touchmove', handleTouchMove, {passive: true});

        return () => {
            container.removeEventListener('touchstart', handleTouchStart);
            container.removeEventListener('touchmove', handleTouchMove);
        };
    }, [animateRotation]);

    const getCardTransform = (index: number, totalCards: number): string => {
        const angle = (360 / totalCards) * index;
        const radius = ((360 / 2) / Math.tan(Math.PI / totalCards)) * 1.4;
        // Transformation de base conforme au design
        return `rotate(${angle}deg) translate(${radius}px) rotateY(-90deg) rotateX(0deg)`;
    };

    return (
        <div className="md:h-full w-full flex md:items-center md:hidden mt-10 h-[700px] overflow-hidden">
            <div
                ref={containerRef}
                className="w-[1200px] h-[1300px] flex items-center justify-center rounded-full"
                style={{
                    transformStyle: 'preserve-3d',
                    transform: 'rotateX(0deg) rotateY(90deg)',
                    // perspective: '2000px',
                } as React.CSSProperties}
            >
                {projects.map((project, index) => {
                    const transformStyle = getCardTransform(index, projects.length);
                    return (
                        <div
                            key={project.id}
                            className="absolute bg-gray-100 dark:bg-gray-900 p-2 rounded-lg shadow-lg hover:shadow-xl h-[460px] w-[360px] flex flex-col justify-center items-center cursor-pointer"
                            style={{
                                backfaceVisibility: 'hidden',
                                transform: transformStyle,
                            }}
                        >
                            <Image
                                src={`/${project.name}.png`}
                                alt={project.name}
                                width={500}
                                height={500}
                                className="w-full h-1/2 object-top object-cover rounded-t-lg mb-4"
                            />
                            <div className="flex w-full h-auto p-6 flex-col flex-grow justify-between text-gray-700 dark:text-gray-200">
                                <div>
                                    <h3 className="text-2xl font-semibold">{project.name}</h3>
                                    <p className="text-sm  mt-2 overflow-hidden text-ellipsis whitespace-nowrap">
                                        {project.description || "Pas de description disponible."}
                                    </p>
                                </div>
                                <div className="flex flex-row justify-between">
                                    <a
                                        href={project.html_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block text-xl mt-4 text-green-600 hover:text-green-800"
                                    >
                                        Voir sur GitHub
                                    </a>
                                    {project.demo_url && (
                                        <a
                                            href={project.demo_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-block text-xl mt-4 text-amber-600 hover:text-amber-800"
                                        >
                                            Demo
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

        </div>

    );
};

export default VerticalCarousel;
