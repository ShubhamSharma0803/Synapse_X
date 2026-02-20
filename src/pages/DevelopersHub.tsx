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
    GitPullRequest,
    CheckCircle2,

    Timer,
    Flame,
    Target,
    BarChart3,
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
    { id: 1, label: "Auth Token Pipeline — Socket Timeout", assignee: "Sanyam", severity: "critical", age: "2d" },
    { id: 2, label: "CI Build — Flaky E2E test suite", assignee: "Shubham", severity: "high", age: "1d" },
    { id: 3, label: "Deploy Script — Docker image push failing on ARM64", assignee: "Rhythm", severity: "medium", age: "4h" },
];

const SYSTEM_STATS = [
    { icon: <Shield className="h-4 w-4" />, label: "Uptime", value: "99.7%" },
    { icon: <Cpu className="h-4 w-4" />, label: "Latency", value: "42ms" },
    { icon: <TrendingUp className="h-4 w-4" />, label: "Throughput", value: "1.2k/s" },
    { icon: <Clock className="h-4 w-4" />, label: "Sprint", value: "Day 18" },
];

const RECENT_PRS = [
    { id: "#247", title: "feat: neural-sync pipeline v2", author: "Shubham", status: "merged", time: "2h ago", additions: 342, deletions: 87 },
    { id: "#246", title: "fix: auth token refresh edge case", author: "Sanyam", status: "open", time: "4h ago", additions: 28, deletions: 12 },
    { id: "#245", title: "ui: velocity tracker glassmorphism", author: "Palak", status: "merged", time: "6h ago", additions: 156, deletions: 43 },
    { id: "#244", title: "perf: db query batch optimization", author: "Rhythm", status: "review", time: "8h ago", additions: 89, deletions: 201 },
    { id: "#243", title: "feat: AI briefing summarizer v2", author: "Aman", status: "merged", time: "12h ago", additions: 412, deletions: 65 },
    { id: "#242", title: "feat: webhook event dispatcher queue", author: "Sanyam", status: "merged", time: "1d ago", additions: 198, deletions: 34 },
];

const SPRINT_METRICS = [
    { label: "Total Tasks", value: "47", icon: <Target className="h-4 w-4" />, color: "#00E5FF" },
    { label: "Completed", value: "31", icon: <CheckCircle2 className="h-4 w-4" />, color: "#22c55e" },
    { label: "In Progress", value: "12", icon: <Timer className="h-4 w-4" />, color: "#f59e0b" },
    { label: "Burn Rate", value: "4.8/d", icon: <Flame className="h-4 w-4" />, color: "#ef4444" },
];

