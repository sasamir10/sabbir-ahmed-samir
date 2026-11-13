import { useEffect, useRef, useState } from "react";

const skills = [
    {
        name: "HTML5",
        description: "Semantic markup, accessibility, SEO-friendly structure",
        percentage: 95,
        icon: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                focusable="false"
            >
                <path
                    d="M4 3h16l-1.5 15.5L12 21l-6.5-2.5L4 3z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                />
                <path
                    d="M12 8h4l-.5 5L12 14l-3.5-1-.2-2.5H10l.1 1.5L12 13l2-.5.3-2.5H8L7.5 8H12z"
                    fill="currentColor"
                />
            </svg>
        ),
    },
    {
        name: "CSS3",
        description: "Flexbox, Grid, animations, custom properties",
        percentage: 90,
        icon: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                focusable="false"
            >
                <path
                    d="M4 3h16l-1.5 15.5L12 21l-6.5-2.5L4 3z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                />
                <path
                    d="M12 9.5h3.5l-.3 3.5-3.2.9-3.2-.9-.2-2.5h1.5l.1 1.2 1.8.5 1.8-.5.2-1.7H8.3L8 8H16l-.2 1.5H12z"
                    fill="currentColor"
                />
            </svg>
        ),
    },
    {
        name: "JavaScript",
        description: "ES6+, DOM manipulation, async programming",
        percentage: 88,
        icon: (
            <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
            >
                <path d="M3 3h18v18H3V3zm16.525 13.707c-.131-.821-.666-1.511-2.252-2.155-.552-.259-1.165-.438-1.349-.854-.068-.248-.078-.382-.034-.529.113-.484.687-.629 1.137-.495.293.09.563.315.732.676.775-.507.775-.507 1.316-.844-.203-.314-.304-.451-.439-.586-.473-.528-1.103-.798-2.126-.775l-.528.067c-.507.124-.991.395-1.283.754-.855.968-.608 2.655.427 3.354 1.023.765 2.521.933 2.712 1.653.18.878-.652 1.159-1.475 1.058-.607-.136-.945-.439-1.316-1.002l-1.372.788c.157.359.337.517.607.832 1.305 1.316 4.568 1.249 5.153-.754.021-.067.18-.528.056-1.237l.034.049zm-6.737-5.434h-1.686c0 1.453-.007 2.898-.007 4.354 0 .924.047 1.772-.104 2.033-.247.517-.886.451-1.175.359-.297-.146-.448-.349-.623-.641-.047-.078-.082-.146-.095-.146l-1.368.844c.229.473.563.879.994 1.137.641.383 1.502.507 2.404.305.588-.17 1.095-.519 1.358-1.059.384-.697.302-1.553.299-2.509.008-1.541 0-3.083 0-4.635l.003-.042z" />
            </svg>
        ),
    },
    {
        name: "React",
        description: "Hooks, Context API, component architecture",
        percentage: 82,
        icon: (
            <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
            >
                <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.36-.034-.47 0-.92.014-1.36.034.44-.572.895-1.096 1.36-1.564zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.31-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.387zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.150-1.315.283-2.015.386.24-.375.48-.762.705-1.158.225-.39.435-.782.634-1.176zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.36.034.47 0 .92-.014 1.36-.034-.44.572-.895 1.095-1.36 1.565-.455-.47-.91-.993-1.36-1.565z" />
            </svg>
        ),
    },
    {
        name: "GitHub",
        description: "Version control, collaboration, CI/CD workflows",
        percentage: 85,
        icon: (
            <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
            >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
        ),
    },
];

const cardRevealClasses = "opacity-0 transform-[translateY(40px)]";

