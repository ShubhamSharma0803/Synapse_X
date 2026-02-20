import { useEffect, useState, useCallback } from "react";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import CreateProject from "./pages/CreateProject";
import DevelopersHub from "./pages/DevelopersHub";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
// @ts-ignore
import DevCommunity from "./pages/DevCommunity";
import PageTransition from "./components/PageTransition";
import TunnelTransition from "./components/TunnelTransition";
import CommandStrip from "./components/CommandStrip";
import SystemStatus from "./components/SystemStatus";
import NeuralAssistant from "./components/NeuralAssistant";
import { useAuthStore } from "./stores/useAuthStore";


function AnimatedRoutes() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHub = location.pathname === "/developers-hub";
  const isAuth = location.pathname === "/auth";

  const [tunnelActive, setTunnelActive] = useState(false);
  const [tunnelTarget, setTunnelTarget] = useState<string | null>(null);
  const [tunnelGlitch, setTunnelGlitch] = useState(false);

  /* Hydrate ghost session on boot */
  useEffect(() => {
    useAuthStore.getState().hydrate();
  }, []);

  /* ── Portal launch (from Navbar orb) ── */
  const launchHub = useCallback(() => {
    setTunnelGlitch(false);
    setTunnelTarget("/developers-hub");
    setTunnelActive(true);
  }, []);

  /* ── Ghost launch (from Hero or Auth bypass) ── */
  const launchGhost = useCallback(() => {
    setTunnelGlitch(true);
    setTunnelTarget("/");
    setTunnelActive(true);
  }, []);

  /* ── Profile launch (from Navbar avatar) ── */
  const launchProfile = useCallback(() => {
    setTunnelGlitch(false);
    setTunnelTarget("/profile");
    setTunnelActive(true);
  }, []);

  /* ── Navigate at blur peak ── */
  const onTunnelMidpoint = useCallback(() => {
    if (tunnelTarget) navigate(tunnelTarget);
  }, [navigate, tunnelTarget]);

  /* ── Cleanup after arrival ── */
  const onTunnelComplete = useCallback(() => {
    setTunnelActive(false);
    setTunnelTarget(null);
    setTunnelGlitch(false);
  }, []);

  /* ── Global 'H' keyboard shortcut ── */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (e.key === "h" || e.key === "H") {
        if (!isHub && !isAuth && !tunnelActive) {
          launchHub();
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isHub, isAuth, tunnelActive, launchHub]);

  return (
    <>
      {/* ── Tunnel warp overlay ── */}
      <TunnelTransition
        active={tunnelActive}
        glitch={tunnelGlitch}
        onMidpoint={onTunnelMidpoint}
        onComplete={onTunnelComplete}
      />

      {/* ── System Status banner (ghost mode) ── */}
      <SystemStatus />

      {/* ── Auth page (standalone — no navbar) ── */}
      {isAuth && (
        <AnimatePresence mode="wait">
          <PageTransition key="auth">
            <Routes location={location}>
              <Route path="/auth" element={<AuthPage onGhostLaunch={launchGhost} />} />
            </Routes>
          </PageTransition>
        </AnimatePresence>
      )}

      {/* ── Shell: Standard Navbar vs. Command Strip ── */}
      {isHub ? (
        <CommandStrip />
      ) : !isAuth ? (
        <MainLayout onLaunchHub={launchHub}>
          <AnimatePresence mode="wait">
            <PageTransition key={location.pathname}>
              <Routes location={location}>
                <Route path="/" element={<Home onGhostLaunch={launchGhost} onLaunchProfile={launchProfile} />} />
                <Route path="/create-project" element={<CreateProject />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/community" element={<DevCommunity />} />
              </Routes>
            </PageTransition>
          </AnimatePresence>
        </MainLayout>
      ) : null}

      {/* ── Hub page (outside MainLayout) ── */}
      {isHub && (
        <AnimatePresence mode="wait">
          <PageTransition key="hub">
            <Routes location={location}>
              <Route path="/developers-hub" element={<DevelopersHub />} />
            </Routes>
          </PageTransition>
        </AnimatePresence>
      )}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
      <NeuralAssistant />
    </BrowserRouter>
  );
}

export default App;
