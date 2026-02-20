import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    User, Mail, Store, MapPin, Phone, Building2,
    Edit3, Save, Lock, CheckCircle, CreditCard, ArrowUpRight
} from 'lucide-react';
import './MahalleProfil.css';

const MahalleProfil = () => {
    const navigate = useNavigate();
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [passwordSuccess, setPasswordSuccess] = useState(false);
    const [passwords, setPasswords] = useState({ current: '', next: '' });
    const [passwordError, setPasswordError] = useState('');

    const [user, setUser] = useState({
        name: '',
        email: '',
        isletmeAdi: '',
        isletmeTuru: '',
        mahalle: '',
        telefon: '',
        plan: 'Pro Plan',
        planYenileme: '2026-03-20',
    });

    useEffect(() => {
        try {
            const stored = JSON.parse(localStorage.getItem('user') || '{}');
            setUser((prev) => ({ ...prev, ...stored }));
        } catch { /* ignore */ }
    }, []);

    const handleSave = async () => {
        setSaving(true);
        await new Promise((r) => setTimeout(r, 800));
        localStorage.setItem('user', JSON.stringify(user));
        setSaving(false);
        setEditing(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        setPasswordError('');
        setPasswordSuccess(false);

        if (!passwords.current.trim() || !passwords.next.trim()) {
            setPasswordError('Lütfen tüm alanları doldurun.');
            return;
        }
        if (passwords.next.length < 6) {
            setPasswordError('Yeni şifre en az 6 karakter olmalıdır.');
            return;
        }

        await new Promise((r) => setTimeout(r, 800));
        setPasswords({ current: '', next: '' });
        setPasswordSuccess(true);
        setTimeout(() => setPasswordSuccess(false), 3000);
    };

    const handleChange = (field, value) => {
        setUser((prev) => ({ ...prev, [field]: value }));
    };

    const fields = [
        { key: 'name', label: 'Ad Soyad', icon: User, type: 'text' },
        { key: 'email', label: 'E-posta', icon: Mail, type: 'email' },
        { key: 'isletmeAdi', label: 'İşletme Adı', icon: Store, type: 'text' },
        { key: 'isletmeTuru', label: 'İşletme Türü', icon: Building2, type: 'text' },
        { key: 'mahalle', label: 'Mahalle', icon: MapPin, type: 'text' },
        { key: 'telefon', label: 'Telefon', icon: Phone, type: 'tel' },
    ];

    return (
        <div className="profil-page">
            <div className="page-header">
                <h1>Profil</h1>
                <p>Hesap ve işletme bilgilerinizi yönetin</p>
            </div>

            {saved && (
                <div className="profil-toast animate-fade-in-up">
                    <CheckCircle size={16} /> Değişiklikler kaydedildi
                </div>
            )}

            {/* ───── Kullanıcı Bilgileri ───── */}
            <div className="profil-card">
                <div className="profil-card-header">
                    <h2>Kullanıcı Bilgileri</h2>
                    {!editing ? (
                        <button className="profil-edit-btn" onClick={() => setEditing(true)}>
                            <Edit3 size={16} /> Profili Düzenle
                        </button>
                    ) : (
                        <button className="profil-save-btn" onClick={handleSave} disabled={saving}>
                            <Save size={16} /> {saving ? 'Kaydediliyor...' : 'Kaydet'}
                        </button>
                    )}
                </div>

                <div className="profil-fields">
                    {fields.map((f) => {
                        const Icon = f.icon;
                        return (
                            <div className="profil-field" key={f.key}>
                                <label className="profil-label">
                                    <Icon size={14} /> {f.label}
                                </label>
                                <input
                                    type={f.type}
                                    className={`profil-input ${editing ? 'editable' : ''}`}
                                    value={user[f.key] || ''}
                                    onChange={(e) => handleChange(f.key, e.target.value)}
                                    readOnly={!editing}
                                    placeholder={editing ? `${f.label} giriniz` : '—'}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* ───── Şifre Güncelleme ───── */}
            <div className="profil-card">
                <div className="profil-card-header">
                    <h2>Şifre Güncelle</h2>
                </div>

                {passwordSuccess && (
                    <div className="profil-success animate-fade-in-up">
                        <CheckCircle size={16} /> Şifreniz başarıyla güncellendi
                    </div>
                )}
                {passwordError && (
                    <div className="profil-error animate-fade-in-up">
                        {passwordError}
                    </div>
                )}

                <form className="profil-password-form" onSubmit={handlePasswordUpdate}>
                    <div className="profil-field">
                        <label className="profil-label">
                            <Lock size={14} /> Mevcut Şifre
                        </label>
                        <input
                            type="password"
                            className="profil-input editable"
                            placeholder="••••••••"
                            value={passwords.current}
                            onChange={(e) => setPasswords((p) => ({ ...p, current: e.target.value }))}
                        />
                    </div>
                    <div className="profil-field">
                        <label className="profil-label">
                            <Lock size={14} /> Yeni Şifre
                        </label>
                        <input
                            type="password"
                            className="profil-input editable"
                            placeholder="En az 6 karakter"
                            value={passwords.next}
                            onChange={(e) => setPasswords((p) => ({ ...p, next: e.target.value }))}
                        />
                    </div>
                    <button type="submit" className="profil-pw-btn">
                        <Lock size={16} /> Şifreyi Güncelle
                    </button>
                </form>
            </div>

            {/* ───── Abonelik Bilgisi ───── */}
            <div className="profil-card profil-plan-card">
                <div className="profil-card-header">
                    <h2>Abonelik Bilgisi</h2>
                </div>
                <div className="profil-plan-content">
                    <div className="profil-plan-row">
                        <span className="profil-plan-label">Aktif Plan</span>
                        <span className="profil-plan-badge">{user.plan}</span>
                    </div>
                    <div className="profil-plan-row">
                        <span className="profil-plan-label">Yenileme Tarihi</span>
                        <span className="profil-plan-value">{user.planYenileme}</span>
                    </div>
                    <button className="profil-upgrade-btn" onClick={() => navigate('/abonelik')}>
                        <CreditCard size={16} /> Planı Yükselt <ArrowUpRight size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MahalleProfil;
