import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ElectroBorder from "./ElectroBorder";

/* ═══════════════════════════════════════════════════════
   3D IMAGE RING — Team "Hive Mind" circular ring
   GSAP-free: uses CSS transform + Framer Motion.
   ═══════════════════════════════════════════════════════ */

export interface RingMember {
    name: string;
    avatar: string;
    role: string;
    status: "active" | "idle" | "blocked";
    recentPRs: string[];
}

interface ImageRing3DProps {
    members: RingMember[];
    onSelect?: (member: RingMember) => void;
}

const ImageRing3D = ({ members, onSelect }: ImageRing3DProps) => {
    const [activeIdx, setActiveIdx] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const count = members.length || 1;

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    const startAutoplay = useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setActiveIdx((p) => (p + 1) % count);
        }, 4000);
    }, [count]);

    useEffect(() => {
        startAutoplay();
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [startAutoplay]);

    const goTo = (i: number) => {
        setActiveIdx(i);
        startAutoplay();
    };

    if (members.length === 0) {
        return (
            <div className="flex items-center justify-center py-12 text-sm text-white/30">
                No team members yet
            </div>
        );
    }

    /* ── MOBILE: horizontal scroll carousel ── */
    if (isMobile) {
        return (
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory px-2">
                {members.map((m, i) => (
                    <MemberCard
                        key={m.name}
                        member={m}
                        isActive={i === activeIdx}
                        onClick={() => {
                            goTo(i);
                            onSelect?.(m);
                        }}
                    />
                ))}
            </div>
        );
    }

    /* ── DESKTOP: 3D ring ── */
    const angleStep = 360 / count;
    const radius = Math.max(280, count * 60);

    return (
        <div
            className="relative mx-auto flex items-center justify-center"
            style={{ height: 400, perspective: "1200px" }}
        >
            <div
                className="relative h-full w-full"
                style={{ transformStyle: "preserve-3d" }}
            >
                <AnimatePresence>
                    {members.map((member, i) => {
                        const offset = (i - activeIdx + count) % count;
                        const angle = offset * angleStep;
                        const radian = (angle * Math.PI) / 180;
                        const x = Math.sin(radian) * radius;
                        const z = Math.cos(radian) * radius - radius;
                        const isActive = i === activeIdx;

                        return (
                            <motion.div
                                key={member.name}
                                className="absolute left-1/2 top-1/2 cursor-pointer"
                                animate={{
                                    x: x - 80,
                                    y: -80,
                                    z,
                                    rotateY: -angle,
                                    scale: isActive ? 1.15 : 0.8,
                                    opacity: isActive ? 1 : 0.35,
                                }}
                                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                                style={{
                                    zIndex: isActive ? 100 : Math.round(50 + z / 10),
                                    transformStyle: "preserve-3d",
                                }}
                                onClick={() => {
                                    goTo(i);
                                    onSelect?.(member);
                                }}
                            >
                                <MemberCard member={member} isActive={isActive} />
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            {/* Active label */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-center">
                <motion.p
                    key={activeIdx}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm font-bold text-white"
                    style={{ fontFamily: "var(--font-heading)" }}
                >
                    {members[activeIdx]?.name}
                </motion.p>
                <p className="text-[10px] text-cyan-400 mt-0.5">
                    {members[activeIdx]?.role}
                </p>
            </div>
        </div>
    );
};

/* ── Individual card ── */
const MemberCard = ({
    member,
    isActive,
    onClick,
}: {
    member: RingMember;
    isActive: boolean;
    onClick?: () => void;
}) => {
    const isBlocked = member.status === "blocked";

    const card = (
        <div
            className="relative flex flex-col items-center snap-center"
            style={{
                width: 160,
                height: 160,
                borderRadius: 20,
                overflow: "hidden",
                backgroundColor: "rgba(255,255,255,0.04)",
                border: `1px solid ${isBlocked ? "rgba(239,68,68,0.3)" : "rgba(255,255,255,0.08)"}`,
                boxShadow: isActive
                    ? `0 0 30px ${isBlocked ? "rgba(239,68,68,0.2)" : "rgba(0,229,255,0.15)"}`
                    : "none",
                cursor: "pointer",
            }}
            onClick={onClick}
        >
            <img
                src={member.avatar}
                alt={member.name}
                className="h-full w-full object-cover"
                onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                }}
            />
            {/* Status dot */}
            <div
                className="absolute bottom-2.5 right-2.5 h-3.5 w-3.5 rounded-full"
                style={{
                    backgroundColor:
                        member.status === "active"
                            ? "#22c55e"
                            : member.status === "blocked"
                                ? "#ef4444"
                                : "#6b7280",
                    boxShadow:
                        member.status === "active"
                            ? "0 0 8px rgba(34,197,94,0.5)"
                            : member.status === "blocked"
                                ? "0 0 8px rgba(239,68,68,0.5)"
                                : "none",
                    border: "2px solid rgba(0,0,0,0.5)",
                }}
            />
        </div>
    );

    if (isBlocked) {
        return (
            <ElectroBorder color="red" intensity={0.8} borderRadius={20}>
                {card}
            </ElectroBorder>
        );
    }

    return card;
};

export default ImageRing3D;
