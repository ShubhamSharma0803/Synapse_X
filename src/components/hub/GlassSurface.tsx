import { motion } from "framer-motion";

/* ═══════════════════════════════════════════════════════
   GLASS SURFACE — Reusable glassmorphic Bento tile
   ═══════════════════════════════════════════════════════ */

interface GlassSurfaceProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    /** Framer Motion layout delay */
    delay?: number;
    onClick?: () => void;
}

const GlassSurface = ({
    children,
    className = "",
    style,
    delay = 0,
    onClick,
}: GlassSurfaceProps) => (
    <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
        className={`relative overflow-hidden rounded-2xl ${className}`}
        style={{
            backgroundColor: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            boxShadow:
                "0 0 0 1px rgba(255,255,255,0.02) inset, 0 8px 40px rgba(0,0,0,0.3)",
            ...style,
        }}
        onClick={onClick}
    >
        {/* Top highlight */}
        <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{
                background:
                    "linear-gradient(90deg, transparent, rgba(0,229,255,0.15), transparent)",
            }}
        />
        {children}
    </motion.div>
);

export default GlassSurface;
