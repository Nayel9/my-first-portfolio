"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import Image from "next/image";
import { motion } from "framer-motion";
import VerticalCarousel from "@/app/_components/VerticalCarousel";
import { useTranslation } from "next-i18next";

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
        transition: { duration: 0.6, ease: "easeInOut" },
    }),
};

const Carousel: React.FC<CarouselProps> = ({ projects }) => {
    const { t } = useTranslation("common");
    const containerRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const rotation = useRef({ value: 0 }).current;
    const touchStartX = useRef<number>(0);
    const touchStartRotation = useRef<number>(0);
    const [animationComplete, setAnimationComplete] = useState(false);

    const animateRotation = useCallback(
        (newRotation: number, duration: number = 0.5) => {
            gsap.to(rotation, {
                value: newRotation,
                duration,
                ease: "power2.out",
                overwrite: "auto",
                onUpdate: () => {
                    if (containerRef.current) {
                        containerRef.current.style.transform = `rotateX(-100deg) rotateZ(${rotation.value}deg)`;
                    }
                },
            });
        },
        [rotation]
    );

    const getCardTransform = (index: number, totalCards: number): string => {
        const angle = (360 / totalCards) * index;
        const radius = ((280 / 2) / Math.tan(Math.PI / totalCards)) * 1.1;
        return `scale(1) rotate(${angle}deg) translate(${radius}px) rotate(90deg) rotateY(0deg) rotateX(90deg)`;
    };

    const handleHover = (_event: React.MouseEvent<HTMLDivElement>, index: number) => {
        const card = cardRefs.current[index];
        if (card) {
            card.style.transform = `${card.dataset.initialTransform} scale(1.2) translateZ(50px) translateY(-50px) rotateY(0deg)`;
            card.style.transition = "transform 0.3s ease-in-out";
            card.style.backfaceVisibility = "visible";
        }
    };

    const handleLeave = (_event: React.MouseEvent<HTMLDivElement>, index: number) => {
        const card = cardRefs.current[index];
        if (card) {
            card.style.transform = card.dataset.initialTransform || "";
            card.style.transition = "transform 0.4s ease-in-out";
            card.style.backfaceVisibility = "hidden";
        }
    };

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleWheel = (e: WheelEvent) => {
            if (!animationComplete) return;
            e.preventDefault();
            animateRotation(rotation.value - e.deltaY * 0.2);
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (!animationComplete) return;
            if (e.key === "ArrowLeft") animateRotation(rotation.value + 30);
            else if (e.key === "ArrowRight") animateRotation(rotation.value - 30);
        };

        const handleTouchStart = (e: TouchEvent) => {
            if (!animationComplete) return;
            touchStartX.current = e.touches[0].clientX;
            touchStartRotation.current = rotation.value;
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (!animationComplete) return;
            const deltaX = e.touches[0].clientX - touchStartX.current;
            animateRotation(touchStartRotation.current + deltaX * 0.15, 0.1);
        };

        container.addEventListener("wheel", handleWheel);
        window.addEventListener("keydown", handleKeyDown);
        container.addEventListener("touchstart", handleTouchStart, { passive: true });
        container.addEventListener("touchmove", handleTouchMove, { passive: true });

        return () => {
            container.removeEventListener("wheel", handleWheel);
            window.removeEventListener("keydown", handleKeyDown);
            container.removeEventListener("touchstart", handleTouchStart);
            container.removeEventListener("touchmove", handleTouchMove);
        };
    }, [animateRotation, rotation.value, animationComplete]);

    return (
        <section className="h-[550px] md:h-[800px] flex flex-col pt-12 items-center gap-4 overflow-hidden">
            <motion.div
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0 }}
                variants={{
                    onscreen: {
                        transition: {
                            delayChildren: 0,
                            staggerChildren: 0.2,
                            onComplete: () => setAnimationComplete(true),
                        },
                    },
                }}
                onAnimationComplete={() => setAnimationComplete(true)}
                className="relative h-3/5 w-full hidden md:flex md:items-center md:justify-center"
            >
                <div
                    ref={containerRef}
                    className="flex items-center w-full h-full justify-center"
                    style={{
                        transformStyle: "preserve-3d",
                        transform: "rotateX(-100deg) rotateZ(0deg)",
                    }}
                >
                    {projects.map((project, index) => {
                        const transformStyle = getCardTransform(index, projects.length);
                        return (
                            <motion.div
                                variants={cardVariants}
                                key={project.id}
                                custom={{ transform: transformStyle }}
                                ref={(el) => {
                                    cardRefs.current[index] = el;
                                    if (el) {
                                        el.dataset.initialTransform = transformStyle;
                                    }
                                }}
                                className="absolute bg-gray-100 dark:bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-xl w-[280px] h-[350px] max-w-xl flex flex-col cursor-pointer"
                                style={{
                                    backfaceVisibility: "hidden",
                                }}
                                onMouseOver={(e) => handleHover(e, index)}
                                onMouseOut={(e) => handleLeave(e, index)}
                            >
                                <Image
                                    unoptimized
                                    src={`/${project.name}.png`}
                                    alt={project.name}
                                    width={500}
                                    height={500}
                                    className="w-full h-1/2 object-top object-cover rounded-lg mb-4"
                                    onError={(e) => {
                                        e.currentTarget.onerror = null;
                                        e.currentTarget.src = `/project-placeholder.webp`;
                                    }}
                                />

                                <div className="flex flex-col flex-grow justify-between">
                                    <div>
                                        <h3 className="text-2xl font-semibold">{project.name}</h3>
                                        <p className="text-sm text-gray-700 dark:text-gray-200 mt-2 overflow-hidden text-ellipsis whitespace-nowrap">
                                            {project.description || t("projects.noDescription")}
                                        </p>
                                    </div>
                                    <div className="flex flex-row justify-between">
                                        <a
                                            href={project.html_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-block text-xl mt-4 text-green-600 hover:text-green-800"
                                        >
                                            {t("projects.viewGithub")}
                                        </a>
                                        {project.demo_url && (
                                            <a
                                                href={project.demo_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-block text-xl mt-4 text-amber-600 hover:text-amber-800"
                                            >
                                                {t("projects.demo")}
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.div>
            <VerticalCarousel projects={projects} />
        </section>
    );
};

export default Carousel;
