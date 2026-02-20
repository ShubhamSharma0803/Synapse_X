import { create } from "zustand";

/* ═══════════════════════════════════════════════════════
   AUTH STORE — Ghost / Authenticated session state
   ═══════════════════════════════════════════════════════ */

const GHOST_STORAGE_KEY = "synapse_ghost_session";
const GHOST_DATA_KEY = "synapse_ghost_projects";
const AUTH_STORAGE_KEY = "synapse_auth_session";

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
        localStorage.removeItem(AUTH_STORAGE_KEY);
        set({ isGuest: true, isAuthenticated: false, ghostId, displayName: ghostId });
    },

    exitGhostMode: () => {
        localStorage.removeItem(GHOST_STORAGE_KEY);
        set({ isGuest: false, ghostId: "", displayName: "" });
    },

    authenticate: (name: string) => {
        const displayName = name || "Operator";
        localStorage.removeItem(GHOST_STORAGE_KEY);
        localStorage.setItem(
            AUTH_STORAGE_KEY,
            JSON.stringify({ isAuthenticated: true, displayName })
        );
        set({
            isGuest: false,
            isAuthenticated: true,
            ghostId: "",
            displayName,
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
            // Check for authenticated session first
            const authRaw = localStorage.getItem(AUTH_STORAGE_KEY);
            if (authRaw) {
                const { isAuthenticated, displayName } = JSON.parse(authRaw);
                if (isAuthenticated && displayName) {
                    set({ isAuthenticated: true, isGuest: false, ghostId: "", displayName });
                    return;
                }
            }

            // Fall back to ghost session
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

