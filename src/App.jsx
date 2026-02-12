import { Routes, Route, Navigate, useLocation, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import Splash from './pages/Splash';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AddAnalysis from './pages/AddAnalysis';
import LoadingAnalysis from './pages/LoadingAnalysis';
import AnalysisResult from './pages/AnalysisResult';
import AIRecommendations from './pages/AIRecommendations';
import Profile from './pages/Profile';

/* Layout for authenticated / main pages */
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

function App() {
  return (
    <Routes>
      {/* Auth routes — no navigation bars */}
      <Route element={<AuthLayout />}>
        <Route path="/splash" element={<Splash />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/loading" element={<LoadingAnalysis />} />
      </Route>

      {/* Main routes — with Navbar + BottomNav */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-analysis" element={<AddAnalysis />} />
        <Route path="/results" element={<AnalysisResult />} />
        <Route path="/recommendations" element={<AIRecommendations />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* Default redirect */}
      <Route path="*" element={<Navigate to="/splash" replace />} />
    </Routes>
  );
}

export default App;
