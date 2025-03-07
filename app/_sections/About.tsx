import {motion} from "framer-motion";
import Image from "next/image";
import profile from "@/public/profile.jpg";
import {useInView} from "react-intersection-observer";

export default function About() {
    const {ref, inView} = useInView({triggerOnce: true, threshold: 0.2});

    return (
        <section
            id="about"
            ref={ref}
            className="py-20 px-6 text-gray-900 dark:text-white"
        >
            <motion.h2
                initial={{opacity: 0, y: -30}}
                animate={inView ? {opacity: 1, y: 0} : {opacity: 0, y: -30}}
                transition={{duration: 0.8}}
                className="text-4xl font-bold text-center"
            >
                À propos de moi
            </motion.h2>
            <motion.p
                initial={{opacity: 0, y: 20}}
                animate={inView ? {opacity: 1, y: 0} : {opacity: 0, y: 20}}
                transition={{duration: 1, delay: 0.3}}
                className="mt-4 text-lg text-center max-w-3xl mx-auto text-gray-600 dark:text-gray-300"
            >
                Développeur passionné, j&apos;aime concevoir des applications web modernes et
                interactives. Mon objectif est de créer des interfaces élégantes,
                performantes et accessibles à tous.
            </motion.p>
            <motion.div
                initial={{opacity: 0, scale: 0.8}}
                animate={inView ? {opacity: 1, scale: 1} : {opacity: 0, scale: 0.8}}
                transition={{duration: 1, delay: 0.6}}
                className="mt-6 flex justify-center"
            >
                <Image
                    src={profile}
                    alt="Photo de profil"
                    className="w-40 h-40 rounded-full shadow-lg border-4 border-green-700 dark:border-gray-900 object-cover"
                />
            </motion.div>
        </section>
    );
}