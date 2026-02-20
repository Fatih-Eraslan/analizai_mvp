import { useState, useEffect } from 'react';
import { AlertTriangle, Brain, TrendingDown, MessageSquare } from 'lucide-react';
import Card from '../components/Card';
import { SkeletonCard, SkeletonChart } from '../components/Skeleton';
import { getYorumVerileri } from '../services/yorumService';
import './YorumAnalizi.css';

const YorumAnalizi = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getYorumVerileri().then((d) => { setData(d); setLoading(false); });
    }, []);

    if (loading) {
        return (
            <div className="m-page">
                <h1 className="m-page-title">Yorum Analizi</h1>
                <div className="yorum-grid">
                    <SkeletonChart height={280} />
                    <SkeletonCard height={280} />
                    <SkeletonCard height={140} />
                    <SkeletonCard height={180} />
                </div>
            </div>
        );
    }

    const { dagitim, toplamYorum, sikKelimeler, negatifTrend, aiOzet } = data;
    const pozArc = (dagitim.pozitif / 100) * 283;
    const negArc = (dagitim.negatif / 100) * 283;
    const notrArc = (dagitim.notr / 100) * 283;

    return (
        <div className="m-page animate-fade-in-up">
            <h1 className="m-page-title">Yorum Analizi</h1>
            <p className="m-page-subtitle">Müşteri yorumlarınızın detaylı duygu analizi</p>

            <div className="yorum-top-grid">
                {/* Pie Chart */}
                <Card hover={false} className="yorum-pie-card">
                    <h3 className="yorum-card-title"><MessageSquare size={16} /> Duygu Dağılımı</h3>
                    <div className="pie-wrapper">
                        <svg className="pie-chart" viewBox="0 0 120 120">
                            <circle cx="60" cy="60" r="45" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="20" />
                            <circle cx="60" cy="60" r="45" fill="none" stroke="#34d399" strokeWidth="20"
                                strokeDasharray={`${pozArc} ${283 - pozArc}`} strokeDashoffset="0" transform="rotate(-90 60 60)" />
                            <circle cx="60" cy="60" r="45" fill="none" stroke="#94a3b8" strokeWidth="20"
                                strokeDasharray={`${notrArc} ${283 - notrArc}`} strokeDashoffset={`${-pozArc}`} transform="rotate(-90 60 60)" />
                            <circle cx="60" cy="60" r="45" fill="none" stroke="#f87171" strokeWidth="20"
                                strokeDasharray={`${negArc} ${283 - negArc}`} strokeDashoffset={`${-(pozArc + notrArc)}`} transform="rotate(-90 60 60)" />
                            <text x="60" y="56" textAnchor="middle" fill="var(--text-primary)" fontSize="20" fontWeight="700">{toplamYorum}</text>
                            <text x="60" y="72" textAnchor="middle" fill="var(--text-secondary)" fontSize="9">toplam yorum</text>
                        </svg>
                        <div className="pie-legend">
                            <div className="pie-legend-item"><span className="pie-dot" style={{ background: '#34d399' }} /> Pozitif <strong>{dagitim.pozitif}%</strong></div>
                            <div className="pie-legend-item"><span className="pie-dot" style={{ background: '#94a3b8' }} /> Nötr <strong>{dagitim.notr}%</strong></div>
                            <div className="pie-legend-item"><span className="pie-dot" style={{ background: '#f87171' }} /> Negatif <strong>{dagitim.negatif}%</strong></div>
                        </div>
                    </div>
                </Card>

                {/* Word Frequency */}
                <Card hover={false} className="yorum-words-card">
                    <h3 className="yorum-card-title">En Sık Geçen Kelimeler</h3>
                    <div className="word-list">
                        {sikKelimeler.map((k, i) => {
                            const maxSayi = Math.max(...sikKelimeler.map((w) => w.sayi));
                            return (
                                <div key={i} className={`word-item animate-fade-in-up`} style={{ animationDelay: `${i * 0.04}s` }}>
                                    <div className="word-info">
                                        <span className={`word-badge ${k.tip}`}>{k.tip === 'pozitif' ? '+' : '−'}</span>
                                        <span className="word-text">{k.kelime}</span>
                                    </div>
                                    <div className="word-bar-wrap">
                                        <div className="word-bar">
                                            <div className={`word-fill ${k.tip}`} style={{ width: `${(k.sayi / maxSayi) * 100}%` }} />
                                        </div>
                                        <span className="word-count">{k.sayi}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Card>
            </div>

            {/* Negative Trend Alert */}
            {negatifTrend.uyari && (
                <Card className="yorum-alert-card animate-fade-in-up stagger-1" hover={false}>
                    <div className="yorum-alert-header">
                        <AlertTriangle size={18} className="alert-icon" />
                        <span className="alert-title">Negatif Trend Uyarısı</span>
                        <div className="alert-badge">
                            <TrendingDown size={14} />
                            {negatifTrend.oncekiHafta} → {negatifTrend.buHafta}
                        </div>
                    </div>
                    <p className="alert-desc">{negatifTrend.mesaj}</p>
                </Card>
            )}

            {/* AI Summary */}
            <Card className="yorum-ai-card animate-fade-in-up stagger-2" hover={false}>
                <div className="ai-header">
                    <div className="ai-icon-wrap"><Brain size={20} /></div>
                    <div>
                        <h3 className="ai-title">Yapay Zeka Analiz Özeti</h3>
                        <span className="ai-subtitle">Otomatik oluşturuldu • Son güncelleme: 2 saat önce</span>
                    </div>
                </div>
                <p className="ai-text">{aiOzet}</p>
            </Card>
        </div>
    );
};

export default YorumAnalizi;
