import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Github,
    Twitter,
    Linkedin,
    ArrowUp,
    Send,
    Disc,
} from "lucide-react";
import DecryptedText from "./hub/DecryptedText";

/* ──────────────────────────────────────────────
   System Clock
   ────────────────────────────────────────────── */

const SystemClock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const fmt = (n: number) => n.toString().padStart(2, "0");

    return (
        <div
            className="text-[10px] font-mono tracking-tighter text-neon-blue/60"
            style={{ fontFamily: "var(--font-mono)" }}
        >
            [SYSTEM_TIME: {fmt(time.getHours())}:{fmt(time.getMinutes())}:{fmt(time.getSeconds())}]
        </div>
    );
};

/* ──────────────────────────────────────────────
   Neural Pulse Line (EKG)
   ────────────────────────────────────────────── */

const NeuralPulseLine = () => (
    <div className="relative h-4 w-48 overflow-hidden opacity-50">
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 200 20"
            preserveAspectRatio="none"
            className="stroke-neon-blue"
            fill="none"
        >
            <motion.path
                d="M0,10 L20,10 L30,2 L40,18 L50,10 L150,10 L160,2 L170,18 L180,10 L200,10"
                strokeWidth="1"
                animate={{
                    x: [-200, 0],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />
            <motion.path
                d="M0,10 L20,10 L30,2 L40,18 L50,10 L150,10 L160,2 L170,18 L180,10 L200,10"
                strokeWidth="1"
                animate={{
                    x: [0, 200],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />
        </svg>
    </div>
);

/* ──────────────────────────────────────────────
   Powered Badge
   ────────────────────────────────────────────── */

const PoweredBadge = () => (
    <div
        className="inline-flex items-center gap-2 rounded-md px-3 py-1.5"
        style={{
            fontFamily: "var(--font-mono)",
            fontSize: "9px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#00f3ff",
            background: "rgba(0, 243, 255, 0.05)",
            border: "1px solid rgba(0, 243, 255, 0.2)",
            boxShadow: "0 0 10px rgba(0, 243, 255, 0.15), inset 0 0 5px rgba(0, 243, 255, 0.1)",
        }}
    >
        <span className="h-1.5 w-1.5 rounded-full bg-[#39ff14] animate-pulse shadow-[0_0_8px_#39ff14]" />
        Powered by Synapse Neural Engine
    </div>
);

/* ──────────────────────────────────────────────
   Data
   ────────────────────────────────────────────── */

const quickLinks = [
    { label: "Features", href: "#features" },
    { label: "Team", href: "#team" },
    { label: "Competitive Edge", href: "#edge" },
    { label: "Documentation", href: "#" },
    { label: "Changelog", href: "#" },
];

const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Disc, href: "#", label: "Discord" },
];

/* ──────────────────────────────────────────────
   Orbital S Logo (glowing mini variant)
   ────────────────────────────────────────────── */

const OrbitalSLogo = () => (
    <div className="relative flex h-8 w-8 shrink-0 items-center justify-center">
        {/* Glow ring */}
        <div
            className="absolute inset-0 rounded-full"
            style={{
                border: "1.5px solid rgba(0,243,255,0.35)",
                boxShadow:
                    "0 0 12px rgba(0,243,255,0.2), inset 0 0 8px rgba(0,243,255,0.05)",
                animation: "pulse-glow 4s ease-in-out infinite",
            }}
        />
        {/* Orbital arc */}
        <div
            className="absolute inset-[3px] rounded-full"
            style={{
                border: "1px solid transparent",
                borderTopColor: "rgba(0,243,255,0.6)",
                animation: "spin 6s linear infinite",
            }}
        />
        {/* S letter */}
        <span
            className="relative z-10 text-xs font-black"
            style={{
                fontFamily: "var(--font-heading)",
                color: "#00f3ff",
                textShadow: "0 0 10px rgba(0,243,255,0.5)",
            }}
        >
            S
        </span>
    </div>
);

/* ──────────────────────────────────────────────
   Back to Top Button (glassmorphic pill)
   ────────────────────────────────────────────── */

const BackToTopButton = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => setVisible(window.scrollY > 600);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () =>
        window.scrollTo({ top: 0, behavior: "smooth" });

    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                    onClick={scrollToTop}
                    className="fixed right-6 bottom-6 z-50 flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold cursor-pointer"
                    style={{
                        fontFamily: "var(--font-mono)",
                        backgroundColor: "rgba(0,0,0,0.4)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        backdropFilter: "blur(12px)",
                        WebkitBackdropFilter: "blur(12px)",
                        boxShadow: "0 4px 30px rgba(0,0,0,0.3)",
                        color: "#00f3ff",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor =
                            "rgba(0,243,255,0.3)";
                        e.currentTarget.style.boxShadow =
                            "0 0 20px rgba(0,243,255,0.15), 0 4px 30px rgba(0,0,0,0.3)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor =
                            "rgba(255,255,255,0.1)";
                        e.currentTarget.style.boxShadow =
                            "0 4px 30px rgba(0,0,0,0.3)";
                    }}
                >
                    <ArrowUp className="h-3.5 w-3.5" strokeWidth={2.5} />
                    Back to Top
                </motion.button>
            )}
        </AnimatePresence>
    );
};

