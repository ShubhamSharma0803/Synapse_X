import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════
   SCRAMBLED TEXT — Types in garbled then resolves
   Used for the terminal commit messages.
   ═══════════════════════════════════════════════════════ */

const CHARS = "░▒▓█▀▄▌▐─│┌┐└┘ABCDEF0123456789";

interface ScrambledTextProps {
    text: string;
    speed?: number;
    delay?: number;
    className?: string;
    style?: React.CSSProperties;
    onComplete?: () => void;
}

const ScrambledText = ({
    text,
    speed = 30,
    delay = 0,
    className = "",
    style,
    onComplete,
}: ScrambledTextProps) => {
    const [display, setDisplay] = useState("");
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            let resolved = 0;

            intervalRef.current = setInterval(() => {
                const next = text
                    .split("")
                    .map((char, i) => {
                        if (char === " ") return " ";
                        if (i < resolved) return char;
                        return CHARS[Math.floor(Math.random() * CHARS.length)];
                    })
                    .join("");

                setDisplay(next);
                resolved += 0.5;

                if (resolved >= text.length) {
                    if (intervalRef.current) clearInterval(intervalRef.current);
                    setDisplay(text);
                    onComplete?.();
                }
            }, speed);
        }, delay);

        return () => {
            clearTimeout(timeout);
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [text, speed, delay, onComplete]);

    return (
        <span className={className} style={{ fontFamily: "'Courier New', monospace", ...style }}>
            {display || "\u00A0"}
        </span>
    );
};

export default ScrambledText;
