import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import NeuralPortal from "./NeuralPortal";
import { useProjectStore } from "../stores/useProjectStore";

const navLinks = [
    { label: "Features", href: "#features" },
    { label: "Team", href: "#team" },
    { label: "Hub", href: "/community" },
];

interface NavbarProps {
    onLaunchHub?: () => void;
}

const Navbar = ({ onLaunchHub }: NavbarProps) => {
    const [visible, setVisible] = useState(true);
    const prevScrollY = useRef(0);
    const location = useLocation();
    const isHome = location.pathname === "/";

    const hasAlerts = useProjectStore((s) => s.hasAlerts);
    const isProjectActive = useProjectStore((s) => s.isProjectActive);

    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY;

            if (currentY <= 60) {
                setVisible(true);
            } else if (currentY < prevScrollY.current) {
                setVisible(true);
            } else if (currentY > prevScrollY.current) {
                setVisible(false);
            }

            prevScrollY.current = currentY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className="fixed left-1/2 z-[100]"
            style={{
                top: 24,
                transform: `translateX(-50%) translateY(${visible ? "0%" : "-150%"})`,
                transition: "transform 300ms ease-in-out",
            }}
        >
            <div
                className="flex items-center gap-6 rounded-full px-5 py-2.5"
                style={{
                    backgroundColor: "rgba(0,0,0,0.4)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    boxShadow: "0 4px 30px rgba(0,0,0,0.3)",
                }}
            >
                {/* Logo */}
                <Link
                    to="/"
                    className="flex items-center gap-1.5 text-sm font-bold tracking-tight text-white transition-colors"
                    style={{ fontFamily: "var(--font-heading)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#00E5FF")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#ffffff")}
                >
                    <Zap className="h-4 w-4" style={{ color: "#00E5FF" }} strokeWidth={2.5} />
                    <span>Synapse</span>
                </Link>

                {/* Separator */}
                <div
                    className="h-4"
                    style={{ width: 1, backgroundColor: "rgba(255,255,255,0.1)" }}
                />

                {/* Links — only show on homepage */}
                {isHome && (
                    <ul className="flex items-center gap-5">
                        {navLinks.map((link) => (
                            <li key={link.label}>
                                <a
                                    href={link.href}
                                    className="group relative text-xs font-medium transition-colors"
                                    style={{
                                        fontFamily: "var(--font-body)",
                                        color: "rgba(255,255,255,0.55)",
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                                    onMouseLeave={(e) =>
                                        (e.currentTarget.style.color = "rgba(255,255,255,0.55)")
                                    }
                                >
                                    {link.label}
                                    <span
                                        className="absolute -bottom-1 left-0 h-[1.5px] w-0 rounded-full transition-all duration-300 group-hover:w-full"
                                        style={{ backgroundColor: "#00E5FF" }}
                                    />
                                </a>
                            </li>
                        ))}
                    </ul>
                )}

                {/* Neural Portal Orb */}
                <NeuralPortal
                    hasAlerts={hasAlerts}
                    isProjectActive={isProjectActive}
                    onLaunch={() => onLaunchHub?.()}
                />

                {/* CTA */}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                        to="/create-project"
                        className="ml-1 inline-block rounded-full px-4 py-1.5 text-xs font-semibold transition-all"
                        style={{
                            fontFamily: "var(--font-body)",
                            color: "#00E5FF",
                            border: "1px solid rgba(0,229,255,0.25)",
                            backgroundColor: "rgba(0,229,255,0.08)",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "rgba(0,229,255,0.15)";
                            e.currentTarget.style.boxShadow = "0 0 16px rgba(0,229,255,0.2)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "rgba(0,229,255,0.08)";
                            e.currentTarget.style.boxShadow = "none";
                        }}
                    >
                        Get Started
                    </Link>
                </motion.div>
            </div>
        </nav>
    );
};

export default Navbar;
