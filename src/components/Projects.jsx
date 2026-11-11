import { useEffect, useRef, useState } from "react";
import bentoSpendImage from "../assets/images/bento-spend.png";
import eventLwsImage from "../assets/images/eventlws.png";
import fitLogImage from "../assets/images/fit-log.png";
import projectHubImage from "../assets/images/project-hub.png";
import bookNookImage from "../assets/images/yourbook-nook.png";

const projects = [
    {
        id: "booknook",
        title: "BookNook",
        description:
            "A full-stack library management platform for discovering books, managing personal listings, and tracking borrowing and returns.",
        technologies: [
            "Next.js",
            "TypeScript",
            "Tailwind CSS",
            "Express.js",
            "MongoDB Atlas",
            "Better Auth",
        ],
        image: bookNookImage,
        liveUrl: "https://yourbook-nook.vercel.app/",
        githubUrl: "https://github.com/sasamir10/booknook-client",
        featured: true,
    },
    {
        id: "fit-log",
        title: "Fit Log",
        description:
            "An API-powered workout discovery and planning application where users can explore exercises, search and filter workouts, save favorites, and create personalized daily plans.",
        technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
        image: fitLogImage,
        liveUrl: "https://fit-log-phi-next.vercel.app/",
        githubUrl: "https://github.com/sasamir10/fit-log",
        featured: false,
    },
    {
        id: "eventlws",
        title: "EventLWS",
        description:
            "A full-stack event management platform where attendees can discover events, manage registrations, bookmark favorites, and interact with organizers through role-based dashboards.",
        technologies: [
            "React",
            "Vite",
            "JavaScript",
            "Node.js",
            "Express.js",
            "SQLite",
        ],
        image: eventLwsImage,
        liveUrl: "https://your-eventlws.vercel.app/",
        githubUrl: "https://github.com/sasamir10/eventlws",
        featured: false,
    },
    {
        id: "bento-spend",
        title: "BentoSpend",
        description:
            "A responsive expense tracking dashboard that helps users manage expenses, monitor spending patterns, and track monthly budgets.",
        technologies: ["React", "JavaScript", "Vite", "Tailwind CSS"],
        image: bentoSpendImage,
        liveUrl: "https://bento-spend-rnext.vercel.app/",
        githubUrl: "https://github.com/sasamir10/BentoSpend",
        featured: false,
    },
    {
        id: "project-hub",
        title: "Project Hub",
        description:
            "A responsive project management dashboard that enables users to organize projects, manage budgets and quantities, track project statuses, and efficiently search, filter, and sort project records.",
        technologies: ["React", "JavaScript", "Vite", "Tailwind CSS"],
        image: projectHubImage,
        liveUrl: "https://project-hub-rnext.vercel.app/",
        githubUrl: "https://github.com/sasamir10/project-hub",
        featured: false,
    },
];

const cardClasses =
    "group relative flex flex-col overflow-hidden rounded-[14px] border bg-bg-3 transition-all duration-[350ms] ease-[ease] hover:-translate-y-1.5 hover:border-[rgba(0,229,192,0.35)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_40px_rgba(0,229,192,0.07)]";

const revealClasses = "opacity-0 translate-y-10";

function PlaceholderLink({ children, className, label, href }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={className}
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
                            key={project.id}
                            ref={(element) => {
                                cardRefs.current[index] = element;
                            }}
                            data-reveal
                            className={`${cardClasses} ${project.featured ? "border-[rgba(0,229,192,0.2)]" : "border-border"} ${revealClasses} ${revealedCards[index] ? "translate-y-0 opacity-100" : ""}`}
                        >
                            <div className="relative aspect-video overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={`${project.title} preview`}
                                    className="size-full object-cover"
                                />

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
                                    {project.technologies.map((technology) => (
                                        <span
                                            key={technology}
                                            className="rounded-[4px] border border-border bg-cyan-soft px-[0.55rem] py-[0.2rem] font-mono text-[0.68rem] tracking-[0.04em] text-cyan"
                                        >
                                            {technology}
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
                                        href={project.liveUrl}
                                        label={`Live Demo for ${project.title}`}
                                        className="rounded-md bg-cyan px-[0.9rem] py-[0.45rem] font-mono text-[0.75rem] font-bold tracking-[0.03em] text-bg transition-all duration-250 hover:-translate-y-0.5 hover:bg-cyan-dim focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
                                    >
                                        Live Demo ↗
                                    </PlaceholderLink>
                                    {project.githubUrl && (
                                        <PlaceholderLink
                                            href={project.githubUrl}
                                            label={`GitHub for ${project.title}`}
                                            className="rounded-md border border-border bg-transparent px-[0.9rem] py-[0.45rem] font-mono text-[0.75rem] tracking-[0.03em] text-gray transition-all duration-250 hover:border-cyan hover:bg-cyan-soft hover:text-cyan focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
                                        >
                                            GitHub
                                        </PlaceholderLink>
                                    )}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
