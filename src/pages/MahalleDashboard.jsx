import { useState, useEffect } from 'react';
import {
    Activity, AlertTriangle, TrendingUp, TrendingDown,
    Minus, ShoppingBag, BarChart3
} from 'lucide-react';
import Card from '../components/Card';
import { SkeletonCard, SkeletonChart } from '../components/Skeleton';
import { getDashboardData } from '../services/dashboardService';
import './MahalleDashboard.css';

const MahalleDashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getDashboardData().then((d) => { setData(d); setLoading(false); });
    }, []);

    if (loading) {
        return (
            <div className="m-page">
                <h1 className="m-page-title">Dashboard</h1>
                <div className="m-dash-grid">
                    <SkeletonCard height={160} />
                    <SkeletonCard height={160} />
                    <SkeletonCard height={160} />
                </div>
                <SkeletonChart height={260} />
                <div className="m-dash-grid cols-2">
                    <SkeletonCard height={120} />
                    <SkeletonCard height={120} />
                </div>
            </div>
        );
    }

    const { performans, rakipKonum, yorumTrend, mahalleTalep, kritikUyari } = data;

    const trendIcon = (t) => {
        if (t === 'yukari') return <TrendingUp size={14} className="trend-up" />;
        if (t === 'asagi') return <TrendingDown size={14} className="trend-down" />;
        return <Minus size={14} className="trend-flat" />;
    };

    const maxPozitif = Math.max(...yorumTrend.map((d) => d.pozitif));

    return (
        <div className="m-page animate-fade-in-up">
            <h1 className="m-page-title">Dashboard</h1>
            <p className="m-page-subtitle">Mahalle rekabet durumunuzun genel özeti</p>

            {/* Top Cards */}
            <div className="m-dash-grid cols-3">
                {/* Performance Score */}
                <Card variant="gradient" className="m-score-card">
                    <div className="m-score-header">
                        <Activity size={18} />
                        <span>Genel Performans</span>
                    </div>
                    <div className="m-score-ring-wrap">
                        <svg className="m-score-ring" viewBox="0 0 120 120">
                            <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
                            <circle cx="60" cy="60" r="52" fill="none"
                                stroke="url(#scoreGrad)" strokeWidth="8" strokeLinecap="round"
                                strokeDasharray={`${(performans.skor / 100) * 327} 327`}
                                transform="rotate(-90 60 60)" />
                            <defs>
                                <linearGradient id="scoreGrad" x1="0" y1="0" x2="1" y2="1">
                                    <stop offset="0%" stopColor="#6366f1" />
                                    <stop offset="100%" stopColor="#a855f7" />
                                </linearGradient>
                            </defs>
                            <text x="60" y="56" textAnchor="middle" fill="var(--text-primary)" fontSize="28" fontWeight="700">{performans.skor}</text>
                            <text x="60" y="74" textAnchor="middle" fill="var(--text-secondary)" fontSize="11">/ 100</text>
                        </svg>
                    </div>
                    <div className="m-score-change positive">
                        <TrendingUp size={14} /> +{performans.degisim} bu ay
                    </div>
                </Card>

                {/* Competitor Position */}
                <Card variant="gradient" className="m-position-card">
                    <div className="m-score-header">
                        <ShoppingBag size={18} />
                        <span>Rakip Konumunuz</span>
                    </div>
                    <div className="m-position-badge">
                        <span className={`badge-level level-${rakipKonum.seviye.toLowerCase()}`}>
                            {rakipKonum.seviye}
                        </span>
                    </div>
                    <p className="m-position-desc">{rakipKonum.aciklama}</p>
                    <div className="m-position-bar">
                        <div className="bar-segment ucuz" style={{ width: `${rakipKonum.ucuzYuzdesi}%` }}>
                            <span>Ucuz {rakipKonum.ucuzYuzdesi}%</span>
                        </div>
                        <div className="bar-segment ortalama" style={{ width: `${rakipKonum.ortalamaYuzdesi}%` }}>
                            <span>Ort. {rakipKonum.ortalamaYuzdesi}%</span>
                        </div>
                        <div className="bar-segment pahali" style={{ width: `${rakipKonum.pahaliYuzdesi}%` }}>
                            <span>Pahalı {rakipKonum.pahaliYuzdesi}%</span>
                        </div>
                    </div>
                </Card>

                {/* Critical Alert */}
                <Card variant="gradient" className={`m-alert-card alert-${kritikUyari.seviye}`}>
                    <div className="m-score-header alert-header">
                        <AlertTriangle size={18} />
                        <span>{kritikUyari.baslik}</span>
                        <span className="alert-time">{kritikUyari.tarih}</span>
                    </div>
                    <p className="alert-message">{kritikUyari.mesaj}</p>
                </Card>
            </div>

            {/* Review Trend Chart */}
            <Card className="m-chart-card animate-fade-in-up stagger-1" hover={false}>
                <h3 className="m-chart-title">
                    <BarChart3 size={18} /> Son 30 Gün Yorum Trendi
                </h3>
                <div className="m-trend-chart">
                    {yorumTrend.map((d, i) => (
                        <div key={i} className="m-trend-col">
                            <div className="m-trend-bars">
                                <div className="m-trend-bar positive" style={{ height: `${(d.pozitif / maxPozitif) * 100}%` }}>
                                    <span className="bar-tooltip">{d.pozitif}</span>
                                </div>
                                <div className="m-trend-bar negative" style={{ height: `${(d.negatif / maxPozitif) * 100}%` }}>
                                    <span className="bar-tooltip">{d.negatif}</span>
                                </div>
                            </div>
                            <span className="m-trend-label">{d.gun}</span>
                        </div>
                    ))}
                </div>
                <div className="m-trend-legend">
                    <span className="legend-item"><span className="legend-dot positive" /> Pozitif</span>
                    <span className="legend-item"><span className="legend-dot negative" /> Negatif</span>
                </div>
            </Card>

            {/* Neighborhood Demand */}
            <div className="m-dash-section animate-fade-in-up stagger-2">
                <h3 className="m-section-title">Mahalle Talep Özeti</h3>
                <div className="m-demand-grid">
                    {mahalleTalep.map((item, i) => (
                        <Card key={i} variant="gradient" className="m-demand-card">
                            <div className="m-demand-header">
                                <span className="m-demand-name">{item.baslik}</span>
                                {trendIcon(item.trend)}
                            </div>
                            <div className="m-demand-bar-wrap">
                                <div className="m-demand-bar">
                                    <div className="m-demand-fill" style={{ width: `${item.talep}%` }} />
                                </div>
                                <span className="m-demand-pct">{item.talep}%</span>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MahalleDashboard;
