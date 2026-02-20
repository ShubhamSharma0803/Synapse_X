import { motion } from "framer-motion";
import GlassSurface from "./GlassSurface";
import { Activity } from "lucide-react";

/* ═══════════════════════════════════════════════════════
   VELOCITY TRACKER — Animated line chart (Neural Output)
   ═══════════════════════════════════════════════════════ */

const DATA = [12, 28, 19, 42, 35, 55, 48];
const LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const VelocityTracker = () => {
    const maxVal = Math.max(...DATA);
    const w = 100;       // viewBox width percentage
    const h = 80;        // viewBox height
    const padX = 8;
    const padY = 8;

    const points = DATA.map((v, i) => {
        const x = padX + ((w - 2 * padX) / (DATA.length - 1)) * i;
        const y = h - padY - ((v / maxVal) * (h - 2 * padY));
        return `${x},${y}`;
    }).join(" ");

    const areaPath = `M ${padX},${h - padY} L ${points
        .split(" ")
        .map((p) => `L ${p}`)
        .join(" ")} L ${w - padX},${h - padY} Z`.replace("L L", "L");

    return (
        <GlassSurface className="flex flex-col p-6" delay={0.3}>
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4" style={{ color: "#00E5FF" }} />
                    <h3
                        className="text-sm font-bold text-white"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Neural Output
                    </h3>
                </div>
                <span className="text-[10px] font-mono" style={{ color: "rgba(255,255,255,0.3)" }}>
                    commits / day
                </span>
            </div>

            {/* Chart */}
            <div className="relative flex-1" style={{ minHeight: 120 }}>
                <svg
                    viewBox={`0 0 ${w} ${h}`}
                    preserveAspectRatio="none"
                    className="h-full w-full"
                >
                    {/* Grid lines */}
                    {[0, 0.25, 0.5, 0.75, 1].map((frac) => (
                        <line
                            key={frac}
                            x1={padX}
                            y1={padY + frac * (h - 2 * padY)}
                            x2={w - padX}
                            y2={padY + frac * (h - 2 * padY)}
                            stroke="rgba(255,255,255,0.04)"
                            strokeWidth={0.3}
                        />
                    ))}

                    {/* Gradient fill */}
                    <defs>
                        <linearGradient id="velGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="rgba(0,229,255,0.25)" />
                            <stop offset="100%" stopColor="rgba(0,229,255,0)" />
                        </linearGradient>
                    </defs>
                    <motion.path
                        d={areaPath}
                        fill="url(#velGrad)"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    />

                    {/* Line */}
                    <motion.polyline
                        points={points}
                        fill="none"
                        stroke="#00E5FF"
                        strokeWidth={1.2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
                        style={{ filter: "drop-shadow(0 0 4px rgba(0,229,255,0.5))" }}
                    />

                    {/* Data dots */}
                    {DATA.map((v, i) => {
                        const x = padX + ((w - 2 * padX) / (DATA.length - 1)) * i;
                        const y = h - padY - ((v / maxVal) * (h - 2 * padY));
                        return (
                            <motion.circle
                                key={i}
                                cx={x}
                                cy={y}
                                r={1.5}
                                fill="#00E5FF"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.3 + i * 0.1 }}
                                style={{ filter: "drop-shadow(0 0 3px rgba(0,229,255,0.6))" }}
                            />
                        );
                    })}
                </svg>
            </div>

            {/* Labels */}
            <div className="flex justify-between mt-2 px-1">
                {LABELS.map((l) => (
                    <span
                        key={l}
                        className="text-[9px]"
                        style={{ color: "rgba(255,255,255,0.25)", fontFamily: "monospace" }}
                    >
                        {l}
                    </span>
                ))}
            </div>
        </GlassSurface>
    );
};

export default VelocityTracker;
