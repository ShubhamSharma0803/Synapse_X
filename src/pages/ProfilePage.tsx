import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { LogOut, Shield, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";
import { useProjectStore } from "../stores/useProjectStore";
import GlassSurface from "../components/hub/GlassSurface";
import DecryptedText from "../components/hub/DecryptedText";
import ElectroBorder from "../components/hub/ElectroBorder";

/* ═══════════════════════════════════════════════════════
   PROFILE PAGE — Neural Identity Dashboard
   ═══════════════════════════════════════════════════════ */

/* ── Icons ── */
const GitHubIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
);
const LinkedInIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);
const InstagramIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
);
const DiscordIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.04.033.055a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
    </svg>
);
const EmailIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
    </svg>
);

/* ── Data ── */
const SOCIAL_LINKS = [
    { label: "GitHub", Icon: GitHubIcon, color: "#00E5FF", href: "https://github.com/" },
    { label: "LinkedIn", Icon: LinkedInIcon, color: "#00E5FF", href: "https://linkedin.com/" },
    { label: "Instagram", Icon: InstagramIcon, color: "#ff3a6e", href: "https://instagram.com/" },
    { label: "Discord", Icon: DiscordIcon, color: "#a855f7", href: "#" },
    { label: "Email", Icon: EmailIcon, color: "#f0ff00", href: "mailto:aman@example.com" },
];

const TABS = ["Projects", "Friends", "About"] as const;
type TabKey = (typeof TABS)[number];

const ACTIVITY = [
    { time: "2m ago", action: "Pushed 3 commits to synapse-core", icon: "⟨/⟩", color: "#00E5FF" },
    { time: "1h ago", action: "Completed ML Fundamentals challenge", icon: "🏆", color: "#f0ff00" },
    { time: "3h ago", action: "Reviewed PR #42 — neural-net-optimizer", icon: "⟨/⟩", color: "#00E5FF" },
    { time: "Yesterday", action: "Unlocked 'Deep Diver' badge", icon: "★", color: "#22c55e" },
    { time: "2d ago", action: "Joined SynapseX community", icon: "⚡", color: "#a855f7" },
];

const ACHIEVEMENTS = [
    { title: "Neural Architect", desc: "Designed and deployed 3 neural network models with 90%+ accuracy on real datasets.", date: "Jan 2025", tag: "Machine Learning" },
    { title: "Open Source Contributor", desc: "Merged 12 pull requests into top-500 GitHub repositories.", date: "Dec 2024", tag: "Community" },
    { title: "Hackathon Winner", desc: "1st place at InnovateTech 2024 for building an AI-powered resume analyzer.", date: "Nov 2024", tag: "Competition" },
    { title: "100 Days of Code", desc: "Committed code every single day for 100 consecutive days.", date: "Oct 2024", tag: "Discipline" },
];

const BADGES = [
    { label: "Python Pro", color: "#22c55e" },
    { label: "ML Engineer", color: "#00E5FF" },
    { label: "React Dev", color: "#ff3a6e" },
    { label: "Data Whisperer", color: "#a855f7" },
    { label: "Cloud Builder", color: "#f0ff00" },
    { label: "AI Pioneer", color: "#22c55e" },
    { label: "Open Source", color: "#00E5FF" },
    { label: "Top Contributor", color: "#ff3a6e" },
];

const TAG_COLORS = ["#00E5FF", "#a855f7", "#ff3a6e", "#22c55e"];

/* ── StatusDot ── */
function StatusDot() {
    return (
        <span className="relative inline-flex" style={{ width: 10, height: 10 }}>
            <span
                className="absolute inset-0 rounded-full animate-ping"
                style={{ background: "#22c55e", opacity: 0.7 }}
            />
            <span
                className="relative inline-block rounded-full"
                style={{
                    width: 10,
                    height: 10,
                    background: "#22c55e",
                    boxShadow: "0 0 8px #22c55e",
                }}
            />
        </span>
    );
}

/* ── CometCard — 3D perspective tilt wrapper ── */
function CometCard({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);
    const [transform, setTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)");
    const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rotateY = ((x - cx) / cx) * 17.5;
        const rotateX = -((y - cy) / cy) * 17.5;
        setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`);
        setGlare({ x: (x / rect.width) * 100, y: (y / rect.height) * 100, opacity: 0.18 });
    }, []);

    const handleMouseLeave = useCallback(() => {
        setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)");
        setGlare((g) => ({ ...g, opacity: 0 }));
    }, []);

    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transformStyle: "preserve-3d", transform, transition: "transform 0.15s ease-out" }}
            className="relative rounded-2xl cursor-default"
        >
            <div
                className="pointer-events-none absolute inset-0 rounded-2xl z-10"
                style={{
                    background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}), transparent 60%)`,
                    transition: "opacity 0.2s",
                }}
            />
            {children}
        </div>
    );
}

