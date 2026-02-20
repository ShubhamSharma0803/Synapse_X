import { useRef } from "react";
import {
    motion,
    useInView,
} from "framer-motion";
import {
    MessageSquareText,
    BellRing,
    TrendingUp,
    Flame,
    IdCard,
    Bot,
    Radio,
    Users,
} from "lucide-react";
import ScrollStack, { ScrollStackItem } from "./ScrollStack";

/* ══════════════════════════════════════
   LIVING VISUALS
   ══════════════════════════════════════ */

const TerminalVisual = () => {
    const lines = [
        { w: "75%", delay: 0 },
        { w: "55%", delay: 0.4 },
        { w: "88%", delay: 0.8 },
        { w: "42%", delay: 1.2 },
        { w: "65%", delay: 1.6 },
    ];
    return (
        <div
            className="w-full max-w-sm rounded-2xl p-5"
            style={{
                backgroundColor: "rgba(0,0,0,0.35)",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)",
            }}
        >
            <div className="mb-3 flex gap-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: "#ff5f57" }} />
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: "#febc2e" }} />
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: "#28c840" }} />
            </div>
            <div className="flex flex-col gap-2.5">
                {lines.map((l, i) => (
                    <motion.div
                        key={i}
                        initial={{ width: 0, opacity: 0 }}
                        whileInView={{ width: l.w, opacity: 1 }}
                        transition={{ duration: 0.7, delay: l.delay, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="h-2.5 rounded-full"
                        style={{
                            background:
                                i === 0
                                    ? "linear-gradient(90deg, rgba(255,255,255,0.9), rgba(255,255,255,0.4))"
                                    : "rgba(255,255,255,0.15)",
                        }}
                    />
                ))}
                <motion.div
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="mt-1 h-4 w-2 rounded-sm"
                    style={{ backgroundColor: "rgba(255,255,255,0.8)" }}
                />
            </div>
        </div>
    );
};

const NudgeVisual = () => (
    <div className="relative flex h-40 w-40 items-center justify-center">
        {[0, 1, 2].map((i) => (
            <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                    width: 60 + i * 32,
                    height: 60 + i * 32,
                    border: `1.5px solid rgba(255,255,255,${0.4 - i * 0.1})`,
                }}
                animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0.1, 0.5] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.35, ease: "easeInOut" }}
            />
        ))}
        <div
            className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full"
            style={{ backgroundColor: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}
        >
            <BellRing className="h-6 w-6 text-white" />
        </div>
    </div>
);

const TimelineVisual = () => {
    const actual = "M 0 120 C 50 120, 70 80, 130 70 S 200 45, 260 60 S 340 35, 400 30 S 460 22, 500 40";
    const ghost = "M 500 40 C 540 30, 580 20, 640 18 S 700 28, 740 15";
    return (
        <div className="relative w-full max-w-md overflow-visible">
            <svg viewBox="0 0 740 160" className="w-full" preserveAspectRatio="xMidYMid meet">
                <defs>
                    <filter id="tlGlow3">
                        <feGaussianBlur stdDeviation="3" result="b" />
                        <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                    <linearGradient id="areaFill3" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#fff" stopOpacity="0.18" />
                        <stop offset="100%" stopColor="#fff" stopOpacity="0" />
                    </linearGradient>
                </defs>
                <motion.path
                    d={actual + " L 500 160 L 0 160 Z"} fill="url(#areaFill3)"
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                    transition={{ duration: 1.5 }} viewport={{ once: true }}
                />
                <motion.path
                    d={actual} fill="none" stroke="#fff" strokeWidth={2.5} strokeLinecap="round"
                    filter="url(#tlGlow3)"
                    initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }} viewport={{ once: true }}
                />
                <motion.path
                    d={ghost} fill="none" stroke="#fff" strokeWidth={2}
                    strokeDasharray="8 6" strokeLinecap="round"
                    animate={{ opacity: [0.2, 0.6, 0.2] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                />
                {[{ cx: 130, cy: 70 }, { cx: 260, cy: 60 }, { cx: 400, cy: 30 }, { cx: 500, cy: 40 }].map((pt, i) => (
                    <motion.circle key={i} cx={pt.cx} cy={pt.cy} r={4} fill="#fff"
                        initial={{ scale: 0 }} whileInView={{ scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.5 + i * 0.3 }} viewport={{ once: true }}
                    />
                ))}
            </svg>
        </div>
    );
};

