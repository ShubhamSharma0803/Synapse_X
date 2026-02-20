import { useState, useCallback, useRef } from "react";

/* ═══════════════════════════════════════════════════════
   DECRYPTED TEXT — Scrambles on hover → reveals target
   ═══════════════════════════════════════════════════════ */

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

interface DecryptedTextProps {
    /** Text displayed normally */
    text: string;
    /** Text revealed after scramble resolves */
    revealText?: string;
    speed?: number;
    className?: string;
    style?: React.CSSProperties;
}

const DecryptedText = ({
    text,
    revealText,
    speed = 40,
    className = "",
    style,
}: DecryptedTextProps) => {
    const [display, setDisplay] = useState(text);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const target = revealText ?? text;

    const scramble = useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);

        let iteration = 0;
        const maxLen = Math.max(text.length, target.length);

        intervalRef.current = setInterval(() => {
            const next = target
                .split("")
                .map((char, i) => {
                    if (i < iteration) return char;
                    return CHARS[Math.floor(Math.random() * CHARS.length)];
                })
                .join("");

            setDisplay(next.slice(0, maxLen));
            iteration += 1 / 2;

            if (iteration >= maxLen) {
                if (intervalRef.current) clearInterval(intervalRef.current);
                setDisplay(target);
            }
        }, speed);
    }, [text, target, speed]);

    const reset = useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplay(text);
    }, [text]);

    return (
        <span
            className={className}
            style={{ fontFamily: "var(--font-heading)", ...style }}
            onMouseEnter={scramble}
            onMouseLeave={reset}
        >
            {display}
        </span>
    );
};

export default DecryptedText;
