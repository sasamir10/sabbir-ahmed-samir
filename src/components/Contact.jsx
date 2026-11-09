const emailAddress = "sabbirxahmed18@gmail.com";
const [emailLocalPart, emailDomain] = emailAddress.split("@");

const socialLinks = [
    { name: "GitHub", href: "#", icon: "github" },
    { name: "LinkedIn", href: "#", icon: "linkedin" },
];

function Icon({ name, className = "size-5" }) {
    const commonProps = {
        className,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 1.7,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        "aria-hidden": true,
        focusable: false,
    };

    if (name === "email") {
        return (
            <svg {...commonProps}>
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m4 7 8 6 8-6" />
            </svg>
        );
    }

    if (name === "location") {
        return (
            <svg {...commonProps}>
                <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                <circle cx="12" cy="10" r="2.5" />
            </svg>
        );
    }

    if (name === "github") {
        return (
            <svg
                className={className}
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
            >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
            </svg>
        );
    }

    if (name === "linkedin") {
        return (
            <svg
                className={className}
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
            >
                <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.26 2.37 4.26 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.44c.98 0 1.79-.77 1.79-1.72V1.72C24 .77 23.19 0 22.21 0h.01Z" />
            </svg>
        );
    }

    return (
        <svg {...commonProps}>
            <path d="M7 17 17 7M7 7h10v10" />
        </svg>
    );
}

export default function Contact() {
    return (
        <section id="contact" className="relative min-h-screen px-10 py-28">
            <div className="mx-auto max-w-content px-8">
                <div className="mb-5 font-mono text-[0.72rem] uppercase tracking-[0.22em] text-cyan opacity-85">
                    GET IN TOUCH
                </div>

                <h2 className="mb-5 text-center font-head text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.15] text-white">
                    Let&apos;s work together.
                </h2>

                <p className="mx-auto mb-14 max-w-2xl text-center text-[1.05rem] text-gray">
                    Have an opportunity, project idea, or just want to connect?
                    Feel free to reach out.
                </p>

                <div className="mx-auto grid max-w-5xl gap-6 min-[769px]:grid-cols-[1.2fr_0.8fr]">
                    <article className="rounded-[18px] border border-border bg-bg-2 p-6 transition-all duration-300 hover:border-[rgba(0,229,192,0.35)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.35),0_0_30px_rgba(0,229,192,0.06)] focus-within:border-cyan sm:p-8">
                        <div className="mb-7 flex size-12 items-center justify-center rounded-xl border border-border bg-cyan-soft text-cyan">
                            <Icon name="email" className="size-5" />
                        </div>

                        <p className="mb-2 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-cyan">
                            Email
                        </p>
                        <p className="mb-2 font-head text-[clamp(1rem,2.4vw,1.65rem)] font-semibold text-white">
                            {emailLocalPart}
                            <wbr />@{emailDomain}
                        </p>
                        <p className="mb-7 text-[0.9rem] text-gray">
                            The easiest way to get in touch with me.
                        </p>

                        <a
                            href={`mailto:${emailAddress}`}
                            className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-cyan px-5 py-3 font-head text-[0.9rem] font-bold text-bg transition-all duration-200 hover:-translate-y-0.5 hover:bg-cyan-dim focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan"
                        >
                            Send me an email
                            <Icon name="external" className="size-4" />
                        </a>
                    </article>

                    <div className="flex flex-col">
                        <h3 className="mb-4 font-head text-[1.1rem] font-bold text-white">
                            Connect with me
                        </h3>
                        <div className="grid gap-3 sm:grid-cols-2 min-[769px]:grid-cols-1">
                            {socialLinks.map(({ name, href, icon }) => (
                                <a
                                    key={name}
                                    href={href}
                                    aria-label={`${name} profile (link not provided)`}
                                    className="flex min-h-16 items-center gap-4 rounded-xl border border-border bg-bg-2 px-5 py-4 text-gray transition-all duration-200 hover:border-[rgba(0,229,192,0.35)] hover:bg-cyan-soft hover:text-cyan focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
                                    onClick={(event) => event.preventDefault()}
                                >
                                    <Icon
                                        name={icon}
                                        className="size-5 shrink-0"
                                    />
                                    <span className="font-head font-semibold text-white">
                                        {name}
                                    </span>
                                    <Icon
                                        name="external"
                                        className="ml-auto size-4 opacity-70"
                                    />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mx-auto mt-8 flex max-w-5xl flex-wrap gap-x-8 gap-y-4 border-t border-border pt-6">
                    <div className="flex items-center gap-3 text-gray">
                        <Icon
                            name="location"
                            className="size-[1.1rem] shrink-0 text-cyan"
                        />
                        <span className="text-[0.88rem]">
                            <span className="mr-2 font-mono text-[0.7rem] uppercase tracking-widest text-gray-dark">
                                Location
                            </span>
                            Sylhet, Bangladesh
                        </span>
                    </div>
                    <div className="flex items-center gap-3 text-gray">
                        <span className="size-2 shrink-0 rounded-full bg-cyan shadow-[0_0_12px_var(--cyan-glow)]" />
                        <span className="text-[0.88rem]">
                            <span className="mr-2 font-mono text-[0.7rem] uppercase tracking-widest text-gray-dark">
                                Availability
                            </span>
                            Open to Freelance
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
