import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Send, X } from "lucide-react";
import { useNeuralStore } from "../stores/useNeuralStore";
import "./NeuralAssistant.css";

/* ══════════════════════════════════════
   WEB SPEECH API TYPES
   ══════════════════════════════════════ */

interface SpeechRecognitionEvent {
    results: { [index: number]: { [index: number]: { transcript: string } } };
}

interface SpeechRecognitionInstance {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    start: () => void;
    stop: () => void;
    onresult: ((e: SpeechRecognitionEvent) => void) | null;
    onerror: (() => void) | null;
    onend: (() => void) | null;
}

function getSpeechRecognition(): SpeechRecognitionInstance | null {
    const W = window as unknown as Record<string, unknown>;
    const Ctor = W.SpeechRecognition ?? W.webkitSpeechRecognition;
    if (!Ctor) return null;
    return new (Ctor as new () => SpeechRecognitionInstance)();
}

/* ══════════════════════════════════════
   AVATAR — The Neural Face
   ══════════════════════════════════════ */

const NeuralAvatar = ({
    onClick,
    isListening,
}: {
    onClick: () => void;
    isListening: boolean;
}) => {
    const eyeColor = isListening ? "#d946ef" : "#00f3ff";
    const eyeGlow = isListening
        ? "0 0 12px rgba(217,70,239,0.8), 0 0 30px rgba(217,70,239,0.3)"
        : "0 0 12px rgba(0,243,255,0.8), 0 0 30px rgba(0,243,255,0.3)";

    return (
        <motion.button
            onClick={onClick}
            className="neural-avatar-btn"
            style={{
                position: "fixed",
                bottom: 24,
                right: 24,
                zIndex: 9999,
                width: 72,
                height: 72,
                borderRadius: "50%",
                border: "none",
                padding: 0,
                cursor: "pointer",
                background: "transparent",
                outline: "none",
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
        >
            {/* Aura ring */}
            <motion.div
                style={{
                    position: "absolute",
                    inset: -6,
                    borderRadius: "50%",
                    border: "2px solid rgba(0,243,255,0.3)",
                    background: "conic-gradient(from 0deg, rgba(0,243,255,0.15), transparent, rgba(0,243,255,0.15))",
                }}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />

            {/* Second aura ring */}
            <motion.div
                style={{
                    position: "absolute",
                    inset: -12,
                    borderRadius: "50%",
                    border: "1px solid rgba(0,243,255,0.12)",
                }}
                animate={{ rotate: [360, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />

            {/* Body / Head */}
            <motion.div
                style={{
                    width: 72,
                    height: 72,
                    borderRadius: "50%",
                    background: "linear-gradient(145deg, #1a1a2e 0%, #0d0d1a 50%, #0a0a14 100%)",
                    border: `2px solid ${isListening ? "rgba(217,70,239,0.5)" : "rgba(0,243,255,0.3)"}`,
                    boxShadow: isListening
                        ? "0 0 30px rgba(217,70,239,0.3), inset 0 -2px 8px rgba(217,70,239,0.1)"
                        : "0 0 30px rgba(0,243,255,0.15), inset 0 -2px 8px rgba(0,243,255,0.05)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    overflow: "hidden",
                    transition: "border-color 0.3s, box-shadow 0.3s",
                }}
                animate={{
                    y: [0, -6, 0],
                    scale: [1, 1.04, 1],
                }}
                transition={{
                    y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                    scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                }}
            >
                {/* Face — two eyes + smile */}
                <svg width="40" height="32" viewBox="0 0 40 32" fill="none">
                    {/* Left eye */}
                    <motion.ellipse
                        cx="12" cy="12" rx="5" ry="6"
                        fill={eyeColor}
                        style={{ filter: `drop-shadow(${eyeGlow.split(",")[0]})` }}
                        animate={isListening ? { opacity: [1, 0.3, 1] } : { opacity: 1 }}
                        transition={isListening ? { duration: 0.5, repeat: Infinity } : {}}
                    />
                    {/* Right eye */}
                    <motion.ellipse
                        cx="28" cy="12" rx="5" ry="6"
                        fill={eyeColor}
                        style={{ filter: `drop-shadow(${eyeGlow.split(",")[0]})` }}
                        animate={isListening ? { opacity: [1, 0.3, 1] } : { opacity: 1 }}
                        transition={isListening ? { duration: 0.5, repeat: Infinity, delay: 0.1 } : {}}
                    />
                    {/* Eye highlights */}
                    <circle cx="14" cy="10" r="1.5" fill="rgba(255,255,255,0.7)" />
                    <circle cx="30" cy="10" r="1.5" fill="rgba(255,255,255,0.7)" />
                    {/* Smile */}
                    <path
                        d="M 12 24 Q 20 30 28 24"
                        stroke={eyeColor}
                        strokeWidth="2"
                        strokeLinecap="round"
                        fill="none"
                        opacity={0.7}
                    />
                </svg>

                {/* Chin reflection */}
                <div
                    style={{
                        position: "absolute",
                        bottom: 0,
                        left: "15%",
                        right: "15%",
                        height: "30%",
                        background: "linear-gradient(to top, rgba(0,243,255,0.05), transparent)",
                        borderRadius: "0 0 50% 50%",
                        pointerEvents: "none",
                    }}
                />
            </motion.div>
        </motion.button>
    );
};

/* ══════════════════════════════════════
   CHAT PANEL — Glass Interface
   ══════════════════════════════════════ */

const ChatPanel = () => {
    const { messages, isListening, close, send, setListening } = useNeuralStore();
    const [input, setInput] = useState("");
    const messagesEnd = useRef<HTMLDivElement>(null);
    const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

    /* Auto-scroll on new messages */
    useEffect(() => {
        messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    /* Cleanup speech recognition on unmount */
    useEffect(() => {
        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, []);

    const handleSend = useCallback(() => {
        const text = input.trim();
        if (!text) return;
        send(text);
        setInput("");
    }, [input, send]);

    const handleKey = useCallback(
        (e: React.KeyboardEvent) => {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
            }
        },
        [handleSend]
    );

    const toggleVoice = useCallback(() => {
        if (isListening) {
            recognitionRef.current?.stop();
            setListening(false);
            return;
        }

        const rec = getSpeechRecognition();
        if (!rec) {
            send("Voice input is not supported in this browser.");
            return;
        }

        rec.continuous = false;
        rec.interimResults = false;
        rec.lang = "en-US";

        rec.onresult = (e: SpeechRecognitionEvent) => {
            const transcript = e.results[0][0].transcript;
            if (transcript) {
                send(transcript);
            }
        };

        rec.onerror = () => setListening(false);
        rec.onend = () => setListening(false);

        recognitionRef.current = rec;
        rec.start();
        setListening(true);
    }, [isListening, send, setListening]);

    return (
        <motion.div
            className="neural-chat-panel"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
            {/* ── Header ── */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "14px 16px",
                    borderBottom: "1px solid rgba(0,243,255,0.12)",
                    flexShrink: 0,
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    {/* Mini face */}
                    <div
                        style={{
                            width: 28,
                            height: 28,
                            borderRadius: "50%",
                            background: "linear-gradient(145deg, #1a1a2e, #0d0d1a)",
                            border: "1.5px solid rgba(0,243,255,0.3)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <svg width="16" height="12" viewBox="0 0 40 32">
                            <ellipse cx="12" cy="12" rx="5" ry="6" fill="#00f3ff" />
                            <ellipse cx="28" cy="12" rx="5" ry="6" fill="#00f3ff" />
                        </svg>
                    </div>
                    <div>
                        <p
                            style={{
                                margin: 0,
                                fontSize: 12,
                                fontFamily: "var(--font-heading)",
                                color: "#00f3ff",
                                letterSpacing: "0.1em",
                                fontWeight: 700,
                            }}
                        >
                            NEURAL ASSISTANT
                        </p>
                        <p
                            style={{
                                margin: 0,
                                fontSize: 9,
                                color: isListening ? "#d946ef" : "rgba(0,243,255,0.5)",
                                letterSpacing: "0.15em",
                                fontFamily: "var(--font-heading)",
                                transition: "color 0.3s",
                            }}
                        >
                            {isListening ? "● LISTENING..." : "● ONLINE"}
                        </p>
                    </div>
                </div>
                <button
                    onClick={close}
                    style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "rgba(255,255,255,0.4)",
                        padding: 4,
                        display: "flex",
                    }}
                >
                    <X size={16} />
                </button>
            </div>

            {/* ── Messages ── */}
            <div className="neural-messages">
                {messages.map((msg) => (
                    <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                            maxWidth: "85%",
                        }}
                    >
                        <div
                            style={{
                                padding: "10px 14px",
                                borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                                fontSize: 13,
                                lineHeight: 1.5,
                                fontFamily: "var(--font-body)",
                                background:
                                    msg.role === "user"
                                        ? "linear-gradient(135deg, rgba(0,243,255,0.2), rgba(0,100,255,0.15))"
                                        : "rgba(255,255,255,0.06)",
                                color:
                                    msg.role === "user"
                                        ? "rgba(255,255,255,0.95)"
                                        : "rgba(255,255,255,0.8)",
                                border:
                                    msg.role === "user"
                                        ? "1px solid rgba(0,243,255,0.15)"
                                        : "1px solid rgba(255,255,255,0.06)",
                                wordBreak: "break-word",
                            }}
                        >
                            {msg.text}
                        </div>
                    </motion.div>
                ))}
                <div ref={messagesEnd} />
            </div>

            {/* ── Input Bar ── */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "10px 12px",
                    borderTop: "1px solid rgba(0,243,255,0.08)",
                    flexShrink: 0,
                }}
            >
                {/* Mic button */}
                <button
                    onClick={toggleVoice}
                    style={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: isListening
                            ? "rgba(217,70,239,0.2)"
                            : "rgba(255,255,255,0.06)",
                        color: isListening ? "#d946ef" : "rgba(255,255,255,0.5)",
                        transition: "all 0.3s",
                        animation: isListening ? "neural-mic-pulse 1.5s infinite" : "none",
                        flexShrink: 0,
                    }}
                >
                    <Mic size={16} />
                </button>

                {/* Text input */}
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKey}
                    placeholder="Ask me anything…"
                    style={{
                        flex: 1,
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: 12,
                        padding: "8px 14px",
                        fontSize: 13,
                        color: "rgba(255,255,255,0.9)",
                        fontFamily: "var(--font-body)",
                        outline: "none",
                        transition: "border-color 0.3s",
                    }}
                    onFocus={(e) =>
                        (e.currentTarget.style.borderColor = "rgba(0,243,255,0.3)")
                    }
                    onBlur={(e) =>
                        (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")
                    }
                />

                {/* Send button */}
                <button
                    onClick={handleSend}
                    disabled={!input.trim()}
                    style={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        border: "none",
                        cursor: input.trim() ? "pointer" : "default",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: input.trim()
                            ? "linear-gradient(135deg, #00f3ff, #0066ff)"
                            : "rgba(255,255,255,0.06)",
                        color: input.trim() ? "#000" : "rgba(255,255,255,0.3)",
                        transition: "all 0.3s",
                        flexShrink: 0,
                    }}
                >
                    <Send size={14} />
                </button>
            </div>
        </motion.div>
    );
};

/* ══════════════════════════════════════
   DOUBT BUBBLE
   ══════════════════════════════════════ */

const DoubtBubble = ({
    text,
    onAsk,
}: {
    text: string;
    onAsk: () => void;
}) => (
    <motion.div
        className="neural-doubt-bubble"
        initial={{ opacity: 0, y: 10, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        onClick={onAsk}
    >
        ⚡ NEURAL QUERY: &quot;{text.length > 28 ? text.slice(0, 28) + "…" : text}&quot;
    </motion.div>
);

/* ══════════════════════════════════════
   MAIN EXPORT — NEURAL ASSISTANT
   ══════════════════════════════════════ */

const NeuralAssistant = () => {
    const { isOpen, isListening, doubtQuery, toggle, open, send, clearDoubt } =
        useNeuralStore();

    /* ── Doubt Feature: listen for text selection ── */
    useEffect(() => {
        const handler = () => {
            const selection = window.getSelection();
            const text = selection?.toString().trim() || "";

            if (text.length > 2) {
                useNeuralStore.getState().setDoubt(text);
            } else {
                useNeuralStore.getState().clearDoubt();
            }
        };

        document.addEventListener("mouseup", handler);
        return () => document.removeEventListener("mouseup", handler);
    }, []);

    /* ── Handle doubt click ── */
    const handleDoubt = useCallback(() => {
        if (!doubtQuery) return;
        open();
        send(`Explain: ${doubtQuery}`);
        clearDoubt();
    }, [doubtQuery, open, send, clearDoubt]);

    return (
        <>
            {/* Avatar */}
            <NeuralAvatar onClick={toggle} isListening={isListening} />

            {/* Chat Panel */}
            <AnimatePresence>
                {isOpen && <ChatPanel key="neural-chat" />}
            </AnimatePresence>

            {/* Doubt Bubble */}
            <AnimatePresence>
                {doubtQuery && !isOpen && (
                    <DoubtBubble
                        key="neural-doubt"
                        text={doubtQuery}
                        onAsk={handleDoubt}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default NeuralAssistant;
