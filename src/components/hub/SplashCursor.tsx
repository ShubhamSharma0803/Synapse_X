import { useRef, useEffect } from "react";

/* ═══════════════════════════════════════════════════════
   SPLASH CURSOR — Fading neural-cyan particle trail
   Renders on a full-screen canvas above the background.
   ═══════════════════════════════════════════════════════ */

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
    size: number;
}

const MAX_PARTICLES = 80;

const SplashCursor = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animId: number;
        let w = 0;
        let h = 0;
        const particles: Particle[] = [];
        let mouseX = -999;
        let mouseY = -999;
        let prevX = -999;
        let prevY = -999;

        const resize = () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        };

        const onMove = (e: MouseEvent) => {
            prevX = mouseX;
            prevY = mouseY;
            mouseX = e.clientX;
            mouseY = e.clientY;

            const dx = mouseX - prevX;
            const dy = mouseY - prevY;
            const speed = Math.sqrt(dx * dx + dy * dy);
            const count = Math.min(3, Math.floor(speed / 8));

            for (let i = 0; i < count; i++) {
                if (particles.length >= MAX_PARTICLES) particles.shift();
                particles.push({
                    x: mouseX + (Math.random() - 0.5) * 8,
                    y: mouseY + (Math.random() - 0.5) * 8,
                    vx: (Math.random() - 0.5) * 1.5,
                    vy: (Math.random() - 0.5) * 1.5,
                    life: 1,
                    maxLife: 40 + Math.random() * 30,
                    size: 1.5 + Math.random() * 2,
                });
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, w, h);

            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.life += 1;

                if (p.life >= p.maxLife) {
                    particles.splice(i, 1);
                    continue;
                }

                const alpha = 1 - p.life / p.maxLife;
                const r = p.size * alpha;

                ctx.beginPath();
                ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 229, 255, ${alpha * 0.6})`;
                ctx.fill();

                // glow
                ctx.beginPath();
                ctx.arc(p.x, p.y, r * 2.5, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 229, 255, ${alpha * 0.08})`;
                ctx.fill();
            }

            animId = requestAnimationFrame(draw);
        };

        resize();
        draw();
        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", onMove);

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", onMove);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="pointer-events-none fixed inset-0"
            style={{ zIndex: 9999 }}
        />
    );
};

export default SplashCursor;