/* ═══════════════════════════════════════════════════════
   COVER SECTION — Banner + Avatar + Connect + Tabs
   ═══════════════════════════════════════════════════════ */
function Cover({
    activeTab,
    setActiveTab,
    displayName,
    isGuest,
}: {
    activeTab: TabKey;
    setActiveTab: (t: TabKey) => void;
    displayName: string;
    isGuest: boolean;
}) {
    const [connected, setConnected] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const handleConnect = () => {
        setConnected(true);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2800);
    };

    const initial = displayName ? displayName.charAt(0).toUpperCase() : "?";

    return (
        <div>
            {/* Banner */}
            <div className="relative w-full overflow-hidden rounded-2xl" style={{ height: 220, background: "#000" }}>
                <div
                    className="absolute rounded-full"
                    style={{
                        top: "-30%", left: "25%", width: 420, height: 260,
                        filter: "blur(80px)", background: "rgba(0,229,255,0.09)",
                    }}
                />
                <div
                    className="absolute rounded-full"
                    style={{
                        bottom: "-20%", right: "15%", width: 300, height: 200,
                        filter: "blur(70px)", background: "rgba(168,85,247,0.09)",
                    }}
                />
                <div
                    className="absolute rounded-full"
                    style={{
                        top: "10%", right: "5%", width: 200, height: 140,
                        filter: "blur(60px)", background: "rgba(0,229,255,0.07)",
                    }}
                />
                <div
                    className="absolute left-0 right-0"
                    style={{
                        top: "50%", height: 1,
                        background: "linear-gradient(90deg, transparent, rgba(0,229,255,0.18), transparent)",
                    }}
                />
                <div
                    className="absolute z-2 rounded-full font-mono text-[11px] font-semibold"
                    style={{
                        top: 14, right: 16,
                        padding: "4px 12px",
                        border: "1px solid rgba(0,229,255,0.35)",
                        color: "#00E5FF",
                        background: "rgba(0,0,0,0.7)",
                        textShadow: "0 0 8px rgba(0,229,255,0.5)",
                        boxShadow: "0 0 12px rgba(0,229,255,0.2)",
                        backdropFilter: "blur(6px)",
                    }}
                >
                    SynapseX Platform
                </div>
            </div>

            {/* Avatar + Name row */}
            <div className="relative z-10 flex items-end gap-4 px-4 flex-wrap" style={{ marginTop: -52 }}>
                {/* Avatar */}
                <motion.div
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.15, type: "spring" }}
                    className="relative flex-shrink-0"
                >
                    <div
                        className="overflow-hidden rounded-full"
                        style={{
                            width: 96, height: 96,
                            border: "3px solid #00E5FF",
                            boxShadow: "0 0 24px rgba(0,229,255,0.5), 0 0 60px rgba(0,229,255,0.2)",
                        }}
                    >
                        <div
                            className={`flex h-full w-full items-center justify-center text-4xl font-black select-none ${isGuest ? "profile-glitch-avatar" : ""}`}
                            style={{
                                background: isGuest
                                    ? "linear-gradient(135deg, #374151, #1f2937)"
                                    : "linear-gradient(135deg, #a855f7, #00E5FF)",
                                color: isGuest ? "#6b7280" : "#000",
                            }}
                        >
                            {isGuest ? "👻" : initial}
                        </div>
                    </div>
                    <div
                        className="absolute flex items-center justify-center rounded-full"
                        style={{
                            bottom: 2, right: 2, width: 20, height: 20,
                            background: "#000", border: "2px solid #000",
                        }}
                    >
                        <StatusDot />
                    </div>
                </motion.div>

                {/* Name + bio */}
                <motion.div
                    initial={{ y: 16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.25 }}
                    className="flex-1 pb-2"
                    style={{ minWidth: 180 }}
                >
                    <h1
                        className="text-2xl font-black text-white cursor-pointer"
                        style={{
                            fontFamily: "var(--font-heading)",
                            textShadow: "0 0 20px rgba(0,229,255,0.2)",
                        }}
                    >
                        <DecryptedText
                            text={displayName}
                            revealText={isGuest ? "GHOST_SESSION" : "Neural Operator"}
                            speed={35}
                            className="text-2xl font-black"
                            style={{
                                background: "linear-gradient(135deg, #fff 40%, #00E5FF)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        />
                    </h1>
                    <p
                        className="mt-1 mb-2 text-[13px] font-medium"
                        style={{ color: "#00E5FF", textShadow: "0 0 10px rgba(0,229,255,0.4)" }}
                    >
                        AI/ML Engineer · Data Science · Open Source
                    </p>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mb-1.5">
                        <span
                            className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
                            style={{
                                color: "#00E5FF",
                                background: "rgba(0,229,255,0.08)",
                                border: "1px solid rgba(0,229,255,0.25)",
                                textShadow: "0 0 8px rgba(0,229,255,0.4)",
                            }}
                        >
                            💼 CSE · Data Science Specialization
                        </span>
                        <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.3)" }}>
                            📍 Indore, Madhya Pradesh
                        </span>
                        <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.3)" }}>
                            📅 Joined February 2024
                        </span>
                    </div>
                    <p className="text-[12px] max-w-xl" style={{ color: "rgba(255,255,255,0.35)", lineHeight: 1.6 }}>
                        Building intelligent systems at the intersection of data, ML, and elegant software.
                        Passionate about open-source and AI-driven developer tools.
                    </p>
                </motion.div>

                {/* Connect button */}
                <motion.button
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 }}
                    whileHover={!connected ? { scale: 1.06 } : {}}
                    whileTap={!connected ? { scale: 0.96 } : {}}
                    onClick={!connected ? handleConnect : undefined}
                    className="flex-shrink-0 rounded-xl px-5 py-2.5 text-sm font-bold mb-2 transition-all"
                    style={{
                        border: connected ? "1px solid rgba(0,229,255,0.35)" : "none",
                        cursor: connected ? "default" : "pointer",
                        background: connected
                            ? "rgba(0,229,255,0.08)"
                            : "linear-gradient(135deg, #a855f7, #00E5FF)",
                        color: connected ? "#00E5FF" : "#000",
                        boxShadow: connected
                            ? "0 0 16px rgba(0,229,255,0.2)"
                            : "0 0 28px rgba(0,229,255,0.4), 0 0 60px rgba(0,229,255,0.15)",
                        textShadow: connected ? "0 0 8px rgba(0,229,255,0.5)" : "none",
                    }}
                >
                    {connected ? "✓ Connected" : "+ Connect"}
                </motion.button>
            </div>

            {/* Toast */}
            <AnimatePresence>
                {showToast && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, x: "-50%" }}
                        animate={{ opacity: 1, y: 0, x: "-50%" }}
                        exit={{ opacity: 0, y: -10, x: "-50%" }}
                        className="fixed z-[9999] flex items-center gap-2.5 rounded-xl px-6 py-3 text-sm font-semibold"
                        style={{
                            bottom: 32, left: "50%",
                            background: "#000",
                            border: "1px solid rgba(0,229,255,0.35)",
                            color: "#00E5FF",
                            boxShadow: "0 0 30px rgba(0,229,255,0.25), 0 8px 32px rgba(0,0,0,0.8)",
                            textShadow: "0 0 10px rgba(0,229,255,0.5)",
                        }}
                    >
                        <span className="text-lg">⚡</span>
                        Connection request sent to {displayName}!
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Tabs */}
            <div
                className="flex gap-0.5 mt-5 px-4"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >
                {TABS.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className="relative px-5 py-2.5 bg-transparent border-none cursor-pointer text-sm font-medium transition-colors"
                        style={{
                            color: activeTab === tab ? "#00E5FF" : "rgba(255,255,255,0.25)",
                            textShadow: activeTab === tab ? "0 0 10px rgba(0,229,255,0.5)" : "none",
                        }}
                    >
                        {tab}
                        {activeTab === tab && (
                            <motion.div
                                layoutId="profile-underline"
                                className="absolute bottom-0 left-0 right-0 rounded-full"
                                style={{
                                    height: 2,
                                    background: "linear-gradient(90deg, #a855f7, #00E5FF)",
                                    boxShadow: "0 0 8px rgba(0,229,255,0.5)",
                                }}
                            />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════
   ACHIEVEMENTS
   ═══════════════════════════════════════════════════════ */
function AchievementsSection() {
    return (
        <div>
            <p
                className="mb-3.5 text-[10px] font-bold uppercase tracking-[0.15em]"
                style={{ color: "#00E5FF", textShadow: "0 0 12px rgba(0,229,255,0.55)" }}
            >
                Achievements
            </p>
            <div className="grid gap-3.5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))" }}>
                {ACHIEVEMENTS.map((a, i) => {
                    const c = TAG_COLORS[i % TAG_COLORS.length];
                    return (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.09 }}
                        >
                            <CometCard>
                                <GlassSurface className="p-4" delay={i * 0.06}>
                                    <div className="flex items-center justify-between mb-2.5">
                                        <span
                                            className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
                                            style={{
                                                background: `${c}18`,
                                                border: `1px solid ${c}55`,
                                                color: c,
                                            }}
                                        >
                                            {a.tag}
                                        </span>
                                        <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.3)" }}>
                                            {a.date}
                                        </span>
                                    </div>
                                    <h3
                                        className="text-[15px] font-extrabold text-white mb-1.5"
                                        style={{ fontFamily: "var(--font-heading)" }}
                                    >
                                        {a.title}
                                    </h3>
                                    <p className="text-[13px] leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                                        {a.desc}
                                    </p>
                                </GlassSurface>
                            </CometCard>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════
   ACTIVITY TIMELINE
   ═══════════════════════════════════════════════════════ */
function ActivityCard() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(-1);

    const { scrollYProgress } = useScroll({
        target: scrollRef,
        offset: ["start center", "end center"],
    });
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
    const progressHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

    useEffect(() => {
        const unsub = scrollYProgress.on("change", (v) => {
            const idx = Math.floor(v * ACTIVITY.length);
            if (idx >= 0 && idx < ACTIVITY.length) setActiveIndex(idx);
        });
        return unsub;
    }, [scrollYProgress]);

    return (
        <GlassSurface className="p-5" delay={0.1}>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <p
                    className="text-[10px] font-bold uppercase tracking-[0.15em]"
                    style={{ color: "#00E5FF", textShadow: "0 0 12px rgba(0,229,255,0.55)" }}
                >
                    Activity Feed
                </p>
                <div
                    className="flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[11px]"
                    style={{
                        backgroundColor: "rgba(34,197,94,0.1)",
                        border: "1px solid rgba(34,197,94,0.2)",
                        color: "#22c55e",
                    }}
                >
                    <StatusDot /> Online · Coding
                </div>
            </div>

            {/* Timeline */}
            <div ref={scrollRef} className="relative" style={{ paddingLeft: 28 }}>
                {/* Track */}
                <div
                    className="absolute rounded-full"
                    style={{
                        left: 9, top: 0, bottom: 0, width: 2,
                        background: "rgba(0,229,255,0.1)",
                    }}
                />
                {/* Animated fill */}
                <motion.div
                    className="absolute rounded-full"
                    style={{
                        left: 9, top: 0, width: 2,
                        height: progressHeight,
                        background: "linear-gradient(to bottom, #00E5FF, #6366f1, #a855f7)",
                        boxShadow: "0 0 10px rgba(0,229,255,0.4), 0 0 20px rgba(168,85,247,0.3)",
                    }}
                />
                {/* Glow dot */}
                <motion.div
                    className="absolute z-5 rounded-full"
                    style={{
                        left: 9, top: progressHeight,
                        translateX: "-50%", translateY: "-50%",
                        width: 14, height: 14,
                        background: "radial-gradient(circle, rgba(0,229,255,0.9) 0%, rgba(99,102,241,0.5) 50%, transparent 70%)",
                        boxShadow: "0 0 12px 4px rgba(0,229,255,0.5), 0 0 20px 8px rgba(99,102,241,0.2)",
                    }}
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Items */}
                <div className="flex flex-col">
                    {ACTIVITY.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -16 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: false, margin: "-40px" }}
                            transition={{ duration: 0.5, delay: i * 0.08 }}
                            className="flex items-start gap-3.5"
                            style={{ paddingBottom: i < ACTIVITY.length - 1 ? 20 : 0 }}
                        >
                            {/* Dot */}
                            <motion.div
                                animate={
                                    i <= activeIndex
                                        ? {
                                            scale: [1, 1.3, 1],
                                            boxShadow: [
                                                "0 0 0px rgba(0,229,255,0)",
                                                "0 0 10px rgba(0,229,255,0.7)",
                                                "0 0 0px rgba(0,229,255,0)",
                                            ],
                                        }
                                        : {}
                                }
                                transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 3 }}
                                className="flex-shrink-0 flex items-center justify-center rounded-full text-[8px] z-2"
                                style={{
                                    width: 20, height: 20,
                                    marginLeft: -28, marginTop: 5,
                                    border: `3px solid ${i <= activeIndex ? item.color : "rgba(255,255,255,0.1)"}`,
                                    background: i <= activeIndex ? `${item.color}25` : "rgba(0,0,0,0.9)",
                                    transition: "all 0.3s",
                                }}
                            >
                                {item.icon}
                            </motion.div>

                            {/* Content */}
                            <div
                                className="flex-1 rounded-xl px-3.5 py-2.5 transition-all"
                                style={{
                                    background: i <= activeIndex ? `${item.color}10` : "rgba(255,255,255,0.03)",
                                    border: `1px solid ${i <= activeIndex ? `${item.color}30` : "rgba(255,255,255,0.06)"}`,
                                }}
                            >
                                <p className="text-[13px] leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
                                    {item.action}
                                </p>
                                <p className="text-[11px] mt-1" style={{ color: "rgba(255,255,255,0.3)" }}>
                                    {item.time}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </GlassSurface>
    );
}

