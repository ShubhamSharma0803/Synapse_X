import { useState } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import { motion } from "framer-motion";
import {
    Zap,
    Shield,
    AlertTriangle,
    Users,
    Radio,
    Clock,
    TrendingUp,
    Cpu,
} from "lucide-react";

/* ── Effects ── */
import Hyperspeed from "../components/hub/Hyperspeed";
import SplashCursor from "../components/hub/SplashCursor";
import DecryptedText from "../components/hub/DecryptedText";
import TrueFocus from "../components/hub/TrueFocus";
import GlassSurface from "../components/hub/GlassSurface";

/* ── Modules ── */
import ImageRing3D, { type RingMember } from "../components/hub/ImageRing3D";
import MemberFolder from "../components/hub/MemberFolder";
import TerminalFeed from "../components/hub/TerminalFeed";
import AIBriefing from "../components/hub/AIBriefing";
import VelocityTracker from "../components/hub/VelocityTracker";
import GhostLineWidget from "../components/hub/GhostLineWidget";

/* ═══════════════════════════════════════════════════════
   MOCK DATA — Simulated project state
   ═══════════════════════════════════════════════════════ */

const TEAM: RingMember[] = [
    {
        name: "Shubham Sharma",
        avatar: "/images/team/Team_Synapse/Shubham.jpeg",
        role: "Full Stack Developer",
        status: "active",
        recentPRs: [
            "feat: neural-sync pipeline v2",
            "refactor: extract carousel module",
            "chore: upgrade framer-motion v12",
        ],
    },
    {
        name: "Sanyam Nandal",
        avatar: "/images/team/Team_Synapse/Sanyam.jpeg",
        role: "Full Stack Developer",
        status: "blocked",
        recentPRs: [
            "fix: auth token refresh edge case",
            "feat: webhook event dispatcher",
            "feat: real-time socket multiplexer",
        ],
    },
    {
        name: "Palak Varshney",
        avatar: "/images/team/Team_Synapse/Palak.jpeg",
        role: "UI/UX Designer",
        status: "active",
        recentPRs: [
            "ui: velocity tracker glassmorphism",
            "ui: electro border animation",
            "ui: bento layout polish",
        ],
    },
    {
        name: "Rhythm Pratap",
        avatar: "/images/team/Team_Synapse/Rhythm.jpeg",
        role: "Backend Developer",
        status: "idle",
        recentPRs: [
            "perf: db query batch optimization",
            "fix: concurrent write race condition",
            "feat: background job scheduler",
        ],
    },
    {
        name: "Aman Sahu",
        avatar: "/images/team/Team_Synapse/Aman.jpeg",
        role: "AI Expert",
        status: "active",
        recentPRs: [
            "feat: AI briefing summarizer v2",
            "feat: predictive task blocking",
            "ml: retrain velocity model",
        ],
    },
];

const BLOCKED_TASKS = [
    { id: 1, label: "Auth Token Pipeline — Socket Timeout", assignee: "Sanyam" },
    { id: 2, label: "CI Build — Flaky E2E test suite", assignee: "Shubham" },
];

const SYSTEM_STATS = [
    { icon: <Shield className="h-4 w-4" />, label: "Uptime", value: "99.7%" },
    { icon: <Cpu className="h-4 w-4" />, label: "Latency", value: "42ms" },
    { icon: <TrendingUp className="h-4 w-4" />, label: "Throughput", value: "1.2k/s" },
    { icon: <Clock className="h-4 w-4" />, label: "Sprint", value: "Day 18" },
];

/* ═══════════════════════════════════════════════════════
   DEVELOPERS HUB — Command Deck Page
   ═══════════════════════════════════════════════════════ */

