import { useEffect, useRef, useState } from "react";
import profileImage from "../assets/images/profile-1.jpeg";
import "../styles/Hero.css";

const roles = ["Front-End Developer", "React Specialist"];

const codeSnippets = [
    { text: "const dev = () => {", className: "c1" },
    { text: "export default App", className: "c2" },
    { text: "useState(null)", className: "c3" },
    { text: "return <Component />", className: "c4" },
    { text: "display: flex;", className: "c5" },
    { text: "function render() {", className: "c6" },
    { text: "import React from 'react'", className: "c7" },
    { text: "border-radius: 12px;", className: "c8" },
    { text: "async/await", className: "c9" },
    { text: "useEffect(() => {", className: "c10" },
    { text: "grid-template-columns:", className: "c11" },
    { text: "props.children", className: "c12" },
];

function TechIcon({ type }) {
    if (type === "react") {
        return (
            <svg viewBox="0 0 24 24" className="h-[1em] w-[1em]" fill="none">
                <g stroke="#61dafb" strokeWidth="1.3">
                    <ellipse cx="12" cy="12" rx="10" ry="3.8" />
                    <ellipse
                        cx="12"
                        cy="12"
                        rx="10"
                        ry="3.8"
                        transform="rotate(60 12 12)"
                    />
                    <ellipse
                        cx="12"
                        cy="12"
                        rx="10"
                        ry="3.8"
                        transform="rotate(120 12 12)"
                    />
                </g>
                <circle cx="12" cy="12" r="1.6" fill="#61dafb" />
            </svg>
        );
    }

    if (type === "git") {
        return (
            <svg viewBox="0 0 24 24" className="h-[1em] w-[1em]" fill="none">
                <path
                    d="m19.4 10.7-6.1-6.1a1.8 1.8 0 0 0-2.6 0L8.9 6.4l2.4 2.4a2.1 2.1 0 0 1 2.6 2.7l2.3 2.3a2.1 2.1 0 1 1-1.3 1.3l-2.2-2.2v5.8a2.1 2.1 0 1 1-1.8 0v-6a2.1 2.1 0 0 1-1.1-2.8L7.4 7.7 3.5 11.6a1.8 1.8 0 0 0 0 2.6l6.1 6.1a1.8 1.8 0 0 0 2.6 0l7.2-7.1a1.8 1.8 0 0 0 0-2.5Z"
                    fill="#f05032"
                />
                <circle cx="11.3" cy="10.5" r=".65" fill="white" />
                <circle cx="12" cy="18.3" r=".65" fill="white" />
                <circle cx="15.7" cy="15" r=".65" fill="white" />
            </svg>
        );
    }

    if (type === "javascript") {
        return (
            <svg viewBox="0 0 24 24" className="h-[1em] w-[1em]">
                <path fill="#f7df1e" d="M2 2h20v20H2z" />
                <path
                    fill="#111"
                    d="m13.2 17.4 1.5-.9c.3.6.7 1 1.4 1 .6 0 .9-.3.9-.7 0-.5-.3-.7-1-1l-.5-.2c-1.4-.6-2.3-1.3-2.3-2.8 0-1.4 1-2.4 2.7-2.4 1.2 0 2.1.4 2.7 1.6l-1.5 1c-.3-.6-.6-.8-1.1-.8-.4 0-.7.3-.7.6 0 .4.3.6.9.9l.5.2c1.7.7 2.6 1.4 2.6 2.9 0 1.7-1.3 2.6-3 2.6-1.7 0-2.8-.8-3.3-2Zm-6.4.2 1.5-.9c.3.5.5 1 1.1 1 .5 0 .8-.2.8-1.1v-6h1.9v6.1c0 2-1.2 2.9-2.7 2.9-1.4 0-2.2-.7-2.6-2Z"
                />
            </svg>
        );
    }

    return (
        <svg viewBox="0 0 24 24" className="h-[1em] w-[1em]">
            <path fill="#1572b6" d="M4 2h16l-1.5 18L12 22l-6.5-2L4 2Z" />
            <path fill="#33a9dc" d="M12 4v16l5.2-1.6L18.4 4H12Z" />
            <path
                fill="white"
                d="M7.4 7.1h9.2l-.2 2H9.6l.2 2h6.4l-.6 5.1-3.6 1.1-3.6-1.1-.2-2.6h2l.1 1.1 1.7.5 1.7-.5.2-1.7H7.9L7.4 7.1Z"
            />
        </svg>
    );
}

