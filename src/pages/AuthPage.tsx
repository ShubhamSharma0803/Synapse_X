import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Ghost, Mail, Lock, User, ArrowRight, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";
import DecryptedText from "../components/hub/DecryptedText";
import ElectroBorder from "../components/hub/ElectroBorder";
import GlassSurface from "../components/hub/GlassSurface";

/* ═══════════════════════════════════════════════════════
   AUTH PAGE — Identity Gateway
   Dual-choice: Secure Login  ⬡  Ghost Bypass
   ═══════════════════════════════════════════════════════ */

type AuthTab = "signin" | "signup";

interface AuthPageProps {
    onGhostLaunch?: () => void;
}

const AuthPage = ({ onGhostLaunch }: AuthPageProps) => {
    const navigate = useNavigate();
    const enterGhostMode = useAuthStore((s) => s.enterGhostMode);
    const [tab, setTab] = useState<AuthTab>("signin");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const handleSecureLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Placeholder: In production, call supabase.auth.signIn/signUp
        const auth = useAuthStore.getState();
        auth.authenticate(name || email.split("@")[0] || "Operator");
        navigate("/");
    };

    const handleGhostBypass = () => {
        enterGhostMode();
        if (onGhostLaunch) {
            onGhostLaunch();
        } else {
            navigate("/");
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center" style={{ backgroundColor: "#000" }}>
            {/* Background grid */}
            <div
                className="pointer-events-none fixed inset-0 z-0"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px)
                    `,
                    backgroundSize: "60px 60px",
                }}
            />

            {/* Radial glow */}
            <div
                className="pointer-events-none fixed inset-0 z-0"
                style={{
                    background: "radial-gradient(ellipse at center, rgba(0,229,255,0.06) 0%, transparent 60%)",
                }}
            />

            <div className="relative z-10 w-full max-w-lg px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8"
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div
                            className="flex h-12 w-12 items-center justify-center rounded-2xl"
                            style={{
                                background: "linear-gradient(135deg, #00E5FF, #0066ff)",
                                boxShadow: "0 0 30px rgba(0,229,255,0.3)",
                            }}
                        >
                            <Zap className="h-6 w-6 text-black" />
                        </div>
                    </div>
                    <h1
                        className="text-3xl font-extrabold text-white mb-2"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Identity Gateway
                    </h1>
                    <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
                        Authenticate to persist your neural data — or bypass to explore
                    </p>
                </motion.div>

                {/* Auth Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                >
                    <GlassSurface className="p-6" delay={0}>
                        {/* Tab switcher */}
                        <div
                            className="flex rounded-xl p-1 mb-6"
                            style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                        >
                            {(["signin", "signup"] as AuthTab[]).map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setTab(t)}
                                    className="flex-1 rounded-lg py-2 text-xs font-bold uppercase tracking-wider transition-all"
                                    style={{
                                        backgroundColor: tab === t ? "rgba(0,229,255,0.1)" : "transparent",
                                        color: tab === t ? "#00E5FF" : "rgba(255,255,255,0.35)",
                                        border: tab === t ? "1px solid rgba(0,229,255,0.2)" : "1px solid transparent",
                                    }}
                                >
                                    {t === "signin" ? "Sign In" : "Sign Up"}
                                </button>
                            ))}
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSecureLogin} className="space-y-4">
                            <AnimatePresence mode="wait">
                                {tab === "signup" && (
                                    <motion.div
                                        key="name"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <InputField
                                            icon={<User className="h-4 w-4" />}
                                            placeholder="Display Name"
                                            value={name}
                                            onChange={setName}
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <InputField
                                icon={<Mail className="h-4 w-4" />}
                                placeholder="Email Address"
                                type="email"
                                value={email}
                                onChange={setEmail}
                            />
                            <InputField
                                icon={<Lock className="h-4 w-4" />}
                                placeholder="Password"
                                type="password"
                                value={password}
                                onChange={setPassword}
                            />

                            {/* Submit */}
                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-all"
                                style={{
                                    background: "linear-gradient(135deg, #00E5FF, #0066ff)",
                                    color: "#000",
                                    boxShadow: "0 0 20px rgba(0,229,255,0.2)",
                                }}
                            >
                                <Shield className="h-4 w-4" />
                                {tab === "signin" ? "Secure Login" : "Create Identity"}
                                <ArrowRight className="h-4 w-4" />
                            </motion.button>
                        </form>

                        {/* Divider */}
                        <div className="flex items-center gap-4 my-6">
                            <div className="flex-1 h-px" style={{ backgroundColor: "rgba(255,255,255,0.06)" }} />
                            <span className="text-[10px] uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.2)" }}>
                                or
                            </span>
                            <div className="flex-1 h-px" style={{ backgroundColor: "rgba(255,255,255,0.06)" }} />
                        </div>

                        {/* Ghost Bypass */}
                        <ElectroBorder color="rgb(100,116,139)" intensity={0.4} borderRadius={12}>
                            <motion.button
                                onClick={handleGhostBypass}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full flex items-center justify-center gap-3 rounded-xl py-3.5 transition-all"
                                style={{
                                    backgroundColor: "rgba(100,116,139,0.06)",
                                    border: "1px solid rgba(100,116,139,0.15)",
                                    cursor: "pointer",
                                }}
                            >
                                <Ghost className="h-4 w-4" style={{ color: "rgba(255,255,255,0.4)" }} />
                                <DecryptedText
                                    text="BYPASS: INITIALIZE GHOST LINK"
                                    speed={30}
                                    className="text-xs font-bold uppercase tracking-widest"
                                    style={{ color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}
                                />
                            </motion.button>
                        </ElectroBorder>

                        {/* Ghost description */}
                        <p
                            className="text-center mt-4 text-[10px]"
                            style={{ color: "rgba(255,255,255,0.2)", fontFamily: "monospace" }}
                        >
                            Ghost mode stores data locally. You can secure your session later.
                        </p>
                    </GlassSurface>
                </motion.div>
            </div>
        </div>
    );
};

/* ── Reusable input ── */
const InputField = ({
    icon,
    placeholder,
    type = "text",
    value,
    onChange,
}: {
    icon: React.ReactNode;
    placeholder: string;
    type?: string;
    value: string;
    onChange: (v: string) => void;
}) => (
    <div
        className="flex items-center gap-3 rounded-xl px-4 py-3 transition-all"
        style={{
            backgroundColor: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
        }}
    >
        <span style={{ color: "rgba(255,255,255,0.25)" }}>{icon}</span>
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/20"
            style={{ fontFamily: "var(--font-body)" }}
        />
    </div>
);

export default AuthPage;
