"use client";

import Link from "next/link";
import {motion} from "framer-motion";
import Footer from "@/app/_components/Footer";

export default function Custom404() {
    return (
        <div className="flex-grow">
            <div
                className="min-h-screen flex flex-col items-center justify-center gap-20 bg-gray-100 dark:bg-gray-700 transition-colors duration-300">
                <motion.h1
                    initial={{opacity: 0, y: -50}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5}}
                    className="text-9xl font-bold text-gray-900 dark:text-white"
                >
                    <span className="text-green-700 dark:text-emerald-700">404</span> Error
                </motion.h1>
                <motion.p
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 0.3, duration: 0.5}}
                    className="mt-4 text-xl text-gray-800 dark:text-gray-300"
                >
                    Oups, la page que vous recherchez n'existe pas.
                </motion.p>
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 0.6, duration: 0.5}}
                >
                    <Link
                        href="/"
                        className="mt-8 px-6 py-3 bg-green-700 hover:bg-green-800 text-white rounded-md shadow-md transition-colors"
                    >
                        Retour à l'accueil
                    </Link>
                </motion.div>
            </div>
            <Footer/>
        </div>
    );
}