const HeatmapVisual = () => {
    const rows = 7, cols = 16;
    const data = useRef(
        Array.from({ length: rows }, () =>
            Array.from({ length: cols }, () => Math.floor(Math.random() * 5))
        )
    ).current;
    const colors = [
        "rgba(255,255,255,0.06)", "rgba(0,243,255,0.18)",
        "rgba(0,243,255,0.35)", "rgba(0,243,255,0.55)", "rgba(0,243,255,0.85)",
    ];
    return (
        <div className="flex flex-col items-center gap-3">
            <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
                {data.flatMap((row, r) =>
                    row.map((v, c) => (
                        <motion.div
                            key={`${r}-${c}`} className="rounded"
                            style={{ width: 16, height: 16, backgroundColor: colors[v] }}
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.2, delay: (r * cols + c) * 0.005 }}
                            viewport={{ once: true }}
                            whileHover={{ backgroundColor: "#00f3ff", boxShadow: "0 0 10px rgba(0,243,255,0.6)", scale: 1.4 }}
                        />
                    ))
                )}
            </div>
            <div className="flex items-center gap-2">
                <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.25)" }}>Less</span>
                {colors.map((c, i) => (
                    <div key={i} className="h-3 w-3 rounded-[2px]" style={{ backgroundColor: c }} />
                ))}
                <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.25)" }}>More</span>
            </div>
        </div>
    );
};

