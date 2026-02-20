import { BrainCircuit } from "lucide-react";
import GlassSurface from "./GlassSurface";

/* ═══════════════════════════════════════════════════════
   AI BRIEFING TILE — 2-sentence squad summary
   ═══════════════════════════════════════════════════════ */

const AIBriefing = () => (
    <GlassSurface className="flex flex-col gap-4 p-6" delay={0.2}>
        {/* Header */}
        <div className="flex items-center gap-3">
            <div
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{
                    background: "linear-gradient(135deg, rgba(0,229,255,0.15), rgba(0,102,255,0.15))",
                    border: "1px solid rgba(0,229,255,0.2)",
                }}
            >
                <BrainCircuit className="h-5 w-5" style={{ color: "#00E5FF" }} />
            </div>
            <div>
                <h3
                    className="text-sm font-bold text-white"
                    style={{ fontFamily: "var(--font-heading)" }}
                >
                    Neural Briefing
                </h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                    <div
                        className="h-1.5 w-1.5 rounded-full animate-pulse"
                        style={{ backgroundColor: "#22c55e" }}
                    />
                    <span className="text-[10px] uppercase tracking-wider" style={{ color: "#22c55e" }}>
                        Live
                    </span>
                </div>
            </div>
        </div>

        {/* Summary */}
        <p
            className="text-sm leading-relaxed"
            style={{ color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-body)" }}
        >
            Sprint velocity increased <span style={{ color: "#00E5FF", fontWeight: 600 }}>23%</span> this
            week with <span style={{ color: "#00E5FF", fontWeight: 600 }}>4 features merged</span>.
            One blocker remains on the auth-token pipeline — recommend pairing Sanyam with Rhythm
            to resolve by EOD.
        </p>

        {/* Confidence bar */}
        <div className="mt-auto flex items-center gap-3">
            <div
                className="h-1 flex-1 rounded-full overflow-hidden"
                style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
            >
                <div
                    className="h-full rounded-full"
                    style={{
                        width: "87%",
                        background: "linear-gradient(90deg, #00E5FF, #0066ff)",
                        boxShadow: "0 0 8px rgba(0,229,255,0.3)",
                    }}
                />
            </div>
            <span className="text-[10px] font-mono" style={{ color: "rgba(255,255,255,0.4)" }}>
                87% conf.
            </span>
        </div>
    </GlassSurface>
);

export default AIBriefing;
