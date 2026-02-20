import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════════════
   TUNNEL TRANSITION — 3D warp effect between pages
   Scale+blur current page → hyperspeed flash → new page
   arrives from center. Total duration: ~800ms.

   glitch=true: red/amber palette + screen-shake for
   Ghost Mode "insecure connection" visual cue.
   ═══════════════════════════════════════════════════════ */

interface TunnelTransitionProps {
    active: boolean;
    glitch?: boolean;
    onMidpoint: () => void;
    onComplete: () => void;
}

const TunnelTransition = ({ active, glitch = false, onMidpoint, onComplete }: TunnelTransitionProps) => {
    const [phase, setPhase] = useState<"idle" | "warp" | "flash" | "arrive">("idle");
    const midpointFired = useRef(false);

    const lineColor = glitch ? "rgba(239,68,68,0.3)" : "rgba(0,229,255,0.3)";
    const glowColor = glitch ? "rgba(239,68,68," : "rgba(0,229,255,";
    const flashGrad = glitch
        ? "radial-gradient(circle, rgba(245,158,11,0.8), rgba(239,68,68,0.3))"
        : "radial-gradient(circle, rgba(0,229,255,0.8), rgba(0,229,255,0.2))";

    useEffect(() => {
        if (!active) {
            setPhase("idle");
            midpointFired.current = false;
            return;
        }

        setPhase("warp");

        const t1 = setTimeout(() => {
            setPhase("flash");
            if (!midpointFired.current) {
                midpointFired.current = true;
                onMidpoint();
            }
        }, 350);

        const t2 = setTimeout(() => {
            setPhase("arrive");
        }, 500);

        const t3 = setTimeout(() => {
            setPhase("idle");
            onComplete();
        }, 800);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
        };
    }, [active, onMidpoint, onComplete]);

    return (
        <AnimatePresence>
            {phase !== "idle" && (
                <>
                    {/* ── Warp effect ── */}
                    {phase === "warp" && (
                        <motion.div
                            className="fixed inset-0 z-[9000]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{
                                pointerEvents: "all",
                                animation: glitch ? "ghost-shake 0.08s infinite" : undefined,
                            }}
                        >
                            {/* Blur overlay */}
                            <motion.div
                                className="absolute inset-0"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.35, ease: "easeIn" }}
                                style={{
                                    backdropFilter: "blur(20px) brightness(0.3)",
                                    WebkitBackdropFilter: "blur(20px) brightness(0.3)",
                                }}
                            />

                            {/* Radial speed lines */}
                            <motion.div
                                className="absolute inset-0"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.2 }}
                                style={{
                                    background: `radial-gradient(ellipse at center, transparent 40%, ${glowColor}0.08) 60%, ${glowColor}0.2) 80%, ${glowColor}0.4) 100%)`,
                                }}
                            />

                            {/* Converging tunnel lines */}
                            {Array.from({ length: 16 }).map((_, i) => {
                                const angle = (i / 16) * 360;
                                return (
                                    <motion.div
                                        key={i}
                                        className="absolute left-1/2 top-1/2"
                                        style={{
                                            width: 2,
                                            height: "150%",
                                            transformOrigin: "center top",
                                            transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                                            background: `linear-gradient(to bottom, transparent, ${lineColor}, transparent)`,
                                        }}
                                        initial={{ scaleY: 0, opacity: 0 }}
                                        animate={{ scaleY: 1, opacity: 0.6 }}
                                        transition={{ duration: 0.3, delay: i * 0.01 }}
                                    />
                                );
                            })}

                            {/* Glitch color-jitter overlay */}
                            {glitch && (
                                <motion.div
                                    className="absolute inset-0 pointer-events-none"
                                    animate={{ opacity: [0, 0.15, 0, 0.1, 0] }}
                                    transition={{ duration: 0.35, ease: "linear" }}
                                    style={{
                                        background: "linear-gradient(135deg, rgba(239,68,68,0.2), transparent, rgba(245,158,11,0.2))",
                                        mixBlendMode: "screen",
                                    }}
                                />
                            )}
                        </motion.div>
                    )}

                    {/* ── Flash ── */}
                    {phase === "flash" && (
                        <motion.div
                            className="fixed inset-0 z-[9001]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.08 }}
                            style={{
                                background: flashGrad,
                                pointerEvents: "all",
                            }}
                        />
                    )}

                    {/* ── Arrival fade ── */}
                    {phase === "arrive" && (
                        <motion.div
                            className="fixed inset-0 z-[9000]"
                            initial={{ opacity: 1 }}
                            animate={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            style={{
                                background: "radial-gradient(circle, transparent 30%, rgba(0,0,0,0.6) 100%)",
                                pointerEvents: "none",
                            }}
                        />
                    )}
                </>
            )}
        </AnimatePresence>
    );
};

export default TunnelTransition;
