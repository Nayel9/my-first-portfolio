"use client";

import Header from "@/app/_components/Header";
import Hero from "@/app/_sections/Hero";
import About from "@/app/_sections/About";
import Projects from "@/app/_sections/Projects";
import Contact from "@/app/_sections/Contact";
import ScrollToTop from "@/app/_components/ScrollToTop";
import Footer from "@/app/_components/Footer";
import ScrollMagicBackground from "@/app/_components/ScrollMagicBackground";
import { useEffect } from "react";



export default function Home() {
    useEffect(() => {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.body.classList.add('dark');
        }
    }, []);

    return (
        <div>
            <ScrollMagicBackground />
            <Header/>
            <Hero/>
            <About/>
            <Projects/>
            <Contact />
            <ScrollToTop />
            <Footer />
        </div>
    );
}
