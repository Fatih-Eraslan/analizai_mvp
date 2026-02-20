import { useState, useEffect } from 'react';
import { Star, MessageSquare, AlertCircle, ThumbsUp, Eye } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Modal from '../components/Modal';
import { SkeletonCard } from '../components/Skeleton';
import { getRakipler } from '../services/rakiplerService';
import './Rakipler.css';

const fiyatEmoji = { ucuz: '💰', ortalama: '💰💰', pahali: '💰💰💰' };
const fiyatLabel = { ucuz: 'Ucuz', ortalama: 'Ortalama', pahali: 'Pahalı' };

const Rakipler = () => {
    const [rakipler, setRakipler] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        getRakipler().then((d) => { setRakipler(d); setLoading(false); });
    }, []);

    return (
        <div className="m-page animate-fade-in-up">
            <h1 className="m-page-title">Rakipler</h1>
            <p className="m-page-subtitle">Mahallenizdeki rakip işletmelerin karşılaştırmalı analizi</p>

            {loading ? (
                <div className="rakip-grid">
                    {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} height={220} />)}
                </div>
            ) : (
                <div className="rakip-grid">
                    {rakipler.map((r) => (
                        <Card key={r.id} className="rakip-card animate-fade-in-up">
                            <div className="rakip-header">
                                <div className="rakip-avatar">{r.isim[0]}</div>
                                <div className="rakip-info">
                                    <h3 className="rakip-name">{r.isim}</h3>
                                    <span className="rakip-addr">{r.adres}</span>
                                </div>
                                <div className="rakip-puan">
                                    <Star size={14} className="star-icon" />
                                    <span>{r.puan}</span>
                                </div>
                            </div>

                            <div className="rakip-stats">
                                <div className="rakip-stat">
                                    <MessageSquare size={14} />
                                    <span>{r.yorumSayisi} yorum</span>
                                </div>
                                <div className={`rakip-stat fiyat-${r.fiyatSeviyesi}`}>
                                    <span>{fiyatEmoji[r.fiyatSeviyesi]}</span>
                                    <span>{fiyatLabel[r.fiyatSeviyesi]}</span>
                                </div>
                            </div>

                            <div className="rakip-feedback">
                                <div className="fb-item negative">
                                    <AlertCircle size={13} />
                                    <span>{r.enCokSikayet}</span>
                                </div>
                                <div className="fb-item positive">
                                    <ThumbsUp size={13} />
                                    <span>{r.enCokOvgu}</span>
                                </div>
                            </div>

                            <Button variant="secondary" size="sm" icon={Eye} fullWidth onClick={() => setSelected(r)}>
                                Detay Gör
                            </Button>
                        </Card>
                    ))}
                </div>
            )}

            {/* Detail Modal */}
            <Modal isOpen={!!selected} onClose={() => setSelected(null)} title={selected?.isim} size="md">
                {selected && (
                    <div className="rakip-detail">
                        <div className="detail-row">
                            <span className="detail-label">Puan</span>
                            <span className="detail-value"><Star size={14} className="star-icon" /> {selected.puan} / 5.0</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Yorum Sayısı</span>
                            <span className="detail-value">{selected.yorumSayisi}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Fiyat Seviyesi</span>
                            <span className="detail-value">{fiyatEmoji[selected.fiyatSeviyesi]} {fiyatLabel[selected.fiyatSeviyesi]}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Adres</span>
                            <span className="detail-value">{selected.adres}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Çalışma Saatleri</span>
                            <span className="detail-value">{selected.calismaSaatleri}</span>
                        </div>

                        <h4 className="detail-section-title">Kategori Puanları</h4>
                        <div className="detail-cats">
                            {Object.entries(selected.kategoriler).map(([key, val]) => (
                                <div key={key} className="detail-cat">
                                    <div className="detail-cat-header">
                                        <span className="detail-cat-name">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                                        <span className="detail-cat-score">{val}/100</span>
                                    </div>
                                    <div className="detail-cat-bar">
                                        <div className="detail-cat-fill" style={{ width: `${val}%`, background: val > 70 ? 'var(--gradient-success)' : val > 40 ? 'var(--gradient-warning)' : 'var(--gradient-danger)' }} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="detail-feedback-section">
                            <div className="fb-item positive"><ThumbsUp size={13} /> {selected.enCokOvgu}</div>
                            <div className="fb-item negative"><AlertCircle size={13} /> {selected.enCokSikayet}</div>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default Rakipler;
