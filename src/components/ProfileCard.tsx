import { Github, Linkedin, Twitter } from "lucide-react";

/* ══════════════════════════════════════
   SHARED TYPES & CONSTANTS
   ══════════════════════════════════════ */

export interface TeamMember {
    name: string;
    role: string;
    initials: string;
    image?: string;
    gradient: string;
    banner: string;
    commits: string;
    prs: string;
    streak: string;
    badge?: "LEAD" | "MEMBER";
    socials: { icon: React.ReactNode; href: string }[];
}

export const CARD_BG = "#0d0d12";

export const DEFAULT_SOCIALS = [
    { icon: <Github className="h-4 w-4" />, href: "#" },
    { icon: <Linkedin className="h-4 w-4" />, href: "#" },
    { icon: <Twitter className="h-4 w-4" />, href: "#" },
];

/* ══════════════════════════════════════
   PROFILE CARD COMPONENT
   ══════════════════════════════════════ */

const ProfileCard = ({
    member,
    isActive,
}: {
    member: TeamMember;
    isActive: boolean;
}) => (
    <div
        className="relative flex w-[280px] flex-col"
        style={{
            aspectRatio: "3 / 4",
            borderRadius: 40,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.1)",
            backgroundColor: CARD_BG,
            transition: "box-shadow 0.5s ease",
            boxShadow: isActive
                ? "0 0 40px rgba(0,229,255,0.15), 0 20px 60px rgba(0,0,0,0.5)"
                : "0 10px 40px rgba(0,0,0,0.3)",
        }}
    >
        {/* ═══ BANNER ═══ */}
        <div
            className="relative flex-shrink-0"
            style={{
                height: "35%",
                backgroundImage: `url(${member.banner})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%)",
                }}
            />

            {/* Follow button */}
            <div
                className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full"
                style={{
                    backgroundColor: "rgba(255,255,255,0.12)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                }}
            >
                <span className="text-base font-bold text-white leading-none">+</span>
            </div>

            {/* Role badge — top-left */}
            {member.badge && (
                <div
                    className="absolute top-4 left-4 z-10 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
                    style={{
                        backgroundColor:
                            member.badge === "LEAD"
                                ? "rgba(0,229,255,0.2)"
                                : "rgba(148,163,184,0.2)",
                        color: member.badge === "LEAD" ? "#00E5FF" : "#94a3b8",
                        border: `1px solid ${member.badge === "LEAD"
                                ? "rgba(0,229,255,0.3)"
                                : "rgba(148,163,184,0.3)"
                            }`,
                        backdropFilter: "blur(8px)",
                    }}
                >
                    {member.badge}
                </div>
            )}
        </div>

        {/* ═══ BODY ═══ */}
        <div className="relative flex flex-1 flex-col items-center px-5 pb-5">
            {/* Avatar */}
            <div
                className="relative flex items-center justify-center rounded-full overflow-hidden"
                style={{
                    width: 110,
                    height: 110,
                    marginTop: -55,
                    border: `4px solid ${CARD_BG}`,
                    boxShadow:
                        "0 0 15px rgba(0,255,255,0.5), 0 0 30px rgba(0,255,255,0.12)",
                    background: member.gradient,
                    zIndex: 5,
                }}
            >
                {member.image ? (
                    <img
                        src={member.image}
                        alt={member.name}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <span
                        className="text-xl font-bold"
                        style={{
                            color: "rgba(255,255,255,0.95)",
                            fontFamily: "var(--font-heading)",
                        }}
                    >
                        {member.initials}
                    </span>
                )}
            </div>

            {/* Name & Role */}
            <div className="mt-3 text-center">
                <h4
                    className="text-lg font-bold text-white"
                    style={{ fontFamily: "var(--font-heading)" }}
                >
                    {member.name}
                </h4>
                <p
                    className="mt-0.5 text-xs"
                    style={{ color: "#94a3b8", fontFamily: "var(--font-body)" }}
                >
                    {member.role}
                </p>
            </div>

            {/* Stats Pill */}
            <div
                className="mt-4 flex w-full items-center justify-between rounded-2xl px-4 py-3"
                style={{
                    backgroundColor: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.06)",
                }}
            >
                {[
                    { value: member.commits, label: "Commits" },
                    { value: member.prs, label: "PRs" },
                    { value: member.streak, label: "Streak" },
                ].map((stat) => (
                    <div key={stat.label} className="flex flex-col items-center">
                        <span
                            className="text-base font-bold"
                            style={{ color: "#00E5FF", fontFamily: "var(--font-heading)" }}
                        >
                            {stat.value}
                        </span>
                        <span
                            className="text-[9px] uppercase tracking-wider"
                            style={{ color: "#94a3b8" }}
                        >
                            {stat.label}
                        </span>
                    </div>
                ))}
            </div>

            {/* Social Footer */}
            <div
                className="mt-auto flex w-full items-center justify-center gap-6 pt-4"
                style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
            >
                {member.socials.map((social, i) => (
                    <a
                        key={i}
                        href={social.href}
                        className="transition-colors"
                        style={{ color: "rgba(255,255,255,0.3)" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#00E5FF")}
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.color = "rgba(255,255,255,0.3)")
                        }
                    >
                        {social.icon}
                    </a>
                ))}
            </div>
        </div>
    </div>
);

export default ProfileCard;
