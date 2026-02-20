import { create } from "zustand";

/* ══════════════════════════════════════
   TYPES
   ══════════════════════════════════════ */

export interface ProjectMember {
    id: string;
    name: string;
    email: string;
    github_username: string;
    discord_username: string;
    role: string;          // "Admin" | "Developer" | "Designer" | "Tester" | "Viewer"
    /* carousel-display fields */
    avatar: string;
    initials: string;
    gradient: string;
}

interface ProjectState {
    /* Step 1 — Basic Info */
    projectName: string;
    category: string;
    priority: string;

    /* Step 2 — Details */
    description: string;
    tags: string[];
    uploadedFiles: File[];

    /* Step 3 — Timeline */
    startDate: string;
    endDate: string;
    durationWeeks: string;

    /* Step 4 — Team & Integration */
    teamMembers: ProjectMember[];
    githubRepo: string;
    discordServer: string;
    techStackPreferences: string[];
    visibility: string;

    /* Submission */
    isSubmitting: boolean;
    isComplete: boolean;

    /* Wizard meta */
    currentStep: number;

    /* Hub bridge — derived state */
    hasAlerts: boolean;
    isProjectActive: boolean;
}

interface ProjectActions {
    /* generic setter */
    setField: <K extends keyof ProjectState>(key: K, value: ProjectState[K]) => void;

    /* tags */
    addTag: (tag: string) => void;
    removeTag: (tag: string) => void;

    /* tech stack */
    addTech: (tech: string) => void;
    removeTech: (tech: string) => void;

    /* files */
    addFiles: (files: File[]) => void;
    removeFile: (fileName: string) => void;

    /* team members */
    addTeamMember: () => void;
    removeTeamMember: (id: string) => void;
    updateTeamMember: (id: string, field: string, value: string) => void;

    /* wizard nav */
    setStep: (step: number) => void;
    nextStep: () => void;
    prevStep: () => void;

    /* submission */
    startSubmission: () => void;
    completeSubmission: () => void;
    reset: () => void;
}

/* Gradient palette for member carousel cards */
const GRADIENTS = [
    "linear-gradient(135deg, #f43f5e, #d946ef)",
    "linear-gradient(135deg, #f59e0b, #ef4444)",
    "linear-gradient(135deg, #10b981, #14b8a6)",
    "linear-gradient(135deg, #a855f7, #d946ef)",
    "linear-gradient(135deg, #00f3ff, #0066ff)",
    "linear-gradient(135deg, #06b6d4, #3b82f6)",
    "linear-gradient(135deg, #8b5cf6, #6366f1)",
    "linear-gradient(135deg, #22c55e, #15803d)",
];

const initialState: ProjectState = {
    projectName: "",
    category: "",
    priority: "Medium",
    description: "",
    tags: [],
    uploadedFiles: [],
    startDate: "",
    endDate: "",
    durationWeeks: "",
    teamMembers: [],
    githubRepo: "",
    discordServer: "",
    techStackPreferences: [],
    visibility: "Team Only",
    isSubmitting: false,
    isComplete: false,
    currentStep: 1,
    hasAlerts: true,          // demo: simulates blocked alerts
    isProjectActive: true,    // demo: simulates an active project
};

export const useProjectStore = create<ProjectState & ProjectActions>((set, get) => ({
    ...initialState,

    setField: (key, value) => set({ [key]: value } as any),

    /* ── Tags ── */
    addTag: (tag) => {
        const tags = get().tags;
        if (tags.length < 10 && tag.trim()) {
            set({ tags: [...tags, tag.trim()] });
        }
    },
    removeTag: (tag) => set({ tags: get().tags.filter((t) => t !== tag) }),

    /* ── Tech Stack ── */
    addTech: (tech) => {
        if (tech.trim()) {
            set({ techStackPreferences: [...get().techStackPreferences, tech.trim()] });
        }
    },
    removeTech: (tech) =>
        set({ techStackPreferences: get().techStackPreferences.filter((t) => t !== tech) }),

    /* ── Files ── */
    addFiles: (files) =>
        set({ uploadedFiles: [...get().uploadedFiles, ...files] }),
    removeFile: (fileName) =>
        set({ uploadedFiles: get().uploadedFiles.filter((f) => f.name !== fileName) }),

    /* ── Team Members ── */
    addTeamMember: () => {
        const members = get().teamMembers;
        const gradient = GRADIENTS[members.length % GRADIENTS.length];
        set({
            teamMembers: [
                ...members,
                {
                    id: Date.now().toString(),
                    name: "",
                    email: "",
                    github_username: "",
                    discord_username: "",
                    role: "Developer",
                    avatar: "",
                    initials: "?",
                    gradient,
                },
            ],
        });
    },
    removeTeamMember: (id) =>
        set({ teamMembers: get().teamMembers.filter((m) => m.id !== id) }),
    updateTeamMember: (id, field, value) =>
        set({
            teamMembers: get().teamMembers.map((m) => {
                if (m.id !== id) return m;
                const updated = { ...m, [field]: value };
                /* Auto-derive display fields */
                if (field === "name" && value) {
                    const parts = value.trim().split(/\s+/);
                    updated.initials = parts.map((p) => p[0]?.toUpperCase() || "").join("").slice(0, 2) || "?";
                }
                if (field === "github_username" && value) {
                    updated.avatar = `https://github.com/${value.trim()}.png`;
                }
                return updated;
            }),
        }),

    /* ── Wizard Nav ── */
    setStep: (step) => set({ currentStep: step }),
    nextStep: () => set((s) => ({ currentStep: Math.min(s.currentStep + 1, 4) })),
    prevStep: () => set((s) => ({ currentStep: Math.max(s.currentStep - 1, 1) })),

    /* ── Submission ── */
    startSubmission: () => set({ isSubmitting: true }),
    completeSubmission: () => set({ isSubmitting: false, isComplete: true }),
    reset: () => set(initialState),
}));
