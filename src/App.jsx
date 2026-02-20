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
import MahalleDashboard from './pages/MahalleDashboard';
import Rakipler from './pages/Rakipler';
import FiyatAnalizi from './pages/FiyatAnalizi';
import YorumAnalizi from './pages/YorumAnalizi';
import MahalleTrendleri from './pages/MahalleTrendleri';
import KampanyaOnerileri from './pages/KampanyaOnerileri';
import Raporlar from './pages/Raporlar';
import Abonelik from './pages/Abonelik';

/* Auth guard — redirects to login if no session */
const MahalleAuthGuard = () => {
  const isAuth = localStorage.getItem('mahalle_auth') === 'true';
  if (!isAuth) return <Navigate to="/mahalle/login" replace />;
  return <Outlet />;
};

/* Layout for authenticated / main pages (original) */
const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <BottomNav />
    </>
  );
};

/* Layout for auth pages (no nav) */
const AuthLayout = () => {
  return (
    <main style={{ flex: 1 }}>
      <Outlet />
    </main>
  );
};

/* Sidebar layout for Mahalle pages */
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
      {/* Mahalle Login & Register — public */}
      <Route path="/mahalle/login" element={<MahalleLogin />} />
      <Route path="/mahalle/register" element={<MahalleRegister />} />

      {/* Auth routes — no navigation bars (original app) */}
      <Route element={<AuthLayout />}>
        <Route path="/splash" element={<Splash />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/loading" element={<LoadingAnalysis />} />
      </Route>

      {/* Original main routes — with Navbar + BottomNav */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-analysis" element={<AddAnalysis />} />
        <Route path="/results" element={<AnalysisResult />} />
        <Route path="/recommendations" element={<AIRecommendations />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* Mahalle Rekabet Asistanı — protected by auth guard */}
      <Route element={<MahalleAuthGuard />}>
        <Route element={<SidebarLayout />}>
          <Route path="/mahalle" element={<MahalleDashboard />} />
          <Route path="/mahalle/rakipler" element={<Rakipler />} />
          <Route path="/mahalle/fiyat-analizi" element={<FiyatAnalizi />} />
          <Route path="/mahalle/yorum-analizi" element={<YorumAnalizi />} />
          <Route path="/mahalle/trendler" element={<MahalleTrendleri />} />
          <Route path="/mahalle/kampanyalar" element={<KampanyaOnerileri />} />
          <Route path="/mahalle/raporlar" element={<Raporlar />} />
          <Route path="/mahalle/abonelik" element={<Abonelik />} />
        </Route>
      </Route>

      {/* Default redirect — auth guard handles login check */}
      <Route path="*" element={<Navigate to="/mahalle/login" replace />} />
    </Routes>
  );
}

export default App;
