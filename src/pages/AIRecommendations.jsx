import { useNavigate } from 'react-router-dom';
import {
    Sparkles, TrendingUp, Users, Globe, Shield,
    Zap, DollarSign, BarChart3, ArrowLeft, Target
} from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import './AIRecommendations.css';

const recommendations = [
    {
        id: 1,
        priority: 'high',
        title: 'Müşteri Edinimini Optimize Et',
        description: 'Hedefli dijital kampanyalar ve referans programı ile Müşteri Edinme Maliyetini (CAC) %18 azaltın. Yüksek niyetli kanallara odaklanın.',
        impact: 'Yüksek Etki',
        category: 'Büyüme',
        icon: Users,
        metrics: '$2.4M potansiyel tasarruf',
    },
    {
        id: 2,
        priority: 'high',
        title: 'Pazar Varlığını Genişlet',
        description: 'Bölgesel stratejilerle keşfedilmemiş 3 pazara girin. Mevcut pazar payı %34, sektör ortalaması olan %50’nin altında.',
        impact: 'Yüksek Etki',
        category: 'Pazar',
        icon: Globe,
        metrics: '%16 pazar payı artışı',
    },
    {
        id: 3,
        priority: 'medium',
        title: 'Finansal Rezervleri Güçlendir',
        description: 'Kısa vadeli borçları yeniden yapılandırarak nakit rezervlerini artırın. Borç/özsermaye oranını 1.8’den sektör standardı olan 1.2’ye çekin.',
        impact: 'Orta Etki',
        category: 'Finansal',
        icon: DollarSign,
        metrics: 'Riskte %25 azalma',
    },
    {
        id: 4,
        priority: 'medium',
        title: 'AI Tabanlı Analitik Uygula',
        description: 'Stok yönetimi ve talep tahmini için öngörücü analitik kullanın. Operasyonlarda %30 verimlilik artışı bekleniyor.',
        impact: 'Orta Etki',
        category: 'Operasyon',
        icon: Zap,
        metrics: '%30 verimlilik kazancı',
    },
    {
        id: 5,
        priority: 'low',
        title: 'Siber Güvenlik Çerçevesini Geliştir',
        description: 'SOC 2 Tip II uyumluluğu için güvenlik altyapısını yükseltin. Bu, müşteri güvenini artıracak ve kurumsal sözleşmelerin önünü açacaktır.',
        impact: 'Düşük Etki',
        category: 'Güvenlik',
        icon: Shield,
        metrics: 'Uyumluluk hazırlığı',
    },
    {
        id: 6,
        priority: 'low',
        title: 'Gelir Kaynaklarını Çeşitlendir',
        description: 'Mevcut tekliflerin yanında SaaS abonelik modellerini araştırın. Tekrarlayan gelir, nakit akışını dengeleyebilir.',
        impact: 'Düşük Etki',
        category: 'Strateji',
        icon: Target,
        metrics: 'Gelir kararlılığı +%40',
    },
];

const AIRecommendations = () => {
    const navigate = useNavigate();

    const getPriorityColor = (p) => {
        switch (p) {
            case 'high': return 'priority-high';
            case 'medium': return 'priority-medium';
            case 'low': return 'priority-low';
            default: return '';
        }
    };

    return (
        <div className="page-container recs-page">
            <div className="recs-header animate-fade-in-up">
                <div className="recs-header-left">
                    <Button variant="ghost" icon={ArrowLeft} onClick={() => navigate('/results')}>
                        Geri
                    </Button>
                </div>
                <div className="recs-header-content">
                    <div className="recs-icon">
                        <Sparkles size={24} />
                    </div>
                    <h1 className="section-title">Yapay Zeka Önerileri</h1>
                    <p className="section-subtitle">İş performansınızı artırmak için kişiselleştirilmiş stratejiler</p>
                </div>
            </div>

            {/* Priority Filter */}
            <div className="recs-filters animate-fade-in-up stagger-1">
                <span className="filter-label">Önceliğe göre filtrele:</span>
                <div className="filter-chips">
                    <button className="filter-chip active">Tümü</button>
                    <button className="filter-chip high">Yüksek</button>
                    <button className="filter-chip medium">Orta</button>
                    <button className="filter-chip low">Düşük</button>
                </div>
            </div>

            {/* Recommendation Cards */}
            <div className="recs-list">
                {recommendations.map((rec, i) => {
                    const Icon = rec.icon;
                    return (
                        <Card
                            key={rec.id}
                            className={`rec-card animate-fade-in-up stagger-${Math.min(i + 2, 6)}`}
                        >
                            <div className="rec-top">
                                <div className={`rec-priority-badge ${getPriorityColor(rec.priority)}`}>
                                    {rec.impact}
                                </div>
                                <span className="rec-category">{rec.category}</span>
                            </div>

                            <div className="rec-body">
                                <div className="rec-icon-wrap">
                                    <Icon size={22} />
                                </div>
                                <div className="rec-content">
                                    <h3 className="rec-title">{rec.title}</h3>
                                    <p className="rec-desc">{rec.description}</p>
                                </div>
                            </div>

                            <div className="rec-footer">
                                <div className="rec-metric">
                                    <TrendingUp size={14} />
                                    <span>{rec.metrics}</span>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>

            {/* Back to Dashboard */}
            <div className="recs-cta animate-fade-in-up">
                <Button variant="secondary" size="lg" icon={BarChart3} onClick={() => navigate('/dashboard')}>
                    Panele Dön
                </Button>
            </div>
        </div>
    );
};

export default AIRecommendations;
