import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const navLinks = [
    { name: "Accueil", href: "#hero" },
    { name: "À propos", href: "#about" },
    { name: "Projets", href: "#projects" },
    { name: "Contact", href: "#contact" },
];

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-orange-500">Mon Portfolio</h1>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-6">
                    {navLinks.map((link) => (
                        <a key={link.href} href={link.href} className="text-gray-700 hover:text-orange-500 transition">
                            {link.name}
                        </a>
                    ))}
                </nav>

                {/* Mobile Menu */}
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <Menu className="w-6 h-6 text-gray-700" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="bg-white w-64 p-6">
                        <nav className="flex flex-col space-y-4">
                            {navLinks.map((link) => (
                                <a key={link.href} href={link.href} className="text-gray-700 hover:text-orange-500 transition" onClick={() => setIsOpen(false)}>
                                    {link.name}
                                </a>
                            ))}
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}
