import { create } from "zustand";

/* ══════════════════════════════════════
   TYPES
   ══════════════════════════════════════ */

export interface NeuralMessage {
    id: string;
    role: "user" | "assistant";
    text: string;
    timestamp: number;
}

interface NeuralState {
    isOpen: boolean;
    isListening: boolean;
    messages: NeuralMessage[];
    doubtQuery: string | null;
}

interface NeuralActions {
    toggle: () => void;
    open: () => void;
    close: () => void;
    send: (text: string) => void;
    addAssistantMessage: (text: string) => void;
    setListening: (v: boolean) => void;
    setDoubt: (text: string) => void;
    clearDoubt: () => void;
}

/* ══════════════════════════════════════
   CANNED RESPONSES
   ══════════════════════════════════════ */

const GREETINGS = [
    "Hey there! 👋 I'm your Neural Assistant. How can I help you today?",
    "Welcome to Synapse! I'm here to answer questions about the platform.",
    "Need a boost? Ask me anything about Project Synapse!",
];

const RESPONSES: Record<string, string> = {
    standup: "The AI Standup Generator drafts your daily standup from real GitHub commits and Discord activity — zero manual effort.",
    nudge: "Smart Nudges are proactive alerts that fire when a PR stalls, a teammate goes quiet, or a deadline is at risk.",
    timeline: "The Predictive Timeline uses your team's velocity to forecast delivery, shown as a ghost-line projection.",
    heatmap: "The Commit Heatmap visualises contribution intensity across time, so you instantly see who's shipping and when.",
    profile: "Developer Profile Cards are trading-card style profiles auto-populated from live GitHub stats.",
    orb: "The Orb AI Assistant is a floating brain on your dashboard. Ask it anything — blockers, progress, team health.",
    discord: "The Discord Signal Analyzer reads your team channels to extract intent, sentiment, and blockers automatically.",
    community: "The Community Gallery is a public showcase of contributors, built for open-source visibility.",
    synapse: "Project Synapse is an AI-driven project intelligence platform that turns your dev workflow into a real-time neural network.",
    ghost: "Ghost Mode lets you explore the prototype without signing in — your session is stored locally.",
};

const FALLBACK = [
    "Interesting question! Project Synapse is designed to supercharge your dev workflow with AI-driven insights.",
    "I'm still learning, but I can tell you all about Synapse's features — try asking about standups, nudges, or the heatmap!",
    "That's a great point. Synapse's intelligence layer connects GitHub, Discord, and your project timeline into one neural network.",
    "Hmm, let me think about that... In the meantime, try hovering over any feature card for more details!",
];

function generateResponse(input: string): string {
    const lower = input.toLowerCase();
    for (const [key, response] of Object.entries(RESPONSES)) {
        if (lower.includes(key)) return response;
    }
    return FALLBACK[Math.floor(Math.random() * FALLBACK.length)];
}

/* ══════════════════════════════════════
   STORE
   ══════════════════════════════════════ */

export const useNeuralStore = create<NeuralState & NeuralActions>((set, get) => ({
    isOpen: false,
    isListening: false,
    messages: [
        {
            id: "greeting",
            role: "assistant",
            text: GREETINGS[Math.floor(Math.random() * GREETINGS.length)],
            timestamp: Date.now(),
        },
    ],
    doubtQuery: null,

    toggle: () => set((s) => ({ isOpen: !s.isOpen })),
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),

    send: (text) => {
        const userMsg: NeuralMessage = {
            id: `u-${Date.now()}`,
            role: "user",
            text,
            timestamp: Date.now(),
        };
        set((s) => ({ messages: [...s.messages, userMsg] }));

        /* Simulate AI thinking delay */
        setTimeout(() => {
            const reply: NeuralMessage = {
                id: `a-${Date.now()}`,
                role: "assistant",
                text: generateResponse(text),
                timestamp: Date.now(),
            };
            set((s) => ({ messages: [...s.messages, reply] }));
        }, 600 + Math.random() * 800);
    },

    addAssistantMessage: (text) => {
        const msg: NeuralMessage = {
            id: `a-${Date.now()}`,
            role: "assistant",
            text,
            timestamp: Date.now(),
        };
        set((s) => ({ messages: [...s.messages, msg] }));
    },

    setListening: (v) => set({ isListening: v }),

    setDoubt: (text) => set({ doubtQuery: text }),
    clearDoubt: () => set({ doubtQuery: null }),
}));
