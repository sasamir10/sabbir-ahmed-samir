import { useEffect, useRef, useState } from "react";
import profileImage from "../assets/images/profile-2.jpeg";

const highlights = [
    { icon: "🎯", label: "Pixel-Perfect Design" },
    { icon: "⚡", label: "Performance Focused" },
    { icon: "📱", label: "Fully Responsive" },
    { icon: "♿", label: "Accessibility First" },
];

const revealClasses =
    "opacity-0 transform-[translateY(40px)] transition-[opacity,transform] duration-[800ms] ease-[ease] motion-reduce:opacity-100 motion-reduce:transform-none motion-reduce:transition-none";

export default function About() {
    const [revealed, setRevealed] = useState({ visual: false, text: false });
    const visualRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const revealTimers = new Set();
        const targets = [
            { element: visualRef.current, key: "visual", delay: 0 },
            { element: textRef.current, key: "text", delay: 100 },
        ].filter(({ element }) => element);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    const target = targets.find(
                        ({ element }) => element === entry.target,
                    );
                    if (!target) return;

                    const timer = window.setTimeout(() => {
                        revealTimers.delete(timer);
                        setRevealed((current) => ({
                            ...current,
                            [target.key]: true,
                        }));
                    }, target.delay);

                    revealTimers.add(timer);
                    observer.unobserve(entry.target);
                });
            },
            { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
        );

        targets.forEach(({ element }) => observer.observe(element));

        return () => {
            observer.disconnect();
            revealTimers.forEach((timer) => window.clearTimeout(timer));
        };
    }, []);

    const handleContactClick = (event) => {
        const contactSection = document.getElementById("contact");
        if (!contactSection) return;

        event.preventDefault();
        const contactTop =
            contactSection.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: contactTop, behavior: "smooth" });
    };

    return (
        <section
            id="about"
            className="relative bg-bg-2 px-10 py-28 max-[901px]:px-5 max-[901px]:py-20 max-[480px]:px-11 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-[linear-gradient(90deg,transparent,var(--border),transparent)] before:content-['']"
        >
            <div className="mx-auto max-w-content px-8 max-[901px]:px-0">
                <div className="mb-5 font-mono text-[0.72rem] uppercase tracking-[0.22em] text-cyan opacity-85">
                    About The Behind Architect
                </div>

                <div className="grid grid-cols-[1fr_1.5fr] items-center gap-20 max-[901px]:grid-cols-1 max-[901px]:gap-12">
                    <div
                        ref={visualRef}
                        data-reveal
                        className={`${revealClasses} ${revealed.visual ? "transform-none opacity-100" : ""}`}
                    >
                        <div className="relative flex aspect-square w-full max-w-90 items-center justify-center overflow-hidden rounded-[20px] border border-border bg-[linear-gradient(135deg,var(--bg-3)_0%,#0d1c2c_100%)] max-[901px]:mx-auto max-[901px]:max-w-75">
                            <img
                                src={profileImage}
                                alt="Sabbir Ahmed"
                                width="360"
                                height="360"
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                    </div>

                    <div
                        ref={textRef}
                        data-reveal
                        className={`${revealClasses} flex flex-col gap-5 delay-100 ${revealed.text ? "transform-none opacity-100" : ""}`}
                    >
                        <h2 className="mb-[1.2rem] font-head text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.15] text-white">
                            Passionate About{" "}
                            <span className="relative text-cyan after:absolute after:inset-x-0 after:-bottom-0.75 after:h-0.5 after:rounded-sm after:bg-[linear-gradient(90deg,var(--cyan),transparent)] after:content-['']">
                                Building
                            </span>
                            <br />
                            Great Web Experiences
                        </h2>

                        <p className="text-base leading-[1.8] text-gray">
                            Front-end developer focused on building responsive,
                            accessible, and interaction-driven interfaces. I
                            enjoy transforming modern UI concepts into clean,
                            performant web experiences.
                        </p>

                        <div className="my-2 grid grid-cols-2 gap-3 max-[769px]:grid-cols-1">
                            {highlights.map(({ icon, label }) => (
                                <div
                                    key={label}
                                    className="flex items-center gap-2.5 rounded-lg border border-border bg-cyan-soft px-3.5 py-2.5 text-sm text-white transition-all duration-250 hover:border-[rgba(0,229,192,0.3)] hover:bg-[rgba(0,229,192,0.1)]"
                                >
                                    <span
                                        aria-hidden="true"
                                        className="text-base"
                                    >
                                        {icon}
                                    </span>
                                    <span>{label}</span>
                                </div>
                            ))}
                        </div>

                        <a
                            href="#contact"
                            onClick={handleContactClick}
                            className="inline-block rounded-lg border-2 border-cyan bg-cyan px-8 py-3.5 font-head text-[0.92rem] font-bold tracking-[0.02em] text-bg no-underline transition-all duration-300 hover:-translate-y-0.5 hover:bg-transparent hover:text-cyan hover:shadow-[0_8px_30px_var(--cyan-glow)]"
                        >
                            Let&apos;s Work Together
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
