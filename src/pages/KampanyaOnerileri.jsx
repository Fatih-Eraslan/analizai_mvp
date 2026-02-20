import { useState, useEffect } from 'react';
import { Zap, ArrowUpRight, Check, Clock } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import { SkeletonCard } from '../components/Skeleton';
import { getKampanyalar } from '../services/kampanyaService';
import './KampanyaOnerileri.css';

const etkiRenk = { yuksek: 'high', orta: 'mid', dusuk: 'low' };
const etkiLabel = { yuksek: 'Yüksek', orta: 'Orta', dusuk: 'Düşük' };

const KampanyaOnerileri = () => {
    const [kampanyalar, setKampanyalar] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uygulanmis, setUygulanmis] = useState(new Set());

    useEffect(() => {
        getKampanyalar().then((d) => { setKampanyalar(d); setLoading(false); });
    }, []);

    const handleUygula = (id) => {
        setUygulanmis((prev) => new Set([...prev, id]));
    };

    return (
        <div className="m-page animate-fade-in-up">
            <h1 className="m-page-title">Kampanya Önerileri</h1>
            <p className="m-page-subtitle">Yapay zeka tarafından oluşturulan özel kampanya önerileri</p>

            {loading ? (
                <div className="kampanya-grid">
                    {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} height={240} />)}
                </div>
            ) : (
                <div className="kampanya-grid">
                    {kampanyalar.map((k, i) => (
                        <Card key={k.id} className={`kampanya-card animate-fade-in-up`} style={{ animationDelay: `${i * 0.08}s` }}>
                            <div className="kampanya-header">
                                <div className={`kampanya-etki ${etkiRenk[k.etkiSeviyesi]}`}>
                                    <Zap size={12} /> {etkiLabel[k.etkiSeviyesi]} Etki
                                </div>
                                <span className="kampanya-kat">{k.kategori}</span>
                            </div>

                            <h3 className="kampanya-baslik">{k.baslik}</h3>
                            <p className="kampanya-aciklama">{k.aciklama}</p>

                            <div className="kampanya-metrics">
                                <div className="kampanya-metric">
                                    <ArrowUpRight size={16} className="metric-icon" />
                                    <div>
                                        <span className="metric-val">+{k.kazancArtisi}%</span>
                                        <span className="metric-label">Tahmini Kazanç</span>
                                    </div>
                                </div>
                                <div className="kampanya-metric">
                                    <Clock size={16} className="metric-icon" />
                                    <div>
                                        <span className="metric-val">{k.sure}</span>
                                        <span className="metric-label">Süre</span>
                                    </div>
                                </div>
                            </div>

                            {uygulanmis.has(k.id) ? (
                                <Button variant="secondary" size="sm" icon={Check} fullWidth disabled>
                                    Uygulandı
                                </Button>
                            ) : (
                                <Button variant="primary" size="sm" icon={Zap} fullWidth onClick={() => handleUygula(k.id)}>
                                    Uygula
                                </Button>
                            )}
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default KampanyaOnerileri;
