import { useRef, useEffect } from "react";

/* ═══════════════════════════════════════════════════════
   ELECTRO BORDER — Animated electric pulse border
   Draws an animated glowing border using canvas overlay.
   ═══════════════════════════════════════════════════════ */

interface ElectroBorderProps {
    children: React.ReactNode;
    /** CSS color: "cyan" | "red" | "green" or any valid color */
    color?: string;
    /** 0-1 intensity (affects glow + speed) */
    intensity?: number;
    className?: string;
    borderRadius?: number;
}

const COLOR_MAP: Record<string, string> = {
    cyan: "0, 229, 255",
    red: "239, 68, 68",
    green: "34, 197, 94",
};

const ElectroBorder = ({
    children,
    color = "cyan",
    intensity = 0.6,
    className = "",
    borderRadius = 16,
}: ElectroBorderProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const rgb = COLOR_MAP[color] || color;

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animId: number;

        const draw = () => {
            const rect = container.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            canvas.style.width = `${rect.width}px`;
            canvas.style.height = `${rect.height}px`;
            ctx.scale(dpr, dpr);

            const w = rect.width;
            const h = rect.height;
            const time = Date.now() * 0.002 * (0.5 + intensity);

            ctx.clearRect(0, 0, w, h);

            // Perimeter glow pulse
            const perimeter = 2 * (w + h);
            const pulsePos = ((time * 80) % perimeter);

            // Draw rounded rect path
            const drawRoundedRect = () => {
                const r = borderRadius;
                ctx.beginPath();
                ctx.moveTo(r, 0);
                ctx.lineTo(w - r, 0);
                ctx.arcTo(w, 0, w, r, r);
                ctx.lineTo(w, h - r);
                ctx.arcTo(w, h, w - r, h, r);
                ctx.lineTo(r, h);
                ctx.arcTo(0, h, 0, h - r, r);
                ctx.lineTo(0, r);
                ctx.arcTo(0, 0, r, 0, r);
                ctx.closePath();
            };

            // Base border
            drawRoundedRect();
            ctx.strokeStyle = `rgba(${rgb}, ${0.15 + intensity * 0.1})`;
            ctx.lineWidth = 1;
            ctx.stroke();

            // Traveling pulse — use gradient along the stroke
            const pulseLen = 120;
            const getPointOnPerimeter = (dist: number): [number, number] => {
                const r = borderRadius;
                let d = dist % perimeter;
                if (d < 0) d += perimeter;

                // Top edge
                if (d < w - 2 * r) return [r + d, 0];
                d -= w - 2 * r;
                // Top-right arc
                if (d < (Math.PI / 2) * r) {
                    const angle = d / r;
                    return [w - r + Math.sin(angle) * r, r - Math.cos(angle) * r];
                }
                d -= (Math.PI / 2) * r;
                // Right edge
                if (d < h - 2 * r) return [w, r + d];
                d -= h - 2 * r;
                // Bottom-right arc
                if (d < (Math.PI / 2) * r) {
                    const angle = d / r;
                    return [w - r + Math.cos(angle) * r, h - r + Math.sin(angle) * r];
                }
                d -= (Math.PI / 2) * r;
                // Bottom edge
                if (d < w - 2 * r) return [w - r - d, h];
                d -= w - 2 * r;
                // Bottom-left arc
                if (d < (Math.PI / 2) * r) {
                    const angle = d / r;
                    return [r - Math.sin(angle) * r, h - r + Math.cos(angle) * r];
                }
                d -= (Math.PI / 2) * r;
                // Left edge
                if (d < h - 2 * r) return [0, h - r - d];
                d -= h - 2 * r;
                // Top-left arc
                const angle = d / r;
                return [r - Math.cos(angle) * r, r - Math.sin(angle) * r];
            };

            // Draw pulse dot
            for (let i = 0; i < pulseLen; i += 4) {
                const [px, py] = getPointOnPerimeter(pulsePos - i);
                const alpha = (1 - i / pulseLen) * intensity * 0.8;
                const glowR = 3 + (1 - i / pulseLen) * 4 * intensity;
                ctx.beginPath();
                ctx.arc(px, py, glowR, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${rgb}, ${alpha * 0.3})`;
                ctx.fill();
                ctx.beginPath();
                ctx.arc(px, py, 1.5, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${rgb}, ${alpha})`;
                ctx.fill();
            }

            animId = requestAnimationFrame(draw);
        };

        draw();
        return () => cancelAnimationFrame(animId);
    }, [rgb, intensity, borderRadius]);

    return (
        <div ref={containerRef} className={`relative ${className}`}>
            <canvas
                ref={canvasRef}
                className="pointer-events-none absolute inset-0 z-10"
            />
            {children}
        </div>
    );
};

export default ElectroBorder;
