import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { motion } from "framer-motion";

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);

        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div className={`fixed bottom-4 right-4 ${isVisible ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}>
            <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300 }}
                aria-label="Scroll to top"
                role="button"
                tabIndex={0}
                type="button"
                disabled={!isVisible}
                style={{ outline: "none" }}
                title="Scroll to top"
                aria-hidden={!isVisible}
                className="bg-green-700 text-white p-2 rounded-full shadow-lg hover:bg-green-900 focus:outline-none cursor-pointer"
            >
                <FaArrowUp size={24} />
            </motion.button>
        </div>
    );
}