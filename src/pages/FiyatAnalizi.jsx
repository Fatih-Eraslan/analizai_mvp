import { useState, useEffect } from 'react';
import { TrendingDown, TrendingUp, Minus } from 'lucide-react';
import Card from '../components/Card';
import { SkeletonTable } from '../components/Skeleton';
import { getFiyatVerileri } from '../services/fiyatService';
import './FiyatAnalizi.css';

const FiyatAnalizi = () => {
    const [veriler, setVeriler] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getFiyatVerileri().then((d) => { setVeriler(d); setLoading(false); });
    }, []);

    const getKonumClass = (konum) => {
        if (konum <= 35) return 'konum-ucuz';
        if (konum >= 65) return 'konum-pahali';
        return 'konum-ortalama';
    };

    const getFarkIcon = (senin, ortalama) => {
        if (senin < ortalama) return <TrendingDown size={14} className="fiyat-ucuz" />;
        if (senin > ortalama) return <TrendingUp size={14} className="fiyat-pahali" />;
        return <Minus size={14} className="fiyat-esit" />;
    };

    return (
        <div className="m-page animate-fade-in-up">
            <h1 className="m-page-title">Fiyat Analizi</h1>
            <p className="m-page-subtitle">Ürün fiyatlarınızı mahalle ortalamalarıyla karşılaştırın</p>

            {loading ? (
                <SkeletonTable rows={5} cols={6} />
            ) : (
                <Card hover={false} className="fiyat-table-card">
                    <div className="fiyat-table-wrap">
                        <table className="fiyat-table">
                            <thead>
                                <tr>
                                    <th>Ürün</th>
                                    <th>Senin Fiyatın</th>
                                    <th>Mahalle Ort.</th>
                                    <th>En Ucuz</th>
                                    <th>En Pahalı</th>
                                    <th>Konum</th>
                                </tr>
                            </thead>
                            <tbody>
                                {veriler.map((v, i) => {
                                    const fark = ((v.seninFiyat - v.mahalleOrtalama) / v.mahalleOrtalama * 100).toFixed(1);
                                    const farkPositive = parseFloat(fark) > 0;
                                    return (
                                        <tr key={i} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
                                            <td className="urun-cell">{v.urun}</td>
                                            <td className="fiyat-cell senin">
                                                <span className="fiyat-val">₺{v.seninFiyat.toFixed(1)}</span>
                                                <span className={`fiyat-fark ${farkPositive ? 'pahali' : 'ucuz'}`}>
                                                    {getFarkIcon(v.seninFiyat, v.mahalleOrtalama)}
                                                    {farkPositive ? '+' : ''}{fark}%
                                                </span>
                                            </td>
                                            <td className="fiyat-cell">₺{v.mahalleOrtalama.toFixed(1)}</td>
                                            <td className="fiyat-cell ucuz">₺{v.enUcuz.toFixed(1)}</td>
                                            <td className="fiyat-cell pahali">₺{v.enPahali.toFixed(1)}</td>
                                            <td className="konum-cell">
                                                <div className="konum-bar-wrap">
                                                    <div className="konum-bar">
                                                        <div className={`konum-dot ${getKonumClass(v.konum)}`} style={{ left: `${v.konum}%` }}>
                                                            <span className="konum-tooltip">{v.konum}%</span>
                                                        </div>
                                                    </div>
                                                    <div className="konum-labels">
                                                        <span>Ucuz</span>
                                                        <span>Pahalı</span>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </Card>
            )}

            {!loading && (
                <div className="fiyat-summary animate-fade-in-up stagger-1">
                    <Card variant="gradient" className="fiyat-summary-card">
                        <span className="fiyat-summary-label">Genel Fiyat Konumu</span>
                        <span className="fiyat-summary-value">Ortalama</span>
                        <span className="fiyat-summary-desc">5 üründen 2'sinde mahalle ortalamasının altındasınız</span>
                    </Card>
                    <Card variant="gradient" className="fiyat-summary-card">
                        <span className="fiyat-summary-label">En Rekabetçi Ürün</span>
                        <span className="fiyat-summary-value ucuz">1.5L Su</span>
                        <span className="fiyat-summary-desc">Mahalledeki en ucuz fiyat sizde</span>
                    </Card>
                    <Card variant="gradient" className="fiyat-summary-card">
                        <span className="fiyat-summary-label">Dikkat Gerektiren</span>
                        <span className="fiyat-summary-value pahali">5kg Şeker</span>
                        <span className="fiyat-summary-desc">Mahalle ortalamasından %6.4 daha pahalı</span>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default FiyatAnalizi;
