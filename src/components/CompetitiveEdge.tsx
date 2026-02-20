import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, X, ArrowRight } from "lucide-react";

/* ══════════════════════════════════════
   COMPARISON DATA
   ══════════════════════════════════════ */

interface CompItem {
    title: string;
    description: string;
}

const synapseItems: CompItem[] = [
    {
        title: "Unified Intelligence",
        description:
            "Combines Discord + GitHub signals for the full picture of team health.",
    },
    {
        title: "Predictive Foresight",
        description:
            "Catches 80%+ of at-risk deadlines before they are missed.",
    },
    {
        title: "Zero Ramp-up",
        description:
            "AI-generated project summaries for instant developer onboarding.",
    },
    {
        title: "Real-time Nudges",
        description:
            "Cuts blocker response time from hours to minutes.",
    },
    {
        title: "Gamified Engagement",
        description:
            "Trading-card profiles make contribution fun and visible.",
    },
];

const legacyItems: CompItem[] = [
    {
        title: "Data Silos",
        description:
            "Task tracking with no AI analysis or Discord sync.",
    },
    {
        title: "Reactive Only",
        description:
            "No predictive timeline; problems surface after deadlines pass.",
    },
    {
        title: "High Friction",
        description:
            "Manual standups and 'what did everyone do?' meetings.",
    },
    {
        title: "Zero Code Context",
        description:
            "Message tracking lacks actual engineering insights.",
    },
    {
        title: "Stale Metrics",
        description:
            "Static dashboards that don't encourage peer recognition.",
    },
];

/* ══════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════ */

