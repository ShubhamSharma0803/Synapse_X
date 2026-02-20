import { supabase } from "../supabaseClient";
import { useAuthStore } from "../stores/useAuthStore";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

async function getAuthHeaders(): Promise<Record<string, string>> {
    const {
        data: { session },
    } = await supabase.auth.getSession();
    return session?.access_token
        ? { Authorization: `Bearer ${session.access_token}` }
        : {};
}

async function apiFetch(url: string, options: RequestInit = {}) {
    const authHeaders = await getAuthHeaders();
    const res = await fetch(`${API_BASE_URL}${url}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...authHeaders,
            ...(options.headers || {}),
        },
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
        const error: any = new Error(data?.detail || res.statusText);
        error.status = res.status;
        error.data = data;
        throw error;
    }

    return data;
}

export async function apiPost(url: string, body: unknown) {
    return apiFetch(url, {
        method: "POST",
        body: JSON.stringify(body),
    });
}

export async function apiGet(url: string) {
    return apiFetch(url);
}

export async function apiPut(url: string, body: unknown) {
    return apiFetch(url, {
        method: "PUT",
        body: JSON.stringify(body),
    });
}

export async function apiDelete(url: string) {
    return apiFetch(url, { method: "DELETE" });
}

/* ═══════════════════════════════════════════════════════
   GHOST MODE — localStorage fallback
   ═══════════════════════════════════════════════════════ */

const GHOST_PROJECTS_KEY = "synapse_ghost_projects";

function ghostPost(_url: string, body: unknown) {
    const existing = (() => {
        try {
            return JSON.parse(localStorage.getItem(GHOST_PROJECTS_KEY) || "[]");
        } catch {
            return [];
        }
    })();
    const entry = {
        id: `ghost_${Date.now()}`,
        ...(body as Record<string, unknown>),
        createdAt: new Date().toISOString(),
    };
    existing.push(entry);
    localStorage.setItem(GHOST_PROJECTS_KEY, JSON.stringify(existing));
    return Promise.resolve(entry);
}

/**
 * Smart post: routes to localStorage when in ghost mode,
 * or to the real API when authenticated.
 */
export async function smartPost(url: string, body: unknown) {
    const { isGuest } = useAuthStore.getState();
    if (isGuest) {
        return ghostPost(url, body);
    }
    return apiPost(url, body);
}

/**
 * Retrieves all ghost-mode project data from localStorage.
 */
export function getGhostProjects(): Record<string, unknown>[] {
    try {
        return JSON.parse(localStorage.getItem(GHOST_PROJECTS_KEY) || "[]");
    } catch {
        return [];
    }
}