/* ──────────────────────────────────────────────
   Footer Component
   ────────────────────────────────────────────── */

const Footer = () => {
    return (
        <>
            <footer
                className="relative bg-black"
                style={{
                    borderTop: "1px solid rgba(255,255,255,0.1)",
                    fontFamily: "var(--font-mono)"
                }}
            >
                {/* ── Top glow accent line ── */}
                <div
                    className="pointer-events-none absolute top-0 left-1/2 h-[1px] w-[50%]"
                    style={{
                        transform: "translateX(-50%)",
                        background:
                            "linear-gradient(90deg, transparent, rgba(0,243,255,0.25), transparent)",
                    }}
                />

                {/* ══════════════════════════════════════
                   Main 3-Column Grid
                   ══════════════════════════════════════ */}
                <div
                    className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:gap-8"
                    style={{
                        gridTemplateColumns: "1fr",
                    }}
                >
                    {/* Responsive 3-column layout */}
                    <div className="grid gap-12 md:grid-cols-[2fr_1.5fr_1.5fr] md:gap-8">
                        {/* ── Column 1 : System Manifest (40%) ── */}
                        <div className="flex flex-col gap-6">
                            {/* Header Row */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <OrbitalSLogo />
                                    <h3
                                        className="text-lg font-bold uppercase tracking-tighter"
                                        style={{
                                            fontFamily: "var(--font-mono)",
                                            color: "#fff",
                                        }}
                                    >
                                        <DecryptedText text="[ARCHITECT_LOG]" />
                                    </h3>
                                </div>
                                <SystemClock />
                            </div>

                            {/* Pulse Line */}
                            <NeuralPulseLine />

                            {/* Mission Manifest (Glass Surface) */}
                            <div
                                className="relative rounded-xl p-6"
                                style={{
                                    fontFamily: "var(--font-mono)",
                                    backgroundColor: "rgba(255, 255, 255, 0.02)",
                                    backdropFilter: "blur(10px)",
                                    border: "0.5px solid rgba(0, 243, 255, 0.15)",
                                    boxShadow: "0 0 20px rgba(0, 243, 255, 0.05)",
                                }}
                            >
                                <p className="text-xs leading-relaxed opacity-70">
                                    Project Synapse is a neural-link interface designed to bridge the gap between human intent and code velocity. Built for the next generation of vibe-coders.
                                </p>
                            </div>

                            {/* Identity Terminal */}
                            <div className="flex flex-col gap-2 font-mono text-[11px] tracking-tight">
                                {[
                                    { label: "LEAD_ARCHITECT", value: "SYNAPSE_CORE" },
                                    { label: "CORE_ENGINE", value: "GEMINI_3_FLASH" },
                                    { label: "STATUS", value: "PROTOTYPE_STABLE" },
                                ].map((item) => (
                                    <motion.div
                                        key={item.label}
                                        className="flex gap-2 transition-colors duration-200"
                                        style={{ color: "rgba(255,255,255,0.4)" }}
                                        whileHover={{
                                            color: "#00f3ff",
                                            textShadow: "0 0 8px rgba(0,243,255,0.4)"
                                        }}
                                    >
                                        <span>&gt;</span>
                                        <span className="opacity-50">{item.label}:</span>
                                        <span className="font-bold">{item.value}</span>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Mini social row (mobile-friendly) */}
                            <div className="mt-2 flex items-center gap-3">
                                {socialLinks.map((link) => {
                                    const Icon = link.icon;
                                    return (
                                        <a
                                            key={link.label}
                                            href={link.href}
                                            aria-label={link.label}
                                            className="flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200"
                                            style={{
                                                border: "1px solid rgba(255,255,255,0.1)",
                                                backgroundColor:
                                                    "rgba(255,255,255,0.03)",
                                                color: "rgba(255,255,255,0.35)",
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.borderColor =
                                                    "rgba(0,243,255,0.35)";
                                                e.currentTarget.style.backgroundColor =
                                                    "rgba(0,243,255,0.08)";
                                                e.currentTarget.style.color =
                                                    "#00f3ff";
                                                e.currentTarget.style.boxShadow =
                                                    "0 0 14px rgba(0,243,255,0.15)";
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.borderColor =
                                                    "rgba(255,255,255,0.1)";
                                                e.currentTarget.style.backgroundColor =
                                                    "rgba(255,255,255,0.03)";
                                                e.currentTarget.style.color =
                                                    "rgba(255,255,255,0.35)";
                                                e.currentTarget.style.boxShadow =
                                                    "none";
                                            }}
                                        >
                                            <Icon
                                                className="h-4 w-4"
                                                strokeWidth={1.8}
                                            />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>

                        {/* ── Column 2 : Quick Links (30%) ── */}
                        <div className="flex flex-col gap-5">
                            <h4
                                className="text-sm font-semibold uppercase tracking-widest"
                                style={{
                                    fontFamily: "var(--font-mono)",
                                    color: "rgba(255,255,255,0.5)",
                                    letterSpacing: "0.15em",
                                }}
                            >
                                Quick Links
                            </h4>
                            <ul className="flex flex-col gap-3">
                                {quickLinks.map((link) => (
                                    <li key={link.label}>
                                        <a
                                            href={link.href}
                                            className="group relative inline-flex items-center gap-2 text-sm transition-colors duration-200"
                                            style={{
                                                fontFamily: "var(--font-mono)",
                                                color: "rgba(255,255,255,0.4)",
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.color =
                                                    "#00f3ff";
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.color =
                                                    "rgba(255,255,255,0.4)";
                                            }}
                                        >
                                            {/* Arrow indicator */}
                                            <span
                                                className="inline-block w-0 overflow-hidden transition-all duration-300 group-hover:w-4"
                                                style={{ color: "#00f3ff" }}
                                            >
                                                →
                                            </span>
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* ── Column 3 : Newsletter / Socials (30%) ── */}
                        <div className="flex flex-col gap-5">
                            <h4
                                className="text-sm font-semibold uppercase tracking-widest"
                                style={{
                                    fontFamily: "var(--font-mono)",
                                    color: "rgba(255,255,255,0.5)",
                                    letterSpacing: "0.15em",
                                }}
                            >
                                Stay in the Loop
                            </h4>
                            <p
                                className="text-sm leading-relaxed opacity-70"
                                style={{
                                    fontFamily: "var(--font-mono)",
                                }}
                            >
                                Get early access to new features, engineering
                                insights, and community updates.
                            </p>

                            {/* Newsletter input */}
                            <div
                                className="flex items-center overflow-hidden rounded-full"
                                style={{
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    backgroundColor: "rgba(255,255,255,0.03)",
                                }}
                            >
                                <input
                                    type="email"
                                    placeholder="you@domain.dev"
                                    className="flex-1 border-none bg-transparent px-4 py-2.5 text-xs text-white outline-none placeholder:text-white/25"
                                    style={{
                                        fontFamily: "var(--font-mono)",
                                    }}
                                />
                                <button
                                    className="flex h-full shrink-0 items-center justify-center px-4 py-2.5 transition-all duration-200 cursor-pointer"
                                    style={{
                                        backgroundColor:
                                            "rgba(0,243,255,0.1)",
                                        color: "#00f3ff",
                                        borderLeft:
                                            "1px solid rgba(255,255,255,0.08)",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor =
                                            "rgba(0,243,255,0.2)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor =
                                            "rgba(0,243,255,0.1)";
                                    }}
                                >
                                    <Send
                                        className="h-3.5 w-3.5"
                                        strokeWidth={2}
                                    />
                                </button>
                            </div>

                            {/* Extra links */}
                            <div className="flex flex-wrap gap-x-5 gap-y-2 pt-1">
                                {["Privacy", "Terms", "Status"].map((t) => (
                                    <a
                                        key={t}
                                        href="#"
                                        className="text-xs transition-colors duration-200"
                                        style={{
                                            fontFamily: "var(--font-mono)",
                                            color: "rgba(255,255,255,0.25)",
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.color =
                                                "#00f3ff";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.color =
                                                "rgba(255,255,255,0.25)";
                                        }}
                                    >
                                        {t}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ══════════════════════════════════════
                   Sub-footer / Legal Bar
                   ══════════════════════════════════════ */}
                <div
                    className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 pb-12 md:flex-row"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                >
                    <div className="flex flex-col gap-2 pt-6">
                        <p
                            className="text-xs"
                            style={{
                                fontFamily: "var(--font-mono)",
                                color: "rgba(255,255,255,0.2)",
                            }}
                        >
                            © 2026 Project Synapse. [AUTHORIZED_ACCESS_ONLY]
                        </p>
                        <p
                            className="text-xs"
                            style={{
                                fontFamily: "var(--font-mono)",
                                color: "rgba(255,255,255,0.2)",
                            }}
                        >
                            Made with{" "}
                            <span style={{ color: "#ff4d6a" }}>❤️</span> for
                            the Developer Community
                        </p>
                    </div>

                    <div className="pt-6">
                        <PoweredBadge />
                    </div>
                </div>
            </footer>

            {/* ── Glassmorphic Back to Top ── */}
            <BackToTopButton />
        </>
    );
};

export default Footer;