const PR_STATUS_STYLES: Record<string, { bg: string; border: string; text: string; label: string }> = {
    merged: { bg: "rgba(34,197,94,0.1)", border: "rgba(34,197,94,0.25)", text: "#22c55e", label: "Merged" },
    open: { bg: "rgba(0,229,255,0.1)", border: "rgba(0,229,255,0.25)", text: "#00E5FF", label: "Open" },
    review: { bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.25)", text: "#f59e0b", label: "In Review" },
};

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
            <div className="relative z-10 mx-auto max-w-7xl px-4 pt-28 pb-24 sm:px-6 lg:px-8">
                {/* ═══════ HEADER ═══════ */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
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

                {/* ═══════ SPRINT METRICS ROW ═══════ */}
                <div className="grid grid-cols-2 gap-4 mb-8 sm:grid-cols-4">
                    {SPRINT_METRICS.map((metric, i) => (
                        <GlassSurface key={metric.label} className="p-4" delay={0.05 + i * 0.05}>
                            <div className="flex items-center gap-3">
                                <div
                                    className="flex h-9 w-9 items-center justify-center rounded-lg"
                                    style={{
                                        backgroundColor: `${metric.color}15`,
                                        border: `1px solid ${metric.color}30`,
                                    }}
                                >
                                    <span style={{ color: metric.color }}>{metric.icon}</span>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "monospace" }}>
                                        {metric.label}
                                    </p>
                                    <p className="text-lg font-bold text-white">{metric.value}</p>
                                </div>
                            </div>
                        </GlassSurface>
                    ))}
                </div>

                {/* ═══════ ROW 1: Team Hive Mind (8 cols) + AI Briefing (4 cols) ═══════ */}
                <div
                    className="grid gap-6 mb-8"
                    style={{ gridTemplateColumns: "repeat(12, 1fr)" }}
                >
                    <div className="col-span-12 lg:col-span-8">
                        <GlassSurface className="p-6" delay={0.1}>
                            <div className="flex items-center gap-2 mb-5">
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
                </div>

                {/* ═══════ ROW 2: Project Timeline (full width) ═══════ */}
                <div className="mb-8">
                    <GhostLineWidget progress={62} velocity={0.72} />
                </div>

                {/* ═══════ ROW 3: Terminal (7 cols) + Velocity (5 cols) ═══════ */}
                <div
                    className="grid gap-6 mb-8"
                    style={{ gridTemplateColumns: "repeat(12, 1fr)" }}
                >
                    <div className="col-span-12 lg:col-span-7">
                        <TerminalFeed />
                    </div>

                    <div className="col-span-12 lg:col-span-5">
                        <VelocityTracker />
                    </div>
                </div>

                {/* ═══════ ROW 4: Recent Pull Requests (full width) ═══════ */}
                <div className="mb-8">
                    <GlassSurface className="p-6" delay={0.35}>
                        <div className="flex items-center gap-2 mb-5">
                            <GitPullRequest className="h-4 w-4" style={{ color: "#a78bfa" }} />
                            <h2
                                className="text-sm font-bold text-white"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                Recent Pull Requests
                            </h2>
                            <span
                                className="ml-2 rounded-full px-2 py-0.5 text-[10px] font-bold"
                                style={{
                                    backgroundColor: "rgba(167,139,250,0.12)",
                                    color: "#a78bfa",
                                    border: "1px solid rgba(167,139,250,0.25)",
                                }}
                            >
                                {RECENT_PRS.length} this week
                            </span>
                            <div className="ml-auto flex items-center gap-1.5">
                                <BarChart3 className="h-3.5 w-3.5" style={{ color: "rgba(255,255,255,0.25)" }} />
                                <span className="text-[10px] font-mono" style={{ color: "rgba(255,255,255,0.25)" }}>
                                    +{RECENT_PRS.reduce((a, p) => a + p.additions, 0)} / -{RECENT_PRS.reduce((a, p) => a + p.deletions, 0)}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            {RECENT_PRS.map((pr) => {
                                const statusStyle = PR_STATUS_STYLES[pr.status];
                                return (
                                    <div
                                        key={pr.id}
                                        className="group flex items-center gap-4 rounded-xl px-4 py-3 transition-all"
                                        style={{
                                            backgroundColor: "rgba(255,255,255,0.02)",
                                            border: "1px solid rgba(255,255,255,0.04)",
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.04)";
                                            e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.02)";
                                            e.currentTarget.style.borderColor = "rgba(255,255,255,0.04)";
                                        }}
                                    >
                                        <span
                                            className="text-xs font-bold"
                                            style={{ color: "#a78bfa", fontFamily: "monospace", minWidth: 40 }}
                                        >
                                            {pr.id}
                                        </span>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-medium text-white truncate" style={{ fontFamily: "monospace" }}>
                                                {pr.title}
                                            </p>
                                        </div>
                                        <span className="text-[10px] hidden sm:block" style={{ color: "rgba(255,255,255,0.3)", minWidth: 60 }}>
                                            {pr.author}
                                        </span>
                                        <span className="text-[10px] font-mono hidden md:block" style={{ color: "rgba(34,197,94,0.6)", minWidth: 40 }}>
                                            +{pr.additions}
                                        </span>
                                        <span className="text-[10px] font-mono hidden md:block" style={{ color: "rgba(239,68,68,0.6)", minWidth: 40 }}>
                                            -{pr.deletions}
                                        </span>
                                        <span className="text-[10px] hidden sm:block" style={{ color: "rgba(255,255,255,0.2)", minWidth: 50 }}>
                                            {pr.time}
                                        </span>
                                        <span
                                            className="rounded-full px-2.5 py-0.5 text-[10px] font-bold"
                                            style={{
                                                backgroundColor: statusStyle.bg,
                                                border: `1px solid ${statusStyle.border}`,
                                                color: statusStyle.text,
                                            }}
                                        >
                                            {statusStyle.label}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </GlassSurface>
                </div>

                {/* ═══════ ROW 5: Active Blockers (8 cols) + Quick Actions (4 cols) ═══════ */}
                <div
                    className="grid gap-6"
                    style={{ gridTemplateColumns: "repeat(12, 1fr)" }}
                >
                    <div className="col-span-12 lg:col-span-8">
                        <GlassSurface className="p-6" delay={0.5}>
                            <div className="flex items-center gap-2 mb-5">
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

                            <div className="space-y-3">
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
                                                className="flex items-center gap-4 rounded-xl p-4 transition-colors"
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
                                                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg"
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
                                                    <div className="flex items-center gap-3 mt-1">
                                                        <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>
                                                            Assigned to{" "}
                                                            <span style={{ color: "#f59e0b" }}>{task.assignee}</span>
                                                        </span>
                                                        <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.2)" }}>
                                                            •
                                                        </span>
                                                        <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.25)" }}>
                                                            {task.age} old
                                                        </span>
                                                    </div>
                                                </div>
                                                <span
                                                    className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider"
                                                    style={{
                                                        backgroundColor: task.severity === "critical"
                                                            ? "rgba(239,68,68,0.15)"
                                                            : task.severity === "high"
                                                                ? "rgba(245,158,11,0.12)"
                                                                : "rgba(255,255,255,0.06)",
                                                        color: task.severity === "critical"
                                                            ? "#ef4444"
                                                            : task.severity === "high"
                                                                ? "#f59e0b"
                                                                : "rgba(255,255,255,0.4)",
                                                        border: `1px solid ${task.severity === "critical"
                                                            ? "rgba(239,68,68,0.25)"
                                                            : task.severity === "high"
                                                                ? "rgba(245,158,11,0.2)"
                                                                : "rgba(255,255,255,0.08)"
                                                            }`,
                                                    }}
                                                >
                                                    {task.severity}
                                                </span>
                                            </div>
                                        </TrueFocus>
                                    </div>
                                ))}
                            </div>
                        </GlassSurface>
                    </div>

                    {/* Quick Stats Panel */}
                    <div className="col-span-12 lg:col-span-4">
                        <GlassSurface className="p-6 flex flex-col gap-5" delay={0.55}>
                            <div className="flex items-center gap-2">
                                <BarChart3 className="h-4 w-4" style={{ color: "#00E5FF" }} />
                                <h3
                                    className="text-sm font-bold text-white"
                                    style={{ fontFamily: "var(--font-heading)" }}
                                >
                                    Sprint Summary
                                </h3>
                            </div>

                            {/* PR merge rate */}
                            <div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-[10px] uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "monospace" }}>
                                        PR Merge Rate
                                    </span>
                                    <span className="text-xs font-bold" style={{ color: "#22c55e" }}>92%</span>
                                </div>
                                <div className="h-1.5 w-full rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
                                    <div
                                        className="h-full rounded-full"
                                        style={{
                                            width: "92%",
                                            background: "linear-gradient(90deg, #22c55e, #16a34a)",
                                            boxShadow: "0 0 8px rgba(34,197,94,0.3)",
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Code review turnaround */}
                            <div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-[10px] uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "monospace" }}>
                                        Review Turnaround
                                    </span>
                                    <span className="text-xs font-bold" style={{ color: "#00E5FF" }}>3.2h avg</span>
                                </div>
                                <div className="h-1.5 w-full rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
                                    <div
                                        className="h-full rounded-full"
                                        style={{
                                            width: "68%",
                                            background: "linear-gradient(90deg, #00E5FF, #0066ff)",
                                            boxShadow: "0 0 8px rgba(0,229,255,0.3)",
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Test coverage */}
                            <div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-[10px] uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "monospace" }}>
                                        Test Coverage
                                    </span>
                                    <span className="text-xs font-bold" style={{ color: "#a78bfa" }}>84%</span>
                                </div>
                                <div className="h-1.5 w-full rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
                                    <div
                                        className="h-full rounded-full"
                                        style={{
                                            width: "84%",
                                            background: "linear-gradient(90deg, #a78bfa, #7c3aed)",
                                            boxShadow: "0 0 8px rgba(167,139,250,0.3)",
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Build status */}
                            <div
                                className="flex items-center gap-3 rounded-xl p-3 mt-auto"
                                style={{
                                    backgroundColor: "rgba(34,197,94,0.06)",
                                    border: "1px solid rgba(34,197,94,0.15)",
                                }}
                            >
                                <CheckCircle2 className="h-4 w-4" style={{ color: "#22c55e" }} />
                                <div>
                                    <p className="text-[11px] font-bold text-white" style={{ fontFamily: "monospace" }}>Build Passing</p>
                                    <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>Last deploy: 47 min ago</p>
                                </div>
                                <div className="ml-auto h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: "#22c55e" }} />
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
