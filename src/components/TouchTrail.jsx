import { useEffect } from "react";

export default function TouchTrail() {
    useEffect(() => {
        if (!window.matchMedia("(pointer: coarse)").matches) {
            return;
        }

        const PARTICLE_COUNT = 8;
        const particles = [];

        let touchX = 0;
        let touchY = 0;
        let isTouching = false;
        let animationFrame = null;
        let isAnimating = false;

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const particle = document.createElement("div");
            const size = 7 - i * 0.5;

            particle.style.cssText = `
                position: fixed;
                left: 0;
                top: 0;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: rgba(0, 229, 192, ${0.9 - i * 0.07});
                box-shadow: 0 0 8px rgba(0, 229, 192, 0.45);
                pointer-events: none;
                z-index: 9999;
                opacity: 0;
                transform: translate(-50%, -50%);
                will-change: transform, opacity;
            `;

            document.body.appendChild(particle);

            particles.push({
                el: particle,
                x: 0,
                y: 0,
                opacity: 0,
            });
        }

        const startAnimation = () => {
            if (isAnimating) return;

            isAnimating = true;
            animationFrame = requestAnimationFrame(animate);
        };

        const handlePointerDown = (event) => {
            if (event.pointerType !== "touch") return;

            touchX = event.clientX;
            touchY = event.clientY;
            isTouching = true;

            particles.forEach((particle) => {
                particle.x = touchX;
                particle.y = touchY;
                particle.opacity = 1;
            });

            startAnimation();
        };

        const handlePointerMove = (event) => {
            if (event.pointerType !== "touch" || !isTouching) return;

            touchX = event.clientX;
            touchY = event.clientY;

            startAnimation();
        };

        const handlePointerEnd = (event) => {
            if (event.pointerType !== "touch") return;

            isTouching = false;
            startAnimation();
        };

        const animate = () => {
            let targetX = touchX;
            let targetY = touchY;
            let hasVisibleParticles = false;

            particles.forEach((particle, i) => {
                if (isTouching) {
                    const followSpeed = 0.38 - i * 0.035;

                    particle.x += (targetX - particle.x) * followSpeed;

                    particle.y += (targetY - particle.y) * followSpeed;

                    particle.opacity += (1 - particle.opacity) * 0.2;
                } else {
                    particle.opacity *= 0.88;

                    if (particle.opacity < 0.01) {
                        particle.opacity = 0;
                    }
                }

                particle.el.style.transform = `translate(${particle.x}px, ${particle.y}px) translate(-50%, -50%)`;

                particle.el.style.opacity = particle.opacity;

                if (particle.opacity > 0) {
                    hasVisibleParticles = true;
                }

                targetX = particle.x;
                targetY = particle.y;
            });

            if (isTouching || hasVisibleParticles) {
                animationFrame = requestAnimationFrame(animate);
            } else {
                isAnimating = false;
                animationFrame = null;
            }
        };

        window.addEventListener("pointerdown", handlePointerDown, {
            passive: true,
        });

        window.addEventListener("pointermove", handlePointerMove, {
            passive: true,
        });

        window.addEventListener("pointerup", handlePointerEnd);
        window.addEventListener("pointercancel", handlePointerEnd);

        return () => {
            window.removeEventListener("pointerdown", handlePointerDown);
            window.removeEventListener("pointermove", handlePointerMove);
            window.removeEventListener("pointerup", handlePointerEnd);
            window.removeEventListener("pointercancel", handlePointerEnd);

            if (animationFrame !== null) {
                cancelAnimationFrame(animationFrame);
            }

            particles.forEach(({ el }) => el.remove());
        };
    }, []);

    return null;
}
