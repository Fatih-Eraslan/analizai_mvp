import { useState } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import Sidebar from './components/Sidebar';
import Splash from './pages/Splash';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AddAnalysis from './pages/AddAnalysis';
import LoadingAnalysis from './pages/LoadingAnalysis';
import AnalysisResult from './pages/AnalysisResult';
import AIRecommendations from './pages/AIRecommendations';
import Profile from './pages/Profile';
import MahalleLogin from './pages/MahalleLogin';
import MahalleRegister from './pages/MahalleRegister';
import MahalleProfil from './pages/MahalleProfil';
import MahalleDashboard from './pages/MahalleDashboard';
import Rakipler from './pages/Rakipler';
import FiyatAnalizi from './pages/FiyatAnalizi';
import YorumAnalizi from './pages/YorumAnalizi';
import MahalleTrendleri from './pages/MahalleTrendleri';
import KampanyaOnerileri from './pages/KampanyaOnerileri';
import Raporlar from './pages/Raporlar';
import Abonelik from './pages/Abonelik';
import AnalizAI from './pages/AnalizAI';

/* Auth guard — redirects to /login if no session */
const AuthGuard = () => {
  const isAuth = localStorage.getItem('auth') === 'true';
  if (!isAuth) return <Navigate to="/login" replace />;
  return <Outlet />;
};

/* Redirect authenticated users away from login/register */
const GuestGuard = () => {
  const isAuth = localStorage.getItem('auth') === 'true';
  if (isAuth) return <Navigate to="/dashboard" replace />;
  return <Outlet />;
};

/* Layout for original auth pages (no nav) */
const AuthLayout = () => (
  <main style={{ flex: 1 }}>
    <Outlet />
  </main>
);

/* Layout for original main pages — with Navbar + BottomNav */
const MainLayout = () => (
  <>
    <Navbar />
    <main style={{ flex: 1 }}>
      <Outlet />
    </main>
    <BottomNav />
  </>
);

/* Sidebar layout for SaaS pages */
const SidebarLayout = () => {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <div className="sidebar-layout">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
      <main className={`sidebar-main ${collapsed ? 'expanded' : ''}`}>
        <div className="sidebar-mobile-header">
          <button className="mobile-menu-btn" onClick={() => setCollapsed(false)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
          </button>
          <span className="mobile-brand">Mahalle Rekabet Asistanı</span>
        </div>
        <Outlet />
      </main>
    </div>
  );
};

function App() {
  return (
    <Routes>
      {/* Public routes — redirect to dashboard if already logged in */}
      <Route element={<GuestGuard />}>
        <Route path="/login" element={<MahalleLogin />} />
        <Route path="/register" element={<MahalleRegister />} />
      </Route>

      {/* Original auth pages (kept for compatibility) */}
      <Route element={<AuthLayout />}>
        <Route path="/splash" element={<Splash />} />
        <Route path="/loading" element={<LoadingAnalysis />} />
      </Route>

      {/* All protected routes — require auth */}
      <Route element={<AuthGuard />}>
        {/* SaaS sidebar layout */}
        <Route element={<SidebarLayout />}>
          <Route path="/dashboard" element={<MahalleDashboard />} />
          <Route path="/rakipler" element={<Rakipler />} />
          <Route path="/fiyat-analizi" element={<FiyatAnalizi />} />
          <Route path="/yorum-analizi" element={<YorumAnalizi />} />
          <Route path="/mahalle-trendleri" element={<MahalleTrendleri />} />
          <Route path="/kampanya-onerileri" element={<KampanyaOnerileri />} />
          <Route path="/raporlar" element={<Raporlar />} />
          <Route path="/abonelik" element={<Abonelik />} />
          <Route path="/profil" element={<MahalleProfil />} />
          <Route path="/analizai" element={<AnalizAI />} />
        </Route>

        {/* Original main routes (kept for compatibility) */}
        <Route element={<MainLayout />}>
          <Route path="/add-analysis" element={<AddAnalysis />} />
          <Route path="/results" element={<AnalysisResult />} />
          <Route path="/recommendations" element={<AIRecommendations />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>

      {/* Default redirect */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
