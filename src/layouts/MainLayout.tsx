import type { ReactNode } from "react";
import Navbar from "../components/Navbar";

interface MainLayoutProps {
    children: ReactNode;
    onLaunchHub?: () => void;
}

const MainLayout = ({ children, onLaunchHub }: MainLayoutProps) => {
    return (
        <div className="relative min-h-screen overflow-hidden bg-black">
            {/* ── Neon Blue Static Vignette Glows ── */}
            <div
                className="pointer-events-none fixed top-0 left-0 z-0"
                style={{
                    width: 600,
                    height: 600,
                    transform: "translate(-33%, -33%)",
                    background:
                        "radial-gradient(circle, rgba(0,243,255,0.08) 0%, transparent 70%)",
                }}
            />
            <div
                className="pointer-events-none fixed top-0 right-0 z-0"
                style={{
                    width: 500,
                    height: 500,
                    transform: "translate(25%, -25%)",
                    background:
                        "radial-gradient(circle, rgba(0,243,255,0.06) 0%, transparent 70%)",
                }}
            />
            <div
                className="pointer-events-none fixed bottom-0 left-0 z-0"
                style={{
                    width: 500,
                    height: 500,
                    transform: "translate(-25%, 25%)",
                    background:
                        "radial-gradient(circle, rgba(0,243,255,0.05) 0%, transparent 70%)",
                }}
            />
            <div
                className="pointer-events-none fixed right-0 bottom-0 z-0"
                style={{
                    width: 700,
                    height: 700,
                    transform: "translate(33%, 33%)",
                    background:
                        "radial-gradient(circle, rgba(0,243,255,0.07) 0%, transparent 70%)",
                }}
            />
            <div
                className="pointer-events-none fixed top-1/2 left-1/2 z-0"
                style={{
                    width: 900,
                    height: 900,
                    transform: "translate(-50%, -50%)",
                    background:
                        "radial-gradient(circle, rgba(0,243,255,0.025) 0%, transparent 60%)",
                }}
            />

            {/* ── Navbar ── */}
            <Navbar onLaunchHub={onLaunchHub} />

            {/* ── Page Content ── */}
            <main className="relative z-10">{children}</main>
        </div>
    );
};

export default MainLayout;
