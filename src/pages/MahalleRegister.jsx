import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Store, Mail, Lock, User, UserPlus, Loader2 } from 'lucide-react';
import './MahalleLogin.css';

const MahalleRegister = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        if (!name.trim() || !email.trim() || !password.trim()) {
            setError('Lütfen tüm alanları doldurun.');
            return;
        }

        if (password.length < 6) {
            setError('Şifre en az 6 karakter olmalıdır.');
            return;
        }

        setLoading(true);
        await new Promise((r) => setTimeout(r, 1200));
        localStorage.setItem('mahalle_auth', 'true');
        localStorage.setItem('mahalle_user', JSON.stringify({ email, name }));
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
                    <h1 className="mlogin-title">Kayıt Ol</h1>
                    <p className="mlogin-desc">Ücretsiz hesap oluşturun ve hemen başlayın.</p>
                </div>

                {/* Form */}
                <form className="mlogin-form" onSubmit={handleRegister}>
                    {error && (
                        <div className="mlogin-error animate-fade-in-up">
                            <span>{error}</span>
                        </div>
                    )}

                    <div className="mlogin-field">
                        <label className="mlogin-label">Ad Soyad</label>
                        <div className="mlogin-input-wrap">
                            <User size={16} className="mlogin-input-icon" />
                            <input
                                type="text"
                                className="mlogin-input"
                                placeholder="Mehmet Yılmaz"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                autoComplete="name"
                            />
                        </div>
                    </div>

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
                                placeholder="En az 6 karakter"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="new-password"
                            />
                        </div>
                    </div>

                    <button type="submit" className="mlogin-btn mlogin-btn-primary" disabled={loading}>
                        {loading ? (
                            <><Loader2 size={18} className="mlogin-spinner" /> Hesap oluşturuluyor...</>
                        ) : (
                            <><UserPlus size={18} /> Kayıt Ol</>
                        )}
                    </button>
                </form>

                <p className="mlogin-register-link">
                    Zaten hesabınız var mı? <Link to="/mahalle/login">Giriş Yap</Link>
                </p>
            </div>
        </div>
    );
};

export default MahalleRegister;
