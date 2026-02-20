import { useState, useEffect } from 'react';
import { Download, Mail, FileText, Check, Loader2, Eye } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import { SkeletonCard } from '../components/Skeleton';
import { getRaporlar, raporIndir, raporMailGonder } from '../services/raporlarService';
import './Raporlar.css';

const Raporlar = () => {
    const [raporlar, setRaporlar] = useState([]);
    const [loading, setLoading] = useState(true);
    const [indiriliyor, setIndiriliyor] = useState(null);
    const [gonderiliyor, setGonderiliyor] = useState(null);
    const [basarili, setBasarili] = useState({});

    useEffect(() => {
        getRaporlar().then((d) => { setRaporlar(d); setLoading(false); });
    }, []);

    const handleIndir = async (id) => {
        setIndiriliyor(id);
        await raporIndir(id);
        setIndiriliyor(null);
        setBasarili((prev) => ({ ...prev, [`indir_${id}`]: true }));
        setTimeout(() => setBasarili((prev) => { const n = { ...prev }; delete n[`indir_${id}`]; return n; }), 3000);
    };

    const handleMail = async (id) => {
        setGonderiliyor(id);
        await raporMailGonder(id);
        setGonderiliyor(null);
        setBasarili((prev) => ({ ...prev, [`mail_${id}`]: true }));
        setTimeout(() => setBasarili((prev) => { const n = { ...prev }; delete n[`mail_${id}`]; return n; }), 3000);
    };

    return (
        <div className="m-page animate-fade-in-up">
            <h1 className="m-page-title">Raporlar</h1>
            <p className="m-page-subtitle">Haftalık ve aylık performans raporlarınız</p>

            {/* Action Bar */}
            <div className="rapor-actions">
                <Button
                    variant="primary"
                    icon={indiriliyor === 'new' ? Loader2 : Download}
                    loading={indiriliyor === 'new'}
                    onClick={() => handleIndir('new')}
                >
                    Haftalık PDF Rapor Oluştur
                </Button>
                <Button
                    variant="secondary"
                    icon={gonderiliyor === 'new' ? Loader2 : Mail}
                    loading={gonderiliyor === 'new'}
                    onClick={() => handleMail('new')}
                >
                    E-posta ile Gönder
                </Button>
                {basarili.indir_new && <span className="rapor-toast"><Check size={14} /> PDF hazırlandı!</span>}
                {basarili.mail_new && <span className="rapor-toast"><Check size={14} /> E-posta gönderildi!</span>}
            </div>

            {/* Report List */}
            {loading ? (
                <div className="rapor-grid">
                    {Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} height={180} />)}
                </div>
            ) : (
                <div className="rapor-grid">
                    {raporlar.map((r) => (
                        <Card key={r.id} className="rapor-card">
                            <div className="rapor-icon-wrap">
                                <FileText size={24} />
                            </div>
                            <div className="rapor-info">
                                <h3 className="rapor-baslik">{r.baslik}</h3>
                                <span className="rapor-tarih">{r.tarih} • {r.tur}</span>
                                <p className="rapor-ozet">{r.ozet}</p>
                            </div>
                            <div className="rapor-card-actions">
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    icon={basarili[`indir_${r.id}`] ? Check : Download}
                                    loading={indiriliyor === r.id}
                                    onClick={() => handleIndir(r.id)}
                                >
                                    {basarili[`indir_${r.id}`] ? 'İndirildi' : 'İndir'}
                                </Button>
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    icon={basarili[`mail_${r.id}`] ? Check : Mail}
                                    loading={gonderiliyor === r.id}
                                    onClick={() => handleMail(r.id)}
                                >
                                    {basarili[`mail_${r.id}`] ? 'Gönderildi' : 'Gönder'}
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {/* Preview */}
            <Card className="rapor-preview animate-fade-in-up stagger-1" hover={false}>
                <div className="preview-header">
                    <Eye size={16} />
                    <span>Örnek Rapor Önizleme</span>
                </div>
                <div className="preview-content">
                    <div className="preview-section">
                        <span className="preview-label">Genel Performans Skoru</span>
                        <span className="preview-value">74 / 100</span>
                    </div>
                    <div className="preview-section">
                        <span className="preview-label">Rakip Konumu</span>
                        <span className="preview-value">Ortalama (12 rakip arasında)</span>
                    </div>
                    <div className="preview-section">
                        <span className="preview-label">Yorum Özeti</span>
                        <span className="preview-value">247 yorum • %68 pozitif</span>
                    </div>
                    <div className="preview-section">
                        <span className="preview-label">Kritik Bulgular</span>
                        <span className="preview-value">Kasa hızı iyileştirmesi gerekli</span>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Raporlar;
