import { useState, useEffect, useRef } from "react";
import ScrambledText from "./ScrambledText";
import GlassSurface from "./GlassSurface";

/* ═══════════════════════════════════════════════════════
   TERMINAL FEED — Live-scrolling simulated GitHub commits
   ═══════════════════════════════════════════════════════ */

const MOCK_COMMITS = [
    { hash: "a3f9c12", author: "shubham", msg: "feat: add neural sync pipeline integration" },
    { hash: "7b2e4d8", author: "sanyam", msg: "fix: resolve auth token refresh edge case" },
    { hash: "e1c6a90", author: "palak", msg: "ui: redesign velocity tracker glassmorphism" },
    { hash: "4d8f2b1", author: "rhythm", msg: "perf: optimize db query batch processing" },
    { hash: "9c3e7a5", author: "aman", msg: "feat: implement AI briefing summarizer v2" },
    { hash: "b6d1f43", author: "shubham", msg: "refactor: extract carousel into shared module" },
    { hash: "2a7c9e6", author: "sanyam", msg: "feat: add webhook event dispatcher queue" },
    { hash: "f8b4d21", author: "palak", msg: "ui: add electro border animation component" },
    { hash: "5e9a3c7", author: "rhythm", msg: "fix: handle concurrent write race condition" },
    { hash: "1d6b8f0", author: "aman", msg: "feat: predictive task blocking neural net" },
    { hash: "c4a2e91", author: "shubham", msg: "chore: upgrade framer-motion to v12" },
    { hash: "8f1d5b3", author: "sanyam", msg: "feat: real-time socket event multiplexer" },
];

const TerminalFeed = () => {
    const [visibleCommits, setVisibleCommits] = useState<typeof MOCK_COMMITS>([]);
    const bottomRef = useRef<HTMLDivElement>(null);
    const indexRef = useRef(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const commit = MOCK_COMMITS[indexRef.current % MOCK_COMMITS.length];
            setVisibleCommits((prev) => [...prev.slice(-7), commit]);
            indexRef.current += 1;
        }, 3500);

        // Kick off first commit immediately
        const first = MOCK_COMMITS[0];
        setVisibleCommits([first]);
        indexRef.current = 1;

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [visibleCommits]);

    return (
        <GlassSurface className="flex flex-col h-full" delay={0.1}>
            {/* Terminal chrome */}
            <div
                className="flex items-center gap-2 border-b px-4 py-3"
                style={{ borderColor: "rgba(255,255,255,0.06)" }}
            >
                <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
                </div>
                <span
                    className="ml-2 text-[10px] uppercase tracking-widest"
                    style={{ color: "rgba(255,255,255,0.3)", fontFamily: "monospace" }}
                >
                    git-feed — live commits
                </span>
                <div
                    className="ml-auto h-2 w-2 rounded-full animate-pulse"
                    style={{ backgroundColor: "#22c55e" }}
                />
            </div>

            {/* Commit list */}
            <div
                className="flex-1 overflow-y-auto p-4 space-y-2"
                style={{ maxHeight: 240, fontFamily: "'Courier New', monospace" }}
            >
                {visibleCommits.map((commit, i) => (
                    <div key={`${commit.hash}-${i}`} className="flex items-start gap-2 text-xs">
                        <span style={{ color: "#00E5FF" }}>{commit.hash}</span>
                        <span style={{ color: "rgba(255,255,255,0.35)" }}>•</span>
                        <span style={{ color: "#a78bfa" }}>{commit.author}</span>
                        <span style={{ color: "rgba(255,255,255,0.35)" }}>—</span>
                        <ScrambledText
                            text={commit.msg}
                            speed={20}
                            style={{ color: "rgba(255,255,255,0.7)" }}
                        />
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>
        </GlassSurface>
    );
};

export default TerminalFeed;
