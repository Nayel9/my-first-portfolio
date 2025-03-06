"use client";

import Header from "@/app/_components/Header";
import Hero from "@/app/_sections/Hero";
import About from "@/app/_sections/About";
import Projects from "@/app/_sections/Projects";
import Contact from "@/app/_sections/Contact";
import ScrollToTop from "@/app/_components/ScrollToTop";
import Footer from "@/app/_components/Footer";


export default function Home() {
    return (
        <div>
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
