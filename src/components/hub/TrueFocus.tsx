import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════════════
   TRUE FOCUS — Crosshair lock-on overlay
   Wraps children; shows animated bracket + ring on hover.
   ═══════════════════════════════════════════════════════ */

interface TrueFocusProps {
    active: boolean;
    color?: string;
    children: React.ReactNode;
}

const TrueFocus = ({ active, color = "#ef4444", children }: TrueFocusProps) => (
    <div className="relative">
        {children}
        <AnimatePresence>
            {active && (
                <motion.div
                    className="pointer-events-none absolute inset-0 z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {/* Bracket corners */}
                    {(["top-left", "top-right", "bottom-left", "bottom-right"] as const).map(
                        (pos) => {
                            const isTop = pos.includes("top");
                            const isLeft = pos.includes("left");
                            return (
                                <motion.div
                                    key={pos}
                                    className="absolute"
                                    style={{
                                        width: 18,
                                        height: 18,
                                        [isTop ? "top" : "bottom"]: -4,
                                        [isLeft ? "left" : "right"]: -4,
                                        borderColor: color,
                                        borderWidth: 2,
                                        borderStyle: "solid",
                                        borderRadius: 2,
                                        [isTop ? "borderBottom" : "borderTop"]: "none",
                                        [isLeft ? "borderRight" : "borderLeft"]: "none",
                                    }}
                                    initial={{ scale: 1.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                />
                            );
                        }
                    )}

                    {/* Center crosshair ring */}
                    <motion.div
                        className="absolute left-1/2 top-1/2"
                        style={{
                            width: 24,
                            height: 24,
                            marginLeft: -12,
                            marginTop: -12,
                            borderRadius: "50%",
                            border: `1.5px solid ${color}`,
                        }}
                        initial={{ scale: 2, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.7 }}
                        transition={{ duration: 0.35 }}
                    >
                        {/* Cross lines */}
                        <div
                            className="absolute left-1/2 top-0 h-full"
                            style={{ width: 1, marginLeft: -0.5, backgroundColor: color, opacity: 0.4 }}
                        />
                        <div
                            className="absolute top-1/2 left-0 w-full"
                            style={{ height: 1, marginTop: -0.5, backgroundColor: color, opacity: 0.4 }}
                        />
                    </motion.div>

                    {/* Scanning ring */}
                    <motion.div
                        className="absolute left-1/2 top-1/2"
                        style={{
                            width: 40,
                            height: 40,
                            marginLeft: -20,
                            marginTop: -20,
                            borderRadius: "50%",
                            border: `1px solid ${color}`,
                        }}
                        animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

export default TrueFocus;
