import { useEffect, useRef, useState } from "react";

// Replace these placeholder values with your actual academic information.
const education = {
    university: "Shahjalal University of Science and Technology (SUST)",
    degree: "Bachelor of Science (B.Sc.)",
    department: "Civil & Environmental Engineering",
    period: "2020 – 2026",
    status: "Graduated",
    location: "Sylhet, Bangladesh",
    description:
        "My academic background is in Civil and Environmental Engineering, while my interest in programming has led me to explore software development. I’m particularly interested in applying technology to solve real-world problems.",
};

function GraduationCapIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
            className="size-7"
        >
            <path d="m2 10 10-5 10 5-10 5-10-5Z" />
            <path d="M6 12v5c3.5 2.5 8.5 2.5 12 0v-5" />
            <path d="M22 10v6" />
        </svg>
    );
}

function LocationIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
            className="size-4 shrink-0"
        >
            <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
            <circle cx="12" cy="10" r="2.5" />
        </svg>
    );
}

function CalendarIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
            className="size-4 shrink-0"
        >
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <path d="M16 3v4M8 3v4M3 11h18" />
        </svg>
    );
}

export default function Education() {
    const [isRevealed, setIsRevealed] = useState(
        () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
    const educationRef = useRef(null);

    useEffect(() => {
        const card = educationRef.current;

        if (!card || isRevealed) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    setIsRevealed(true);
                    observer.unobserve(entry.target);
                });
            },
            {
                threshold: 0.15,
                rootMargin: "0px 0px -60px 0px",
            },
        );

        observer.observe(card);

        return () => observer.disconnect();
    }, [isRevealed]);

    return (
        <section
            id="education"
            aria-labelledby="education-heading"
            className="relative px-10 py-28 max-[901px]:px-5 max-[901px]:py-20 max-[480px]:px-11 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-[linear-gradient(90deg,transparent,var(--border),transparent)] before:content-['']"
        >
            <div className="mx-auto max-w-content px-8 max-[901px]:px-0">
                {/* Section heading */}
                <div className="mb-5 text-center font-mono text-[0.72rem] uppercase tracking-[0.22em] text-cyan opacity-85">
                    Academic Background
                </div>

                <h2
                    id="education-heading"
                    className="mb-5 text-center font-head text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.15] text-white"
                >
                    My{" "}
                    <span className="relative text-cyan after:absolute after:inset-x-0 after:-bottom-0.75 after:h-0.5 after:rounded-sm after:bg-[linear-gradient(90deg,var(--cyan),transparent)] after:content-['']">
                        Education
                    </span>
                </h2>

                {/* Education card */}
                <article
                    ref={educationRef}
                    data-reveal
                    className={`group relative mx-auto flex max-w-4xl flex-col gap-7 overflow-hidden rounded-[14px] border border-border bg-bg-2 p-6 transition-all duration-700 ease-[ease] hover:-translate-y-1 hover:border-[rgba(0,229,192,0.35)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.4),0_0_30px_rgba(0,229,192,0.08)] motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none sm:p-8 md:flex-row md:items-center ${
                        isRevealed
                            ? "translate-y-0 opacity-100"
                            : "translate-y-10 opacity-0"
                    }`}
                >
                    {/* Decorative background glow */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -right-20 -top-20 size-56 rounded-full bg-cyan opacity-[0.035] blur-3xl transition-opacity duration-300 group-hover:opacity-[0.08]"
                    />

                    {/* Left side: Icon and study period */}
                    <div className="relative flex shrink-0 items-center gap-4 border-b border-border pb-6 md:w-56 md:flex-col md:items-start md:justify-center md:border-r md:border-b-0 md:pb-0 md:pr-8">
                        <div className="flex size-14 shrink-0 items-center justify-center rounded-xl border border-border bg-cyan-soft text-cyan transition-all duration-300 group-hover:border-cyan group-hover:bg-cyan group-hover:text-bg">
                            <GraduationCapIcon />
                        </div>

                        <div className="flex flex-col gap-2">
                            <span className="font-mono text-[0.75rem] font-bold tracking-wide text-cyan">
                                {education.period}
                            </span>

                            <span className="w-fit rounded-full border border-[rgba(0,229,192,0.2)] bg-cyan-soft px-3 py-1 font-mono text-[0.62rem] uppercase tracking-wider text-cyan">
                                {education.status}
                            </span>
                        </div>
                    </div>

                    {/* Right side: Academic details */}
                    <div className="relative min-w-0 flex-1">
                        <p className="mb-3 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-cyan opacity-85">
                            University
                        </p>

                        <h3 className="mb-3 font-head text-[clamp(1.25rem,2.5vw,1.75rem)] font-bold leading-tight text-white">
                            {education.university}
                        </h3>

                        <p className="mb-2 font-head text-base font-semibold text-white">
                            {education.degree}
                        </p>

                        <p className="mb-5 text-sm leading-relaxed text-gray">
                            {education.department}
                        </p>

                        <p className="mb-5 text-sm leading-relaxed text-gray">
                            {education.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-5">
                            <div className="flex items-center gap-2 text-gray">
                                <CalendarIcon />
                                <span className="text-[0.82rem]">
                                    {education.period}
                                </span>
                            </div>

                            <div className="flex items-center gap-2 text-gray">
                                <LocationIcon />
                                <span className="text-[0.82rem]">
                                    {education.location}
                                </span>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </section>
    );
}
