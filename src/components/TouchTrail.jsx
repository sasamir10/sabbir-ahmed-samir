import { useEffect } from "react";

export default function TouchTrail() {
    useEffect(() => {
        const isMobile = window.matchMedia("(pointer: coarse)").matches;

        if (!isMobile) return;

        const dots = [];
        const COUNT = 4;

        for (let i = 0; i < COUNT; i++) {
            const dot = document.createElement("div");

            dot.style.cssText = `
                position: fixed;
                width: ${5 - i}px;
                height: ${5 - i}px;
                border-radius: 50%;
                background: rgba(0, 229, 192, ${0.55 - i * 0.1});
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

        let touchX = 0;
        let touchY = 0;
        let isTouching = false;
        let animationFrame;

        const handlePointerMove = (event) => {
            if (event.pointerType !== "touch") return;

            touchX = event.clientX;
            touchY = event.clientY;
            isTouching = true;
        };

        const handlePointerEnd = () => {
            isTouching = false;
        };

        const animateTrail = () => {
            if (isTouching) {
                let px = touchX;
                let py = touchY;

                dots.forEach((dot, i) => {
                    dot.x += (px - dot.x) * (0.35 - i * 0.05);
                    dot.y += (py - dot.y) * (0.35 - i * 0.05);

                    dot.el.style.left = `${dot.x}px`;
                    dot.el.style.top = `${dot.y}px`;

                    px = dot.x;
                    py = dot.y;
                });
            }

            animationFrame = requestAnimationFrame(animateTrail);
        };

        window.addEventListener("pointermove", handlePointerMove);
        window.addEventListener("pointerup", handlePointerEnd);
        window.addEventListener("pointercancel", handlePointerEnd);

        animateTrail();

        return () => {
            window.removeEventListener("pointermove", handlePointerMove);
            window.removeEventListener("pointerup", handlePointerEnd);
            window.removeEventListener("pointercancel", handlePointerEnd);

            cancelAnimationFrame(animationFrame);
            dots.forEach((dot) => dot.el.remove());
        };
    }, []);

    return null;
}
