import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Twitter, ChevronLeft, ChevronRight } from "lucide-react";
import ProfileCard, { type TeamMember } from "./ProfileCard";

/* ══════════════════════════════════════
   TEAM DATA
   ══════════════════════════════════════ */

const team: TeamMember[] = [
    {
        name: "Shubham Sharma",
        role: "Full Stack Developer",
        initials: "SS",
        image: "/images/team/Team_Synapse/Shubham.jpeg",
        gradient: "linear-gradient(135deg, #f43f5e, #d946ef)",
        banner:
            "https://images.unsplash.com/photo-1771186936798-ba204c911381?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        commits: "1.2k",
        prs: "45",
        streak: "12d",
        socials: [
            { icon: <Github className="h-4 w-4" />, href: "#" },
            { icon: <Linkedin className="h-4 w-4" />, href: "#" },
            { icon: <Twitter className="h-4 w-4" />, href: "#" },
        ],
    },
    {
        name: "Sanyam Nandal",
        role: "Full Stack Developer",
        initials: "SN",
        image: "/images/team/Team_Synapse/Sanyam.jpeg",
        gradient: "linear-gradient(135deg, #f59e0b, #ef4444)",
        banner:
            "https://images.unsplash.com/photo-1771186936798-ba204c911381?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMDF8fHxlbnwwfHx8fHw%3D",
        commits: "800",
        prs: "30",
        streak: "8d",
        socials: [
            { icon: <Github className="h-4 w-4" />, href: "#" },
            { icon: <Twitter className="h-4 w-4" />, href: "#" },
            { icon: <Linkedin className="h-4 w-4" />, href: "#" },
        ],
    },
    {
        name: "Palak Varshney",
        role: "UI/UX Designer",
        initials: "PV",
        image: "/images/team/Team_Synapse/Palak.jpeg",
        gradient: "linear-gradient(135deg, #10b981, #14b8a6)",
        banner:
            "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070",
        commits: "2.1k",
        prs: "88",
        streak: "20d",
        socials: [
            { icon: <Github className="h-4 w-4" />, href: "#" },
            { icon: <Linkedin className="h-4 w-4" />, href: "#" },
            { icon: <Twitter className="h-4 w-4" />, href: "#" },
        ],
    },
    {
        name: "Rhythm Pratap",
        role: "Backend Developer",
        initials: "RP",
        image: "/images/team/Team_Synapse/Rhythm.jpeg",
        gradient: "linear-gradient(135deg, #a855f7, #d946ef)",
        banner:
            "https://images.unsplash.com/photo-1770341989953-f3efb336f7eb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMTB8fHxlbnwwfHx8fHw%3D",
        commits: "400",
        prs: "12",
        streak: "5d",
        socials: [
            { icon: <Twitter className="h-4 w-4" />, href: "#" },
            { icon: <Linkedin className="h-4 w-4" />, href: "#" },
            { icon: <Github className="h-4 w-4" />, href: "#" },
        ],
    },
    {
        name: "Aman Sahu",
        role: "AI Expert",
        initials: "AS",
        image: "/images/team/Team_Synapse/Aman.jpeg",
        gradient: "linear-gradient(135deg, #00f3ff, #0066ff)",
        banner:
            "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2071",
        commits: "1.5k",
        prs: "60",
        streak: "15d",
        socials: [
            { icon: <Github className="h-4 w-4" />, href: "#" },
            { icon: <Linkedin className="h-4 w-4" />, href: "#" },
            { icon: <Twitter className="h-4 w-4" />, href: "#" },
        ],
    },
];

/* ══════════════════════════════════════
   3D CAROUSEL
   ══════════════════════════════════════ */

