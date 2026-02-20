import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Home, LogOut, Zap } from "lucide-react";

/* ═══════════════════════════════════════════════════════
   COMMAND STRIP — Minimal vertical hub nav (replaces Navbar)
   Glassmorphic w-12 bar on the far left.
   ═══════════════════════════════════════════════════════ */

const CommandStrip = () => {
    const navigate = useNavigate();

    const items = [
        {
            icon: <Zap className="h-4 w-4" />,
            label: "Hub",
            action: () => { },          // already on hub
            active: true,
        },
        {
            icon: <Home className="h-4 w-4" />,
            label: "Dashboard",
            action: () => navigate("/"),
        },
        {
            icon: <LogOut className="h-4 w-4" />,
            label: "Exit",
            action: () => navigate("/"),
        },
    ];

    return (
        <motion.div
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-4 top-1/2 z-[200] flex flex-col gap-2"
            style={{ transform: "translateY(-50%)" }}
        >
            <div
                className="flex flex-col items-center gap-3 rounded-2xl p-2"
                style={{
                    width: 48,
                    backgroundColor: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    backdropFilter: "blur(24px)",
                    WebkitBackdropFilter: "blur(24px)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                }}
            >
                {/* Logo dot */}
                <div
                    className="mb-1 h-6 w-6 rounded-lg flex items-center justify-center"
                    style={{
                        background: "linear-gradient(135deg, #00E5FF, #0066ff)",
                        boxShadow: "0 0 12px rgba(0,229,255,0.3)",
                    }}
                >
                    <Zap className="h-3 w-3 text-black" />
                </div>

                {/* Separator */}
                <div
                    className="h-px w-6"
                    style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
                />

                {/* Nav items */}
                {items.map((item) => (
                    <motion.button
                        key={item.label}
                        onClick={item.action}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="group relative flex h-9 w-9 items-center justify-center rounded-xl transition-all"
                        style={{
                            backgroundColor: item.active
                                ? "rgba(0,229,255,0.1)"
                                : "transparent",
                            border: item.active
                                ? "1px solid rgba(0,229,255,0.2)"
                                : "1px solid transparent",
                            color: item.active ? "#00E5FF" : "rgba(255,255,255,0.35)",
                        }}
                        title={item.label}
                    >
                        {item.icon}

                        {/* Tooltip */}
                        <div
                            className="pointer-events-none absolute left-full ml-3 rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider opacity-0 transition-opacity group-hover:opacity-100"
                            style={{
                                backgroundColor: "rgba(0,0,0,0.9)",
                                border: "1px solid rgba(255,255,255,0.08)",
                                color: "rgba(255,255,255,0.7)",
                                whiteSpace: "nowrap",
                                fontFamily: "monospace",
                            }}
                        >
                            {item.label}
                        </div>
                    </motion.button>
                ))}
            </div>
        </motion.div>
    );
};

export default CommandStrip;
