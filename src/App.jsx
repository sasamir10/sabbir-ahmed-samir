import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import CursorTrail from "./components/CursorTrail";
import Footer from "./components/Footer.jsx";
import Hero from "./components/Hero.jsx";
import Navbar from "./components/Navbar.jsx";
import Projects from "./components/Projects.jsx";
import Skills from "./components/Skills.jsx";

export default function App() {
    return (
        <>
            <CursorTrail />

            <Navbar />
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />
            <Footer />
        </>
    );
}