const TeamCarousel = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const itemCount = team.length;
    const angleStep = 360 / itemCount;

    const startAutoplay = useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % itemCount);
        }, 5000);
    }, [itemCount]);

    useEffect(() => {
        startAutoplay();
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [startAutoplay]);

    const goTo = (i: number) => {
        setActiveIndex(i);
        startAutoplay();
    };
    const prev = () => goTo((activeIndex - 1 + itemCount) % itemCount);
    const next = () => goTo((activeIndex + 1) % itemCount);

    const getCardTransform = (index: number) => {
        const offset = (index - activeIndex + itemCount) % itemCount;
        const angle = offset * angleStep;
        const radian = (angle * Math.PI) / 180;
        const radius = 380;

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
            scale: isActive ? 1.1 : 0.9,
            opacity: isActive ? 1 : 0.4,
            filter: isActive
                ? "brightness(1.1) blur(0px) grayscale(0)"
                : "brightness(0.7) blur(4px) grayscale(0.3)",
            zIndex: computedZIndex,
        };
    };

    return (
        <section
            ref={sectionRef}
            id="team"
            className="relative flex min-h-screen flex-col justify-center overflow-hidden"
            style={{
                backgroundColor: "#000000",
                paddingTop: 120,
                paddingBottom: 80,
                zIndex: 10,
            }}
        >
            <div className="mx-auto w-full max-w-7xl px-6">
                {/* ── Section Header ── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-20 text-center"
                >
                    <h2
                        className="text-4xl font-bold text-white md:text-5xl"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Meet the{" "}
                        <span
                            style={{
                                background: "linear-gradient(90deg, #00E5FF, #0099CC)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            Team
                        </span>
                    </h2>
                    <p
                        className="mx-auto mt-4 max-w-lg text-base"
                        style={{
                            fontFamily: "var(--font-body)",
                            color: "rgba(255,255,255,0.4)",
                        }}
                    >
                        The brilliant minds building the future of project intelligence.
                    </p>
                </motion.div>

                {/* ── 3D Carousel ── */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="relative mx-auto flex items-center justify-center"
                    style={{ height: 480, perspective: "1500px" }}
                >
                    <div
                        className="relative h-full w-full"
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        <AnimatePresence>
                            {team.map((member, i) => {
                                const t = getCardTransform(i);
                                const isActive = i === activeIndex;

                                return (
                                    <motion.div
                                        key={member.name}
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

                    {/* ── Nav Arrows ── */}
                    <button
                        onClick={prev}
                        className="absolute left-2 top-1/2 z-[300] flex h-12 w-12 items-center justify-center rounded-full transition-all md:left-8"
                        style={{
                            transform: "translateY(-50%)",
                            border: "1px solid rgba(255,255,255,0.12)",
                            backgroundColor: "rgba(255,255,255,0.04)",
                            color: "rgba(255,255,255,0.5)",
                            backdropFilter: "blur(16px)",
                            WebkitBackdropFilter: "blur(16px)",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = "rgba(0,229,255,0.3)";
                            e.currentTarget.style.backgroundColor = "rgba(0,229,255,0.08)";
                            e.currentTarget.style.color = "#ffffff";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                            e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.04)";
                            e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                        }}
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                        onClick={next}
                        className="absolute right-2 top-1/2 z-[300] flex h-12 w-12 items-center justify-center rounded-full transition-all md:right-8"
                        style={{
                            transform: "translateY(-50%)",
                            border: "1px solid rgba(255,255,255,0.12)",
                            backgroundColor: "rgba(255,255,255,0.04)",
                            color: "rgba(255,255,255,0.5)",
                            backdropFilter: "blur(16px)",
                            WebkitBackdropFilter: "blur(16px)",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = "rgba(0,229,255,0.3)";
                            e.currentTarget.style.backgroundColor = "rgba(0,229,255,0.08)";
                            e.currentTarget.style.color = "#ffffff";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                            e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.04)";
                            e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                        }}
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>
                </motion.div>

                {/* ── Dot Indicators ── */}
                <div className="mt-12 flex items-center justify-center gap-2.5">
                    {team.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goTo(i)}
                            className="h-2 rounded-full transition-all duration-400"
                            style={{
                                width: i === activeIndex ? 36 : 8,
                                backgroundColor:
                                    i === activeIndex ? "#00E5FF" : "rgba(255,255,255,0.15)",
                                boxShadow:
                                    i === activeIndex
                                        ? "0 0 12px rgba(0,229,255,0.4)"
                                        : "none",
                            }}
                        />
                    ))}
                </div>

                {/* ── Active Member Label ── */}
                <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mt-8 text-center"
                >
                    <p
                        className="text-xl font-bold text-white"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        {team[activeIndex].name}
                    </p>
                    <p
                        className="mt-1 text-sm"
                        style={{ color: "#00E5FF", fontFamily: "var(--font-body)" }}
                    >
                        {team[activeIndex].role}
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default TeamCarousel;
