import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
    Upload,
    Calendar,
    Users,
    FileText,
    File,
    X,
    BrainCircuit,
    ArrowRight,
    ArrowLeft,
    Check,
    Tag,
    Github,
    MessageCircle,
    Globe,
    Lock,
    Building,
    Plus,
    Trash2,
    Terminal,
    Rocket,
    CheckCircle2,
} from "lucide-react";
import { triggerAlert } from "../hook/useAlerts";
import { apiPost } from "../api/client";
import { supabase } from "../supabaseClient";
import { useProjectStore } from "../stores/useProjectStore";

/* ══════════════════════════════════════
   CONSTANTS
   ══════════════════════════════════════ */
const categories = [
    "Web Development",
    "Mobile App",
    "AI/ML",
    "Data Science",
    "DevOps",
    "Design",
    "Blockchain",
    "Game Development",
    "Other",
];
const priorities = ["Low", "Medium", "High", "Critical"];
const visibilityOptions = ["Private", "Team Only", "Organization", "Public"];
const roleOptions = ["Admin", "Developer", "Designer", "Tester", "Viewer"];

const TERMINAL_LINES = [
    { prefix: "SYSTEM", text: "Initializing Neural Mapping..." },
    { prefix: "NETWORK", text: "Scanning linked repositories..." },
    { prefix: "AI", text: "Indexing codebase intelligence graph..." },
    { prefix: "NETWORK", text: "Syncing team member profiles..." },
    { prefix: "AI", text: "Calibrating AI alert thresholds..." },
    { prefix: "SYSTEM", text: "Generating neural workspace topology..." },
    { prefix: "AI", text: "Ghost-Line established..." },
    { prefix: "SYSTEM", text: "Encrypting project manifest..." },
    { prefix: "NETWORK", text: "Deploying intelligence layer..." },
    { prefix: "✓", text: "Neural Sync complete — workspace initialized." },
];

const INPUT_CLS =
    "w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition-all duration-300";
const INPUT_STYLE: React.CSSProperties = {
    backgroundColor: "rgba(0,0,0,0.5)",
    border: "1px solid rgba(255,255,255,0.1)",
    fontFamily: "monospace",
};

/* ── Holographic focus / blur handlers ── */
const focusRing = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "rgba(0,229,255,0.6)";
    e.currentTarget.style.boxShadow =
        "0 0 20px rgba(0,229,255,0.12), 0 0 40px rgba(0,229,255,0.04)";
    e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.65)";
    e.currentTarget.style.transition = "all 0.4s ease";
};
const blurRing = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
    e.currentTarget.style.boxShadow = "none";
    e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.5)";
};

/* ── Step labels ── */
const STEPS = [
    { num: 1, label: "Identity", icon: <Terminal className="h-4 w-4" /> },
    { num: 2, label: "Details", icon: <FileText className="h-4 w-4" /> },
    { num: 3, label: "Timeline", icon: <Calendar className="h-4 w-4" /> },
    { num: 4, label: "Team & Integrations", icon: <Users className="h-4 w-4" /> },
];

/* ══════════════════════════════════════
   GLOW ICON — bloom + float
   ══════════════════════════════════════ */
const GlowIcon = ({
    children,
    color = "rgba(0, 229, 255, 0.8)",
    size = "normal",
}: {
    children: React.ReactNode;
    color?: string;
    size?: "normal" | "large";
}) => (
    <motion.span
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className={`inline-flex items-center justify-center ${size === "large" ? "h-10 w-10" : ""}`}
        style={{
            filter: `drop-shadow(0 0 8px ${color}) drop-shadow(0 0 16px ${color})`,
        }}
    >
        {children}
    </motion.span>
);

/* ══════════════════════════════════════
   NEURAL BACKGROUND — SVG grid + mesh
   ══════════════════════════════════════ */