const techTags = [
    { name: "react", className: "tag-react" },
    { name: "git", className: "tag-css" },
    { name: "javascript", className: "tag-js" },
    { name: "css", className: "tag-git" },
];

export default function Hero() {
    const [role, setRole] = useState(roles[0]);
    const [revealed, setRevealed] = useState({ left: false, right: false });
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(
        () =>
            typeof window !== "undefined" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
    const heroRef = useRef(null);
    const leftRef = useRef(null);
    const rightRef = useRef(null);
    const codeRefs = useRef([]);
    const animationFrameRef = useRef(null);
    const pointerPositionRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const mediaQuery = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        );
        const updateMotionPreference = (event) => {
            setPrefersReducedMotion(event.matches);
        };

        mediaQuery.addEventListener("change", updateMotionPreference);
        return () => {
            mediaQuery.removeEventListener("change", updateMotionPreference);
        };
    }, []);

    useEffect(() => {
        if (prefersReducedMotion) {
            return undefined;
        }

        let roleIndex = 0;
        let characterIndex = 0;
        let deleting = false;
        const timeouts = new Set();

        const schedule = (callback, delay) => {
            const timeoutId = window.setTimeout(() => {
                timeouts.delete(timeoutId);
                callback();
            }, delay);
            timeouts.add(timeoutId);
        };

        const typeNextCharacter = () => {
            const currentRole = roles[roleIndex];

            if (!deleting) {
                characterIndex += 1;
                setRole(currentRole.slice(0, characterIndex));

                if (characterIndex === currentRole.length) {
                    schedule(() => {
                        deleting = true;
                    }, 2400);
                    schedule(typeNextCharacter, 2800);
                    return;
                }
            } else {
                characterIndex -= 1;
                setRole(currentRole.slice(0, characterIndex));

                if (characterIndex === 0) {
                    deleting = false;
                    roleIndex = (roleIndex + 1) % roles.length;
                }
            }

            schedule(typeNextCharacter, deleting ? 40 : 80);
        };

        schedule(typeNextCharacter, 1600);

        return () => {
            timeouts.forEach((timeoutId) => window.clearTimeout(timeoutId));
        };
    }, [prefersReducedMotion]);

    useEffect(() => {
        if (prefersReducedMotion) {
            return undefined;
        }

        const revealTimers = new Set();
        const revealTarget = (side, delay = 0) => {
            const timeoutId = window.setTimeout(() => {
                revealTimers.delete(timeoutId);
                setRevealed((current) => ({ ...current, [side]: true }));
            }, delay);
            revealTimers.add(timeoutId);
        };

        const heroObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    const side =
                        entry.target === leftRef.current ? "left" : "right";
                    revealTarget(side, side === "right" ? 100 : 0);
                    heroObserver.unobserve(entry.target);
                });
            },
            { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
        );

        if (leftRef.current) heroObserver.observe(leftRef.current);
        if (rightRef.current) heroObserver.observe(rightRef.current);

        const initialRevealTimer = window.setTimeout(() => {
            setRevealed({ left: true, right: true });
        }, 200);

        return () => {
            heroObserver.disconnect();
            window.clearTimeout(initialRevealTimer);
            revealTimers.forEach((timeoutId) => window.clearTimeout(timeoutId));
        };
    }, [prefersReducedMotion]);

    useEffect(
        () => () => {
            if (animationFrameRef.current !== null) {
                window.cancelAnimationFrame(animationFrameRef.current);
            }
        },
        [],
    );

    const handlePointerMove = (event) => {
        if (prefersReducedMotion || event.pointerType === "touch") return;

        pointerPositionRef.current = {
            x: event.clientX,
            y: event.clientY,
        };
        if (animationFrameRef.current !== null) return;

        animationFrameRef.current = window.requestAnimationFrame(() => {
            const hero = heroRef.current;
            if (!hero) {
                animationFrameRef.current = null;
                return;
            }

            const bounds = hero.getBoundingClientRect();
            const centerX =
                (pointerPositionRef.current.x - bounds.left) / bounds.width -
                0.5;
            const centerY =
                (pointerPositionRef.current.y - bounds.top) / bounds.height -
                0.5;

            codeRefs.current.forEach((element, index) => {
                if (!element) return;
                const depth = ((index % 3) + 1) * 6;
                element.style.setProperty(
                    "--parallax-x",
                    `${centerX * depth}px`,
                );
                element.style.setProperty(
                    "--parallax-y",
                    `${centerY * depth}px`,
                );
            });

            animationFrameRef.current = null;
        });
    };

    const resetParallax = () => {
        if (animationFrameRef.current !== null) {
            window.cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = null;
        }

        codeRefs.current.forEach((element) => {
            element?.style.removeProperty("--parallax-x");
            element?.style.removeProperty("--parallax-y");
        });
    };

    useEffect(() => {
        if (prefersReducedMotion) resetParallax();
    }, [prefersReducedMotion]);

    return (
        <section
            ref={heroRef}
            id="home"
            className="hero-section relative flex min-h-screen flex-col justify-center overflow-hidden px-10 pb-20 pt-36"
            onPointerMove={handlePointerMove}
            onPointerLeave={resetParallax}
        >
            <div className="hero-code-layer" aria-hidden="true">
                {codeSnippets.map(({ text, className }, index) => (
                    <span
                        key={className}
                        ref={(element) => {
                            codeRefs.current[index] = element;
                        }}
                        className={`hero-code-float ${className}`}
                    >
                        {text}
                    </span>
                ))}
            </div>
            <div className="hero-grid" aria-hidden="true" />

            <div className="mx-auto grid w-full max-w-300 grid-cols-2 items-center gap-16 max-[901px]:grid-cols-1 max-[901px]:gap-12">
                <div
                    ref={leftRef}
                    className={`hero-reveal relative z-2 flex flex-col gap-8 ${
                        prefersReducedMotion || revealed.left
                            ? "transform-none opacity-100"
                            : "transform-[translateY(40px)] opacity-0"
                    }`}
                >
                    <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[rgba(0,229,192,0.2)] bg-[rgba(0,229,192,0.07)] px-[0.9rem] py-[0.4rem] font-mono text-[0.78rem] tracking-wider text-cyan">
                        <span className="hero-badge-dot h-1.75 w-1.75 rounded-full bg-cyan" />
                        Available for Freelance
                    </div>

                    <div>
                        <p className="font-mono text-[0.85rem] tracking-widest text-gray">
                            Hello, I&apos;m
                        </p>
                        <h1 className="font-head text-[clamp(3rem,6vw,5.5rem)] font-extrabold leading-[1.02] tracking-[-0.02em] max-[481px]:text-[clamp(2.5rem,12vw,4rem)]">
                            <span className="block">Sabbir Ahmed</span>
                        </h1>
                        <div className="mt-[0.4rem] flex min-h-6 items-center gap-[0.8rem]">
                            <span className="h-0.75 w-8 shrink-0 rounded-sm bg-cyan" />
                            <span className="font-mono text-[0.88rem] uppercase tracking-[0.12em] text-cyan">
                                {prefersReducedMotion ? roles[0] : role}
                            </span>
                        </div>
                    </div>

                    <p className="max-w-120 text-[1.05rem] leading-[1.75] text-gray">
                        Turning ideas into modern and{" "}
                        <strong className="font-medium text-white">
                            responsive web interfaces
                        </strong>{" "}
                        with clean code.
                    </p>
                </div>

                <div
                    ref={rightRef}
                    className={`hero-reveal relative z-2 flex items-center justify-center max-[901px]:-order-1 ${
                        prefersReducedMotion || revealed.right
                            ? "transform-none opacity-100"
                            : "transform-[translateX(50px)] opacity-0"
                    }`}
                >
                    <div className="hero-visual relative flex h-105 w-105 items-center justify-center">
                        <div className="hero-ring hero-ring-1" />
                        <div className="hero-ring hero-ring-2" />
                        <div className="hero-ring hero-ring-3" />

                        <div className="relative z-2 h-45 w-45">
                            <div className="hero-avatar-inner relative flex h-full w-full items-center justify-center overflow-hidden rounded-full border-2 border-[rgba(0,229,192,0.3)]">
                                <img
                                    src={profileImage}
                                    alt="Sabbir Ahmed"
                                    width="180"
                                    height="180"
                                    className="relative z-1 block h-full w-full object-cover object-center"
                                />
                                <div className="hero-avatar-glow pointer-events-none absolute inset-0" />
                            </div>
                        </div>

                        {techTags.map(({ name, className }) => (
                            <div
                                key={className}
                                className={`hero-tech-tag ${className}`}
                                aria-hidden="true"
                            >
                                <TechIcon type={name} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
