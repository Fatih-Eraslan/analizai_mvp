import { useState, useEffect } from 'react';
import { Check, X, Sparkles } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import { SkeletonCard } from '../components/Skeleton';
import { getPlanlar, planSec } from '../services/abonelikService';
import './Abonelik.css';

const Abonelik = () => {
    const [planlar, setPlanlar] = useState([]);
    const [loading, setLoading] = useState(true);
    const [secili, setSecili] = useState('pro');
    const [seciliyor, setSeciliyor] = useState(null);

    useEffect(() => {
        getPlanlar().then((d) => { setPlanlar(d); setLoading(false); });
    }, []);

    const handleSec = async (id) => {
        setSeciliyor(id);
        await planSec(id);
        setSecili(id);
        setSeciliyor(null);
    };

    const planRenk = { green: '#34d399', blue: '#60a5fa', purple: '#a78bfa' };

    return (
        <div className="m-page animate-fade-in-up">
            <div className="abone-header">
                <h1 className="m-page-title">Abonelik Planları</h1>
                <p className="m-page-subtitle">İşletmenize en uygun planı seçin</p>
            </div>

            {loading ? (
                <div className="abone-grid">
                    {Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} height={420} />)}
                </div>
            ) : (
                <div className="abone-grid">
                    {planlar.map((p) => {
                        const isActive = secili === p.id;
                        const isPremium = p.one_cikan;
                        return (
                            <Card
                                key={p.id}
                                className={`abone-card ${isPremium ? 'premium' : ''} ${isActive ? 'active' : ''}`}
                                style={{ borderColor: isPremium ? 'rgba(167,139,250,0.4)' : undefined }}
                            >
                                {isPremium && (
                                    <div className="abone-badge">
                                        <Sparkles size={12} /> En Popüler
                                    </div>
                                )}
                                <div className="abone-plan-header">
                                    <span className="abone-emoji">{p.emoji}</span>
                                    <h3 className="abone-plan-name">{p.isim}</h3>
                                </div>
                                <div className="abone-price">
                                    <span className="abone-currency">₺</span>
                                    <span className="abone-amount">{p.fiyat}</span>
                                    <span className="abone-period">/ ay</span>
                                </div>

                                <div className="abone-features">
                                    {p.ozellikler.map((oz, i) => (
                                        <div key={i} className={`abone-feature ${oz.dahil ? 'included' : 'excluded'}`}>
                                            {oz.dahil ? <Check size={14} className="feat-icon included" /> : <X size={14} className="feat-icon excluded" />}
                                            <span className="feat-name">{oz.isim}</span>
                                            {oz.limit && oz.dahil && <span className="feat-limit">{oz.limit}</span>}
                                        </div>
                                    ))}
                                </div>

                                {isActive ? (
                                    <Button variant="secondary" size="md" fullWidth disabled>
                                        Mevcut Planınız
                                    </Button>
                                ) : (
                                    <Button
                                        variant={isPremium ? 'primary' : 'secondary'}
                                        size="md"
                                        fullWidth
                                        loading={seciliyor === p.id}
                                        onClick={() => handleSec(p.id)}
                                    >
                                        Planı Seç
                                    </Button>
                                )}
                            </Card>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Abonelik;
