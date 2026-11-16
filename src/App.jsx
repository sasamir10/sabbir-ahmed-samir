import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import CursorTrail from "./components/CursorTrail";
import Education from "./components/Education.jsx";
import Footer from "./components/Footer.jsx";
import Hero from "./components/Hero.jsx";
import Navbar from "./components/Navbar.jsx";
import Projects from "./components/Projects.jsx";
import Skills from "./components/Skills.jsx";
import TouchTrail from "./components/TouchTrail";

export default function App() {
    return (
        <>
            <CursorTrail />
            <TouchTrail />

            <Navbar />
            <Hero />
            <About />
            <Education />
            <Skills />
            <Projects />
            <Contact />
            <Footer />
        </>
    );
}