/* ═══════════════════════════════════════════════════════
   CONNECT + BADGES
   ═══════════════════════════════════════════════════════ */
function ConnectSection() {
    return (
        <GlassSurface className="p-5" delay={0.15}>
            <p
                className="mb-4 text-[10px] font-bold uppercase tracking-[0.15em]"
                style={{ color: "#00E5FF", textShadow: "0 0 12px rgba(0,229,255,0.55)" }}
            >
                Connect With
            </p>
            <div className="flex flex-wrap gap-2.5">
                {SOCIAL_LINKS.map(({ label: lbl, Icon, color, href }) => (
                    <motion.a
                        key={lbl}
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        whileHover={{ y: -3 }}
                        className="flex items-center gap-2 rounded-xl px-4 py-2 text-[13px] font-medium text-white no-underline transition-all"
                        style={{
                            border: `1px solid ${color}30`,
                            background: `${color}0d`,
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = `${color}20`;
                            e.currentTarget.style.borderColor = `${color}60`;
                            e.currentTarget.style.boxShadow = `0 0 18px ${color}30`;
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = `${color}0d`;
                            e.currentTarget.style.borderColor = `${color}30`;
                            e.currentTarget.style.boxShadow = "none";
                        }}
                    >
                        <span style={{ color }}>
                            <Icon />
                        </span>
                        {lbl}
                        <ExternalLink className="h-3 w-3 opacity-40" />
                    </motion.a>
                ))}
            </div>
        </GlassSurface>
    );
}

