import { create } from "zustand";

/* ═══════════════════════════════════════════════════════
   AUTH STORE — Ghost / Authenticated session state
   ═══════════════════════════════════════════════════════ */

const GHOST_STORAGE_KEY = "synapse_ghost_session";
const GHOST_DATA_KEY = "synapse_ghost_projects";

function generateGhostId(): string {
    return `GHOST_USER_#${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

interface AuthState {
    isGuest: boolean;
    isAuthenticated: boolean;
    ghostId: string;
    displayName: string;
}

interface AuthActions {
    enterGhostMode: () => void;
    exitGhostMode: () => void;
    authenticate: (name: string) => void;
    /** Saves project data to localStorage for ghost mode */
    saveGhostProject: (data: Record<string, unknown>) => void;
    /** Retrieves ghost project data from localStorage */
    getGhostProjects: () => Record<string, unknown>[];
    /** Clears ghost project data (after sync to backend) */
    clearGhostData: () => void;
    /** Hydrate from localStorage on app boot */
    hydrate: () => void;
}

const initialState: AuthState = {
    isGuest: false,
    isAuthenticated: false,
    ghostId: "",
    displayName: "",
};

export const useAuthStore = create<AuthState & AuthActions>((set, get) => ({
    ...initialState,

    enterGhostMode: () => {
        const ghostId = generateGhostId();
        localStorage.setItem(
            GHOST_STORAGE_KEY,
            JSON.stringify({ isGuest: true, ghostId })
        );
        set({ isGuest: true, isAuthenticated: false, ghostId, displayName: ghostId });
    },

    exitGhostMode: () => {
        localStorage.removeItem(GHOST_STORAGE_KEY);
        set({ isGuest: false, ghostId: "", displayName: "" });
    },

    authenticate: (name: string) => {
        localStorage.removeItem(GHOST_STORAGE_KEY);
        set({
            isGuest: false,
            isAuthenticated: true,
            ghostId: "",
            displayName: name || "Operator",
        });
    },

    saveGhostProject: (data) => {
        const existing = get().getGhostProjects();
        existing.push(data);
        localStorage.setItem(GHOST_DATA_KEY, JSON.stringify(existing));
    },

    getGhostProjects: () => {
        try {
            const raw = localStorage.getItem(GHOST_DATA_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch {
            return [];
        }
    },

    clearGhostData: () => {
        localStorage.removeItem(GHOST_DATA_KEY);
    },

    hydrate: () => {
        try {
            const raw = localStorage.getItem(GHOST_STORAGE_KEY);
            if (raw) {
                const { isGuest, ghostId } = JSON.parse(raw);
                if (isGuest && ghostId) {
                    set({ isGuest: true, ghostId, displayName: ghostId });
                }
            }
        } catch {
            // ignore corrupt storage
        }
    },
}));
