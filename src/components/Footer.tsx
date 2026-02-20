import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
    Github,
    Twitter,
    Linkedin,
    ArrowUp,
    Send,
    Disc,
    Mail,
    MessageSquare,
    CheckCircle2,
    Zap,
} from "lucide-react";
import DecryptedText from "./hub/DecryptedText";

/* ──────────────────────────────────────────────
   Toast Notification
   ────────────────────────────────────────────── */

const Toast = ({ show, onDone }: { show: boolean; onDone: () => void }) => {
    useEffect(() => {
        if (show) {
            const t = setTimeout(onDone, 3500);
            return () => clearTimeout(t);
        }
    }, [show, onDone]);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.9 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed bottom-8 left-1/2 z-[200] flex items-center gap-3 rounded-2xl px-6 py-3.5"
                    style={{
                        transform: "translateX(-50%)",
                        backgroundColor: "rgba(0,0,0,0.7)",
                        border: "1px solid rgba(0,229,255,0.3)",
                        backdropFilter: "blur(20px)",
                        boxShadow:
                            "0 0 30px rgba(0,229,255,0.15), 0 8px 32px rgba(0,0,0,0.5)",
                    }}
                >
                    <div
                        className="flex h-8 w-8 items-center justify-center rounded-full"
                        style={{
                            background: "linear-gradient(135deg, rgba(0,229,255,0.2), rgba(0,102,255,0.2))",
                            border: "1px solid rgba(0,229,255,0.3)",
                        }}
                    >
                        <CheckCircle2 className="h-4 w-4" style={{ color: "#00E5FF" }} />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>
                            Message Encrypted & Sent
                        </p>
                        <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>
                            Neural handshake complete
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

/* ──────────────────────────────────────────────
   Magnetic Button Wrapper
   ────────────────────────────────────────────── */

const MagneticButton = ({
    children,
    onClick,
    disabled,
}: {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
}) => {
    const ref = useRef<HTMLButtonElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        ref.current.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
    };

    const handleMouseLeave = () => {
        if (ref.current) {
            ref.current.style.transform = "translate(0, 0)";
        }
    };

    return (
        <button
            ref={ref}
            onClick={onClick}
            disabled={disabled}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative inline-flex items-center gap-2.5 rounded-xl px-8 py-3.5 text-sm font-bold transition-all duration-300 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
                fontFamily: "var(--font-heading)",
                background: "linear-gradient(135deg, rgba(0,229,255,0.15), rgba(0,102,255,0.15))",
                border: "1px solid rgba(0,229,255,0.3)",
                color: "#00E5FF",
                boxShadow: "0 0 20px rgba(0,229,255,0.1)",
            }}
            onMouseEnter={(e) => {
                if (!disabled) {
                    e.currentTarget.style.background =
                        "linear-gradient(135deg, rgba(0,229,255,0.25), rgba(0,102,255,0.25))";
                    e.currentTarget.style.borderColor = "rgba(0,229,255,0.5)";
                    e.currentTarget.style.boxShadow =
                        "0 0 35px rgba(0,229,255,0.2), 0 0 60px rgba(0,229,255,0.1)";
                }
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.background =
                    "linear-gradient(135deg, rgba(0,229,255,0.15), rgba(0,102,255,0.15))";
                e.currentTarget.style.borderColor = "rgba(0,229,255,0.3)";
                e.currentTarget.style.boxShadow = "0 0 20px rgba(0,229,255,0.1)";
            }}
        >
            {children}
        </button>
    );
};

/* ──────────────────────────────────────────────
   Scanner Input (dark bg + glowing bottom border)
   ────────────────────────────────────────────── */

