"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import ThemeSwitch from "@/app/_components/ThemeSwitch";
import { useTranslation } from "next-i18next";
import LanguageSwitch from "@/app/_components/LanguageSwitcher";

const navLinks = [
    { nameKey: "header.home", href: "#hero" },
    { nameKey: "header.about", href: "#about" },
    { nameKey: "header.projects", href: "#projects" },
    { nameKey: "header.contact", href: "#contact" },
];

export default function Header() {
    const { t } = useTranslation("common");
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 w-full bg-white dark:bg-gray-800 shadow-md z-50">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-green-700 dark:text-white">{t("header.portfolio") || "Mon Portfolio"}</h1>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-6">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-gray-700 dark:text-white hover:text-green-500 dark:hover:text-green-300 transition"
                        >
                            {t(link.nameKey)}
                        </a>
                    ))}
                    {/* Theme Switch */}
                    <ThemeSwitch />
                    <LanguageSwitch />
                </nav>

                {/* Mobile Menu */}
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <Menu className="w-6 h-6 text-gray-700 dark:text-white" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="bg-white dark:bg-gray-800 w-64 p-6">
                        <nav className="flex flex-col space-y-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className="text-gray-700 dark:text-white hover:text-green-500 dark:hover:text-green-300 transition"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {t(link.nameKey)}
                                </a>
                            ))}
                            {/* Theme Switch */}
                            <ThemeSwitch />
                            <LanguageSwitch />
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}
