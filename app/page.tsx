import Header from "@/app/_components/Header";
import Hero from "@/app/_sections/Hero";
import About from "@/app/_sections/About";
import Contact from "@/app/_sections/Contact";
import ScrollToTop from "@/app/_components/ScrollToTop";
import Footer from "@/app/_components/Footer";
import ScrollMagicBackground from "@/app/_components/ScrollMagicBackground";
import ProjectsServer from "@/app/_sections/ProjectsServer";


export default function Home() {
    return (
        <div>
            <ScrollMagicBackground />
            <Header />
            <Hero />
            <About />
            <ProjectsServer />
            <Contact />
            <ScrollToTop />
            <Footer />
        </div>
    );
}
