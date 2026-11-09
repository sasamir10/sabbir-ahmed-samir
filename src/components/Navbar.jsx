import { useEffect, useRef, useState } from "react";

const navigationItems = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Skills", id: "skills" },
    { label: "Projects", id: "projects" },
    { label: "Contact", id: "contact" },
];

const navbarBaseClass =
    "fixed inset-x-16 top-4 z-[1000] rounded-[999px] border backdrop-blur-[14px] transition-all duration-[400ms] ease-[ease]";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navbarRef = useRef(null);
    const toggleRef = useRef(null);

    useEffect(() => {
        const updateScrolledState = () => {
            setIsScrolled(window.scrollY > 60);
        };

        updateScrolledState();
        window.addEventListener("scroll", updateScrolledState, {
            passive: true,
        });

        return () => {
            window.removeEventListener("scroll", updateScrolledState);
        };
    }, []);

    useEffect(() => {
        const sectionIds = navigationItems.map(({ id }) => id);

        const updateActiveSection = () => {
            const scrollPosition = window.scrollY + 120;
            let currentSection = "home";

            sectionIds.forEach((id) => {
                const section = document.getElementById(id);
                if (!section) return;

                const sectionTop =
                    section.getBoundingClientRect().top + window.scrollY;
                if (scrollPosition >= sectionTop) {
                    currentSection = id;
                }
            });

            setActiveSection(currentSection);
        };

        updateActiveSection();
        window.addEventListener("scroll", updateActiveSection, {
            passive: true,
        });
        window.addEventListener("resize", updateActiveSection);

        return () => {
            window.removeEventListener("scroll", updateActiveSection);
            window.removeEventListener("resize", updateActiveSection);
        };
    }, []);

    useEffect(() => {
        const closeOnOutsidePointer = (event) => {
            if (
                isMenuOpen &&
                navbarRef.current &&
                !navbarRef.current.contains(event.target)
            ) {
                setIsMenuOpen(false);
            }
        };

        const closeOnEscape = (event) => {
            if (event.key === "Escape" && isMenuOpen) {
                setIsMenuOpen(false);
                toggleRef.current?.focus();
            }
        };

        const closeOnDesktopResize = () => {
            if (window.innerWidth > 768) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener("pointerdown", closeOnOutsidePointer);
        document.addEventListener("keydown", closeOnEscape);
        window.addEventListener("resize", closeOnDesktopResize);

        return () => {
            document.removeEventListener("pointerdown", closeOnOutsidePointer);
            document.removeEventListener("keydown", closeOnEscape);
            window.removeEventListener("resize", closeOnDesktopResize);
        };
    }, [isMenuOpen]);

    const handleNavigationClick = (event, id) => {
        setIsMenuOpen(false);

        const target = document.getElementById(id);
        if (!target) return;

        event.preventDefault();
        setActiveSection(id);

        const targetTop =
            target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: targetTop, behavior: "smooth" });
    };

    return (
        <nav
            ref={navbarRef}
            id="navbar"
            aria-label="Main navigation"
            className={`${navbarBaseClass} ${
                isScrolled
                    ? "border-[rgba(255,255,255,0.1)] bg-[rgba(8,13,22,0.3)] shadow-[0_12px_34px_rgba(0,0,0,0.4)] backdrop-blur-[18px]"
                    : "border-[rgba(255,255,255,0.08)] bg-[rgba(10,16,28,0.35)] shadow-[0_10px_30px_rgba(0,0,0,0.32)]"
            }`}
        >
            <div className="mx-auto flex min-h-16 max-w-300 items-center gap-8 px-[1.2rem]">
                <a
                    href="#home"
                    className="mr-auto whitespace-nowrap font-mono text-[1.15rem] font-bold tracking-[0.02em] text-white transition-colors duration-300 hover:text-cyan"
                    onClick={(event) => handleNavigationClick(event, "home")}
                >
                    <span className="text-cyan">&lt;</span>samir
                    <span className="text-cyan">/&gt;</span>
                </a>

                <ul
                    id="primary-navigation"
                    className={`hidden list-none gap-[0.4rem] min-[769px]:flex ${
                        isMenuOpen
                            ? "max-md:fixed! max-md:inset-x-0! max-md:top-0! max-md:z-999! max-md:flex! max-md:flex-col! max-md:gap-2! max-md:border-b! max-md:border-border! max-md:bg-[rgba(6,10,15,0.98)]! max-md:px-8! max-md:pb-12! max-md:pt-24! max-md:backdrop-blur-[20px]!"
                            : ""
                    }`}
                >
                    {navigationItems.map(({ label, id }) => {
                        const isActive = activeSection === id;

                        return (
                            <li key={id}>
                                <a
                                    href={`#${id}`}
                                    aria-current={
                                        isActive ? "location" : undefined
                                    }
                                    className={`group relative flex items-center rounded-md px-[0.9rem] py-[0.45rem] font-body text-[0.9rem] font-medium transition-colors duration-200 max-md:px-4 max-md:py-4 max-md:text-[1.2rem] ${
                                        isActive
                                            ? "text-cyan"
                                            : "text-gray hover:text-cyan"
                                    }`}
                                    onClick={(event) =>
                                        handleNavigationClick(event, id)
                                    }
                                >
                                    <span
                                        aria-hidden="true"
                                        className={`text-cyan transition-opacity duration-200 ${
                                            isActive
                                                ? "opacity-100"
                                                : "opacity-0 group-hover:opacity-100"
                                        }`}
                                    >
                                        &lt;
                                    </span>
                                    {label}
                                    <span
                                        aria-hidden="true"
                                        className={`text-cyan transition-opacity duration-200 ${
                                            isActive
                                                ? "opacity-100"
                                                : "opacity-0 group-hover:opacity-100"
                                        }`}
                                    >
                                        &gt;
                                    </span>
                                </a>
                            </li>
                        );
                    })}
                </ul>

                <button
                    ref={toggleRef}
                    type="button"
                    className="flex cursor-pointer flex-col gap-1.25 border-0 bg-transparent p-1 min-[769px]:hidden focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan"
                    aria-label={
                        isMenuOpen
                            ? "Close navigation menu"
                            : "Open navigation menu"
                    }
                    aria-controls="primary-navigation"
                    aria-expanded={isMenuOpen}
                    onClick={() => setIsMenuOpen((open) => !open)}
                >
                    <span
                        aria-hidden="true"
                        className={`block h-0.5 w-6 rounded-sm bg-white transition-all duration-300 ${
                            isMenuOpen
                                ? "translate-x-1.25 translate-y-1.25 rotate-45"
                                : ""
                        }`}
                    />
                    <span
                        aria-hidden="true"
                        className={`block h-0.5 w-6 rounded-sm bg-white transition-all duration-300 ${
                            isMenuOpen ? "opacity-0" : ""
                        }`}
                    />
                    <span
                        aria-hidden="true"
                        className={`block h-0.5 w-6 rounded-sm bg-white transition-all duration-300 ${
                            isMenuOpen
                                ? "translate-x-1.25 -translate-y-1.25 -rotate-45"
                                : ""
                        }`}
                    />
                </button>
            </div>
        </nav>
    );
}
