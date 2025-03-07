import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Carousel: React.FC = () => {
    // Référence du conteneur du carrousel
    const containerRef = useRef<HTMLDivElement>(null);
    // Objet de rotation pour GSAP (rotationZ)
    const rotation = useRef({ value: 0 }).current;
    // Références pour stocker les intervalles des boutons
    const leftIntervalRef = useRef<number | null>(null);
    const rightIntervalRef = useRef<number | null>(null);
    // Pour gérer les gestes tactiles
    const touchStartX = useRef<number>(0);
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
                    containerRef.current.style.transform = `rotateX(-100deg) rotateZ(${rotation.value}deg)`;
                }
            },
        });
    };

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Gestion de la roulette de souris
        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            const newRotation = rotation.value - e.deltaY * 0.3; // ajuster la sensibilité
            animateRotation(newRotation);
        };

        // Gestion des flèches du clavier
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') {
                animateRotation(rotation.value + 50);
            } else if (e.key === 'ArrowRight') {
                animateRotation(rotation.value - 50);
            }
        };

        // Gestion des événements tactiles pour mobile
        const handleTouchStart = (e: TouchEvent) => {
            touchStartX.current = e.touches[0].clientX;
            touchStartRotation.current = rotation.value;
        };

        const handleTouchMove = (e: TouchEvent) => {
            const deltaX = e.touches[0].clientX - touchStartX.current;
            // Ajuster la sensibilité pour le tactile
            const newRotation = touchStartRotation.current + deltaX * 0.5;
            animateRotation(newRotation, 0.1);
        };

        container.addEventListener('wheel', handleWheel);
        window.addEventListener('keydown', handleKeyDown);
        container.addEventListener('touchstart', handleTouchStart, { passive: true });
        container.addEventListener('touchmove', handleTouchMove, { passive: true });

        return () => {
            container.removeEventListener('wheel', handleWheel);
            window.removeEventListener('keydown', handleKeyDown);
            container.removeEventListener('touchstart', handleTouchStart);
            container.removeEventListener('touchmove', handleTouchMove);
        };
    }, []);

    // Rotation continue par bouton gauche
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

    // Rotation continue par bouton droit
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
        <section className="h-screen flex items-center justify-center">
            <div className="relative">
                {/* Conteneur du carrousel responsive */}
                <div
                    ref={containerRef}
                    className="bg-gray-900 max-h-[600px] max-w-[600px] overflow-hidden sm:overflow-visible flex items-center justify-center rounded-full relative"
                    style={{
                        // Définition du rayon dynamique : la moitié de la largeur, ou 300px max
                        '--radius': 'calc(min(40vw, 300px))',
                        transformStyle: 'preserve-3d',
                        transform: 'rotateX(-100deg) rotateZ(0deg)',
                        perspective: '2000px',
                    } as React.CSSProperties}
                >
                    {['Card 1', 'Card 2', 'Card 3', 'Card 4', 'Card 5', 'Card 6', 'Card 7', 'Card 8', 'Card 9', 'Card 10'].map((text, index) => {
                        const angle = (360 / 10) * index;
                        return (
                            <div
                                key={index}
                                className="absolute bg-white border border-gray-300 flex rounded justify-center items-center"
                                style={{
                                    width: '150px',
                                    height: '200px',
                                    transform: `rotate(${angle}deg) translate(calc(var(--radius) * 1.8)) rotate(90deg) rotateY(0deg) rotateX(90deg)`,
                                    backfaceVisibility: 'hidden',
                                }}
                            >
                                {text}
                            </div>
                        );
                    })}
                </div>
            </div>
                {/* Boutons de contrôle */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
                    <button
                        onMouseDown={handleLeftMouseDown}
                        onMouseUp={handleLeftMouseUp}
                        onMouseLeave={handleLeftMouseUp}
                        className="px-4 py-2 bg-gray-700 text-white rounded"
                    >
                        Left
                    </button>
                    <button
                        onMouseDown={handleRightMouseDown}
                        onMouseUp={handleRightMouseUp}
                        onMouseLeave={handleRightMouseUp}
                        className="px-4 py-2 bg-gray-700 text-white rounded"
                    >
                        Right
                    </button>
                </div>

        </section>
    );
};

export default Carousel;