const ProfileVisual = () => {
    const stats = [
        { label: "Commits", val: "2,481" },
        { label: "PRs", val: "314" },
        { label: "Streak", val: "47d" },
    ];
    return (
        <motion.div
            className="relative flex w-56 flex-col items-center gap-4 rounded-2xl p-5"
            style={{
                background: "rgba(0,0,0,0.3)",
                border: "1px solid rgba(255,255,255,0.12)",
                backdropFilter: "blur(12px)",
            }}
            animate={{ y: [0, -8, 0], rotate: [0, 0.5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
            <div
                className="absolute -top-2.5 right-4 rounded-full px-3 py-0.5 text-[10px] font-bold uppercase"
                style={{ background: "linear-gradient(90deg, #00f3ff, #0066ff)", color: "#000" }}
            >
                Lv.42
            </div>
            <div
                className="flex h-16 w-16 items-center justify-center rounded-full text-xl font-bold"
                style={{
                    background: "linear-gradient(135deg, #00f3ff, #0066ff)",
                    color: "rgba(255,255,255,0.95)",
                    boxShadow: "0 0 25px rgba(0,243,255,0.3)",
                }}
            >
                AM
            </div>
            <div className="text-center">
                <p className="font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>Aarav Mehta</p>
                <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.5)" }}>Full-Stack Engineer</p>
            </div>
            <div className="flex w-full justify-between">
                {stats.map((s) => (
                    <div key={s.label} className="text-center">
                        <p className="text-sm font-bold" style={{ color: "#00f3ff" }}>{s.val}</p>
                        <p className="text-[8px]" style={{ color: "rgba(255,255,255,0.3)" }}>{s.label}</p>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

const OrbVisual = () => (
    <div className="relative flex h-52 w-52 items-center justify-center">
        {[0, 1, 2].map((i) => (
            <motion.div
                key={i} className="absolute rounded-full"
                style={{
                    width: 140 + i * 40, height: 140 + i * 40,
                    border: `1px solid rgba(0,243,255,${0.12 - i * 0.03})`,
                }}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 18 + i * 8, repeat: Infinity, ease: "linear" }}
            />
        ))}
        <motion.div
            className="relative z-10 flex h-28 w-28 items-center justify-center rounded-full"
            style={{
                background: "radial-gradient(circle at 40% 35%, rgba(0,243,255,0.3), rgba(0,100,200,0.08) 50%, transparent)",
                boxShadow: "0 0 50px rgba(0,243,255,0.2)",
            }}
            animate={{
                scale: [1, 1.08, 1],
                boxShadow: [
                    "0 0 30px rgba(0,243,255,0.12)",
                    "0 0 70px rgba(0,243,255,0.25)",
                    "0 0 30px rgba(0,243,255,0.12)",
                ],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
            <Bot className="h-10 w-10" style={{ color: "#00f3ff" }} />
        </motion.div>
        <motion.p
            className="absolute -bottom-2 text-[10px] font-medium uppercase tracking-[0.25em]"
            style={{ color: "rgba(0,243,255,0.5)" }}
            animate={{ opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 4, repeat: Infinity }}
        >
            ● Online
        </motion.p>
    </div>
);

const SignalVisual = () => (
    <div className="flex items-end gap-1" style={{ height: 64 }}>
        {Array.from({ length: 18 }).map((_, i) => {
            const base = 14 + Math.sin(i * 0.7) * 22;
            return (
                <motion.div
                    key={i} className="rounded-full"
                    style={{
                        width: 5,
                        backgroundColor: i >= 6 && i <= 12 ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.25)",
                    }}
                    animate={{ height: [base, base + 18, base] }}
                    transition={{ duration: 1.1 + Math.random() * 0.5, repeat: Infinity, delay: i * 0.06, ease: "easeInOut" }}
                />
            );
        })}
    </div>
);

const CommunityVisual = () => {
    const people = [
        { i: "AM", g: "linear-gradient(135deg, #00f3ff, #0066ff)" },
        { i: "PS", g: "linear-gradient(135deg, #a855f7, #d946ef)" },
        { i: "RP", g: "linear-gradient(135deg, #10b981, #14b8a6)" },
        { i: "AG", g: "linear-gradient(135deg, #f59e0b, #ef4444)" },
        { i: "VS", g: "linear-gradient(135deg, #f43f5e, #d946ef)" },
        { i: "DK", g: "linear-gradient(135deg, #06b6d4, #3b82f6)" },
        { i: "MN", g: "linear-gradient(135deg, #8b5cf6, #6366f1)" },
        { i: "SK", g: "linear-gradient(135deg, #22c55e, #15803d)" },
    ];
    return (
        <div className="relative flex h-44 w-44 items-center justify-center">
            {people.map((p, idx) => {
                const angle = (idx / people.length) * Math.PI * 2 - Math.PI / 2;
                const r = 62;
                return (
                    <motion.div
                        key={p.i}
                        className="absolute flex h-10 w-10 items-center justify-center rounded-full text-[10px] font-bold"
                        style={{
                            background: p.g, color: "rgba(255,255,255,0.9)",
                            left: `calc(50% + ${Math.cos(angle) * r}px - 20px)`,
                            top: `calc(50% + ${Math.sin(angle) * r}px - 20px)`,
                            border: "2px solid rgba(0,0,0,0.4)",
                            boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
                        }}
                        initial={{ opacity: 0, scale: 0.4 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.45, delay: idx * 0.08 }}
                        viewport={{ once: true }}
                    >
                        {p.i}
                    </motion.div>
                );
            })}
            <div
                className="flex h-12 w-12 items-center justify-center rounded-full text-xs font-bold"
                style={{
                    border: "1px solid rgba(255,255,255,0.15)",
                    backgroundColor: "rgba(255,255,255,0.06)",
                    color: "rgba(255,255,255,0.5)",
                    backdropFilter: "blur(8px)",
                }}
            >
                8+
            </div>
        </div>
    );
};

/* ══════════════════════════════════════
   FEATURE DATA
   ══════════════════════════════════════ */

interface Feature {
    icon: React.ReactNode;
    title: string;
    description: string;
    bg: string;
    textColor: string;
    subtextColor: string;
    visual: React.ReactNode;
}

const features: Feature[] = [
    {
        icon: <MessageSquareText className="h-6 w-6" />,
        title: "AI Standup Generator",
        description:
            "Automatically drafts your daily standup from real GitHub commits and Discord activity. No more 'what did everyone do?' meetings.",
        bg: "#FF6B2C", textColor: "#ffffff", subtextColor: "rgba(255,255,255,0.7)",
        visual: <TerminalVisual />,
    },
    {
        icon: <BellRing className="h-6 w-6" />,
        title: "Smart Nudge Alerts",
        description:
            "Proactive notifications when a PR stalls, a teammate goes quiet, or a deadline is at risk — before it becomes a problem.",
        bg: "#1A1A2E", textColor: "#ffffff", subtextColor: "rgba(255,255,255,0.5)",
        visual: <NudgeVisual />,
    },
    {
        icon: <TrendingUp className="h-6 w-6" />,
        title: "Predictive Timeline",
        description:
            "See not just where your project is, but where it's heading. The ghost-line forecasts delivery based on current velocity and patterns.",
        bg: "#00E5FF", textColor: "#000000", subtextColor: "rgba(0,0,0,0.55)",
        visual: <TimelineVisual />,
    },
    {
        icon: <Flame className="h-6 w-6" />,
        title: "Commit Heatmap",
        description:
            "A visual activity map showing contribution intensity across time, so you instantly know who's shipping and when.",
        bg: "#0F172A", textColor: "#ffffff", subtextColor: "rgba(255,255,255,0.45)",
        visual: <HeatmapVisual />,
    },
    {
        icon: <IdCard className="h-6 w-6" />,
        title: "Developer Profile Cards",
        description:
            "Trading-card style profiles auto-populated from live GitHub stats, complete with level badges and contribution streaks.",
        bg: "#16A34A", textColor: "#ffffff", subtextColor: "rgba(255,255,255,0.65)",
        visual: <ProfileVisual />,
    },
    {
        icon: <Bot className="h-6 w-6" />,
        title: "Orb AI Assistant",
        description:
            "A floating AI brain always available on your dashboard. Ask it anything about your project — blockers, progress, team health.",
        bg: "#0A0A0A", textColor: "#ffffff", subtextColor: "rgba(255,255,255,0.4)",
        visual: <OrbVisual />,
    },
    {
        icon: <Radio className="h-6 w-6" />,
        title: "Discord Signal Analyzer",
        description:
            "Reads your team channels to extract intent, sentiment, and blockers — so buried problems surface automatically.",
        bg: "#7C3AED", textColor: "#ffffff", subtextColor: "rgba(255,255,255,0.65)",
        visual: <SignalVisual />,
    },
    {
        icon: <Users className="h-6 w-6" />,
        title: "Community Gallery",
        description:
            "A public circular showcase of your team's contributors, built for open-source visibility and peer recognition.",
        bg: "#E11D48", textColor: "#ffffff", subtextColor: "rgba(255,255,255,0.65)",
        visual: <CommunityVisual />,
    },
];

/* ══════════════════════════════════════
   SINGLE FEATURE CARD — Inner content
   ══════════════════════════════════════ */

const FeatureCardContent = ({
    feature,
}: {
    feature: Feature;
}) => {
    return (
        <div
            className="grid h-full w-full grid-cols-1 lg:grid-cols-2"
            style={{
                backgroundColor: feature.bg,
                borderRadius: 40,
                borderTop: "1px solid rgba(255,255,255,0.2)",
            }}
        >
            {/* ── LEFT: Text ── */}
            <div className="flex flex-col justify-center p-10 lg:p-16">
                <div
                    className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{
                        backgroundColor: "rgba(255,255,255,0.12)",
                        color: feature.textColor,
                    }}
                >
                    {feature.icon}
                </div>

                <h3
                    className="font-extrabold leading-[0.95] tracking-tight"
                    style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "clamp(2.5rem, 6vw, 5rem)",
                        color: feature.textColor,
                    }}
                >
                    {feature.title}
                </h3>

                <p
                    className="mt-5 max-w-md text-base leading-relaxed lg:text-lg"
                    style={{ fontFamily: "var(--font-body)", color: feature.subtextColor }}
                >
                    {feature.description}
                </p>

                <div
                    className="mt-8 h-[1px] w-20"
                    style={{ background: `linear-gradient(90deg, ${feature.subtextColor}, transparent)` }}
                />
            </div>

            {/* ── RIGHT: Living Visual ── */}
            <div className="flex items-center justify-center p-8 lg:p-12">
                {feature.visual}
            </div>
        </div>
    );
};

/* ══════════════════════════════════════
   SCROLL STACK — MAIN EXPORT
   ══════════════════════════════════════ */

const BentoGrid = () => {
    const headerRef = useRef<HTMLDivElement>(null);
    const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

    return (
        <section
            id="features"
            className="relative"
            style={{
                backgroundColor: "#FFFFFF",
            }}
        >
            {/* Section Header */}
            <div
                ref={headerRef}
                className="mx-auto max-w-4xl text-center"
                style={{ paddingTop: "8rem", paddingBottom: "2rem", paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
            >
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={headerInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="text-4xl font-bold md:text-6xl"
                    style={{ fontFamily: "var(--font-heading)", color: "#0A0A0A" }}
                >
                    What Powers{" "}
                    <span
                        style={{
                            background: "linear-gradient(90deg, #00E5FF, #0066ff)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        Synapse
                    </span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={headerInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                    className="mx-auto mt-5 max-w-lg text-base lg:text-lg"
                    style={{ fontFamily: "var(--font-body)", color: "rgba(0,0,0,0.45)" }}
                >
                    Eight pillars of intelligence, each designed to transform your workflow.
                </motion.p>
            </div>

            {/* ── ScrollStack Card Stack ── */}
            <ScrollStack
                useWindowScroll={true}
                itemDistance={100}
                itemScale={0.02}
                itemStackDistance={18}
                stackPosition="5%"
                scaleEndPosition="5%"
                baseScale={0.92}
                blurAmount={0}
            >
                {features.map((feature) => (
                    <ScrollStackItem key={feature.title}>
                        <FeatureCardContent feature={feature} />
                    </ScrollStackItem>
                ))}
            </ScrollStack>
        </section>
    );
};

export default BentoGrid;
