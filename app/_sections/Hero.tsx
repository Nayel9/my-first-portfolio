"use client";

import {motion} from "framer-motion";
import Link from "next/link";
import {Button} from "@/components/ui/button";

const MotionButton = motion(Button);

export default function Hero() {
    return (
        <section id="hero"
                 className="h-screen flex flex-col items-center justify-center text-center px-6 ">
            <motion.h1
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                whileHover={{ scale: 1.03, rotate: [0, 2, -2, 0] }}
                className="text-5xl font-bold text-gray-900 dark:text-white"
            >
                Salut, je suis <span className="text-green-700 dark:text-emerald-700">Développeur React</span>
            </motion.h1>

            <motion.p
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 1, delay: 0.3}}
                className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl"
            >
                Passionné par le développement web, je crée des expériences interactives modernes et performantes.
            </motion.p>
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="mt-6 flex space-x-4"
            >
                <Link href="#projects">
                    <MotionButton
                        whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgba(0,0,0,0.3)" }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="bg-green-700 hover:bg-green-800 text-white"
                    >
                        Voir mes projets
                    </MotionButton>
                </Link>
                <Link href="#contact">
                    <MotionButton
                        whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgba(0,0,0,0.3)" }}
                        transition={{ type: "spring", stiffness: 300 }}
                        variant="outline"
                    >
                        Me contacter
                    </MotionButton>
                </Link>
            </motion.div>


            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.9 }}
                className="absolute bottom-10 animate-bounce"
            >
                <span className="text-gray-900 dark:text-gray-300">↓ Scroll pour en savoir plus ↓</span>
            </motion.div>

        </section>
    );
}