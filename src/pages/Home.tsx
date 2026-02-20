import { motion } from "framer-motion";
import Hero from "../components/Hero";
import BentoGrid from "../components/BentoGrid";
import TeamCarousel from "../components/TeamCarousel";
import CompetitiveEdge from "../components/CompetitiveEdge";
import Footer from "../components/Footer";
import { useAuthStore } from "../stores/useAuthStore";

interface HomeProps {
    onGhostLaunch?: () => void;
    onLaunchProfile?: () => void;
}

const Home = ({ onGhostLaunch, onLaunchProfile }: HomeProps) => {
    const displayName = useAuthStore((s) => s.displayName) || "Aman Sahu";
    const isGuest = useAuthStore((s) => s.isGuest);
    const initial = displayName ? displayName.charAt(0).toUpperCase() : "?";

    return (
        <>
            {/* ── Neural Identity — Fixed Top-Right Avatar ── */}
            <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
                className="fixed z-[90] flex flex-col items-center gap-2 cursor-pointer"
                style={{ top: 28, right: 28 }}
                onClick={() => onLaunchProfile?.()}
            >
                {/* Glowing avatar circle */}
                <motion.div
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.92 }}
                    className="relative flex items-center justify-center rounded-full"
                    style={{
                        width: 52,
                        height: 52,
                        background: isGuest
                            ? "linear-gradient(135deg, #374151, #1f2937)"
                            : "linear-gradient(135deg, #a855f7, #00E5FF)",
                        color: isGuest ? "#9ca3af" : "#000",
                        fontWeight: 900,
                        fontSize: 22,
                        boxShadow:
                            "0 0 12px rgba(0,229,255,0.4), 0 0 28px rgba(0,229,255,0.2), 0 0 50px rgba(0,229,255,0.1)",
                        border: "2px solid rgba(0,229,255,0.5)",
                        animation: "avatar-glow-pulse 2.5s ease-in-out infinite",
                    }}
                >
                    {isGuest ? "👻" : initial}

                    {/* Outer ring glow */}
                    <div
                        className="absolute inset-[-4px] rounded-full pointer-events-none"
                        style={{
                            border: "1px solid rgba(0,229,255,0.2)",
                            boxShadow: "0 0 18px rgba(0,229,255,0.15)",
                            animation: "avatar-glow-pulse 2.5s ease-in-out infinite 0.3s",
                        }}
                    />
                    {/* Second outer ring */}
                    <div
                        className="absolute inset-[-9px] rounded-full pointer-events-none"
                        style={{
                            border: "1px solid rgba(0,229,255,0.08)",
                            boxShadow: "0 0 25px rgba(0,229,255,0.08)",
                            animation: "avatar-glow-pulse 2.5s ease-in-out infinite 0.6s",
                        }}
                    />
                </motion.div>

                {/* Username */}
                <span
                    className="text-[10px] font-bold uppercase tracking-[0.15em] text-center whitespace-nowrap select-none"
                    style={{
                        color: "#00E5FF",
                        fontFamily: "monospace",
                        textShadow: "0 0 8px rgba(0,229,255,0.4)",
                    }}
                >
                    {isGuest ? "GHOST" : displayName}
                </span>
            </motion.div>

            <Hero onGhostLaunch={onGhostLaunch} />
            <BentoGrid />
            <TeamCarousel />
            <CompetitiveEdge />
            <Footer />
        </>
    );
};

export default Home;
