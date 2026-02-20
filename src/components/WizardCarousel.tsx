import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Users } from "lucide-react";
import ProfileCard, { type TeamMember, DEFAULT_SOCIALS } from "./ProfileCard";
import { useProjectStore } from "../stores/useProjectStore";

/* ══════════════════════════════════════
   WIZARD CAROUSEL
   Reads from useProjectStore.teamMembers
   and renders a scaled-down 3D carousel
   in the wizard right-column preview.
   ══════════════════════════════════════ */

const BANNER_POOL = [
    "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2071",
    "https://images.unsplash.com/photo-1506318137071-a8e063b4b477?q=80&w=2070",
    "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029",
    "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070",
];

/** Map role strings → carousel badge */
const roleToBadge = (role: string): "LEAD" | "MEMBER" => {
    const leadRoles = ["Admin", "Developer"];
    return leadRoles.includes(role) ? "LEAD" : "MEMBER";
};

/** Map role strings → display label */
const roleToLabel = (role: string): string => {
    const map: Record<string, string> = {
        Admin: "Project Lead",
        Developer: "Developer",
        Designer: "Designer",
        Tester: "QA Tester",
        Viewer: "Viewer",
    };
    return map[role] || role;
};

const WizardCarousel = () => {
    const teamMembers = useProjectStore((s) => s.teamMembers);
    const [activeIndex, setActiveIndex] = useState(0);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    /* Convert store members → TeamMember cards */
    const cards: TeamMember[] = teamMembers
        .filter((m) => m.name.trim() !== "")
        .map((m, i) => ({
            name: m.name || m.github_username || "Unnamed",
            role: roleToLabel(m.role),
            initials: m.initials || "?",
            image: m.avatar || undefined,
            gradient: m.gradient,
            banner: BANNER_POOL[i % BANNER_POOL.length],
            commits: "—",
            prs: "—",
            streak: "—",
            badge: roleToBadge(m.role),
            socials: DEFAULT_SOCIALS,
        }));

    const itemCount = cards.length;
    const angleStep = itemCount > 0 ? 360 / itemCount : 0;

    const startAutoplay = useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (itemCount === 0) return;
        intervalRef.current = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % itemCount);
        }, 4000);
    }, [itemCount]);

    useEffect(() => {
        startAutoplay();
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [startAutoplay]);

    useEffect(() => {
        if (activeIndex >= itemCount && itemCount > 0) {
            setActiveIndex(itemCount - 1);
        }
    }, [itemCount, activeIndex]);

    const goTo = (i: number) => {
        setActiveIndex(i);
        startAutoplay();
    };
    const prev = () => {
        if (itemCount === 0) return;
        goTo((activeIndex - 1 + itemCount) % itemCount);
    };
    const next = () => {
        if (itemCount === 0) return;
        goTo((activeIndex + 1) % itemCount);
    };

    const getCardTransform = (index: number) => {
        const offset = (index - activeIndex + itemCount) % itemCount;
        const angle = offset * angleStep;
        const radian = (angle * Math.PI) / 180;
        const radius = 300;

        const x = Math.sin(radian) * radius;
        const z = Math.cos(radian) * radius - radius;
        const rotY = -angle;
        const isActive = index === activeIndex;

        const normalizedZ = (z + radius) / (2 * radius);
        const computedZIndex = isActive ? 200 : Math.round(normalizedZ * 100);

        return {
            x,
            z,
            rotateY: rotY,
            scale: isActive ? 1 : 0.85,
            opacity: isActive ? 1 : 0.35,
            filter: isActive
                ? "brightness(1.1) blur(0px) grayscale(0)"
                : "brightness(0.6) blur(3px) grayscale(0.3)",
            zIndex: computedZIndex,
        };
    };

    /* ── Empty state ── */
    if (itemCount === 0) {
        return (
            <div className="flex h-full flex-col items-center justify-center gap-6">
                <motion.div
                    animate={{
                        scale: [1, 1.08, 1],
                        boxShadow: [
                            "0 0 30px rgba(0,243,255,0.08)",
                            "0 0 60px rgba(0,243,255,0.15)",
                            "0 0 30px rgba(0,243,255,0.08)",
                        ],
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="flex h-32 w-32 items-center justify-center rounded-full"
                    style={{
                        border: "1px solid rgba(255,255,255,0.1)",
                        backgroundColor: "rgba(255,255,255,0.03)",
                    }}
                >
                    <Users className="h-12 w-12" style={{ color: "rgba(255,255,255,0.15)" }} />
                </motion.div>
                <div className="text-center">
                    <p
                        className="text-sm font-medium"
                        style={{ color: "rgba(255,255,255,0.3)", fontFamily: "monospace" }}
                    >
                        {"// awaiting_team_members"}
                    </p>
                    <p className="mt-1 text-xs" style={{ color: "rgba(255,255,255,0.15)" }}>
                        Add members in Step 4 to see them here
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-full flex-col items-center justify-center">
            {/* 3D Stage */}
            <div
                className="relative flex items-center justify-center"
                style={{
                    height: 400,
                    width: "100%",
                    perspective: "1200px",
                    transform: "scale(0.8)",
                }}
            >
                <div
                    className="relative h-full w-full"
                    style={{ transformStyle: "preserve-3d" }}
                >
                    <AnimatePresence>
                        {cards.map((member, i) => {
                            const t = getCardTransform(i);
                            const isActive = i === activeIndex;
                            return (
                                <motion.div
                                    key={member.name + i}
                                    className="absolute left-1/2 top-1/2 cursor-pointer"
                                    animate={{
                                        x: t.x - 140,
                                        y: -190,
                                        z: t.z,
                                        rotateY: t.rotateY,
                                        scale: t.scale,
                                        opacity: t.opacity,
                                        filter: t.filter,
                                    }}
                                    transition={{
                                        duration: 0.8,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    style={{
                                        zIndex: t.zIndex,
                                        transformStyle: "preserve-3d",
                                    }}
                                    onClick={() => goTo(i)}
                                >
                                    <ProfileCard member={member} isActive={isActive} />
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                {/* Nav Arrows */}
                {itemCount > 1 && (
                    <>
                        <button
                            onClick={prev}
                            className="absolute left-2 top-1/2 z-[300] flex h-10 w-10 items-center justify-center rounded-full transition-all"
                            style={{
                                transform: "translateY(-50%)",
                                border: "1px solid rgba(255,255,255,0.12)",
                                backgroundColor: "rgba(255,255,255,0.04)",
                                color: "rgba(255,255,255,0.5)",
                                backdropFilter: "blur(16px)",
                            }}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button
                            onClick={next}
                            className="absolute right-2 top-1/2 z-[300] flex h-10 w-10 items-center justify-center rounded-full transition-all"
                            style={{
                                transform: "translateY(-50%)",
                                border: "1px solid rgba(255,255,255,0.12)",
                                backgroundColor: "rgba(255,255,255,0.04)",
                                color: "rgba(255,255,255,0.5)",
                                backdropFilter: "blur(16px)",
                            }}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </>
                )}
            </div>

            {/* Active member label */}
            {cards[activeIndex] && (
                <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mt-4 text-center"
                >
                    <p
                        className="text-base font-bold text-white"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        {cards[activeIndex].name}
                    </p>
                    <p
                        className="mt-0.5 text-xs"
                        style={{ color: "#00E5FF", fontFamily: "var(--font-body)" }}
                    >
                        {cards[activeIndex].role}
                    </p>
                </motion.div>
            )}

            {/* Dots */}
            {itemCount > 1 && (
                <div className="mt-4 flex items-center justify-center gap-2">
                    {cards.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goTo(i)}
                            className="h-1.5 rounded-full transition-all duration-300"
                            style={{
                                width: i === activeIndex ? 28 : 6,
                                backgroundColor:
                                    i === activeIndex ? "#00E5FF" : "rgba(255,255,255,0.15)",
                                boxShadow:
                                    i === activeIndex ? "0 0 10px rgba(0,229,255,0.4)" : "none",
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default WizardCarousel;
