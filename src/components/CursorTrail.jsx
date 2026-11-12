import { useEffect } from "react";

export default function CursorTrail() {
    useEffect(() => {
        if (window.matchMedia("(max-width: 767px)").matches) {
            return;
        }

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return;
        }

        const dots = [];
        const COUNT = 6;

        for (let i = 0; i < COUNT; i++) {
            const dot = document.createElement("div");

            dot.style.cssText = `
                position: fixed;
                width: ${6 - i}px;
                height: ${6 - i}px;
                border-radius: 50%;
                background: rgba(0, 229, 192, ${0.55 - i * 0.08});
                pointer-events: none;
                z-index: 9999;
                transform: translate(-50%, -50%);
                mix-blend-mode: screen;
            `;

            document.body.appendChild(dot);

            dots.push({
                el: dot,
                x: 0,
                y: 0,
            });
        }

        let mouseX = 0;
        let mouseY = 0;
        let animationFrame;

        const handleMouseMove = (event) => {
            mouseX = event.clientX;
            mouseY = event.clientY;
        };

        const animateTrail = () => {
            let px = mouseX;
            let py = mouseY;

            dots.forEach((dot, i) => {
                dot.x += (px - dot.x) * (0.35 - i * 0.04);
                dot.y += (py - dot.y) * (0.35 - i * 0.04);

                dot.el.style.left = `${dot.x}px`;
                dot.el.style.top = `${dot.y}px`;

                px = dot.x;
                py = dot.y;
            });

            animationFrame = requestAnimationFrame(animateTrail);
        };

        window.addEventListener("mousemove", handleMouseMove);

        animateTrail();

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrame);
            dots.forEach((dot) => dot.el.remove());
        };
    }, []);

    return null;
}
