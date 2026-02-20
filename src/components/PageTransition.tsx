import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface Props {
    children: ReactNode;
}

const PageTransition = ({ children }: Props) => (
    <>
        {children}

        {/* ── Shutter panels that slide in then out ── */}
        <motion.div
            className="fixed inset-0 z-[9999] pointer-events-none"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 0 }}
            exit={{ scaleY: 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
                transformOrigin: "bottom",
                backgroundColor: "#000",
            }}
        />
        <motion.div
            className="fixed inset-0 z-[9999] pointer-events-none"
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
                transformOrigin: "top",
                backgroundColor: "#000",
            }}
        />

        {/* Cyan scan line accent */}
        <motion.div
            className="fixed left-0 right-0 z-[10000] pointer-events-none"
            style={{
                height: 2,
                background: "linear-gradient(90deg, transparent, #00f3ff, transparent)",
                top: "50%",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
        />
    </>
);

export default PageTransition;