function BadgesSection() {
    return (
        <div>
            <p
                className="mb-3.5 text-[10px] font-bold uppercase tracking-[0.15em]"
                style={{ color: "#00E5FF", textShadow: "0 0 12px rgba(0,229,255,0.55)" }}
            >
                Skill Badges
            </p>
            <GlassSurface className="p-5" delay={0.2}>
                <div className="flex flex-wrap gap-2.5">
                    {BADGES.map(({ label: lbl, color }, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            whileHover={{ scale: 1.08 }}
                            className="rounded-xl px-3.5 py-1.5 text-[13px] font-semibold cursor-default transition-shadow"
                            style={{
                                fontFamily: "var(--font-mono)",
                                background: `${color}14`,
                                border: `1px solid ${color}55`,
                                color,
                                boxShadow: `0 0 10px ${color}22`,
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = `0 0 22px ${color}55`)}
                            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = `0 0 10px ${color}22`)}
                        >
                            {lbl}
                        </motion.div>
                    ))}
                </div>
            </GlassSurface>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════
   ABOUT SECTION
   ═══════════════════════════════════════════════════════ */
function AboutSection() {
    const stats = [
        { label: "Projects Built", value: "24+" },
        { label: "GitHub Contributions", value: "1,200+" },
        { label: "Hackathons Won", value: "3" },
        { label: "Open Source PRs", value: "47" },
        { label: "ML Models Deployed", value: "11" },
        { label: "Certifications", value: "6" },
    ];
    const experience = [
        { role: "ML Research Intern", org: "TechStartup AI", period: "Jun 2024 – Aug 2024", desc: "Built and fine-tuned transformer models for NLP tasks. Reduced inference latency by 40% through quantization." },
        { role: "Open Source Contributor", org: "Various Projects", period: "2023 – Present", desc: "Active contributor to Hugging Face, scikit-learn, and FastAPI with 47+ merged PRs across these ecosystems." },
        { role: "Freelance Developer", org: "Self-employed", period: "2022 – Present", desc: "Built data pipelines, dashboards, and ML prototypes for 8+ clients across India and Southeast Asia." },
    ];
    const education = [
        { degree: "B.Tech – Computer Science Engineering", school: "Acropolis Institute of Technology, Indore", period: "2022 – 2026", note: "Specialization in Data Science · CGPA 8.7" },
    ];
    const interests = ["Neural Networks", "MLOps", "Open Source", "Chess", "Paper Reading", "UI Engineering", "Competitive Programming"];
    const certifications = [
        { name: "TensorFlow Developer Certificate", issuer: "Google", year: "2024" },
        { name: "AWS Solutions Architect – Associate", issuer: "Amazon", year: "2024" },
        { name: "Deep Learning Specialization", issuer: "Coursera / deeplearning.ai", year: "2023" },
        { name: "Python for Data Science", issuer: "IBM / Coursera", year: "2023" },
    ];

    const sectionLabel = "text-[10px] font-bold uppercase tracking-[0.15em] mb-4";
    const sectionLabelStyle = { color: "#00E5FF", textShadow: "0 0 12px rgba(0,229,255,0.55)" };

    return (
        <div className="flex flex-col gap-4">
            {/* Bio */}
            <ElectroBorder color="cyan" intensity={0.35} borderRadius={16}>
                <GlassSurface className="p-6" delay={0}>
                    <p className={sectionLabel} style={sectionLabelStyle}>About Me</p>
                    <div className="flex flex-col gap-2.5 text-sm leading-7" style={{ color: "rgba(255,255,255,0.4)" }}>
                        <p>
                            Hey! I'm <strong className="text-white">Aman Sahu</strong>,
                            a CSE student specializing in Data Science at Acropolis Institute of Technology, Indore.
                            I build at the intersection of ML, elegant software, and real human problems.
                        </p>
                        <p>
                            My day-to-day involves training models, writing Python, and crafting UIs from the future.
                            I'm a strong open-source advocate with contributions to Hugging Face, scikit-learn, and FastAPI ecosystems.
                        </p>
                        <p>
                            When I'm not shipping code, I'm reading papers, playing chess, or exploring new frameworks.
                            Always open to collaborating on exciting ideas — connect anytime!
                        </p>
                    </div>
                </GlassSurface>
            </ElectroBorder>

            {/* Stats */}
            <GlassSurface className="p-5" delay={0.05}>
                <p className={sectionLabel} style={sectionLabelStyle}>Stats</p>
                <div className="grid grid-cols-3 gap-3">
                    {stats.map(({ label: lbl, value }) => (
                        <div
                            key={lbl}
                            className="rounded-xl p-3.5 text-center"
                            style={{
                                background: "rgba(0,229,255,0.04)",
                                border: "1px solid rgba(0,229,255,0.12)",
                            }}
                        >
                            <p
                                className="text-xl font-black"
                                style={{ color: "#00E5FF", textShadow: "0 0 12px rgba(0,229,255,0.5)" }}
                            >
                                {value}
                            </p>
                            <p className="text-[11px] mt-1" style={{ color: "rgba(255,255,255,0.3)" }}>
                                {lbl}
                            </p>
                        </div>
                    ))}
                </div>
            </GlassSurface>

            {/* Experience */}
            <GlassSurface className="p-5" delay={0.1}>
                <p className={sectionLabel} style={sectionLabelStyle}>Experience</p>
                <div className="flex flex-col gap-4">
                    {experience.map((e, i) => (
                        <div
                            key={i}
                            className={i < experience.length - 1 ? "pb-4" : ""}
                            style={{
                                borderBottom:
                                    i < experience.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                            }}
                        >
                            <div className="flex items-start justify-between flex-wrap gap-1">
                                <div>
                                    <p className="text-sm font-bold text-white">{e.role}</p>
                                    <p
                                        className="text-[12px] mt-0.5"
                                        style={{ color: "#00E5FF", textShadow: "0 0 8px rgba(0,229,255,0.4)" }}
                                    >
                                        {e.org}
                                    </p>
                                </div>
                                <span
                                    className="text-[11px] rounded-full px-2 py-0.5 whitespace-nowrap"
                                    style={{
                                        color: "rgba(255,255,255,0.3)",
                                        background: "rgba(0,229,255,0.04)",
                                        border: "1px solid rgba(255,255,255,0.06)",
                                    }}
                                >
                                    {e.period}
                                </span>
                            </div>
                            <p className="text-[13px] mt-2 leading-relaxed" style={{ color: "rgba(255,255,255,0.35)" }}>
                                {e.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </GlassSurface>

            {/* Education */}
            <GlassSurface className="p-5" delay={0.15}>
                <p className={sectionLabel} style={sectionLabelStyle}>Education</p>
                {education.map((ed, i) => (
                    <div key={i}>
                        <div className="flex items-start justify-between flex-wrap gap-1">
                            <div>
                                <p className="text-sm font-bold text-white">{ed.degree}</p>
                                <p
                                    className="text-[12px] mt-0.5"
                                    style={{ color: "#00E5FF", textShadow: "0 0 8px rgba(0,229,255,0.4)" }}
                                >
                                    {ed.school}
                                </p>
                            </div>
                            <span
                                className="text-[11px] rounded-full px-2 py-0.5"
                                style={{
                                    color: "rgba(255,255,255,0.3)",
                                    background: "rgba(0,229,255,0.04)",
                                    border: "1px solid rgba(255,255,255,0.06)",
                                }}
                            >
                                {ed.period}
                            </span>
                        </div>
                        <p className="text-[12px] mt-1.5" style={{ color: "rgba(255,255,255,0.25)" }}>
                            {ed.note}
                        </p>
                    </div>
                ))}
            </GlassSurface>

            {/* Certifications */}
            <GlassSurface className="p-5" delay={0.2}>
                <p className={sectionLabel} style={sectionLabelStyle}>Certifications</p>
                <div className="grid gap-2.5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
                    {certifications.map((cert, i) => (
                        <div
                            key={i}
                            className="rounded-xl p-3"
                            style={{
                                background: "rgba(0,229,255,0.03)",
                                border: "1px solid rgba(0,229,255,0.1)",
                            }}
                        >
                            <p className="text-[13px] font-semibold text-white">{cert.name}</p>
                            <div className="flex justify-between mt-1">
                                <p className="text-[11px]" style={{ color: "#00E5FF" }}>{cert.issuer}</p>
                                <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.25)" }}>{cert.year}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </GlassSurface>

            {/* Interests */}
            <GlassSurface className="p-5" delay={0.25}>
                <p className={sectionLabel} style={sectionLabelStyle}>Interests</p>
                <div className="flex flex-wrap gap-2">
                    {interests.map((item, i) => (
                        <span
                            key={i}
                            className="rounded-full px-3 py-1 text-[12px] font-medium"
                            style={{
                                background: "rgba(0,229,255,0.06)",
                                border: "1px solid rgba(0,229,255,0.2)",
                                color: "#00E5FF",
                            }}
                        >
                            {item}
                        </span>
                    ))}
                </div>
            </GlassSurface>

            <BadgesSection />
        </div>
    );
}

/* ═══════════════════════════════════════════════════════
   GUEST RESTRICTION OVERLAY
   ═══════════════════════════════════════════════════════ */
function GuestRestriction() {
    const navigate = useNavigate();
    return (
        <GlassSurface className="p-10 text-center" delay={0.1}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center gap-6"
            >
                <div
                    className="flex h-20 w-20 items-center justify-center rounded-2xl text-4xl"
                    style={{
                        background: "rgba(239,68,68,0.08)",
                        border: "1px solid rgba(239,68,68,0.2)",
                        boxShadow: "0 0 30px rgba(239,68,68,0.15)",
                    }}
                >
                    🔒
                </div>
                <h2
                    className="text-xl font-extrabold cursor-pointer"
                    style={{ fontFamily: "var(--font-heading)" }}
                >
                    <DecryptedText
                        text="RESTRICTED ACCESS"
                        revealText="SIGN IN REQUIRED"
                        speed={30}
                        className="text-xl font-extrabold"
                        style={{
                            background: "linear-gradient(135deg, #ef4444, #f59e0b)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    />
                </h2>
                <p className="text-sm max-w-md" style={{ color: "rgba(255,255,255,0.35)", lineHeight: 1.7 }}>
                    Ghost sessions have limited access to profile data. Authenticate to view full stats,
                    achievements, and connect with other neural operators.
                </p>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/auth")}
                    className="flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition-all"
                    style={{
                        background: "linear-gradient(135deg, #00E5FF, #0066ff)",
                        color: "#000",
                        boxShadow: "0 0 20px rgba(0,229,255,0.25)",
                    }}
                >
                    <Shield className="h-4 w-4" />
                    Authenticate Identity
                </motion.button>
            </motion.div>
        </GlassSurface>
    );
}

/* ═══════════════════════════════════════════════════════
   LOGOUT BUTTON
   ═══════════════════════════════════════════════════════ */
function LogoutButton() {
    const navigate = useNavigate();
    const exitGhostMode = useAuthStore((s) => s.exitGhostMode);
    const [glitch, setGlitch] = useState(false);

    const handleLogout = () => {
        exitGhostMode();
        /* Also clear any authenticated state */
        useAuthStore.setState({ isAuthenticated: false, displayName: "" });
        navigate("/auth");
    };

    return (
        <div className="mt-6">
            <ElectroBorder color="red" intensity={glitch ? 0.9 : 0.3} borderRadius={12}>
                <motion.button
                    onMouseEnter={() => setGlitch(true)}
                    onMouseLeave={() => setGlitch(false)}
                    onClick={handleLogout}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full flex items-center justify-center gap-3 rounded-xl py-3.5 transition-all cursor-pointer"
                    style={{
                        backgroundColor: glitch ? "rgba(239,68,68,0.08)" : "rgba(255,255,255,0.02)",
                        border: `1px solid ${glitch ? "rgba(239,68,68,0.25)" : "rgba(255,255,255,0.06)"}`,
                        animation: glitch ? "ghost-shake 0.08s infinite" : undefined,
                    }}
                >
                    <LogOut className="h-4 w-4" style={{ color: glitch ? "#ef4444" : "rgba(255,255,255,0.35)" }} />
                    <DecryptedText
                        text="DE-INITIALIZE SESSION"
                        revealText="CONFIRM: WIPE DATA?"
                        speed={25}
                        className="text-xs font-bold uppercase tracking-widest"
                        style={{
                            color: glitch ? "#ef4444" : "rgba(255,255,255,0.35)",
                            fontFamily: "monospace",
                        }}
                    />
                </motion.button>
            </ElectroBorder>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════
   PROFILE PAGE — Main export
   ═══════════════════════════════════════════════════════ */
const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState<TabKey>("Projects");

    const isGuest = useAuthStore((s) => s.isGuest);
    const displayName = useAuthStore((s) => s.displayName) || "Aman Sahu";
    const projectName = useProjectStore((s) => s.projectName);

    const content: Record<TabKey, React.ReactNode> = {
        Projects: isGuest ? (
            <GuestRestriction />
        ) : (
            <motion.div key="proj" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-4">
                {/* Show recent project if exists */}
                {projectName && (
                    <GlassSurface className="p-4" delay={0}>
                        <p
                            className="text-[10px] font-bold uppercase tracking-[0.15em] mb-2"
                            style={{ color: "#00E5FF", textShadow: "0 0 12px rgba(0,229,255,0.55)" }}
                        >
                            Recent Project
                        </p>
                        <div
                            className="flex items-center gap-3 rounded-xl p-3"
                            style={{
                                background: "rgba(0,229,255,0.04)",
                                border: "1px solid rgba(0,229,255,0.12)",
                            }}
                        >
                            <div
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-sm"
                                style={{
                                    background: "linear-gradient(135deg, #00E5FF, #0066ff)",
                                    color: "#000",
                                    fontWeight: 800,
                                }}
                            >
                                {projectName.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-white">{projectName}</p>
                                <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.3)" }}>
                                    Active · Last updated 2m ago
                                </p>
                            </div>
                        </div>
                    </GlassSurface>
                )}
                <AchievementsSection />
                <ActivityCard />
                <ConnectSection />
                <BadgesSection />
            </motion.div>
        ),
        Friends: (
            <motion.div key="fr" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <GlassSurface className="p-16 text-center" delay={0.1}>
                    <p className="text-5xl mb-3">👥</p>
                    <p className="text-lg font-bold text-white mb-1.5" style={{ fontFamily: "var(--font-heading)" }}>
                        Friends coming soon
                    </p>
                    <p className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>
                        Connect with people to see them here.
                    </p>
                </GlassSurface>
            </motion.div>
        ),
        About: isGuest ? (
            <GuestRestriction />
        ) : (
            <motion.div key="ab" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <AboutSection />
            </motion.div>
        ),
    };

    return (
        <div className="relative z-10 mx-auto max-w-4xl px-4 pt-28 pb-20">
            <Cover
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                displayName={displayName}
                isGuest={isGuest}
            />

            <div className="mt-6">
                <AnimatePresence mode="wait">{content[activeTab]}</AnimatePresence>
            </div>

            {/* Logout button — always visible */}
            <LogoutButton />
        </div>
    );
};

export default ProfilePage;
