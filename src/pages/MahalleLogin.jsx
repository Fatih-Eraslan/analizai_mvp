import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, Mail, Lock, LogIn, ArrowRight, Loader2 } from 'lucide-react';
import './MahalleLogin.css';

const MahalleLogin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        if (!email.trim() || !password.trim()) {
            setError('Lütfen e-posta ve şifre alanlarını doldurun.');
            return;
        }

        setLoading(true);
        await new Promise((r) => setTimeout(r, 1000));
        localStorage.setItem('mahalle_auth', 'true');
        localStorage.setItem('mahalle_user', JSON.stringify({ email, name: 'Mehmet Bakkal' }));
        setLoading(false);
        navigate('/mahalle');
    };

    const handleDemo = async () => {
        setError('');
        setEmail('demo@mahalleasistan.com');
        setPassword('123456');
        setLoading(true);
        await new Promise((r) => setTimeout(r, 1000));
        localStorage.setItem('mahalle_auth', 'true');
        localStorage.setItem('mahalle_user', JSON.stringify({ email: 'demo@mahalleasistan.com', name: 'Demo Kullanıcı' }));
        setLoading(false);
        navigate('/mahalle');
    };

    return (
        <div className="mlogin-page">
            <div className="mlogin-bg">
                <div className="mlogin-orb mlogin-orb-1" />
                <div className="mlogin-orb mlogin-orb-2" />
                <div className="mlogin-orb mlogin-orb-3" />
            </div>

            <div className="mlogin-card animate-fade-in-up">
                {/* Brand */}
                <div className="mlogin-brand">
                    <div className="mlogin-logo">
                        <Store size={28} />
                    </div>
                    <h1 className="mlogin-title">Mahalle Rekabet Asistanı</h1>
                    <p className="mlogin-desc">Mahallenizdeki rekabeti analiz edin, kazancınızı artırın.</p>
                </div>

                {/* Form */}
                <form className="mlogin-form" onSubmit={handleLogin}>
                    {error && (
                        <div className="mlogin-error animate-fade-in-up">
                            <span>{error}</span>
                        </div>
                    )}

                    <div className="mlogin-field">
                        <label className="mlogin-label">E-posta</label>
                        <div className="mlogin-input-wrap">
                            <Mail size={16} className="mlogin-input-icon" />
                            <input
                                type="email"
                                className="mlogin-input"
                                placeholder="ornek@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email"
                            />
                        </div>
                    </div>

                    <div className="mlogin-field">
                        <label className="mlogin-label">Şifre</label>
                        <div className="mlogin-input-wrap">
                            <Lock size={16} className="mlogin-input-icon" />
                            <input
                                type="password"
                                className="mlogin-input"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                            />
                        </div>
                    </div>

                    <button type="submit" className="mlogin-btn mlogin-btn-primary" disabled={loading}>
                        {loading ? (
                            <><Loader2 size={18} className="mlogin-spinner" /> Giriş yapılıyor...</>
                        ) : (
                            <><LogIn size={18} /> Giriş Yap</>
                        )}
                    </button>
                </form>

                {/* Divider */}
                <div className="mlogin-divider">
                    <span>veya</span>
                </div>

                {/* Demo Login */}
                <button
                    className="mlogin-btn mlogin-btn-demo"
                    onClick={handleDemo}
                    disabled={loading}
                >
                    <ArrowRight size={18} />
                    Demo Hesap ile Giriş Yap
                </button>

                <p className="mlogin-demo-hint">
                    demo@mahalleasistan.com / 123456
                </p>
            </div>
        </div>
    );
};

export default MahalleLogin;
