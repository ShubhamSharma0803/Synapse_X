import { useState, useMemo } from "react";
import { Search, Filter, Star, MapPin, Clock, Code2, ExternalLink } from "lucide-react";

// ─── ProfileCard ────────────────────────────────────────────────────────────
const techColors = {
    Python: "#3572A5",
    TensorFlow: "#FF6F00",
    PyTorch: "#EE4C2C",
    AWS: "#FF9900",
    Docker: "#2496ED",
    React: "#61DAFB",
    "Node.js": "#339933",
    TypeScript: "#3178C6",
    MongoDB: "#47A248",
    Azure: "#0078D4",
    Kubernetes: "#326CE5",
    PostgreSQL: "#4169E1",
    GraphQL: "#E10098",
    "React Native": "#61DAFB",
    "Vue.js": "#4FC08D",
    "Next.js": "#000000",
    Tailwind: "#06B6D4",
};

const ProfileCard = ({ name, title, handle, rating, experience, techStack, avatarUrl }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                position: "relative",
                background: hovered
                    ? "linear-gradient(145deg, #111111 0%, #0a0a0a 100%)"
                    : "linear-gradient(145deg, #0d0d0d 0%, #080808 100%)",
                border: hovered ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(255,255,255,0.06)",
                borderRadius: "20px",
                overflow: "hidden",
                transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
                transform: hovered ? "translateY(-6px)" : "translateY(0)",
                boxShadow: hovered
                    ? "0 24px 60px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05)"
                    : "0 4px 20px rgba(0,0,0,0.4)",
                cursor: "pointer",
                fontFamily: "'DM Mono', 'Courier New', monospace",
            }}
        >
            {/* Glow accent top */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: "20%",
                    right: "20%",
                    height: "1px",
                    background: hovered
                        ? "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)"
                        : "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
                    transition: "all 0.35s",
                }}
            />

            {/* Avatar */}
            <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
                <img
                    src={avatarUrl}
                    alt={name}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center top",
                        transition: "transform 0.5s ease",
                        transform: hovered ? "scale(1.05)" : "scale(1)",
                        filter: "grayscale(20%) brightness(0.85)",
                    }}
                />
                {/* Gradient overlay */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(to bottom, transparent 40%, #0d0d0d 100%)",
                    }}
                />
                {/* Rating badge */}
                <div
                    style={{
                        position: "absolute",
                        top: "12px",
                        right: "12px",
                        background: "rgba(0,0,0,0.7)",
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "8px",
                        padding: "4px 10px",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        fontSize: "11px",
                        fontWeight: "600",
                        color: "#fff",
                        letterSpacing: "0.05em",
                    }}
                >
                    <Star size={10} fill="#FFD700" stroke="#FFD700" />
                    {rating}
                </div>
            </div>

            {/* Content */}
            <div style={{ padding: "20px 22px 22px" }}>
                <div style={{ marginBottom: "14px" }}>
                    <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "700", color: "#fff", letterSpacing: "-0.01em", fontFamily: "'DM Sans', sans-serif" }}>
                        {name}
                    </h3>
                    <p style={{ margin: "3px 0 0", fontSize: "12px", color: "#888", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                        {title}
                    </p>
                </div>

                {/* Meta */}
                <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "11px", color: "#555" }}>
                        <Code2 size={11} />
                        <span>@{handle}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "11px", color: "#555" }}>
                        <Clock size={11} />
                        <span>{experience}</span>
                    </div>
                </div>

                {/* Tech Stack */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {techStack.map((tech) => (
                        <span
                            key={tech}
                            style={{
                                fontSize: "10px",
                                fontWeight: "600",
                                letterSpacing: "0.06em",
                                padding: "3px 8px",
                                borderRadius: "5px",
                                background: `${techColors[tech] || "#444"}18`,
                                border: `1px solid ${techColors[tech] || "#444"}40`,
                                color: techColors[tech] || "#aaa",
                            }}
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* CTA */}
                <button
                    style={{
                        marginTop: "18px",
                        width: "100%",
                        padding: "10px",
                        background: hovered ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "10px",
                        color: hovered ? "#fff" : "#666",
                        fontSize: "11px",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        cursor: "pointer",
                        transition: "all 0.25s",
                        fontFamily: "inherit",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                    }}
                >
                    <ExternalLink size={11} />
                    View Profile
                </button>
            </div>
        </div>
    );
};

// ─── DevCommunity ────────────────────────────────────────────────────────────
const developers = [
    { id: 1, name: "Sarah Chen", title: "AI/ML Engineer", handle: "sarahchen", rating: 4.9, experience: "6 years", techStack: ["Python", "TensorFlow", "PyTorch", "AWS", "Docker"], avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop" },
    { id: 2, name: "Marcus Rodriguez", title: "Full Stack Developer", handle: "marcusdev", rating: 4.8, experience: "5 years", techStack: ["React", "Node.js", "TypeScript", "MongoDB", "Docker"], avatarUrl: "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?q=80&w=987&auto=format&fit=crop" },
    { id: 3, name: "Jordan Lee", title: "Cloud Architect", handle: "priyacloud", rating: 4.8, experience: "7 years", techStack: ["AWS", "Azure", "Kubernetes", "Python", "Docker"], avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=3087&auto=format&fit=crop" },
    { id: 4, name: "Alex Thompson", title: "DevOps Engineer", handle: "alexdevops", rating: 4.7, experience: "4 years", techStack: ["Docker", "Kubernetes", "AWS", "Python", "TypeScript"], avatarUrl: "https://images.unsplash.com/photo-1492447273231-0f8fecec1e3a?q=80&w=987&auto=format&fit=crop" },
    { id: 5, name: "De Paul", title: "Frontend Developer", handle: "emilyzhang", rating: 4.6, experience: "4 years", techStack: ["React", "Vue.js", "TypeScript", "Next.js", "Tailwind"], avatarUrl: "https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?q=80&w=2070&auto=format&fit=crop" },
    { id: 6, name: "Emily Zhang", title: "Backend Developer", handle: "jordanlee", rating: 4.6, experience: "5 years", techStack: ["Node.js", "PostgreSQL", "GraphQL", "TypeScript", "Docker"], avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=988&auto=format&fit=crop" },
    { id: 7, name: "David Kim", title: "Mobile Developer", handle: "davidkim", rating: 4.5, experience: "3 years", techStack: ["React Native", "TypeScript", "Node.js", "MongoDB", "AWS"], avatarUrl: "https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?q=80&w=987&auto=format&fit=crop" },
    { id: 8, name: "Nina Patel", title: "Data Engineer", handle: "ninapatel", rating: 4.5, experience: "4 years", techStack: ["Python", "PostgreSQL", "AWS", "Docker", "MongoDB"], avatarUrl: "https://images.unsplash.com/photo-1485206412256-701ccc5b93ca?q=80&w=1494&auto=format&fit=crop" },
];

export default function DevCommunity() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTech, setSelectedTech] = useState("All");

    const allTechnologies = useMemo(() => {
        const s = new Set();
        developers.forEach((d) => d.techStack.forEach((t) => s.add(t)));
        return ["All", ...Array.from(s).sort()];
    }, []);

    const filtered = useMemo(() =>
        developers.filter((d) => {
            const q = searchQuery.toLowerCase();
            const matchSearch = d.name.toLowerCase().includes(q) || d.title.toLowerCase().includes(q) || d.handle.toLowerCase().includes(q);
            const matchTech = selectedTech === "All" || d.techStack.includes(selectedTech);
            return matchSearch && matchTech;
        }),
        [searchQuery, selectedTech]
    );

    return (
        <div style={{ minHeight: "100vh", background: "#000", color: "#e5e5e5", fontFamily: "'DM Sans', sans-serif" }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;900&family=DM+Mono:wght@400;600&display=swap');
        * { box-sizing: border-box; }
        ::selection { background: #fff; color: #000; }
        input, select { font-family: 'DM Mono', monospace; }
        input:focus, select:focus { outline: none; }
        ::-webkit-scrollbar { width: 4px; } 
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: #222; border-radius: 2px; }
      `}</style>

            {/* Header */}
            <header style={{ position: "relative", borderBottom: "1px solid rgba(255,255,255,0.07)", overflow: "hidden" }}>
                {/* Grid bg */}
                <div style={{
                    position: "absolute", inset: 0, opacity: 0.03,
                    backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }} />
                {/* Radial glow */}
                <div style={{
                    position: "absolute", inset: 0,
                    background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(255,255,255,0.05) 0%, transparent 70%)",
                    pointerEvents: "none",
                }} />

                <div style={{ position: "relative", maxWidth: "1400px", margin: "0 auto", padding: "80px 32px 60px" }}>
                    <div style={{ textAlign: "center", marginBottom: "48px" }}>
                        {/* Eyebrow */}
                        <div style={{
                            display: "inline-flex", alignItems: "center", gap: "8px",
                            fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase",
                            color: "#555", marginBottom: "24px",
                            border: "1px solid rgba(255,255,255,0.08)",
                            borderRadius: "100px", padding: "6px 16px",
                        }}>
                            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10b981", boxShadow: "0 0 8px #10b981", display: "inline-block" }} />
                            {filtered.length} Engineers Online
                        </div>

                        <h1 style={{
                            margin: 0, fontSize: "clamp(42px, 8vw, 80px)", fontWeight: 900,
                            letterSpacing: "-0.04em", lineHeight: 0.95, color: "#fff",
                            fontFamily: "'DM Sans', sans-serif",
                        }}>
                            Developer<br />
                            <span style={{ color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.3)" }}>Community</span>
                        </h1>

                        <p style={{ margin: "20px 0 0", fontSize: "15px", color: "#555", letterSpacing: "0.02em" }}>
                            Elite hub for global engineering talent
                        </p>
                    </div>

                    {/* Search + Filter */}
                    <div style={{ maxWidth: "680px", margin: "0 auto", display: "flex", gap: "12px", flexWrap: "wrap" }}>
                        <div style={{ flex: 1, minWidth: "220px", position: "relative" }}>
                            <Search size={15} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#555", pointerEvents: "none" }} />
                            <input
                                type="text"
                                placeholder="Search talent..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{
                                    width: "100%", padding: "14px 16px 14px 44px",
                                    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)",
                                    borderRadius: "12px", color: "#fff", fontSize: "13px",
                                    transition: "border-color 0.2s",
                                }}
                                onFocus={(e) => e.target.style.borderColor = "rgba(255,255,255,0.25)"}
                                onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.09)"}
                            />
                        </div>

                        <div style={{ position: "relative" }}>
                            <Filter size={14} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#555", pointerEvents: "none" }} />
                            <select
                                value={selectedTech}
                                onChange={(e) => setSelectedTech(e.target.value)}
                                style={{
                                    padding: "14px 40px 14px 40px",
                                    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)",
                                    borderRadius: "12px", color: "#fff", fontSize: "13px",
                                    cursor: "pointer", appearance: "none", minWidth: "180px",
                                }}
                            >
                                {allTechnologies.map((t) => (
                                    <option key={t} value={t} style={{ background: "#111" }}>
                                        {t === "All" ? "All Stack" : t}
                                    </option>
                                ))}
                            </select>
                            <svg style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#555" }} width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                        </div>
                    </div>
                </div>
            </header>

            {/* Grid */}
            <main style={{ maxWidth: "1400px", margin: "0 auto", padding: "60px 32px" }}>
                {filtered.length > 0 ? (
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                        gap: "24px",
                    }}>
                        {filtered.map((dev) => <ProfileCard key={dev.id} {...dev} />)}
                    </div>
                ) : (
                    <div style={{
                        textAlign: "center", padding: "80px 32px",
                        border: "1px dashed rgba(255,255,255,0.08)", borderRadius: "24px",
                    }}>
                        <p style={{ color: "#444", fontSize: "14px" }}>No matches found. Try broadening your search.</p>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer style={{ borderTop: "1px solid rgba(255,255,255,0.04)", padding: "32px", textAlign: "center" }}>
                <p style={{ color: "#333", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", margin: 0 }}>
                    © 2026 Developer Community · Black Edition
                </p>
            </footer>
        </div>
    );
}
