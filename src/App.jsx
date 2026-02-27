import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import ListPage from './pages/ListPage';
import DetailsPage from './pages/DetailsPage';
import PhotoResultPage from './pages/PhotoResultPage';
import ChartsPage from './pages/ChartsPage';
import MapPage from './pages/MapPage';
import { LogOut, Home, BarChart2, MapPin, Bell, Snowflake } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.98, y: 10 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 1.02, y: -10 }}
    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
  >
    {children}
  </motion.div>
);

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return <Navigate to="/login" replace />;

  const isActive = (path) => location.pathname === path;

  return (
    <div className="app-layout">
      {/* Dynamic Background */}
      <div className="bg-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      <nav className="main-nav glass-card" style={{ position: 'sticky', top: '1.5rem', zIndex: 100 }}>
        <div className="nav-brand">
          <Link to="/list" style={{ color: 'inherit', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <motion.div
              whileHover={{ rotate: 180 }}
              style={{ background: 'var(--accent-color)', width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}
            >
              J
            </motion.div>
            <span style={{ fontSize: '1.3rem', fontWeight: 800 }}>Jotish <span style={{ color: 'var(--accent-color)' }}>Portal</span></span>
          </Link>
        </div>

        <div className="nav-links">
          <Link to="/list" className={isActive('/list') ? 'active' : ''} style={{ position: 'relative', color: isActive('/list') ? 'var(--text-main)' : 'var(--text-muted)' }}>
            <Home size={18} /> <span>Dashboard</span>
            {isActive('/list') && <motion.div layoutId="active-pill" style={{ position: 'absolute', bottom: '-4px', left: '1.2rem', right: '1.2rem', height: '2px', background: 'var(--accent-color)', borderRadius: '10px' }} />}
          </Link>
          <Link to="/charts" style={{ position: 'relative', color: isActive('/charts') ? 'var(--text-main)' : 'var(--text-muted)' }}>
            <BarChart2 size={18} /> <span>Analytics</span>
            {isActive('/charts') && <motion.div layoutId="active-pill" style={{ position: 'absolute', bottom: '-4px', left: '1.2rem', right: '1.2rem', height: '2px', background: 'var(--accent-color)', borderRadius: '10px' }} />}
          </Link>
          <Link to="/map" style={{ position: 'relative', color: isActive('/map') ? 'var(--text-main)' : 'var(--text-muted)' }}>
            <MapPin size={18} /> <span>Map</span>
            {isActive('/map') && <motion.div layoutId="active-pill" style={{ position: 'absolute', bottom: '-4px', left: '1.2rem', right: '1.2rem', height: '2px', background: 'var(--accent-color)', borderRadius: '10px' }} />}
          </Link>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{ padding: '0.8rem', background: 'rgba(255,255,255,0.05)', borderRadius: '14px', border: '1px solid var(--border-color)', boxShadow: 'none' }}
          >
            <Bell size={20} color="var(--text-muted)" />
          </motion.button>
          <button onClick={() => window.__logout()} className="logout-btn" style={{ borderRadius: '14px', padding: '0.7rem 1.2rem' }}>
            <LogOut size={18} />
          </button>
        </div>
      </nav>

      <main className="container">
        <AnimatePresence mode="wait">
          <PageWrapper key={location.pathname}>
            {children}
          </PageWrapper>
        </AnimatePresence>
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

function AppContent() {
  const { logout } = useAuth();
  const location = useLocation();
  window.__logout = logout;

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/list" element={<ProtectedRoute><ListPage /></ProtectedRoute>} />
      <Route path="/details" element={<ProtectedRoute><DetailsPage /></ProtectedRoute>} />
      <Route path="/photo-result" element={<ProtectedRoute><PhotoResultPage /></ProtectedRoute>} />
      <Route path="/charts" element={<ProtectedRoute><ChartsPage /></ProtectedRoute>} />
      <Route path="/map" element={<ProtectedRoute><MapPage /></ProtectedRoute>} />
      <Route path="/" element={<Navigate to="/list" replace />} />
    </Routes>
  );
}

export default App;
