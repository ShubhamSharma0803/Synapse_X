import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";
import DecryptedText from "./hub/DecryptedText";

/* ═══════════════════════════════════════════════════════
   SYSTEM STATUS — Persistent ghost-mode warning banner
   Thin glassmorphic bar at the bottom of the screen.
   Only visible when isGuest === true.
   ═══════════════════════════════════════════════════════ */

const SystemStatus = () => {
    const isGuest = useAuthStore((s) => s.isGuest);
    const navigate = useNavigate();
    const [dismissed, setDismissed] = useState(false);

    if (!isGuest || dismissed) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 60, opacity: 0 }}
                transition={{ duration: 0.5, delay: 1, ease: [0.22, 1, 0.36, 1] }}
                className="fixed bottom-0 inset-x-0 z-[300] flex items-center justify-center px-4 py-2.5"
                style={{
                    backgroundColor: "rgba(0,0,0,0.6)",
                    borderTop: "1px solid rgba(239,68,68,0.15)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                }}
            >
                <div className="flex items-center gap-4 max-w-5xl w-full">
                    {/* Warning icon */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                        <ShieldAlert className="h-3.5 w-3.5" style={{ color: "#f59e0b" }} />
                    </div>

                    {/* Status text */}
                    <div className="flex-1 min-w-0">
                        <DecryptedText
                            text="SYSTEM STATUS: UNAUTHENTICATED SESSION. DATA IS VOLATILE"
                            speed={20}
                            className="text-[10px] font-bold uppercase tracking-widest truncate"
                            style={{ color: "#f59e0b", fontFamily: "monospace" }}
                        />
                    </div>

                    {/* Secure Identity CTA */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate("/auth")}
                        className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider flex-shrink-0 transition-all"
                        style={{
                            backgroundColor: "rgba(0,229,255,0.08)",
                            border: "1px solid rgba(0,229,255,0.2)",
                            color: "#00E5FF",
                        }}
                    >
                        <Lock className="h-3 w-3" />
                        Secure Identity
                    </motion.button>

                    {/* Dismiss */}
                    <button
                        onClick={() => setDismissed(true)}
                        className="text-[10px] flex-shrink-0 transition-colors"
                        style={{ color: "rgba(255,255,255,0.2)" }}
                    >
                        ✕
                    </button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default SystemStatus;
