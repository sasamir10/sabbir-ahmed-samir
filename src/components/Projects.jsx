import { useEffect, useRef, useState } from "react";

const projects = [
    {
        title: "E-Commerce Platform",
        description:
            "A fully responsive online store with product filtering, cart functionality, and smooth checkout flow.",
        tags: ["React", "CSS3", "API"],
        emoji: "🛒",
        thumbnail: "bg-[linear-gradient(135deg,#0a1628,#0d2540)]",
    },
    {
        title: "Analytics Dashboard",
        description:
            "Real-time data visualization dashboard with interactive charts, dark mode, and responsive grid layout.",
        tags: ["React", "JavaScript", "Chart.js"],
        emoji: "📊",
        thumbnail: "bg-[linear-gradient(135deg,#0d2035,#05181a)]",
        featured: true,
    },
    {
        title: "Music Player UI",
        description:
            "Sleek, animated music player with playlist management, equalizer visualization, and gesture controls.",
        tags: ["HTML", "CSS", "JS"],
        emoji: "🎵",
        thumbnail: "bg-[linear-gradient(135deg,#121228,#1a0d2e)]",
    },
    {
        title: "Task Manager App",
        description:
            "Productivity app with drag-and-drop task organization, priority tagging, and deadline tracking.",
        tags: ["React", "LocalStorage"],
        emoji: "✅",
        thumbnail: "bg-[linear-gradient(135deg,#0a2010,#052015)]",
    },
    {
        title: "Agency Landing Page",
        description:
            "High-impact agency website with scroll-triggered animations, parallax effects, and smooth transitions.",
        tags: ["HTML", "CSS", "GSAP"],
        emoji: "🌐",
        thumbnail: "bg-[linear-gradient(135deg,#1a1205,#200d05)]",
    },
    {
        title: "Weather Dashboard",
        description:
            "Live weather app with animated icons, 7-day forecast, and beautiful location-based backgrounds.",
        tags: ["React", "API", "CSS"],
        emoji: "☁️",
        thumbnail: "bg-[linear-gradient(135deg,#051a28,#0a1020)]",
    },
];

const cardClasses =
    "group relative flex flex-col overflow-hidden rounded-[14px] border bg-bg-3 transition-all duration-[350ms] ease-[ease] hover:-translate-y-1.5 hover:border-[rgba(0,229,192,0.35)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_40px_rgba(0,229,192,0.07)]";

const revealClasses = "opacity-0 translate-y-10";

function PlaceholderLink({ children, className, label }) {
    return (
        <a
            href="#"
            aria-label={label}
            className={className}
            onClick={(event) => event.preventDefault()}
        >
            {children}
        </a>
    );
}

export default function Projects() {
    const [revealedCards, setRevealedCards] = useState({});
    const cardRefs = useRef([]);

    useEffect(() => {
        const timers = new Set();
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    const index = cardRefs.current.indexOf(entry.target);
                    if (index === -1) return;

                    const timer = window.setTimeout(() => {
                        timers.delete(timer);
                        setRevealedCards((current) => ({
                            ...current,
                            [index]: true,
                        }));
                    }, index * 100);

                    timers.add(timer);
                    observer.unobserve(entry.target);
                });
            },
            { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
        );

        cardRefs.current.forEach((card) => {
            if (card) observer.observe(card);
        });

        return () => {
            observer.disconnect();
            timers.forEach((timer) => window.clearTimeout(timer));
        };
    }, []);

    return (
        <section id="projects" className="bg-bg-2 px-10 py-28">
            <div className="mx-auto max-w-content px-8">
                <div className="mb-5 font-mono text-[0.72rem] uppercase tracking-[0.22em] text-cyan opacity-85">
                    Projects
                </div>

                <h2 className="mb-5 text-center font-head text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.15] text-white">
                    Featured{" "}
                    <span className="relative text-cyan after:absolute after:inset-x-0 after:-bottom-0.75 after:h-0.5 after:rounded-sm after:bg-[linear-gradient(90deg,var(--cyan),transparent)] after:content-['']">
                        Work
                    </span>
                </h2>

                <p className="mb-14 text-center text-[1.05rem] text-gray">
                    Hand-picked projects that showcase my skills
                </p>

                <div className="grid grid-cols-3 gap-6 max-[1025px]:grid-cols-2 max-[769px]:grid-cols-1">
                    {projects.map((project, index) => (
                        <article
                            key={project.title}
                            ref={(element) => {
                                cardRefs.current[index] = element;
                            }}
                            data-reveal
                            className={`${cardClasses} ${project.featured ? "border-[rgba(0,229,192,0.2)]" : "border-border"} ${revealClasses} ${revealedCards[index] ? "translate-y-0 opacity-100" : ""}`}
                        >
                            <div className="relative aspect-video overflow-hidden">
                                <div
                                    aria-hidden="true"
                                    className={`relative flex size-full items-center justify-center ${project.thumbnail}`}
                                >
                                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,229,192,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,192,0.04)_1px,transparent_1px)] bg-size-[30px_30px]" />
                                    <span className="relative z-2 text-[2.5rem] drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]">
                                        {project.emoji}
                                    </span>
                                </div>

                                <div
                                    aria-hidden="true"
                                    className="absolute inset-0 z-1 flex items-center justify-center bg-[rgba(0,229,192,0.12)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
                                >
                                    <span className="rounded-md border border-cyan bg-[rgba(6,10,15,0.8)] px-4 py-[0.4rem] font-mono text-[0.8rem] text-cyan">
                                        View Project
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-1 flex-col gap-[0.7rem] p-6">
                                <div className="flex flex-wrap gap-[0.4rem]">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="rounded-[4px] border border-border bg-cyan-soft px-[0.55rem] py-[0.2rem] font-mono text-[0.68rem] tracking-[0.04em] text-cyan"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <h3 className="font-head text-[1.05rem] font-bold text-white">
                                    {project.title}
                                </h3>
                                <p className="flex-1 text-[0.85rem] leading-[1.65] text-gray">
                                    {project.description}
                                </p>

                                <div className="mt-2 flex gap-[0.7rem]">
                                    <PlaceholderLink
                                        label={`Live Demo for ${project.title}`}
                                        className="rounded-md bg-cyan px-[0.9rem] py-[0.45rem] font-mono text-[0.75rem] font-bold tracking-[0.03em] text-bg transition-all duration-250 hover:-translate-y-0.5 hover:bg-cyan-dim focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
                                    >
                                        Live Demo ↗
                                    </PlaceholderLink>
                                    <PlaceholderLink
                                        label={`GitHub for ${project.title}`}
                                        className="rounded-md border border-border bg-transparent px-[0.9rem] py-[0.45rem] font-mono text-[0.75rem] tracking-[0.03em] text-gray transition-all duration-250 hover:border-cyan hover:bg-cyan-soft hover:text-cyan focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
                                    >
                                        GitHub
                                    </PlaceholderLink>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