const cardClasses =
    "group relative isolate overflow-hidden rounded-[14px] border border-border bg-bg-2 p-8 px-[1.8rem] transition-all duration-[350ms] ease-[ease] hover:-translate-y-1.5 hover:border-[rgba(0,229,192,0.35)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.4),0_0_30px_rgba(0,229,192,0.08)] before:pointer-events-none before:absolute before:inset-0 before:z-0 before:bg-[linear-gradient(135deg,rgba(0,229,192,0.04)_0%,transparent_60%)] before:opacity-0 before:transition-opacity before:duration-[350ms] before:content-[''] group-hover:before:opacity-100";

export default function Skills() {
    const [revealedCards, setRevealedCards] = useState({});
    const [animatedBars, setAnimatedBars] = useState({});
    const cardRefs = useRef([]);
    const barRefs = useRef([]);

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

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    const index = barRefs.current.indexOf(entry.target);
                    if (index === -1) return;

                    setAnimatedBars((current) => ({
                        ...current,
                        [index]: true,
                    }));
                    observer.unobserve(entry.target);
                });
            },
            { threshold: 0.3 },
        );

        barRefs.current.forEach((bar) => {
            if (bar) observer.observe(bar);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="skills"
            className="relative px-10 py-28 max-[901px]:px-5 max-[901px]:py-20 max-[480px]:px-11"
        >
            <div className="mx-auto max-w-content px-8 max-[901px]:px-0">
                <div className="mb-5 font-mono text-[0.72rem] uppercase tracking-[0.22em] text-cyan opacity-85">
                    Skills
                </div>

                <h2 className="mb-5 text-center font-head text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.15] text-white">
                    My{" "}
                    <span className="relative text-cyan after:absolute after:inset-x-0 after:-bottom-0.75 after:h-0.5 after:rounded-sm after:bg-[linear-gradient(90deg,var(--cyan),transparent)] after:content-['']">
                        Tech Stack
                    </span>
                </h2>

                <p className="mb-14 text-center text-[1.05rem] text-gray">
                    Technologies I use to bring ideas to life
                </p>

                <div className="grid grid-cols-3 gap-6 max-[1025px]:grid-cols-2 max-[769px]:grid-cols-1">
                    {skills.map(
                        ({ name, description, percentage, icon }, index) => (
                            <article
                                key={name}
                                ref={(element) => {
                                    cardRefs.current[index] = element;
                                }}
                                data-reveal
                                className={`${cardClasses} ${cardRevealClasses} ${revealedCards[index] ? "transform-none opacity-100" : ""}`}
                            >
                                <div className="relative z-10">
                                    <div className="mb-4 flex size-12 items-center justify-center rounded-[10px] border border-border bg-cyan-soft text-cyan transition-all duration-300 group-hover:border-cyan group-hover:bg-cyan group-hover:text-bg">
                                        <svg className="size-6" {...icon.props}>
                                            {icon.props.children}
                                        </svg>
                                    </div>

                                    <h3 className="mb-2 font-head text-[1.1rem] font-bold text-white">
                                        {name}
                                    </h3>
                                    <p className="mb-[1.2rem] text-[0.83rem] leading-[1.6] text-gray">
                                        {description}
                                    </p>

                                    <div
                                        ref={(element) => {
                                            barRefs.current[index] = element;
                                        }}
                                        role="progressbar"
                                        aria-label={`${name} proficiency`}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                        aria-valuenow={percentage}
                                        aria-valuetext={`${percentage}%`}
                                        className="mb-[0.4rem] h-1 overflow-hidden rounded-[4px] bg-bg-3"
                                    >
                                        <div
                                            className={`h-full rounded-[4px] bg-linear-to-r from-cyan-dim to-cyan transition-[width] duration-1200 delay-300 ease-[ease] ${animatedBars[index] ? "" : "w-0"}`}
                                            style={{
                                                width: animatedBars[index]
                                                    ? `${percentage}%`
                                                    : undefined,
                                            }}
                                        />
                                    </div>
                                    <span className="font-mono text-[0.72rem] text-cyan">
                                        {percentage}%
                                    </span>
                                </div>
                            </article>
                        ),
                    )}
                </div>
            </div>
        </section>
    );
}
