import { motion, AnimatePresence } from "framer-motion";
import GlassSurface from "./GlassSurface";
import { X, GitPullRequest, ExternalLink } from "lucide-react";
import type { RingMember } from "./ImageRing3D";

/* ═══════════════════════════════════════════════════════
   MEMBER FOLDER — Glass modal showing member's recent PRs
   ═══════════════════════════════════════════════════════ */

interface MemberFolderProps {
    member: RingMember | null;
    onClose: () => void;
}

const MemberFolder = ({ member, onClose }: MemberFolderProps) => (
    <AnimatePresence>
        {member && (
            <>
                {/* Backdrop */}
                <motion.div
                    className="fixed inset-0 z-[500]"
                    style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                />

                {/* Modal */}
                <motion.div
                    className="fixed left-1/2 top-1/2 z-[501] w-[90%] max-w-md"
                    initial={{ opacity: 0, scale: 0.9, x: "-50%", y: "-50%" }}
                    animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                    exit={{ opacity: 0, scale: 0.9, x: "-50%", y: "-50%" }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                    <GlassSurface className="p-6" style={{ border: "1px solid rgba(0,229,255,0.15)" }}>
                        {/* Header */}
                        <div className="flex items-center gap-4 mb-5">
                            <img
                                src={member.avatar}
                                alt={member.name}
                                className="h-14 w-14 rounded-2xl object-cover"
                                style={{ border: "2px solid rgba(0,229,255,0.2)" }}
                            />
                            <div className="flex-1">
                                <h3
                                    className="text-lg font-bold text-white"
                                    style={{ fontFamily: "var(--font-heading)" }}
                                >
                                    {member.name}
                                </h3>
                                <p className="text-xs" style={{ color: "#00E5FF" }}>
                                    {member.role}
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors"
                                style={{
                                    backgroundColor: "rgba(255,255,255,0.05)",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                    color: "rgba(255,255,255,0.4)",
                                }}
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        {/* Status badge */}
                        <div className="flex items-center gap-2 mb-4">
                            <div
                                className="h-2 w-2 rounded-full"
                                style={{
                                    backgroundColor:
                                        member.status === "active"
                                            ? "#22c55e"
                                            : member.status === "blocked"
                                                ? "#ef4444"
                                                : "#6b7280",
                                }}
                            />
                            <span
                                className="text-[10px] uppercase tracking-wider font-bold"
                                style={{
                                    color:
                                        member.status === "active"
                                            ? "#22c55e"
                                            : member.status === "blocked"
                                                ? "#ef4444"
                                                : "#6b7280",
                                }}
                            >
                                {member.status}
                            </span>
                        </div>

                        {/* PR List */}
                        <div className="space-y-2">
                            <h4
                                className="text-xs uppercase tracking-wider mb-2"
                                style={{ color: "rgba(255,255,255,0.3)" }}
                            >
                                Recent Pull Requests
                            </h4>
                            {member.recentPRs.map((pr, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-3 rounded-xl p-3 transition-colors"
                                    style={{
                                        backgroundColor: "rgba(255,255,255,0.03)",
                                        border: "1px solid rgba(255,255,255,0.04)",
                                    }}
                                >
                                    <GitPullRequest className="h-4 w-4 flex-shrink-0" style={{ color: "#a78bfa" }} />
                                    <span
                                        className="flex-1 text-xs truncate"
                                        style={{ color: "rgba(255,255,255,0.7)", fontFamily: "monospace" }}
                                    >
                                        {pr}
                                    </span>
                                    <ExternalLink
                                        className="h-3 w-3 flex-shrink-0"
                                        style={{ color: "rgba(255,255,255,0.2)" }}
                                    />
                                </div>
                            ))}
                        </div>
                    </GlassSurface>
                </motion.div>
            </>
        )}
    </AnimatePresence>
);

export default MemberFolder;
