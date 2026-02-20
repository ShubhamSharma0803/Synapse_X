import { useRef, useEffect } from "react";

/* ═══════════════════════════════════════════════════════
   HYPERSPEED — Canvas star-tunnel background
   Runs at ultra-slow drift speed behind all hub content.
   ═══════════════════════════════════════════════════════ */

interface Star {
    x: number;
    y: number;
    z: number;
    px: number;
    py: number;
}

const STAR_COUNT = 600;
const SPEED = 0.15;            // ultra-slow drift
const TRAIL_ALPHA = 0.08;      // faint trail persistence

const Hyperspeed = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animId: number;
        let w = 0;
        let h = 0;

        const stars: Star[] = [];

        const resize = () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        };

        const initStars = () => {
            stars.length = 0;
            for (let i = 0; i < STAR_COUNT; i++) {
                const s: Star = {
                    x: (Math.random() - 0.5) * w * 2,
                    y: (Math.random() - 0.5) * h * 2,
                    z: Math.random() * w,
                    px: 0,
                    py: 0,
                };
                s.px = s.x;
                s.py = s.y;
                stars.push(s);
            }
        };

        const draw = () => {
            ctx.fillStyle = `rgba(0, 0, 0, ${TRAIL_ALPHA})`;
            ctx.fillRect(0, 0, w, h);

            const cx = w / 2;
            const cy = h / 2;

            for (const s of stars) {
                s.px = s.x;
                s.py = s.y;
                s.z -= SPEED;

                if (s.z <= 0) {
                    s.x = (Math.random() - 0.5) * w * 2;
                    s.y = (Math.random() - 0.5) * h * 2;
                    s.z = w;
                    s.px = s.x;
                    s.py = s.y;
                }

                const sx = (s.x / s.z) * w + cx;
                const sy = (s.y / s.z) * h + cy;
                const spx = (s.px / (s.z + SPEED)) * w + cx;
                const spy = (s.py / (s.z + SPEED)) * h + cy;

                const size = Math.max(0.5, (1 - s.z / w) * 2.5);
                const alpha = Math.min(1, (1 - s.z / w) * 1.2);

                ctx.beginPath();
                ctx.moveTo(spx, spy);
                ctx.lineTo(sx, sy);
                ctx.strokeStyle = `rgba(0, 229, 255, ${alpha * 0.5})`;
                ctx.lineWidth = size;
                ctx.stroke();

                ctx.beginPath();
                ctx.arc(sx, sy, size * 0.6, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 229, 255, ${alpha * 0.8})`;
                ctx.fill();
            }

            animId = requestAnimationFrame(draw);
        };

        resize();
        initStars();
        draw();
        window.addEventListener("resize", resize);

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="pointer-events-none fixed inset-0 z-0"
            style={{ opacity: 0.35 }}
        />
    );
};

export default Hyperspeed;
