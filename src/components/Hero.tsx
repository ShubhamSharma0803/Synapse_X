import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Sparkles, Ghost, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";

const headingWords = ["AI-Driven", "Project", "Intelligence"];
const subHeading =
    "Transform how your team builds, tracks, and ships software — powered by machine learning that actually understands your workflow.";

interface HeroProps {
    onGhostLaunch?: () => void;
}

const Hero = ({ onGhostLaunch }: HeroProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-50px" });
    const enterGhostMode = useAuthStore((s) => s.enterGhostMode);

    const handleSandboxLaunch = () => {
        enterGhostMode();
        onGhostLaunch?.();
    };

    return (
        <section
            ref={containerRef}
            className="relative flex min-h-screen flex-col items-center justify-center text-center"
            style={{ backgroundColor: "#000000" }}
        >
            <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-6 pt-28 pb-20">
                {/* Decorative top gradient line */}
                <div
                    className="pointer-events-none absolute top-0 left-1/2 h-[1px] w-[60%]"
                    style={{
                        transform: "translateX(-50%)",
                        background:
                            "linear-gradient(90deg, transparent, rgba(0,243,255,0.3), transparent)",
                    }}
                />

                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                    animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-10 inline-flex items-center gap-2 rounded-full px-4 py-2"
                    style={{
                        border: "1px solid rgba(0,243,255,0.25)",
                        backgroundColor: "rgba(0,243,255,0.06)",
                        backdropFilter: "blur(24px)",
                        WebkitBackdropFilter: "blur(24px)",
                    }}
                >
                    <Sparkles className="h-4 w-4" style={{ color: "#00f3ff" }} />
                    <span
                        className="text-xs font-medium uppercase tracking-wider"
                        style={{ fontFamily: "var(--font-body)", color: "#00f3ff" }}
                    >
                        Next-Gen Project Platform
                    </span>
                </motion.div>

                {/* ── Blur-In Focus Drift Heading ── */}
                <div
                    style={{
                        animation: "weightless-drift 7s ease-in-out infinite",
                    }}
                >
                    <h1
                        className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3"
                        style={{
                            fontSize: "clamp(2.5rem, 5vw + 1rem, 7rem)",
                            lineHeight: 1.05,
                        }}
                    >
                        {headingWords.map((word, i) => (
                            <motion.span
                                key={word}
                                initial={{
                                    opacity: 0,
                                    filter: "blur(20px)",
                                    y: 30,
                                    x: i % 2 === 0 ? -20 : 20,
                                }}
                                animate={
                                    isInView
                                        ? { opacity: 1, filter: "blur(0px)", y: 0, x: 0 }
                                        : {}
                                }
                                transition={{
                                    duration: 1.2,
                                    delay: 0.3 + i * 0.15,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                className="font-extrabold tracking-tight"
                                style={{
                                    fontFamily: "var(--font-heading)",
                                    ...(i === 0
                                        ? {
                                            background:
                                                "linear-gradient(135deg, #FFFFFF 30%, #00f3ff 100%)",
                                            WebkitBackgroundClip: "text",
                                            WebkitTextFillColor: "transparent",
                                        }
                                        : i === 2
                                            ? {
                                                background:
                                                    "linear-gradient(135deg, #00f3ff 0%, #0099CC 100%)",
                                                WebkitBackgroundClip: "text",
                                                WebkitTextFillColor: "transparent",
                                            }
                                            : { color: "#ffffff" }),
                                }}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </h1>
                </div>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                    animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                    transition={{ duration: 1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className="mx-auto mt-8 max-w-2xl leading-relaxed"
                    style={{
                        fontFamily: "var(--font-body)",
                        color: "rgba(255,255,255,0.5)",
                        fontSize: "clamp(1rem, 1.5vw + 0.25rem, 1.25rem)",
                    }}
                >
                    {subHeading}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-12 flex flex-wrap items-center justify-center gap-4"
                >
                    {/* Primary: Launch Sandbox */}
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <button
                            onClick={handleSandboxLaunch}
                            className="group relative flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold transition-shadow"
                            style={{
                                fontFamily: "var(--font-body)",
                                backgroundColor: "#00f3ff",
                                color: "#000000",
                            }}
                            onMouseEnter={(e) =>
                            (e.currentTarget.style.boxShadow =
                                "0 0 40px rgba(0,243,255,0.35)")
                            }
                            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
                        >
                            <Ghost className="h-4 w-4" />
                            Launch Sandbox
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </button>
                    </motion.div>

                    {/* Secondary: Neural Login */}
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link
                            to="/auth"
                            className="flex items-center gap-2 rounded-full px-8 py-4 text-sm font-medium transition-all"
                            style={{
                                fontFamily: "var(--font-body)",
                                border: "1px solid rgba(255,255,255,0.15)",
                                backgroundColor: "rgba(255,255,255,0.04)",
                                color: "rgba(255,255,255,0.7)",
                                backdropFilter: "blur(24px)",
                                WebkitBackdropFilter: "blur(24px)",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = "rgba(0,229,255,0.3)";
                                e.currentTarget.style.color = "#00E5FF";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                                e.currentTarget.style.color = "rgba(255,255,255,0.7)";
                            }}
                        >
                            <Shield className="h-4 w-4" />
                            Neural Login
                        </Link>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 2 }}
                className="absolute bottom-10 left-1/2"
                style={{ transform: "translateX(-50%)" }}
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="flex h-10 w-6 items-start justify-center rounded-full pt-2"
                    style={{ border: "1px solid rgba(255,255,255,0.15)" }}
                >
                    <div
                        className="h-2 w-1 rounded-full"
                        style={{ backgroundColor: "rgba(0,243,255,0.6)" }}
                    />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