const NeuralGrid = () => (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {/* SVG dot grid */}
        <svg className="absolute inset-0 h-full w-full opacity-[0.04]">
            <defs>
                <pattern id="neural-dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <circle cx="1" cy="1" r="1" fill="#00E5FF" />
                </pattern>
                <pattern id="neural-lines" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00E5FF" strokeWidth="0.3" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#neural-dots)" />
            <rect width="100%" height="100%" fill="url(#neural-lines)" opacity="0.5" />
        </svg>

        {/* Animated mesh gradient blobs */}
        <motion.div
            animate={{ x: [0, 30, 0], y: [0, -20, 0], opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-40 -right-40"
            style={{
                width: 600,
                height: 600,
                background: "radial-gradient(circle, rgba(0,229,255,0.08) 0%, transparent 70%)",
                borderRadius: "50%",
            }}
        />
        <motion.div
            animate={{ x: [0, -25, 0], y: [0, 30, 0], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-40 -left-40"
            style={{
                width: 700,
                height: 700,
                background: "radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 70%)",
                borderRadius: "50%",
            }}
        />
        <motion.div
            animate={{ x: [0, 15, 0], y: [0, 15, 0], opacity: [0.08, 0.16, 0.08] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/3 left-1/2 -translate-x-1/2"
            style={{
                width: 500,
                height: 500,
                background: "radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)",
                borderRadius: "50%",
            }}
        />
    </div>
);

/* ══════════════════════════════════════
   STEP 1: IDENTITY
   ══════════════════════════════════════ */
const StepIdentity = () => {
    const { projectName, category, priority, setField } = useProjectStore();

    return (
        <div className="flex flex-col gap-6">
            {/* Project Name */}
            <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-widest"
                    style={{ color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>
                    {">"} project_name *
                </label>
                <input type="text" required value={projectName}
                    onChange={(e) => setField("projectName", e.target.value)}
                    placeholder="Enter your project name"
                    className={INPUT_CLS} style={INPUT_STYLE}
                    onFocus={focusRing} onBlur={blurRing} />
            </div>

            {/* Category */}
            <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-widest"
                    style={{ color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>
                    {">"} category *
                </label>
                <select required value={category}
                    onChange={(e) => setField("category", e.target.value)}
                    className={INPUT_CLS + " cursor-pointer"} style={{ ...INPUT_STYLE, colorScheme: "dark" }}
                    onFocus={focusRing as any} onBlur={blurRing as any}>
                    <option value="">Select a category</option>
                    {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
            </div>

            {/* Priority */}
            <div>
                <label className="mb-3 block text-xs font-bold uppercase tracking-widest"
                    style={{ color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>
                    {">"} priority_level *
                </label>
                <div className="grid grid-cols-4 gap-2">
                    {priorities.map((p) => (
                        <button key={p} type="button" onClick={() => setField("priority", p)}
                            className="rounded-xl px-3 py-2.5 text-xs font-bold uppercase tracking-wider transition-all"
                            style={{
                                backgroundColor: priority === p ? "rgba(0,229,255,0.15)" : "rgba(255,255,255,0.03)",
                                border: `1px solid ${priority === p ? "rgba(0,229,255,0.4)" : "rgba(255,255,255,0.06)"}`,
                                color: priority === p ? "#00E5FF" : "rgba(255,255,255,0.35)",
                                fontFamily: "monospace",
                            }}>
                            {p}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

/* ══════════════════════════════════════
   STEP 2: DETAILS
   ══════════════════════════════════════ */
const StepDetails = () => {
    const { description, tags, uploadedFiles, setField, addTag, removeTag, addFiles, removeFile } = useProjectStore();
    const [tagInput, setTagInput] = useState("");
    const [isDragging, setIsDragging] = useState(false);

    const handleAddTag = () => {
        if (tagInput.trim()) { addTag(tagInput); setTagInput(""); }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault(); setIsDragging(false);
        addFiles(Array.from(e.dataTransfer.files));
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) addFiles(Array.from(e.target.files));
    };

    return (
        <div className="flex flex-col gap-6">
            {/* Description */}
            <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-widest"
                    style={{ color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>
                    {">"} description *
                </label>
                <textarea required rows={5} value={description}
                    onChange={(e) => setField("description", e.target.value)}
                    placeholder="Describe your project vision, goals, and key features. The AI will use this to generate tasks..."
                    className={INPUT_CLS + " resize-none"} style={INPUT_STYLE}
                    onFocus={focusRing as any} onBlur={blurRing as any} />
                <p className="mt-1 text-[11px]" style={{ color: "rgba(0,229,255,0.4)", fontFamily: "monospace" }}>
          // tip: be specific for better AI recommendations
                </p>
            </div>

            {/* Tags */}
            <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-widest"
                    style={{ color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>
                    {">"} tags
                </label>
                <div className="flex gap-2">
                    <input type="text" value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddTag(); } }}
                        placeholder="Add tags (press Enter)"
                        disabled={tags.length >= 10}
                        className={INPUT_CLS + " flex-1"} style={INPUT_STYLE}
                        onFocus={focusRing} onBlur={blurRing} />
                    <button type="button" onClick={handleAddTag}
                        disabled={tags.length >= 10}
                        className="flex items-center justify-center rounded-xl px-4 transition-all"
                        style={{
                            backgroundColor: "rgba(0,229,255,0.12)",
                            border: "1px solid rgba(0,229,255,0.3)",
                            color: "#00E5FF",
                            opacity: tags.length >= 10 ? 0.3 : 1,
                        }}>
                        <Plus className="h-4 w-4" />
                    </button>
                </div>
                {tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <span key={tag} className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs"
                                style={{
                                    backgroundColor: "rgba(0,229,255,0.08)",
                                    border: "1px solid rgba(0,229,255,0.2)",
                                    color: "#00E5FF",
                                    fontFamily: "monospace",
                                }}>
                                <Tag className="h-3 w-3" /> {tag}
                                <button onClick={() => removeTag(tag)} className="ml-1 transition-colors hover:text-red-400">
                                    <X className="h-3 w-3" />
                                </button>
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* File Upload */}
            <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-widest"
                    style={{ color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>
                    {">"} attachments
                </label>
                <div
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    className="cursor-pointer rounded-xl p-6 text-center transition-all"
                    style={{
                        border: `2px dashed ${isDragging ? "rgba(0,229,255,0.5)" : "rgba(255,255,255,0.08)"}`,
                        backgroundColor: isDragging ? "rgba(0,229,255,0.04)" : "transparent",
                    }}>
                    <input type="file" id="fileUpload" onChange={handleFileInput}
                        accept="image/*,.pdf,.doc,.docx,.txt" multiple className="hidden" />
                    <label htmlFor="fileUpload" className="cursor-pointer">
                        <GlowIcon>
                            <Upload className="mx-auto mb-2 h-8 w-8" style={{ color: "rgba(0,229,255,0.5)" }} />
                        </GlowIcon>
                        <p className="text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
                            Drag & drop or <span className="underline" style={{ color: "#00E5FF" }}>browse</span>
                        </p>
                        <p className="mt-1 text-[11px]" style={{ color: "rgba(255,255,255,0.15)" }}>
                            PDF, DOC, TXT, Images
                        </p>
                    </label>
                </div>
                {uploadedFiles.length > 0 && (
                    <div className="mt-3 flex flex-col gap-2">
                        {uploadedFiles.map((file, i) => (
                            <div key={i} className="flex items-center justify-between rounded-xl p-3"
                                style={{
                                    backgroundColor: "rgba(255,255,255,0.03)",
                                    border: "1px solid rgba(255,255,255,0.06)",
                                }}>
                                <div className="flex items-center gap-3">
                                    <File className="h-4 w-4" style={{ color: "#00E5FF" }} />
                                    <div>
                                        <p className="text-xs text-white" style={{ fontFamily: "monospace" }}>{file.name}</p>
                                        <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.2)" }}>
                                            {(file.size / 1024).toFixed(1)} KB
                                        </p>
                                    </div>
                                </div>
                                <button type="button" onClick={() => removeFile(file.name)}
                                    className="text-white/20 transition-colors hover:text-red-400">
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

/* ══════════════════════════════════════
   STEP 3: TIMELINE
   ══════════════════════════════════════ */
const StepTimeline = () => {
    const { startDate, endDate, durationWeeks, setField } = useProjectStore();
    const [leaderName, setLeaderName] = useState("Unknown");

    useEffect(() => {
        const fetchLeader = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                const { data, error } = await supabase
                    .from("profiles")
                    .select("full_name")
                    .eq("id", session.user.id)
                    .single();
                if (data && !error) setLeaderName(data.full_name);
                else setLeaderName(session.user.email || "Unknown");
            }
        };
        fetchLeader();
    }, []);

    return (
        <div className="flex flex-col gap-6">
            {/* Date Range */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-widest"
                        style={{ color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>
                        {">"} start_date
                    </label>
                    <input type="date" value={startDate}
                        onChange={(e) => setField("startDate", e.target.value)}
                        className={INPUT_CLS} style={{ ...INPUT_STYLE, colorScheme: "dark" }}
                        onFocus={focusRing} onBlur={blurRing} />
                </div>
                <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-widest"
                        style={{ color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>
                        {">"} end_date
                    </label>
                    <input type="date" value={endDate}
                        onChange={(e) => setField("endDate", e.target.value)}
                        className={INPUT_CLS} style={{ ...INPUT_STYLE, colorScheme: "dark" }}
                        onFocus={focusRing} onBlur={blurRing} />
                </div>
            </div>

            {/* Duration */}
            <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-widest"
                    style={{ color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>
                    {">"} duration_weeks
                </label>
                <input type="number" min={1} max={104} value={durationWeeks}
                    onChange={(e) => setField("durationWeeks", e.target.value)}
                    placeholder="e.g., 8 weeks"
                    className={INPUT_CLS} style={INPUT_STYLE}
                    onFocus={focusRing} onBlur={blurRing} />
            </div>

            {/* Leader */}
            <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-widest"
                    style={{ color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>
                    {">"} project_leader
                </label>
                <div className="flex items-center gap-3 rounded-xl px-4 py-3"
                    style={{
                        backgroundColor: "rgba(0,229,255,0.04)",
                        border: "1px solid rgba(0,229,255,0.12)",
                    }}>
                    <GlowIcon>
                        <Users className="h-4 w-4" style={{ color: "#00E5FF" }} />
                    </GlowIcon>
                    <span className="text-sm font-medium" style={{ color: "#00E5FF", fontFamily: "monospace" }}>
                        {leaderName}
                    </span>
                </div>
                <p className="mt-1 text-[11px]" style={{ color: "rgba(255,255,255,0.15)", fontFamily: "monospace" }}>
          // auto-detected from your profile
                </p>
            </div>
        </div>
    );
};

/* ══════════════════════════════════════
   STEP 4: TEAM & INTEGRATIONS
   ══════════════════════════════════════ */
const StepTeam = () => {
    const {
        teamMembers, githubRepo, discordServer, techStackPreferences, visibility,
        addTeamMember, removeTeamMember, updateTeamMember, setField, addTech, removeTech,
    } = useProjectStore();
    const [techInput, setTechInput] = useState("");
    const [ghostMember, setGhostMember] = useState<string | null>(null);

    const handleAddTech = () => {
        if (techInput.trim()) { addTech(techInput); setTechInput(""); }
    };

    const handleAddMember = () => {
        setGhostMember("new");
        setTimeout(() => {
            addTeamMember();
            setGhostMember(null);
        }, 400);
    };

    /* URL pulse glow detection */
    const isValidUrl = (url: string) => {
        try { new URL(url); return true; } catch { return false; }
    };

    return (
        <div className="flex flex-col gap-6">
            {/* Team Members */}
            <div>
                <div className="mb-3 flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-widest"
                        style={{ color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>
                        {">"} team_members
                    </label>
                    <button type="button" onClick={handleAddMember}
                        className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-all"
                        style={{
                            backgroundColor: "rgba(0,229,255,0.12)",
                            border: "1px solid rgba(0,229,255,0.3)",
                            color: "#00E5FF",
                            fontFamily: "monospace",
                        }}>
                        <Plus className="h-3.5 w-3.5" /> Add Member
                    </button>
                </div>

                {/* Ghost card animation */}
                <AnimatePresence>
                    {ghostMember && (
                        <motion.div
                            initial={{ opacity: 1, y: 0, scale: 1 }}
                            animate={{ opacity: 0, x: 300, y: -60, scale: 0.3 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="rounded-xl p-3 mb-2"
                            style={{
                                backgroundColor: "rgba(0,229,255,0.1)",
                                border: "1px solid rgba(0,229,255,0.3)",
                                boxShadow: "0 0 30px rgba(0,229,255,0.15)",
                                pointerEvents: "none",
                            }}>
                            <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full"
                                    style={{ background: "linear-gradient(135deg, #00f3ff, #0066ff)" }} />
                                <span className="text-xs" style={{ color: "#00E5FF", fontFamily: "monospace" }}>
                  // new_member_syncing...
                                </span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {teamMembers.length === 0 ? (
                    <div className="flex flex-col items-center gap-3 rounded-xl py-8"
                        style={{
                            backgroundColor: "rgba(255,255,255,0.02)",
                            border: "1px solid rgba(255,255,255,0.05)",
                        }}>
                        <GlowIcon color="rgba(255,255,255,0.15)">
                            <Users className="h-10 w-10" style={{ color: "rgba(255,255,255,0.08)" }} />
                        </GlowIcon>
                        <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)", fontFamily: "monospace" }}>
              // no members added yet
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3 max-h-72 overflow-y-auto pr-1"
                        style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(0,229,255,0.2) transparent" }}>
                        <AnimatePresence>
                            {teamMembers.map((member, index) => (
                                <motion.div key={member.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -100 }}
                                    transition={{ duration: 0.3 }}
                                    className="rounded-xl p-4"
                                    style={{
                                        backgroundColor: "rgba(255,255,255,0.03)",
                                        border: "1px solid rgba(255,255,255,0.06)",
                                    }}>
                                    <div className="mb-3 flex items-center justify-between">
                                        <span className="text-[11px] font-bold uppercase tracking-widest"
                                            style={{ color: "#00E5FF", fontFamily: "monospace" }}>
                                            member_{String(index + 1).padStart(2, "0")}
                                        </span>
                                        <button type="button" onClick={() => removeTeamMember(member.id)}
                                            className="text-white/15 transition-colors hover:text-red-400">
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <input type="text" value={member.name}
                                            onChange={(e) => updateTeamMember(member.id, "name", e.target.value)}
                                            placeholder="Full Name *"
                                            className={INPUT_CLS + " !text-xs !py-2"} style={INPUT_STYLE}
                                            onFocus={focusRing} onBlur={blurRing} />
                                        <input type="email" value={member.email}
                                            onChange={(e) => updateTeamMember(member.id, "email", e.target.value)}
                                            placeholder="Email *"
                                            className={INPUT_CLS + " !text-xs !py-2"} style={INPUT_STYLE}
                                            onFocus={focusRing} onBlur={blurRing} />
                                        <input type="text" value={member.github_username}
                                            onChange={(e) => updateTeamMember(member.id, "github_username", e.target.value)}
                                            placeholder="GitHub username"
                                            className={INPUT_CLS + " !text-xs !py-2"} style={INPUT_STYLE}
                                            onFocus={focusRing} onBlur={blurRing} />
                                        <input type="text" value={member.discord_username}
                                            onChange={(e) => updateTeamMember(member.id, "discord_username", e.target.value)}
                                            placeholder="Discord username"
                                            className={INPUT_CLS + " !text-xs !py-2"} style={INPUT_STYLE}
                                            onFocus={focusRing} onBlur={blurRing} />
                                    </div>
                                    <select value={member.role}
                                        onChange={(e) => updateTeamMember(member.id, "role", e.target.value)}
                                        className={INPUT_CLS + " mt-2 !text-xs !py-2 cursor-pointer"}
                                        style={{ ...INPUT_STYLE, colorScheme: "dark" }}
                                        onFocus={focusRing as any} onBlur={blurRing as any}>
                                        {roleOptions.map((r) => <option key={r} value={r}>{r}</option>)}
                                    </select>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>

            {/* Integration URLs */}
            <div>
                <label className="mb-3 block text-xs font-bold uppercase tracking-widest"
                    style={{ color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>
                    {">"} integrations
                </label>
                <div className="flex flex-col gap-2">
                    {/* GitHub */}
                    <div className="relative">
                        <Github className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
                            style={{ color: isValidUrl(githubRepo) ? "#00E5FF" : "rgba(255,255,255,0.2)" }} />
                        <input type="url" value={githubRepo}
                            onChange={(e) => setField("githubRepo", e.target.value)}
                            placeholder="GitHub Repository URL"
                            className={INPUT_CLS + " !pl-10"} style={{
                                ...INPUT_STYLE,
                                boxShadow: isValidUrl(githubRepo) ? "0 0 20px rgba(0,229,255,0.08)" : "none",
                                borderColor: isValidUrl(githubRepo) ? "rgba(0,229,255,0.3)" : "rgba(255,255,255,0.1)",
                            }}
                            onFocus={focusRing} onBlur={blurRing} />
                        {isValidUrl(githubRepo) && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                                className="absolute right-3 top-1/2 -translate-y-1/2">
                                <CheckCircle2 className="h-4 w-4" style={{ color: "#00E5FF" }} />
                            </motion.div>
                        )}
                    </div>
                    {/* Discord */}
                    <div className="relative">
                        <MessageCircle className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
                            style={{ color: isValidUrl(discordServer) ? "#5865F2" : "rgba(255,255,255,0.2)" }} />
                        <input type="url" value={discordServer}
                            onChange={(e) => setField("discordServer", e.target.value)}
                            placeholder="Discord Server URL"
                            className={INPUT_CLS + " !pl-10"} style={{
                                ...INPUT_STYLE,
                                boxShadow: isValidUrl(discordServer) ? "0 0 20px rgba(88,101,242,0.08)" : "none",
                                borderColor: isValidUrl(discordServer) ? "rgba(88,101,242,0.3)" : "rgba(255,255,255,0.1)",
                            }}
                            onFocus={focusRing} onBlur={blurRing} />
                        {isValidUrl(discordServer) && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                                className="absolute right-3 top-1/2 -translate-y-1/2">
                                <CheckCircle2 className="h-4 w-4" style={{ color: "#5865F2" }} />
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>

            {/* Tech Stack */}
            <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-widest"
                    style={{ color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>
                    {">"} tech_stack
                </label>
                <div className="flex gap-2">
                    <input type="text" value={techInput}
                        onChange={(e) => setTechInput(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddTech(); } }}
                        placeholder="Add technology (e.g., React, FastAPI)"
                        className={INPUT_CLS + " flex-1"} style={INPUT_STYLE}
                        onFocus={focusRing} onBlur={blurRing} />
                    <button type="button" onClick={handleAddTech}
                        className="flex items-center justify-center rounded-xl px-4 transition-all"
                        style={{
                            backgroundColor: "rgba(0,229,255,0.12)",
                            border: "1px solid rgba(0,229,255,0.3)",
                            color: "#00E5FF",
                        }}>
                        <Plus className="h-4 w-4" />
                    </button>
                </div>
                {techStackPreferences.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                        {techStackPreferences.map((tech) => (
                            <span key={tech} className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs"
                                style={{
                                    backgroundColor: "rgba(99,102,241,0.1)",
                                    border: "1px solid rgba(99,102,241,0.25)",
                                    color: "#818cf8",
                                    fontFamily: "monospace",
                                }}>
                                {tech}
                                <button onClick={() => removeTech(tech)} className="ml-1 transition-colors hover:text-red-400">
                                    <X className="h-3 w-3" />
                                </button>
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Visibility */}
            <div>
                <label className="mb-3 block text-xs font-bold uppercase tracking-widest"
                    style={{ color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>
                    {">"} visibility
                </label>
                <div className="grid grid-cols-2 gap-2">
                    {visibilityOptions.map((opt) => {
                        const icons: Record<string, React.ReactNode> = {
                            Private: <Lock className="h-4 w-4" />,
                            "Team Only": <Users className="h-4 w-4" />,
                            Organization: <Building className="h-4 w-4" />,
                            Public: <Globe className="h-4 w-4" />,
                        };
                        return (
                            <button key={opt} type="button" onClick={() => setField("visibility", opt)}
                                className="flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-xs font-bold uppercase tracking-wider transition-all"
                                style={{
                                    backgroundColor: visibility === opt ? "rgba(0,229,255,0.15)" : "rgba(255,255,255,0.03)",
                                    border: `1px solid ${visibility === opt ? "rgba(0,229,255,0.4)" : "rgba(255,255,255,0.06)"}`,
                                    color: visibility === opt ? "#00E5FF" : "rgba(255,255,255,0.35)",
                                    fontFamily: "monospace",
                                }}>
                                {icons[opt]} {opt}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

/* ══════════════════════════════════════
   TERMINAL OVERLAY (submission state)
   ══════════════════════════════════════ */
const TerminalOverlay = () => {
    const navigate = useNavigate();
    const { projectName, endDate, teamMembers, completeSubmission } = useProjectStore();
    const [visibleLines, setVisibleLines] = useState(0);
    const [done, setDone] = useState(false);

    /* Personalize lines */
    const lines = TERMINAL_LINES.map((l) => {
        let text = l.text;
        if (text.includes("repository")) text = `Syncing GitHub Repository: ${projectName || "untitled"}...`;
        if (text.includes("Ghost-Line")) text = `Ghost-Line established at ${endDate || "TBD"}...`;
        if (text.includes("team member")) text = `Syncing ${teamMembers.length} team member profiles...`;
        return { ...l, text };
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setVisibleLines((prev) => {
                if (prev >= lines.length) {
                    clearInterval(timer);
                    setTimeout(() => { setDone(true); completeSubmission(); }, 800);
                    return prev;
                }
                return prev + 1;
            });
        }, 700);
        return () => clearInterval(timer);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[500] flex items-center justify-center"
            style={{ backgroundColor: "rgba(0,0,0,0.95)", backdropFilter: "blur(20px)" }}>
            <div className="w-full max-w-2xl px-6">
                {/* Terminal chrome */}
                <div className="rounded-2xl overflow-hidden"
                    style={{
                        backgroundColor: "rgba(0,0,0,0.8)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        boxShadow: "0 0 60px rgba(0,229,255,0.08)",
                    }}>
                    <div className="flex items-center gap-2 px-5 py-3"
                        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: "#ff5f57" }} />
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: "#febc2e" }} />
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: "#28c840" }} />
                        <span className="ml-3 text-[10px] uppercase tracking-widest"
                            style={{ color: "rgba(255,255,255,0.2)", fontFamily: "monospace" }}>
                            synapse-cli v2.0 — neural_sync
                        </span>
                    </div>

                    <div className="flex flex-col gap-2 p-6">
                        {lines.slice(0, visibleLines).map((line, i) => (
                            <motion.p key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                                className="text-sm" style={{ fontFamily: "monospace" }}>
                                <span style={{
                                    color: line.prefix === "✓" ? "#39ff14"
                                        : line.prefix === "SYSTEM" ? "#00E5FF"
                                            : line.prefix === "NETWORK" ? "#a855f7"
                                                : "#f59e0b",
                                }}>
                                    [{line.prefix}]
                                </span>{" "}
                                <span style={{ color: line.prefix === "✓" ? "#39ff14" : "rgba(255,255,255,0.5)" }}>
                                    {line.text}
                                </span>
                            </motion.p>
                        ))}
                        {!done && visibleLines < lines.length && (
                            <motion.span animate={{ opacity: [1, 0, 1] }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                                className="inline-block h-4 w-2 rounded-sm"
                                style={{ backgroundColor: "#00E5FF" }} />
                        )}
                    </div>
                </div>

                {/* Success + Launch button */}
                <AnimatePresence>
                    {done && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="mt-8 flex flex-col items-center gap-6">
                            <motion.div
                                animate={{
                                    boxShadow: [
                                        "0 0 30px rgba(57,255,20,0.15)",
                                        "0 0 60px rgba(57,255,20,0.25)",
                                        "0 0 30px rgba(57,255,20,0.15)",
                                    ],
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="flex h-16 w-16 items-center justify-center rounded-full"
                                style={{
                                    backgroundColor: "rgba(57,255,20,0.1)",
                                    border: "1px solid rgba(57,255,20,0.3)",
                                }}>
                                <CheckCircle2 className="h-8 w-8" style={{ color: "#39ff14" }} />
                            </motion.div>
                            <div className="text-center">
                                <h3 className="text-xl font-bold text-white" style={{ fontFamily: "monospace" }}>
                                    WORKSPACE INITIALIZED
                                </h3>
                                <p className="mt-1 text-sm"
                                    style={{ color: "rgba(57,255,20,0.6)", fontFamily: "monospace" }}>
                                    {projectName || "Untitled"} is ready
                                </p>
                            </div>
                            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                onClick={() => navigate("/home")}
                                className="flex items-center gap-2 rounded-2xl px-8 py-3 text-sm font-bold uppercase tracking-wider"
                                style={{
                                    background: "linear-gradient(135deg, #39ff14, #22c55e)",
                                    color: "#000",
                                    fontFamily: "monospace",
                                    boxShadow: "0 0 30px rgba(57,255,20,0.2)",
                                }}>
                                <Rocket className="h-4 w-4" />
                                Launch Dashboard
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

/* ══════════════════════════════════════
   MAIN PAGE COMPONENT
   ══════════════════════════════════════ */
const CreateProject = () => {
    const navigate = useNavigate();
    const store = useProjectStore();
    const { currentStep, isSubmitting, nextStep, prevStep, setStep } = store;
    const progress = (currentStep / 4) * 100;

    /* ── Form Submission ── */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        store.startSubmission();

        try {
            const { data: { session } } = await supabase.auth.getSession();

            /* Fetch leader name */
            let leaderName = "Unknown";
            if (session) {
                const { data } = await supabase.from("profiles").select("full_name")
                    .eq("id", session.user.id).single();
                if (data) leaderName = data.full_name;
                else leaderName = session.user.email || "Unknown";
            }

            const projectData = {
                title: store.projectName,
                description: store.description,
                category: store.category,
                priority: store.priority,
                start_date: store.startDate || null,
                end_date: store.endDate || null,
                duration_weeks: store.durationWeeks ? parseInt(store.durationWeeks) : null,
                leader_name: leaderName,
                team_members: store.teamMembers.map((m) => ({
                    name: m.name,
                    email: m.email,
                    github_username: m.github_username || null,
                    discord_username: m.discord_username || null,
                    role: m.role,
                })),
                github_repo_url: store.githubRepo || null,
                discord_server_url: store.discordServer || null,
                tech_stack_preferences: store.techStackPreferences,
                tags: store.tags,
                visibility: store.visibility,
            };

            const response = await apiPost("/projects/", projectData);

            /* Upload files */
            if (store.uploadedFiles.length > 0 && response?.id) {
                try {
                    const fileFormData = new FormData();
                    store.uploadedFiles.forEach((file) => fileFormData.append("files", file));
                    const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
                    await fetch(`${API_BASE_URL}/projects/${response.id}/upload-files`, {
                        method: "POST",
                        headers: { Authorization: `Bearer ${session?.access_token}` },
                        body: fileFormData,
                    });
                } catch (uploadError) {
                    console.warn("File upload failed, but project was created:", uploadError);
                }
            }

            triggerAlert("Project Initialized Successfully! 🎉",
                `${store.projectName} is now live with AI-generated tasks.`, "success");

            setTimeout(() => {
                triggerAlert("Team Invitations Sent 📧",
                    `${store.teamMembers.length} team members will receive invitation emails.`, "info");
            }, 1500);

        } catch (error: any) {
            console.error("Failed to create project:", error);
            store.setField("isSubmitting", false);
            if (error.status === 401) {
                triggerAlert("Authentication Required", "Please log in again.", "error");
                setTimeout(() => navigate("/login"), 1500);
                return;
            }
            triggerAlert("Project Creation Failed",
                error.data?.detail || "Unable to create project. Please try again.", "error");
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1: return <StepIdentity />;
            case 2: return <StepDetails />;
            case 3: return <StepTimeline />;
            case 4: return <StepTeam />;
            default: return null;
        }
    };

    return (
        <div className="relative min-h-screen" style={{ backgroundColor: "#000" }}>
            {/* Neural background */}
            <NeuralGrid />

            {/* Terminal overlay */}
            {isSubmitting && <TerminalOverlay />}

            {/* Progress Bar — cyan to purple gradient */}
            <div className="fixed left-0 right-0 top-0 z-[200]"
                style={{ height: 3, backgroundColor: "rgba(255,255,255,0.05)" }}>
                <motion.div className="h-full"
                    style={{
                        background: "linear-gradient(90deg, #00E5FF, #a855f7)",
                        boxShadow: "0 0 20px rgba(0,229,255,0.5), 0 0 40px rgba(168,85,247,0.3)",
                    }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} />
            </div>

            {/* ── Centered Layout ── */}
            <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-20">
                <div className="w-full max-w-3xl">
                    {/* Header */}
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-white" style={{ fontFamily: "monospace" }}>
                            Initialize{" "}
                            <span style={{
                                background: "linear-gradient(90deg, #00E5FF, #a855f7)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}>
                                Neural Sync
                            </span>
                        </h1>
                        <p className="mt-2 text-sm" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "monospace" }}>
              // let AI orchestrate your project into actionable milestones
                        </p>
                    </div>

                    {/* Step navigation pills */}
                    <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
                        {STEPS.map((step) => {
                            const isActive = step.num === currentStep;
                            const isPast = step.num < currentStep;
                            return (
                                <button key={step.num} onClick={() => setStep(step.num)}
                                    className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium transition-all"
                                    style={{
                                        backgroundColor: isActive ? "rgba(0,229,255,0.12)"
                                            : isPast ? "rgba(57,255,20,0.08)" : "rgba(255,255,255,0.03)",
                                        border: `1px solid ${isActive ? "rgba(0,229,255,0.3)"
                                            : isPast ? "rgba(57,255,20,0.2)" : "rgba(255,255,255,0.06)"}`,
                                        color: isActive ? "#00E5FF" : isPast ? "#39ff14" : "rgba(255,255,255,0.35)",
                                        fontFamily: "monospace",
                                    }}>
                                    {isPast ? (
                                        <Check className="h-3.5 w-3.5" />
                                    ) : (
                                        <GlowIcon color={isActive ? "rgba(0,229,255,0.6)" : "transparent"}>
                                            {step.icon}
                                        </GlowIcon>
                                    )}
                                    <span className="hidden sm:inline">{step.label}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Glassmorphic form container */}
                    <form onSubmit={handleSubmit}>
                        <motion.div
                            className="rounded-3xl p-6 lg:p-8"
                            style={{
                                backgroundColor: "rgba(255,255,255,0.03)",
                                border: "1px solid rgba(255,255,255,0.08)",
                                backdropFilter: "blur(40px)",
                                WebkitBackdropFilter: "blur(40px)",
                                boxShadow:
                                    "0 0 60px rgba(0,229,255,0.04), 0 0 120px rgba(168,85,247,0.02), inset 0 1px 0 rgba(255,255,255,0.05)",
                            }}
                        >
                            {/* Step header */}
                            <div className="mb-6">
                                <h2 className="flex items-center gap-3 text-xl font-bold text-white" style={{ fontFamily: "monospace" }}>
                                    <GlowIcon>
                                        {STEPS[currentStep - 1]?.icon}
                                    </GlowIcon>
                                    {STEPS[currentStep - 1]?.label}
                                </h2>
                                <div className="mt-2 h-[1px] w-16"
                                    style={{ background: "linear-gradient(90deg, rgba(0,229,255,0.5), rgba(168,85,247,0.3), transparent)" }} />
                            </div>

                            {/* Step content — horizontal slide transitions */}
                            <AnimatePresence mode="wait">
                                <motion.div key={currentStep}
                                    initial={{ opacity: 0, x: 60 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -60 }}
                                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
                                    {renderStep()}
                                </motion.div>
                            </AnimatePresence>
                        </motion.div>

                        {/* Navigation buttons */}
                        <div className="mt-6 flex gap-3">
                            {currentStep > 1 && (
                                <button type="button" onClick={prevStep}
                                    className="flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-3 text-xs font-bold uppercase tracking-wider transition-all"
                                    style={{
                                        backgroundColor: "rgba(255,255,255,0.04)",
                                        border: "1px solid rgba(255,255,255,0.1)",
                                        color: "rgba(255,255,255,0.5)",
                                        fontFamily: "monospace",
                                    }}>
                                    <ArrowLeft className="h-4 w-4" /> Previous
                                </button>
                            )}

                            {currentStep < 4 ? (
                                <button type="button" onClick={nextStep}
                                    className="flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-3 text-xs font-bold uppercase tracking-wider transition-all"
                                    style={{
                                        backgroundColor: "rgba(0,229,255,0.12)",
                                        border: "1px solid rgba(0,229,255,0.3)",
                                        color: "#00E5FF",
                                        fontFamily: "monospace",
                                    }}>
                                    Next <ArrowRight className="h-4 w-4" />
                                </button>
                            ) : (
                                <motion.button type="submit" disabled={isSubmitting}
                                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                    className="flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold uppercase tracking-wider transition-all disabled:opacity-50"
                                    style={{
                                        background: "linear-gradient(135deg, #00E5FF, #a855f7)",
                                        color: "#000",
                                        fontFamily: "monospace",
                                        boxShadow: "0 0 30px rgba(0,229,255,0.2), 0 0 60px rgba(168,85,247,0.1)",
                                    }}>
                                    {isSubmitting ? (
                                        <><BrainCircuit className="h-5 w-5 animate-pulse" /> Syncing with AI...</>
                                    ) : (
                                        <><Check className="h-5 w-5" /> Initialize Project</>
                                    )}
                                </motion.button>
                            )}
                        </div>
                    </form>

                    {/* Cancel */}
                    <div className="mt-4 text-center">
                        <button onClick={() => navigate("/")}
                            className="text-xs transition-colors"
                            style={{ color: "rgba(255,255,255,0.2)", fontFamily: "monospace" }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
                            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.2)")}>
              // cancel_and_return
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateProject;
