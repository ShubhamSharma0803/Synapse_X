import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DecryptedText from "./hub/DecryptedText";
import ElectroBorder from "./hub/ElectroBorder";

/* ═══════════════════════════════════════════════════════
   NEURAL PORTAL — Floating orb that launches the Hub
   ═══════════════════════════════════════════════════════ */

interface NeuralPortalProps {
    hasAlerts?: boolean;
    isProjectActive?: boolean;
    onLaunch: () => void;
}

const NeuralPortal = ({
    hasAlerts = false,
    isProjectActive = true,
    onLaunch,
}: NeuralPortalProps) => {
    const [hovered, setHovered] = useState(false);
    const orbRef = useRef<HTMLButtonElement>(null);

    const tooltipText = isProjectActive
        ? "ACCESS GRANTED: ENTER HUB"
        : "LINK OFFLINE";

    return (
        <div className="relative">
            {/* Tooltip */}
            <AnimatePresence>
                {hovered && (
                    <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-1/2 -bottom-12 z-50 whitespace-nowrap"
                        style={{ transform: "translateX(-50%)" }}
                    >
                        <div
                            className="rounded-lg px-3 py-1.5"
                            style={{
                                backgroundColor: "rgba(0,0,0,0.85)",
                                border: `1px solid ${isProjectActive ? "rgba(0,229,255,0.25)" : "rgba(255,255,255,0.1)"}`,
                                backdropFilter: "blur(12px)",
                            }}
                        >
                            <DecryptedText
                                text={tooltipText}
                                speed={25}
                                className="text-[10px] font-bold uppercase tracking-widest"
                                style={{
                                    color: isProjectActive ? "#00E5FF" : "rgba(255,255,255,0.3)",
                                    fontFamily: "monospace",
                                }}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Orb */}
            <ElectroBorder
                color={hasAlerts ? "red" : "cyan"}
                intensity={hovered ? 0.9 : 0.5}
                borderRadius={999}
            >
                <motion.button
                    ref={orbRef}
                    onClick={isProjectActive ? onLaunch : undefined}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    whileHover={isProjectActive ? { scale: 1.15 } : {}}
                    whileTap={isProjectActive ? { scale: 0.9 } : {}}
                    className="relative flex items-center justify-center"
                    style={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        cursor: isProjectActive ? "pointer" : "not-allowed",
                        background: isProjectActive
                            ? "radial-gradient(circle at 40% 35%, #00E5FF 0%, #0066ff 50%, #001133 100%)"
                            : "radial-gradient(circle at 40% 35%, #333 0%, #1a1a1a 50%, #0a0a0a 100%)",
                        boxShadow: isProjectActive
                            ? `0 0 ${hovered ? 30 : 15}px rgba(0,229,255,${hovered ? 0.4 : 0.2})`
                            : "none",
                        opacity: isProjectActive ? 1 : 0.4,
                    }}
                    aria-label="Open Developers Hub"
                >
                    {/* Inner glow */}
                    <div
                        className="absolute rounded-full"
                        style={{
                            width: 12,
                            height: 12,
                            background: isProjectActive
                                ? "radial-gradient(circle, rgba(255,255,255,0.9), rgba(0,229,255,0.4))"
                                : "radial-gradient(circle, rgba(255,255,255,0.3), rgba(100,100,100,0.2))",
                            filter: "blur(1px)",
                        }}
                    />

                    {/* Orbital ring */}
                    {isProjectActive && (
                        <motion.div
                            className="absolute rounded-full"
                            style={{
                                width: 30,
                                height: 30,
                                border: "1px solid rgba(0,229,255,0.3)",
                            }}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        />
                    )}
                </motion.button>
            </ElectroBorder>
        </div>
    );
};

export default NeuralPortal;