const CompetitiveEdge = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
    const gridRef = useRef<HTMLDivElement>(null);
    const gridInView = useInView(gridRef, { once: true, margin: "-60px" });

    return (
        <section
            ref={sectionRef}
            id="edge"
            className="relative overflow-hidden"
            style={{
                backgroundColor: "#000000",
                paddingTop: "5rem",
                paddingBottom: "8rem",
            }}
        >
            {/* Subtle radial cyan glow behind the section */}
            <div
                className="pointer-events-none absolute left-1/4 top-1/3"
                style={{
                    width: 700,
                    height: 700,
                    transform: "translate(-50%, -40%)",
                    background:
                        "radial-gradient(circle, rgba(0,229,255,0.05) 0%, transparent 60%)",
                }}
            />

            <div className="relative z-10 mx-auto max-w-6xl px-6">
                {/* ═══ HEADER ═══ */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-16 text-center"
                >
                    <h2
                        className="font-bold"
                        style={{
                            fontFamily: "var(--font-heading)",
                            fontSize: "clamp(2rem, 5vw, 4rem)",
                            color: "#ffffff",
                        }}
                    >
                        Why{" "}
                        <span
                            style={{
                                background: "linear-gradient(90deg, #00E5FF, #0099CC)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            Project Synapse
                        </span>
                        ?
                    </h2>
                    <p
                        className="mx-auto mt-4 max-w-lg text-base lg:text-lg"
                        style={{
                            fontFamily: "var(--font-body)",
                            color: "rgba(255,255,255,0.4)",
                        }}
                    >
                        Other tools give you pieces. We give you the full, intelligent picture.
                    </p>
                </motion.div>

                {/* ═══ SIDE-BY-SIDE COMPARISON BOX ═══ */}
                <motion.div
                    ref={gridRef}
                    initial={{ opacity: 0, y: 40 }}
                    animate={gridInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className="grid grid-cols-1 overflow-hidden rounded-3xl lg:grid-cols-2"
                    style={{
                        backgroundColor: "rgba(255,255,255,0.05)",
                        backdropFilter: "blur(20px)",
                        WebkitBackdropFilter: "blur(20px)",
                        border: "1px solid rgba(255,255,255,0.08)",
                    }}
                >
                    {/* ── LEFT: Project Synapse (The Winner) ── */}
                    <div
                        className="relative flex flex-col p-8 lg:p-10"
                        style={{
                            /* Subtle cyan glow border on the Synapse side */
                            borderRight: "1px solid rgba(0,229,255,0.12)",
                            /* Faint radial glow to draw the eye */
                            background:
                                "radial-gradient(ellipse at 30% 20%, rgba(0,255,255,0.04) 0%, transparent 60%)",
                        }}
                    >
                        {/* Column header */}
                        <div className="mb-8">
                            <div
                                className="mb-3 inline-flex items-center gap-2 rounded-full px-4 py-1.5"
                                style={{
                                    backgroundColor: "rgba(0,229,255,0.08)",
                                    border: "1px solid rgba(0,229,255,0.2)",
                                }}
                            >
                                <div
                                    className="h-2 w-2 rounded-full"
                                    style={{
                                        backgroundColor: "#00E5FF",
                                        boxShadow: "0 0 8px rgba(0,229,255,0.6)",
                                    }}
                                />
                                <span
                                    className="text-xs font-bold uppercase tracking-wider"
                                    style={{ color: "#00E5FF" }}
                                >
                                    Project Synapse
                                </span>
                            </div>
                            <h3
                                className="text-xl font-bold text-white"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                The Intelligent Standard
                            </h3>
                        </div>

                        {/* Feature list — green checks */}
                        <div className="flex flex-col gap-5">
                            {synapseItems.map((item, i) => (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={gridInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
                                    className="flex gap-3.5"
                                >
                                    {/* Green check icon */}
                                    <div
                                        className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full"
                                        style={{
                                            backgroundColor: "rgba(34,197,94,0.12)",
                                            border: "1px solid rgba(34,197,94,0.25)",
                                        }}
                                    >
                                        <Check
                                            className="h-3.5 w-3.5"
                                            strokeWidth={3}
                                            style={{ color: "#22c55e" }}
                                        />
                                    </div>
                                    <div>
                                        <p
                                            className="text-sm font-semibold text-white"
                                            style={{ fontFamily: "var(--font-heading)" }}
                                        >
                                            {item.title}
                                        </p>
                                        <p
                                            className="mt-0.5 text-xs leading-relaxed"
                                            style={{ color: "rgba(255,255,255,0.45)" }}
                                        >
                                            {item.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* ── RIGHT: Legacy Tools (The Losers) ── */}
                    <div className="flex flex-col p-8 lg:p-10">
                        {/* Column header */}
                        <div className="mb-8">
                            <div
                                className="mb-3 inline-flex items-center gap-2 rounded-full px-4 py-1.5"
                                style={{
                                    backgroundColor: "rgba(255,255,255,0.04)",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                }}
                            >
                                <div
                                    className="h-2 w-2 rounded-full"
                                    style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
                                />
                                <span
                                    className="text-xs font-semibold uppercase tracking-wider"
                                    style={{ color: "rgba(255,255,255,0.3)" }}
                                >
                                    Legacy Tools
                                </span>
                            </div>
                            <h3
                                className="text-xl font-bold"
                                style={{
                                    fontFamily: "var(--font-heading)",
                                    color: "rgba(255,255,255,0.35)",
                                }}
                            >
                                Linear · Jira · GitHub Insights
                            </h3>
                        </div>

                        {/* Feature list — red Xs */}
                        <div className="flex flex-col gap-5">
                            {legacyItems.map((item, i) => (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={gridInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
                                    className="flex gap-3.5"
                                >
                                    {/* Red X icon */}
                                    <div
                                        className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full"
                                        style={{
                                            backgroundColor: "rgba(239,68,68,0.1)",
                                            border: "1px solid rgba(239,68,68,0.2)",
                                        }}
                                    >
                                        <X
                                            className="h-3.5 w-3.5"
                                            strokeWidth={3}
                                            style={{ color: "#ef4444" }}
                                        />
                                    </div>
                                    <div>
                                        <p
                                            className="text-sm font-semibold"
                                            style={{ color: "rgba(255,255,255,0.4)" }}
                                        >
                                            {item.title}
                                        </p>
                                        <p
                                            className="mt-0.5 text-xs leading-relaxed"
                                            style={{ color: "rgba(255,255,255,0.2)" }}
                                        >
                                            {item.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* ═══ CTA ═══ */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={gridInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-16 text-center"
                >
                    <motion.a
                        href="#"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative inline-flex items-center gap-3 rounded-full px-10 py-5 text-base font-semibold transition-shadow"
                        style={{
                            fontFamily: "var(--font-body)",
                            backgroundColor: "#00E5FF",
                            color: "#000000",
                        }}
                        onMouseEnter={(e) =>
                        (e.currentTarget.style.boxShadow =
                            "0 0 50px rgba(0,229,255,0.4)")
                        }
                        onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
                    >
                        Get Early Access
                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                        <div
                            className="pointer-events-none absolute inset-0 -z-10 rounded-full blur-xl transition-all group-hover:blur-2xl"
                            style={{ backgroundColor: "rgba(0,229,255,0.2)" }}
                        />
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
};

export default CompetitiveEdge;
