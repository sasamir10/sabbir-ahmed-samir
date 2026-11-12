import { useEffect } from "react";

export default function TouchTrail() {
    useEffect(() => {
        if (
            !window.matchMedia("(pointer: coarse)").matches ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            return;
        }

        const PARTICLE_COUNT = 7;
        const particles = [];

        let touchX = 0;
        let touchY = 0;
        let isTouching = false;
        let activePointerId = null;

        let animationFrame = null;
        let isAnimating = false;
        let lastFrameTime = 0;

        // Create circular particles
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const particle = document.createElement("div");

            const size = 16 - i;

            particle.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: ${size}px;
                height: ${size}px;
                box-sizing: border-box;
                border: 1.4px solid rgba(0, 229, 192, ${0.95 - i * 0.08});
                border-radius: 50%;
                background: rgba(0, 229, 192, 0.035);
                box-shadow:
                    0 0 8px rgba(0, 229, 192, 0.3),
                    inset 0 0 4px rgba(0, 229, 192, 0.15);
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

        const animate = (timestamp) => {
            const delta = lastFrameTime
                ? Math.min(timestamp - lastFrameTime, 50)
                : 16.67;

            lastFrameTime = timestamp;

            const frameScale = delta / 16.67;

            let targetX = touchX;
            let targetY = touchY;
            let hasVisibleParticles = false;

            particles.forEach((particle, i) => {
                if (isTouching) {
                    const followSpeed = 0.42 - i * 0.035;

                    particle.x += (targetX - particle.x) * followSpeed;

                    particle.y += (targetY - particle.y) * followSpeed;

                    const targetOpacity = 0.95 - i * 0.07;

                    particle.opacity +=
                        (targetOpacity - particle.opacity) *
                        Math.min(1, 0.25 * frameScale);
                } else {
                    particle.opacity *= Math.pow(0.88, frameScale);

                    if (particle.opacity < 0.01) {
                        particle.opacity = 0;
                    }
                }

                particle.el.style.transform = `translate3d(${particle.x}px, ${particle.y}px, 0) translate(-50%, -50%)`;

                particle.el.style.opacity = particle.opacity;

                if (particle.opacity > 0) {
                    hasVisibleParticles = true;
                }

                // Next particle follows the previous one
                targetX = particle.x;
                targetY = particle.y;
            });

            if (isTouching || hasVisibleParticles) {
                animationFrame = requestAnimationFrame(animate);
            } else {
                isAnimating = false;
                animationFrame = null;
                lastFrameTime = 0;
            }
        };

        const startAnimation = () => {
            if (isAnimating) return;

            isAnimating = true;
            animationFrame = requestAnimationFrame(animate);
        };

        const handlePointerDown = (event) => {
            if (event.pointerType !== "touch") return;
            if (activePointerId !== null) return;

            activePointerId = event.pointerId;

            touchX = event.clientX;
            touchY = event.clientY;
            isTouching = true;

            // Initialize all particles at the touch position
            particles.forEach((particle) => {
                particle.x = touchX;
                particle.y = touchY;
                particle.opacity = 0;
            });

            startAnimation();
        };

        const handlePointerMove = (event) => {
            if (!isTouching || event.pointerId !== activePointerId) {
                return;
            }

            touchX = event.clientX;
            touchY = event.clientY;
        };

        const handlePointerEnd = (event) => {
            if (event.pointerId !== activePointerId) return;

            isTouching = false;
            activePointerId = null;

            startAnimation();
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
