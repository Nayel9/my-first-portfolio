"use client";

import React, { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import Image from "next/image";
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

const VerticalCarousel: React.FC<CarouselProps> = ({ projects }) => {
    const { t } = useTranslation("common");
    const containerRef = useRef<HTMLDivElement>(null);
    const rotation = useRef({ value: 0 }).current;
    const touchStartY = useRef<number>(0);
    const touchStartRotation = useRef<number>(0);

    const animateRotation = useCallback(
        (newRotation: number, duration: number = 0.5) => {
            gsap.to(rotation, {
                value: newRotation,
                duration: duration,
                ease: "power2.out",
                overwrite: "auto",
                onUpdate: () => {
                    if (containerRef.current) {
                        containerRef.current.style.transform = `rotateX(0deg) rotateY(90deg) rotateZ(${rotation.value}deg)`;
                    }
                },
            });
        },
        [rotation]
    );

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleTouchStart = (e: TouchEvent) => {
            touchStartY.current = e.touches[0].clientY;
            touchStartRotation.current = rotation.value;
        };

        const handleTouchMove = (e: TouchEvent) => {
            const deltaY = e.touches[0].clientY - touchStartY.current;
            const newRotation = touchStartRotation.current + deltaY * 0.15;
            animateRotation(newRotation, 0.1);
        };

        const preventPageScroll = (e: TouchEvent) => {
            if (container.contains(e.target as Node)) {
                e.preventDefault();
            }
        };

        container.addEventListener("touchstart", handleTouchStart, { passive: true });
        container.addEventListener("touchmove", handleTouchMove, { passive: true });
        document.addEventListener("touchmove", preventPageScroll, { passive: false });

        return () => {
            container.removeEventListener("touchstart", handleTouchStart);
            container.removeEventListener("touchmove", handleTouchMove);
            document.removeEventListener("touchmove", preventPageScroll);
        };
    }, [animateRotation, rotation.value]);

    const getCardTransform = (index: number, totalCards: number): string => {
        const angle = (360 / totalCards) * index;
        const radius = ((360 / 2) / Math.tan(Math.PI / totalCards)) * 1.4;
        return `rotate(${angle}deg) translate(${radius}px) rotateY(-90deg) rotateX(0deg)`;
    };

    return (
        <div className="md:h-full w-full flex md:items-center md:hidden mt-10 h-[800px] overflow-hidden">
            <div
                ref={containerRef}
                className="w-[1200px] h-[1300px] flex items-center justify-center rounded-full"
                style={{
                    transformStyle: "preserve-3d",
                    transform: "rotateX(0deg) rotateY(90deg)",
                } as React.CSSProperties}
            >
                {projects.map((project, index) => {
                    const transformStyle = getCardTransform(index, projects.length);
                    return (
                        <div
                            key={project.id}
                            className="absolute bg-gray-100 dark:bg-gray-900 p-2 rounded-lg shadow-lg hover:shadow-xl h-[460px] w-[340px] flex flex-col justify-center items-center cursor-pointer"
                            style={{
                                backfaceVisibility: "hidden",
                                transform: transformStyle,
                            }}
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
                            <div className="flex w-full h-auto p-6 flex-col flex-grow justify-between text-gray-700 dark:text-gray-200">
                                <div>
                                    <h3 className="text-2xl font-semibold">{project.name}</h3>
                                    <p className="text-sm mt-2 overflow-hidden text-ellipsis whitespace-nowrap">
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
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default VerticalCarousel;
