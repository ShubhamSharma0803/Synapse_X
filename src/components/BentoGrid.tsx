import { useRef } from "react";
import {
    motion,
    useInView,
} from "framer-motion";
import {
    MessageSquareText,
    TrendingUp,
    Bot,
    Radio,
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


/* ══════════════════════════════════════
   FEATURE DATA
   ══════════════════════════════════════ */

interface Feature {
    icon: React.ReactNode;
    title: string;
    subHeader: string;
    description: string;
    specs: string[];
    bg: string;
    textColor: string;
    subtextColor: string;
    visual: React.ReactNode;
}

const features: Feature[] = [
    {
        icon: <MessageSquareText className="h-6 w-6" />,
        title: "AI Standup Generator",
        subHeader: "Turn code noise into team signal.",
        description: "Every morning, Synapse reads your team's GitHub commits and Discord messages from the previous day and writes your standup for you. No more going around in circles asking what everyone worked on. You open the dashboard, your standup is already there — review it and ship it.",
        specs: [
            "SYNC: Bridges GitHub Commits + Discord Activity.",
            "ELIMINATE: No more manual 'What did you do?' updates.",
            "DRAFT: Instant, structured summaries for daily syncs.",
        ],
        bg: "#FF6B2C", textColor: "#ffffff", subtextColor: "rgba(255,255,255,0.7)",
        visual: <TerminalVisual />,
    },
    {
        icon: <TrendingUp className="h-6 w-6" />,
        title: "Predictive Timeline",
        subHeader: "Forecast delivery before the delay happens.",
        description: "Most project tools show you where you are. Synapse shows you where you're going. The AI ghost-line calculates your current velocity, factors in stalls and blockers, and draws a projected delivery path. If you're heading toward a missed deadline, you'll know days in advance — not the night before.",
        specs: [
            "ANALYSIS: Uses velocity data to project completion dates.",
            "VISUAL: Real-time 'Ghost-Line' trajectories on your roadmap.",
            "ALERT: Neural warnings for potential project bottlenecks.",
        ],
        bg: "#00E5FF", textColor: "#000000", subtextColor: "rgba(0,0,0,0.55)",
        visual: <TimelineVisual />,
    },
    {
        icon: <Bot className="h-6 w-6" />,
        title: "Orb AI Assistant",
        subHeader: "Your omnipresent 3D collaboration partner.",
        description: "The Orb is your team's always-on floating brain. Click it at any point and ask it anything — what's blocking us right now, how's our sprint looking, who's overloaded this week. It has full context of your codebase activity and team conversations, so its answers are actually relevant to your project, not generic.",
        specs: [
            "INTERFACE: 3D floating avatar with Voice-to-Text.",
            "DOUBT_SOLVER: Contextual help on text highlights.",
            "PERSISTENCE: Stays with you through every project stage.",
        ],
        bg: "#0A0A0A", textColor: "#ffffff", subtextColor: "rgba(255,255,255,0.4)",
        visual: <OrbVisual />,
    },
    {
        icon: <Radio className="h-6 w-6" />,
        title: "Discord Signal Analyzer",
        subHeader: "Decode the chaos of team chatter.",
        description: "Your team talks in Discord constantly — but valuable signals like blockers, confusion, and decisions get buried and forgotten. Synapse's Discord analyzer reads those conversations and extracts what actually matters — who's stuck, what's unresolved, what decisions were made. It turns noise into structured, actionable intelligence.",
        specs: [
            "SENTIMENT: Maps team mood and energy levels.",
            "EXTRACTION: Pulls tasks directly from chat threads.",
            "NOISE_FILTER: Highlights the 5% of messages that actually matter.",
        ],
        bg: "#7C3AED", textColor: "#ffffff", subtextColor: "rgba(255,255,255,0.65)",
        visual: <SignalVisual />,
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
            className="grid h-full w-full grid-cols-1 overflow-hidden lg:grid-cols-[1.2fr_0.8fr]"
            style={{
                backgroundColor: feature.bg,
                borderRadius: 40,
                borderTop: "1px solid rgba(255,255,255,0.2)",
            }}
        >
            {/* ── LEFT: Text ── */}
            <div className="flex flex-col justify-start p-6 lg:p-10 lg:pt-12">
                <div
                    className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg lg:mb-5 lg:h-11 lg:w-11"
                    style={{
                        backgroundColor: "rgba(255,255,255,0.12)",
                        color: feature.textColor,
                    }}
                >
                    {feature.icon}
                </div>

                <h3
                    className="font-extrabold leading-[1.1] tracking-tighter"
                    style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "clamp(1.1rem, 3vw, 1.8rem)",
                        color: feature.textColor,
                    }}
                >
                    {feature.title}
                </h3>

                <p
                    className="mt-2 text-sm font-bold tracking-tight opacity-90 lg:mt-3 lg:text-base"
                    style={{ fontFamily: "var(--font-heading)", color: feature.textColor }}
                >
                    {feature.subHeader}
                </p>

                <p
                    className="mt-2 max-w-xl text-xs leading-snug opacity-85 lg:mt-4 lg:text-[13px] lg:leading-relaxed"
                    style={{ fontFamily: "var(--font-body)", color: feature.textColor }}
                >
                    {feature.description}
                </p>

                {/* Technical Divider */}
                <div
                    className="mt-4 h-[1px] w-12 lg:mt-6 lg:w-20"
                    style={{ background: `linear-gradient(90deg, ${feature.subtextColor}, transparent)` }}
                />
            </div>

            {/* ── RIGHT: Living Visual ── */}
            <div className="relative flex items-center justify-center p-4 lg:p-6">
                <div
                    className="relative transition-transform duration-500 hover:scale-105"
                    style={{
                        filter: "drop-shadow(0 15px 40px rgba(0,0,0,0.3))",
                    }}
                >
                    <div className="scale-75 lg:scale-90">
                        {feature.visual}
                    </div>
                </div>
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
                    Four pillars of intelligence, each designed to transform your workflow.
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
