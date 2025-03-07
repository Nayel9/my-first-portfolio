import {motion} from "framer-motion";
import {FaGithub, FaLinkedin, FaEnvelope} from "react-icons/fa";

export default function Footer() {
    return (
        <motion.footer
            className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white py-6 text-center"
            initial={{opacity: 0, y: 30}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.8}}
            viewport={{once: true}}
        >
            <div className="container mx-auto">
                <p className="text-sm">&copy; {new Date().getFullYear()} - Tous droits réservés.</p>
                <div className="flex justify-center mt-4 space-x-6">
                    <a href="https://github.com/Nayel9" target="_blank" rel="noopener noreferrer">
                        <FaGithub className="text-2xl hover:text-orange-500 transition"/>
                    </a>
                    <a href="www.linkedin.com/in/nahuel-vainer-0bbb48165" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin className="text-2xl hover:text-orange-500 transition"/>
                    </a>
                    <a href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}>
                        <FaEnvelope className="text-2xl hover:text-orange-500 transition"/>
                    </a>
                </div>
            </div>
        </motion.footer>
    );
}