const DevelopersHub = () => {
    const [selectedMember, setSelectedMember] = useState<RingMember | null>(null);
    const [hoveredBlocker, setHoveredBlocker] = useState<number | null>(null);
    const isGuest = useAuthStore((s) => s.isGuest);
    const ghostId = useAuthStore((s) => s.ghostId);

    return (
        <div className="relative min-h-screen" style={{ backgroundColor: "#000" }}>
            {/* ── Hyperspeed background ── */}
            <Hyperspeed />

            {/* ── Splash cursor overlay ── */}
            <SplashCursor />

            {/* ── Content ── */}
            <div className="relative z-10 mx-auto max-w-7xl px-4 pt-28 pb-20 sm:px-6 lg:px-8">
                {/* ═══════ HEADER ═══════ */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
                >
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div
                                className="flex h-10 w-10 items-center justify-center rounded-xl"
                                style={{
                                    background: "linear-gradient(135deg, #00E5FF, #0066ff)",
                                    boxShadow: "0 0 20px rgba(0,229,255,0.3)",
                                }}
                            >
                                <Zap className="h-5 w-5 text-black" />
                            </div>
                            <span
                                className="text-[10px] uppercase tracking-widest"
                                style={{ color: "rgba(255,255,255,0.3)" }}
                            >
                                Command Deck
                            </span>
                        </div>

                        <h1 className="text-3xl font-extrabold text-white sm:text-4xl cursor-pointer">
                            <DecryptedText
                                text="Project Synapse"
                                revealText="System Health 98%"
                                speed={35}
                                className="text-3xl font-extrabold sm:text-4xl"
                                style={{
                                    background: "linear-gradient(135deg, #fff 40%, #00E5FF)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}
                            />
                        </h1>

                        <p
                            className="mt-2 text-sm"
                            style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-body)" }}
                        >
                            {isGuest
                                ? `Session: ${ghostId} — Volatile data mode`
                                : "Real-time intelligence engine for your development squad"}
                        </p>
                    </div>

                    {/* System stats */}
                    <div className="flex flex-wrap gap-3">
                        {SYSTEM_STATS.map((stat) => (
                            <div
                                key={stat.label}
                                className="flex items-center gap-2 rounded-xl px-3 py-2"
                                style={{
                                    backgroundColor: "rgba(255,255,255,0.03)",
                                    border: "1px solid rgba(255,255,255,0.06)",
                                }}
                            >
                                <span style={{ color: "#00E5FF" }}>{stat.icon}</span>
                                <div>
                                    <p className="text-[10px] uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.3)" }}>
                                        {stat.label}
                                    </p>
                                    <p className="text-xs font-bold text-white">{stat.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* ═══════ BENTO GRID ═══════ */}
                <div
                    className="grid gap-4 auto-rows-auto"
                    style={{
                        gridTemplateColumns: "repeat(12, 1fr)",
                    }}
                >
                    {/* ── ROW 1: Team Hive Mind (8 cols) + AI Briefing (4 cols) ── */}
                    <div className="col-span-12 lg:col-span-8">
                        <GlassSurface className="p-6" delay={0.05}>
                            <div className="flex items-center gap-2 mb-4">
                                <Users className="h-4 w-4" style={{ color: "#00E5FF" }} />
                                <h2
                                    className="text-sm font-bold text-white"
                                    style={{ fontFamily: "var(--font-heading)" }}
                                >
                                    Team Hive Mind
                                </h2>
                                <div
                                    className="ml-auto flex items-center gap-1.5 rounded-full px-2.5 py-1"
                                    style={{
                                        backgroundColor: "rgba(34,197,94,0.1)",
                                        border: "1px solid rgba(34,197,94,0.2)",
                                    }}
                                >
                                    <Radio className="h-3 w-3" style={{ color: "#22c55e" }} />
                                    <span className="text-[10px] font-bold" style={{ color: "#22c55e" }}>
                                        {TEAM.filter((m) => m.status === "active").length} Online
                                    </span>
                                </div>
                            </div>
                            <ImageRing3D
                                members={TEAM}
                                onSelect={(m) => setSelectedMember(m)}
                            />
                        </GlassSurface>
                    </div>

                    <div className="col-span-12 lg:col-span-4">
                        <AIBriefing />
                    </div>

                    {/* ── ROW 2: Timeline (full width) ── */}
                    <div className="col-span-12">
                        <GhostLineWidget progress={62} velocity={0.72} />
                    </div>

                    {/* ── ROW 3: Terminal (7 cols) + Velocity (5 cols) ── */}
                    <div className="col-span-12 lg:col-span-7">
                        <TerminalFeed />
                    </div>

                    <div className="col-span-12 lg:col-span-5">
                        <VelocityTracker />
                    </div>

                    {/* ── ROW 4: Blocked Tasks (full width) ── */}
                    <div className="col-span-12">
                        <GlassSurface className="p-6" delay={0.5}>
                            <div className="flex items-center gap-2 mb-4">
                                <AlertTriangle className="h-4 w-4" style={{ color: "#ef4444" }} />
                                <h2
                                    className="text-sm font-bold text-white"
                                    style={{ fontFamily: "var(--font-heading)" }}
                                >
                                    Active Blockers
                                </h2>
                                <span
                                    className="ml-2 rounded-full px-2 py-0.5 text-[10px] font-bold"
                                    style={{
                                        backgroundColor: "rgba(239,68,68,0.15)",
                                        color: "#ef4444",
                                        border: "1px solid rgba(239,68,68,0.2)",
                                    }}
                                >
                                    {BLOCKED_TASKS.length}
                                </span>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-2">
                                {BLOCKED_TASKS.map((task) => (
                                    <div
                                        key={task.id}
                                        onMouseEnter={() => setHoveredBlocker(task.id)}
                                        onMouseLeave={() => setHoveredBlocker(null)}
                                    >
                                        <TrueFocus
                                            active={hoveredBlocker === task.id}
                                            color="#ef4444"
                                        >
                                            <div
                                                className="flex items-center gap-3 rounded-xl p-4 transition-colors"
                                                style={{
                                                    backgroundColor:
                                                        hoveredBlocker === task.id
                                                            ? "rgba(239,68,68,0.06)"
                                                            : "rgba(255,255,255,0.02)",
                                                    border: `1px solid ${hoveredBlocker === task.id
                                                        ? "rgba(239,68,68,0.2)"
                                                        : "rgba(255,255,255,0.04)"
                                                        }`,
                                                }}
                                            >
                                                <div
                                                    className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg"
                                                    style={{
                                                        backgroundColor: "rgba(239,68,68,0.1)",
                                                        border: "1px solid rgba(239,68,68,0.2)",
                                                    }}
                                                >
                                                    <AlertTriangle className="h-4 w-4" style={{ color: "#ef4444" }} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p
                                                        className="text-xs font-bold text-white truncate"
                                                        style={{ fontFamily: "monospace" }}
                                                    >
                                                        {task.label}
                                                    </p>
                                                    <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>
                                                        Assigned to{" "}
                                                        <span style={{ color: "#f59e0b" }}>{task.assignee}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </TrueFocus>
                                    </div>
                                ))}
                            </div>
                        </GlassSurface>
                    </div>
                </div>
            </div>

            {/* ── Member Folder Modal ── */}
            <MemberFolder
                member={selectedMember}
                onClose={() => setSelectedMember(null)}
            />
        </div>
    );
};

export default DevelopersHub;
