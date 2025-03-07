import React, { useEffect, useRef } from 'react';
                        import ScrollMagic from 'scrollmagic';

                        const ScrollMagicGradientBackground: React.FC = () => {
                            const bgRef = useRef<HTMLDivElement>(null);

                            useEffect(() => {
                                if (!bgRef.current) return;

                                const updateBackground = () => {
                                    const isDarkMode = document.body.classList.contains('dark');
                                    bgRef.current!.style.background = isDarkMode
                                        ? `radial-gradient(circle at 50% 50%, #7e92ad, #3c4b6b, #152137, #03081b)`
                                        : `radial-gradient(circle at 50% 50%,  #77890c , #9abe93, #176100)`;
                                };

                                // Définir le gradient initial centré
                                updateBackground();

                                // Création du contrôleur ScrollMagic avec un objet d'options vide
                                const controller = new ScrollMagic.Controller({});

                                // Création de la scène ScrollMagic
                                const scene = new ScrollMagic.Scene({
                                    triggerElement: document.body,
                                    triggerHook: 0,
                                    duration: document.body.scrollHeight - window.innerHeight,
                                })
                                    .on('progress', (event: any) => {
                                        if (!bgRef.current) return;
                                        const progress: number = event.progress;
                                        // Calcul du déplacement du centre du gradient en fonction du scroll
                                        const x = 50 + progress * 50; // de 50% à 100%
                                        const y = 50 - progress * 50; // de 50% à 0%
                                        bgRef.current!.style.background = document.body.classList.contains('dark')
                                            ? `radial-gradient(circle at ${x}% ${y}%, #7e92ad, #3c4b6b, #152137, #03081b)`
                                            : `radial-gradient(circle at ${x}% ${y}%, #77890c , #9abe93, #176100)`;
                                    })
                                    .addTo(controller);

                                // Écouter les changements de mode
                                const observer = new MutationObserver(updateBackground);
                                observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

                                // Nettoyage au démontage du composant
                                return () => {
                                    scene.destroy(true);
                                    controller.destroy(true);
                                    observer.disconnect();
                                };
                            }, []);

                            return (
                                <div
                                    ref={bgRef}
                                    style={{
                                        position: 'fixed',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        zIndex: -1,
                                    }}
                                />
                            );
                        };

                        export default ScrollMagicGradientBackground;