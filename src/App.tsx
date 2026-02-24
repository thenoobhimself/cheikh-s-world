import { useState, useCallback } from 'react';
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Desktop } from './components/Desktop';
import { BootScreen } from './components/BootScreen';
import { IntroScreen } from './components/IntroScreen';
import { LogoutScreen } from './components/LogoutScreen';
import './App.css';

type Stage = 'intro' | 'boot' | 'desktop' | 'logout';

function App() {
  const [stage, setStage] = useState<Stage>('intro');
  // Controls the fade-out of the logout overlay
  const [logoutVisible, setLogoutVisible] = useState(false);

  const handleLogout = useCallback(() => {
    setLogoutVisible(true);
    setStage('logout');
  }, []);

  const handleLogoutDone = useCallback(() => {
    // Fade out the logout overlay — IntroScreen is already rendered beneath
    setLogoutVisible(false);
    // After fade completes, fully switch to intro stage
    setTimeout(() => setStage('intro'), 500);
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0 }}>
      {/* ── Layer 0: Intro (always rendered when not in desktop/boot) ── */}
      {(stage === 'intro' || stage === 'logout') && (
        <IntroScreen onDone={() => setStage('boot')} />
      )}

      {/* ── Layer 1: Boot screen ── */}
      {stage === 'boot' && (
        <BootScreen
          onEnter={() => setStage('desktop')}
          onLogout={handleLogout}
        />
      )}

      {/* ── Layer 2: Desktop ── */}
      {stage === 'desktop' && (
        <Desktop onShutdown={handleLogout} />
      )}

      {/* ── Layer 3: Logout video overlay — fades out over IntroScreen ── */}
      {stage === 'logout' && (
        <div
          className="app-logout-overlay"
          style={{ opacity: logoutVisible ? 1 : 0 }}
        >
          <LogoutScreen onDone={handleLogoutDone} />
        </div>
      )}
      <SpeedInsights />
    </div>
  );
}

export default App;