const ScannerInput = ({
    icon: Icon,
    placeholder,
    type = "text",
    value,
    onChange,
    multiline = false,
}: {
    icon: React.ElementType;
    placeholder: string;
    type?: string;
    value: string;
    onChange: (val: string) => void;
    multiline?: boolean;
}) => {
    const [focused, setFocused] = useState(false);

    const shared = {
        className:
            "w-full bg-transparent text-sm text-white outline-none placeholder:text-white/20",
        style: { fontFamily: "var(--font-mono)" } as React.CSSProperties,
        placeholder,
        value,
        onFocus: () => setFocused(true),
        onBlur: () => setFocused(false),
    };

    return (
        <div
            className="relative rounded-xl overflow-hidden transition-all duration-400"
            style={{
                backgroundColor: "rgba(0,0,0,0.5)",
                border: `1px solid ${focused ? "rgba(0,229,255,0.3)" : "rgba(255,255,255,0.06)"}`,
                boxShadow: focused
                    ? "0 0 20px rgba(0,229,255,0.08), inset 0 0 12px rgba(0,229,255,0.03)"
                    : "none",
            }}
        >
            <div className="flex items-start gap-3 px-4 py-3.5">
                <Icon
                    className="h-4 w-4 mt-0.5 shrink-0 transition-colors duration-300"
                    style={{ color: focused ? "#00E5FF" : "rgba(255,255,255,0.2)" }}
                />
                {multiline ? (
                    <textarea
                        {...shared}
                        rows={4}
                        onChange={(e) => onChange(e.target.value)}
                        style={{ ...shared.style, resize: "none" }}
                    />
                ) : (
                    <input
                        {...shared}
                        type={type}
                        onChange={(e) => onChange(e.target.value)}
                    />
                )}
            </div>
            {/* Glowing bottom border */}
            <div
                className="absolute bottom-0 left-0 h-[2px] transition-all duration-500"
                style={{
                    width: focused ? "100%" : "0%",
                    background: "linear-gradient(90deg, transparent, #00E5FF, transparent)",
                    boxShadow: focused ? "0 0 10px rgba(0,229,255,0.4)" : "none",
                }}
            />
        </div>
    );
};

/* ──────────────────────────────────────────────
   Social Links
   ────────────────────────────────────────────── */

const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Disc, href: "#", label: "Discord" },
];

/* ──────────────────────────────────────────────
   Back to Top Button
   ────────────────────────────────────────────── */

const BackToTopButton = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => setVisible(window.scrollY > 600);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="fixed right-6 bottom-6 z-50 flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold cursor-pointer"
                    style={{
                        fontFamily: "var(--font-mono)",
                        backgroundColor: "rgba(0,0,0,0.4)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        backdropFilter: "blur(12px)",
                        boxShadow: "0 4px 30px rgba(0,0,0,0.3)",
                        color: "#00f3ff",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "rgba(0,243,255,0.3)";
                        e.currentTarget.style.boxShadow =
                            "0 0 20px rgba(0,243,255,0.15), 0 4px 30px rgba(0,0,0,0.3)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                        e.currentTarget.style.boxShadow = "0 4px 30px rgba(0,0,0,0.3)";
                    }}
                >
                    <ArrowUp className="h-3.5 w-3.5" strokeWidth={2.5} />
                    Back to Top
                </motion.button>
            )}
        </AnimatePresence>
    );
};

/* ══════════════════════════════════════════════
   FOOTER — About Us + Contact + Signature
   ══════════════════════════════════════════════ */

