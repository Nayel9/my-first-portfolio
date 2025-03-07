"use client";

import React, {useEffect, useRef} from "react";
import {useTheme} from "next-themes";

export default function ScrollMagicBackground() {
    const bgRef = useRef<HTMLDivElement>(null);
    const {theme} = useTheme();

    useEffect(() => {
        if (!bgRef.current) return;

        const updateBackground = () => {
            const isDark = theme === "dark";
            bgRef.current!.style.background = isDark
                ? `radial-gradient(circle at 50% 50%, #7e92ad, #3c4b6b, #152137, #03081b)`
                : `radial-gradient(circle at 50% 50%, #77890c, #9abe93, #176100)`;
        };
        updateBackground();

        // Import dynamique de ScrollMagic
        import("scrollmagic").then((mod) => {
            const ScrollMagic = mod.default || mod;
            if (!ScrollMagic.Controller || !ScrollMagic.Scene) return;

            const controller = new ScrollMagic.Controller();
            const scene = new ScrollMagic.Scene({
                triggerElement: document.body,
                triggerHook: 0,
                duration: document.body.scrollHeight - window.innerHeight,
            })
                .on("progress", (rawEvent: unknown) => {
                    if (!bgRef.current) return;

                    // On suppose que l'événement possède une prop 'progress'
                    const event = rawEvent as { progress: number };
                    const x = 50 + event.progress * 50;
                    const y = 50 - event.progress * 50;
                    const isDark = theme === "dark";

                    bgRef.current.style.background = isDark
                        ? `radial-gradient(circle at ${x}% ${y}%, #7e92ad, #3c4b6b, #152137, #03081b)`
                        : `radial-gradient(circle at ${x}% ${y}%, #77890c, #9abe93, #176100)`;
                })
                .addTo(controller);

            return () => {
                scene.destroy(true);
                controller.destroy(true);
            };
        });
    }, [theme]);

    return (
        <div
            ref={bgRef}
            className="fixed top-0 left-0 w-full h-full -z-10"
        />
    );
}
