import React, {useEffect, useRef} from 'react';
import gsap from 'gsap';
import Image from 'next/image';
import {motion} from 'framer-motion';
import VerticalCarousel from "@/app/_components/VerticalCarousel";
import {TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled} from "react-icons/tb";

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

// On définit ici les variants pour chaque carte sans délai individuel.
// Le délai sera géré par le parent via staggerChildren.
const cardVariants = {
    offscreen: (custom: { transform: string }) => ({
        opacity: 0,
        scale: 0.8,
        transform: `${custom.transform} translateY(-280px)`,
    }),
    onscreen: (custom: { transform: string }) => ({
        opacity: 1,
        scale: 1,
        transform: custom.transform,
        transition: {duration: 0.6, ease: 'easeInOut'},
    }),
};

const Carousel: React.FC<CarouselProps> = ({projects}) => {
    // Références pour le conteneur et pour chaque carte
    const containerRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Rotation globale gérée par GSAP
    const rotation = useRef({value: 0}).current;

    // Références pour les intervalles des boutons de contrôle
    const leftIntervalRef = useRef<number | null>(null);
    const rightIntervalRef = useRef<number | null>(null);

    // Pour gérer les gestes tactiles
    const touchStartX = useRef<number>(0);
    const touchStartRotation = useRef<number>(0);

    // Fonction d'animation globale de la rotation du conteneur
    const animateRotation = (newRotation: number, duration: number = 0.5) => {
        gsap.to(rotation, {
            value: newRotation,
            duration,
            ease: 'power2.out',
            overwrite: 'auto',
            onUpdate: () => {
                if (containerRef.current) {
                    containerRef.current.style.transform = `rotateX(-100deg) rotateZ(${rotation.value}deg)`;
                }
            },
        });
    };

    // Calcul du positionnement de chaque carte selon son index et le nombre total
    const getCardTransform = (index: number, totalCards: number): string => {
        const angle = (360 / totalCards) * index;
        const radius = ((280 / 2) / Math.tan(Math.PI / totalCards)) * 1.1;
        // Transformation de base conforme au design
        return `scale(1) rotate(${angle}deg) translate(${radius}px) rotate(90deg) rotateY(0deg) rotateX(90deg)`;
    };

    // Gestion des animations au survol
    const handleHover = (_event: React.MouseEvent<HTMLDivElement>, index: number) => {
        const card = cardRefs.current[index];
        if (card) {
            card.style.transform = `${card.dataset.initialTransform} scale(1.2) translateZ(50px) translateY(-50px) rotateY(0deg)`;
            card.style.transition = 'transform 0.3s ease-in-out';
            card.style.backfaceVisibility = 'visible';
        }
    };

    const handleLeave = (_event: React.MouseEvent<HTMLDivElement>, index: number) => {
        const card = cardRefs.current[index];
        if (card) {
            card.style.transform = card.dataset.initialTransform || '';
            card.style.transition = 'transform 0.4s ease-in-out';
            card.style.backfaceVisibility = 'hidden';
        }
    };

    // Gestion des interactions globales (roulette, clavier, tactile)
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            animateRotation(rotation.value - e.deltaY * 0.3);
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') animateRotation(rotation.value + 50);
            else if (e.key === 'ArrowRight') animateRotation(rotation.value - 50);
        };

        const handleTouchStart = (e: TouchEvent) => {
            touchStartX.current = e.touches[0].clientX;
            touchStartRotation.current = rotation.value;
        };

        const handleTouchMove = (e: TouchEvent) => {
            const deltaX = e.touches[0].clientX - touchStartX.current;
            animateRotation(touchStartRotation.current + deltaX * 0.5, 0.1);
        };

        container.addEventListener('wheel', handleWheel);
        window.addEventListener('keydown', handleKeyDown);
        container.addEventListener('touchstart', handleTouchStart, {passive: true});
        container.addEventListener('touchmove', handleTouchMove, {passive: true});

        return () => {
            container.removeEventListener('wheel', handleWheel);
            window.removeEventListener('keydown', handleKeyDown);
            container.removeEventListener('touchstart', handleTouchStart);
            container.removeEventListener('touchmove', handleTouchMove);
        };
    }, [animateRotation, rotation]);

    // Gestion de la rotation continue via les boutons Left/Right
    const handleLeftMouseDown = () => {
        if (leftIntervalRef.current !== null) return;
        leftIntervalRef.current = window.setInterval(() => {
            rotation.value += 10;
            animateRotation(rotation.value, 0.1);
        }, 50);
    };

    const handleLeftMouseUp = () => {
        if (leftIntervalRef.current !== null) {
            clearInterval(leftIntervalRef.current);
            leftIntervalRef.current = null;
        }
    };

    const handleRightMouseDown = () => {
        if (rightIntervalRef.current !== null) return;
        rightIntervalRef.current = window.setInterval(() => {
            rotation.value -= 10;
            animateRotation(rotation.value, 0.1);
        }, 50);
    };

    const handleRightMouseUp = () => {
        if (rightIntervalRef.current !== null) {
            clearInterval(rightIntervalRef.current);
            rightIntervalRef.current = null;
        }
    };

    return (
        <section className="h-screen flex flex-col items-center gap-4 overflow-hidden">
            {/* Conteneur parent qui déclenche l'animation dès l'entrée dans le viewport */}
            <motion.div
                initial="offscreen"
                whileInView="onscreen"
                viewport={{once: true, amount: 0}}
                variants={{
                    onscreen: {
                        transition: {
                            delayChildren: 0,
                            staggerChildren: 0.2
                        },
                    },
                }}
                className="relative h-3/5 w-full md:flex md:items-center md:justify-center hidden md:visible"
            >
                <div
                    ref={containerRef}
                    className="flex items-center w-full h-full justify-center"
                    style={{
                        transformStyle: 'preserve-3d',
                        transform: 'rotateX(-100deg) rotateZ(0deg)',
                    }}
                >
                    {projects.map((project, index) => {
                        const transformStyle = getCardTransform(index, projects.length);
                        return (
                            <motion.div
                                variants={cardVariants}
                                key={project.id}
                                custom={{transform: transformStyle}}
                                ref={(el) => {
                                    cardRefs.current[index] = el;
                                    if (el) {
                                        // Stocker la transformation de base pour les animations de survol
                                        el.dataset.initialTransform = transformStyle;
                                    }
                                }}
                                className="absolute bg-gray-100 dark:bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-xl w-[280px] h-[350px] max-w-xl flex flex-col cursor-pointer"
                                style={{
                                    backfaceVisibility: 'hidden',
                                }}
                                onMouseOver={(e) => handleHover(e, index)}
                                onMouseOut={(e) => handleLeave(e, index)}
                            >
                                <Image
                                    src={`/${project.name}.png`}
                                    alt={project.name}
                                    width={500}
                                    height={500}
                                    className="w-full h-1/2 object-top object-cover rounded-lg mb-4"
                                />
                                <div className="flex flex-col flex-grow justify-between">
                                    <div>
                                        <h3 className="text-2xl font-semibold">{project.name}</h3>
                                        <p className="text-sm text-gray-700 dark:text-gray-200 mt-2 overflow-hidden text-ellipsis whitespace-nowrap">
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
                            </motion.div>
                        );
                    })}
                </div>
            </motion.div>
            {/* Boutons de contrôle pour desktop */}
            <div className="mt-30 md:flex md:justify-center space-x-4 hidden md:visible">
                <button
                    onMouseDown={handleLeftMouseDown}
                    onMouseUp={handleLeftMouseUp}
                    onMouseLeave={handleLeftMouseUp}
                    className="flex items-center justify-center text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                    <TbPlayerTrackPrevFilled/>
                </button>
                <button
                    onMouseDown={handleRightMouseDown}
                    onMouseUp={handleRightMouseUp}
                    onMouseLeave={handleRightMouseUp}
                    className="flex items-center justify-center text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                    <TbPlayerTrackNextFilled/>
                </button>
            </div>
            {/* Composant pour l'affichage mobile */}
            <VerticalCarousel projects={projects}/>
        </section>
    );
};

export default Carousel;