const Footer = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [showToast, setShowToast] = useState(false);

    const handleSend = () => {
        if (!email.trim() || !message.trim()) return;
        setShowToast(true);
        setEmail("");
        setMessage("");
    };

    const fadeUp = (delay: number) => ({
        initial: { opacity: 0, y: 30 } as const,
        animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
        transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
    });

    return (
        <>
            <footer
                ref={sectionRef}
                className="relative"
                style={{
                    backgroundColor: "#050508",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                }}
            >
                {/* ── Top glow accent ── */}
                <div
                    className="pointer-events-none absolute top-0 left-1/2 h-[1px] w-[60%]"
                    style={{
                        transform: "translateX(-50%)",
                        background:
                            "linear-gradient(90deg, transparent, rgba(0,229,255,0.2), transparent)",
                    }}
                />

                <div className="mx-auto max-w-4xl px-6 pt-24 pb-8">
                    {/* ═══════════════════════════════════════
                       SECTION 1 — Team Identity & Vision
                       ═══════════════════════════════════════ */}
                    <motion.div
                        {...fadeUp(0)}
                        className="flex flex-col items-center text-center mb-20"
                    >
                        {/* Team Icon */}
                        <div
                            className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl"
                            style={{
                                background: "linear-gradient(135deg, rgba(0,229,255,0.12), rgba(0,102,255,0.12))",
                                border: "1px solid rgba(0,229,255,0.2)",
                                boxShadow: "0 0 25px rgba(0,229,255,0.1)",
                            }}
                        >
                            <Zap className="h-6 w-6" style={{ color: "#00E5FF" }} />
                        </div>

                        {/* Team Name with DecryptedText */}
                        <h2
                            className="text-3xl font-extrabold tracking-tight sm:text-4xl cursor-pointer mb-6"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            <DecryptedText
                                text="Team SynapseX"
                                speed={40}
                                className="text-3xl font-extrabold sm:text-4xl"
                                style={{
                                    background: "linear-gradient(135deg, #fff 40%, #00E5FF)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}
                            />
                        </h2>

                        {/* Vision Statement */}
                        <p
                            className="max-w-xl text-sm leading-relaxed"
                            style={{
                                color: "rgba(255,255,255,0.45)",
                                fontFamily: "var(--font-body)",
                            }}
                        >
                            Bridging the gap between human intent and code velocity
                            for the next generation of vibe-coders.
                        </p>

                        {/* Social Links */}
                        <div className="mt-8 flex items-center gap-3">
                            {socialLinks.map((link) => {
                                const Icon = link.icon;
                                return (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        aria-label={link.label}
                                        className="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200"
                                        style={{
                                            border: "1px solid rgba(255,255,255,0.08)",
                                            backgroundColor: "rgba(255,255,255,0.03)",
                                            color: "rgba(255,255,255,0.3)",
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.borderColor = "rgba(0,229,255,0.35)";
                                            e.currentTarget.style.backgroundColor = "rgba(0,229,255,0.08)";
                                            e.currentTarget.style.color = "#00E5FF";
                                            e.currentTarget.style.boxShadow = "0 0 14px rgba(0,229,255,0.15)";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                                            e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.03)";
                                            e.currentTarget.style.color = "rgba(255,255,255,0.3)";
                                            e.currentTarget.style.boxShadow = "none";
                                        }}
                                    >
                                        <Icon className="h-4 w-4" strokeWidth={1.8} />
                                    </a>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* ═══════════════════════════════════════
                       SECTION 2 — Leader's Statement
                       ═══════════════════════════════════════ */}
                    <motion.div {...fadeUp(0.15)} className="mb-20">
                        <div
                            className="relative rounded-2xl p-8 sm:p-10 text-center overflow-hidden"
                            style={{
                                backgroundColor: "rgba(255,255,255,0.02)",
                                backdropFilter: "blur(24px)",
                                WebkitBackdropFilter: "blur(24px)",
                                border: "1px solid rgba(255,255,255,0.06)",
                                boxShadow:
                                    "0 0 0 1px rgba(255,255,255,0.02) inset, 0 8px 40px rgba(0,0,0,0.3)",
                            }}
                        >
                            {/* Top highlight */}
                            <div
                                className="pointer-events-none absolute inset-x-0 top-0 h-px"
                                style={{
                                    background:
                                        "linear-gradient(90deg, transparent, rgba(0,229,255,0.15), transparent)",
                                }}
                            />

                            {/* Quote mark */}
                            <span
                                className="block text-5xl leading-none mb-4"
                                style={{
                                    color: "rgba(0,229,255,0.15)",
                                    fontFamily: "Georgia, serif",
                                }}
                            >
                                "
                            </span>

                            <p
                                className="text-lg sm:text-xl font-medium italic leading-relaxed max-w-2xl mx-auto"
                                style={{
                                    fontFamily: "var(--font-mono)",
                                    color: "rgba(255,255,255,0.75)",
                                }}
                            >
                                We aren't just building tools; we are architecting the future
                                of Engineering Projects.
                            </p>

                            <div className="mt-6 flex items-center justify-center gap-3">
                                <div
                                    className="h-px w-8"
                                    style={{ backgroundColor: "rgba(0,229,255,0.2)" }}
                                />
                                <span
                                    className="text-[11px] uppercase tracking-[0.2em] font-bold"
                                    style={{
                                        color: "rgba(0,229,255,0.5)",
                                        fontFamily: "var(--font-mono)",
                                    }}
                                >
                                    Shubham Sharma
                                </span>
                                <div
                                    className="h-px w-8"
                                    style={{ backgroundColor: "rgba(0,229,255,0.2)" }}
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* ═══════════════════════════════════════
                       SECTION 3 — Contact Us
                       ═══════════════════════════════════════ */}
                    <motion.div
                        {...fadeUp(0.3)}
                        className="mb-20 max-w-lg mx-auto"
                    >
                        <div className="text-center mb-8">
                            <h3
                                className="text-sm font-bold uppercase tracking-[0.2em] mb-2"
                                style={{
                                    color: "rgba(255,255,255,0.5)",
                                    fontFamily: "var(--font-mono)",
                                }}
                            >
                                Contact Us
                            </h3>
                            <p
                                className="text-xs"
                                style={{
                                    color: "rgba(255,255,255,0.25)",
                                    fontFamily: "var(--font-mono)",
                                }}
                            >
                                Initiate a neural handshake
                            </p>
                        </div>

                        <div className="flex flex-col gap-4">
                            <ScannerInput
                                icon={Mail}
                                placeholder="your@email.dev"
                                type="email"
                                value={email}
                                onChange={setEmail}
                            />
                            <ScannerInput
                                icon={MessageSquare}
                                placeholder="Your message..."
                                value={message}
                                onChange={setMessage}
                                multiline
                            />

                            <div className="flex justify-center mt-2">
                                <MagneticButton
                                    onClick={handleSend}
                                    disabled={!email.trim() || !message.trim()}
                                >
                                    <Send className="h-4 w-4" />
                                    Sync Message
                                </MagneticButton>
                            </div>
                        </div>
                    </motion.div>

                    {/* ═══════════════════════════════════════
                       SECTION 4 — "Made With" Signature
                       ═══════════════════════════════════════ */}
                    <motion.div
                        {...fadeUp(0.45)}
                        className="flex flex-col items-center gap-4 pt-8"
                        style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
                    >
                        <p
                            className="text-xs text-center"
                            style={{
                                fontFamily: "var(--font-mono)",
                                color: "rgba(255,255,255,0.18)",
                            }}
                        >
                            Made with{" "}
                            <span style={{ color: "#ff4d6a", opacity: 0.7 }}>❤️</span> by
                            Team SynapseX for the developers community
                        </p>
                        <p
                            className="text-[10px]"
                            style={{
                                fontFamily: "var(--font-mono)",
                                color: "rgba(255,255,255,0.1)",
                            }}
                        >
                            © 2026 Project Synapse — [AUTHORIZED_ACCESS_ONLY]
                        </p>
                    </motion.div>
                </div>
            </footer>

            {/* ── Glassmorphic Back to Top ── */}
            <BackToTopButton />

            {/* ── Toast Notification ── */}
            <Toast show={showToast} onDone={() => setShowToast(false)} />
        </>
    );
};

export default Footer;
