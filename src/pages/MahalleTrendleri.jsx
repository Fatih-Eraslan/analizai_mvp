import { useState, useEffect } from 'react';
import { ThumbsUp, Clock, TrendingUp, TrendingDown, Minus, Gauge } from 'lucide-react';
import Card from '../components/Card';
import { SkeletonCard, SkeletonChart } from '../components/Skeleton';
import { getTrendlerVerileri } from '../services/trendlerService';
import './MahalleTrendleri.css';

const MahalleTrendleri = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getTrendlerVerileri().then((d) => { setData(d); setLoading(false); });
    }, []);

    if (loading) {
        return (
            <div className="m-page">
                <h1 className="m-page-title">Mahalle Trendleri</h1>
                <div className="trend-skeleton-grid">
                    <SkeletonCard height={300} />
                    <SkeletonCard height={160} />
                    <SkeletonChart height={240} />
                    <SkeletonChart height={200} />
                </div>
            </div>
        );
    }

    const { beklentiler, fiyatHassasiyeti, yogunSaatler, memnuniyetGrafik } = data;
    const maxYogunluk = Math.max(...yogunSaatler.map((s) => s.yogunluk));

    const trendIcon = (t) => {
        if (t === 'yukari') return <TrendingUp size={14} className="trend-up" />;
        if (t === 'asagi') return <TrendingDown size={14} className="trend-down" />;
        return <Minus size={14} className="trend-flat" />;
    };

    return (
        <div className="m-page animate-fade-in-up">
            <h1 className="m-page-title">Mahalle Trendleri</h1>
            <p className="m-page-subtitle">Mahallenizin beklentileri, alışkanlıkları ve memnuniyet trendi</p>

            <div className="trend-grid">
                {/* Expectations */}
                <Card hover={false} className="trend-beklenti-card">
                    <h3 className="trend-card-title"><ThumbsUp size={16} /> En Çok Konuşulan Beklentiler</h3>
                    <div className="beklenti-list">
                        {beklentiler.map((b, i) => (
                            <div key={i} className="beklenti-item animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
                                <div className="beklenti-rank">#{i + 1}</div>
                                <div className="beklenti-info">
                                    <span className="beklenti-name">{b.baslik}</span>
                                    <span className="beklenti-kat">{b.kategori}</span>
                                </div>
                                <div className="beklenti-right">
                                    {trendIcon(b.trend)}
                                    <span className="beklenti-oy">{b.oy} oy</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Price Sensitivity */}
                <Card variant="gradient" className="trend-hassasiyet-card">
                    <h3 className="trend-card-title"><Gauge size={16} /> Fiyat Hassasiyeti</h3>
                    <div className="hassasiyet-gauge">
                        <svg viewBox="0 0 120 70" className="gauge-svg">
                            <path d="M 10 60 A 50 50 0 0 1 110 60" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" strokeLinecap="round" />
                            <path d="M 10 60 A 50 50 0 0 1 110 60" fill="none" stroke="url(#gaugeGrad)" strokeWidth="10" strokeLinecap="round"
                                strokeDasharray={`${(fiyatHassasiyeti.skor / 100) * 157} 157`} />
                            <defs>
                                <linearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="0%" stopColor="#34d399" />
                                    <stop offset="50%" stopColor="#fbbf24" />
                                    <stop offset="100%" stopColor="#f87171" />
                                </linearGradient>
                            </defs>
                            <text x="60" y="55" textAnchor="middle" fill="var(--text-primary)" fontSize="22" fontWeight="700">{fiyatHassasiyeti.skor}</text>
                            <text x="60" y="68" textAnchor="middle" fill="var(--text-secondary)" fontSize="8">/100</text>
                        </svg>
                    </div>
                    <div className="hassasiyet-badge">{fiyatHassasiyeti.seviye}</div>
                    <p className="hassasiyet-desc">{fiyatHassasiyeti.aciklama}</p>
                </Card>

                {/* Peak Hours */}
                <Card hover={false} className="trend-saat-card">
                    <h3 className="trend-card-title"><Clock size={16} /> Yoğun Saat Tahmini</h3>
                    <div className="saat-chart">
                        {yogunSaatler.map((s, i) => (
                            <div key={i} className="saat-col">
                                <div className="saat-bar-wrap">
                                    <div
                                        className={`saat-bar ${s.yogunluk >= 80 ? 'high' : s.yogunluk >= 50 ? 'mid' : 'low'}`}
                                        style={{ height: `${(s.yogunluk / maxYogunluk) * 100}%` }}
                                    >
                                        <span className="saat-tooltip">{s.yogunluk}%</span>
                                    </div>
                                </div>
                                <span className="saat-label">{s.saat}</span>
                            </div>
                        ))}
                    </div>
                    <div className="saat-legend">
                        <span className="saat-legend-item"><span className="saat-dot high" /> Yoğun</span>
                        <span className="saat-legend-item"><span className="saat-dot mid" /> Orta</span>
                        <span className="saat-legend-item"><span className="saat-dot low" /> Sakin</span>
                    </div>
                </Card>

                {/* 3 Month Satisfaction */}
                <Card hover={false} className="trend-memn-card">
                    <h3 className="trend-card-title"><TrendingUp size={16} /> 3 Aylık Memnuniyet</h3>
                    <div className="memn-chart">
                        {memnuniyetGrafik.map((m, i) => (
                            <div key={i} className="memn-col">
                                <div className="memn-bar-wrap">
                                    <div className="memn-bar" style={{ height: `${m.skor}%` }}>
                                        <span className="memn-val">{m.skor}</span>
                                    </div>
                                </div>
                                <span className="memn-label">{m.ay}</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default MahalleTrendleri;
