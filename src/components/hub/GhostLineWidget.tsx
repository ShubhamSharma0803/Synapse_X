import ElectroBorder from "./ElectroBorder";
import GlassSurface from "./GlassSurface";
import { GitCommit } from "lucide-react";

/* ═══════════════════════════════════════════════════════
   GHOST LINE WIDGET — Timeline progress + electro border
   ═══════════════════════════════════════════════════════ */

interface GhostLineWidgetProps {
    /** 0-100 completion percentage */
    progress?: number;
    /** 0-1 commit velocity intensity */
    velocity?: number;
    sprintLabel?: string;
}

const GhostLineWidget = ({
    progress = 62,
    velocity = 0.65,
    sprintLabel = "Sprint 4 — Week 3 / 4",
}: GhostLineWidgetProps) => (
    <ElectroBorder color="cyan" intensity={velocity} borderRadius={16}>
        <GlassSurface className="p-5" delay={0.4}>
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <GitCommit className="h-4 w-4" style={{ color: "#00E5FF" }} />
                    <h3
                        className="text-sm font-bold text-white"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Project Timeline
                    </h3>
                </div>
                <span className="text-[10px] font-mono" style={{ color: "rgba(255,255,255,0.35)" }}>
                    {sprintLabel}
                </span>
            </div>

            {/* Progress bar */}
            <div
                className="relative h-3 w-full rounded-full overflow-hidden"
                style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
            >
                <div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{
                        width: `${progress}%`,
                        background: "linear-gradient(90deg, #00E5FF, #0066ff)",
                        boxShadow: "0 0 12px rgba(0,229,255,0.4)",
                        transition: "width 0.8s ease",
                    }}
                />
                {/* Pulse point at end */}
                <div
                    className="absolute top-1/2 h-2 w-2 rounded-full animate-pulse"
                    style={{
                        left: `${progress}%`,
                        transform: "translate(-50%, -50%)",
                        backgroundColor: "#fff",
                        boxShadow: "0 0 8px rgba(0,229,255,0.8)",
                    }}
                />
            </div>

            {/* Stats row */}
            <div className="flex items-center justify-between mt-3">
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                    <span style={{ color: "#00E5FF", fontWeight: 700 }}>{progress}%</span> complete
                </span>
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                    Velocity:{" "}
                    <span style={{ color: velocity > 0.5 ? "#22c55e" : "#f59e0b", fontWeight: 700 }}>
                        {Math.round(velocity * 100)}%
                    </span>
                </span>
            </div>
        </GlassSurface>
    </ElectroBorder>
);

export default GhostLineWidget;
