"use client";

import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { useTranslation } from "next-i18next";
import Link from "next/link";


export default function Footer() {
    const { t } = useTranslation("common");
    return (
        <footer className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white py-6 text-center">
            <div className="container mx-auto">
                <p className="text-sm">&copy; {new Date().getFullYear()} - {t("footer.rights")}</p>
                <div className="flex justify-center mt-4 space-x-6">
                    <Link href="https://github.com/Nayel9" target="_blank" rel="noopener noreferrer">
                        <FaGithub className="text-2xl hover:text-green-700 transition" />
                    </Link>
                    <Link href="https://www.linkedin.com/in/nahuel-vainer-0bbb48165" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin className="text-2xl hover:text-green-700 transition" />
                    </Link>
                    <Link href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}>
                        <FaEnvelope className="text-2xl hover:text-green-700 transition" />
                    </Link>
                </div>
            </div>
        </footer>
    );
}
