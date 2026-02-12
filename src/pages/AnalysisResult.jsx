import { useNavigate } from 'react-router-dom';
import {
    Sparkles, TrendingUp, Shield, Target,
    DollarSign, ArrowRight
} from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import ScoreCard from '../components/ScoreCard';
import ChartPlaceholder from '../components/ChartPlaceholder';
import './AnalysisResult.css';

const categoryScores = [
    { label: 'Finansal Sağlık', score: 78, icon: DollarSign, trend: 5 },
    { label: 'Pazar Konumu', score: 65, icon: Target, trend: -2 },
    { label: 'Büyüme Potansiyeli', score: 88, icon: TrendingUp, trend: 12 },
    { label: 'Risk Değerlendirmesi', score: 72, icon: Shield, trend: 3 },
];

const AnalysisResult = () => {
    const navigate = useNavigate();

    return (
        <div className="page-container results-page">
            {/* Overall Score */}
            <div className="results-hero animate-fade-in-up">
                <div className="results-hero-bg" />
                <div className="results-hero-content">
                    <ScoreCard score={76} size="lg" label="Genel Puan" trend={8} />
                    <div className="results-hero-info">
                        <h1 className="results-company">Vizyon Teknoloji</h1>
                        <span className="results-badge">Teknoloji • Yazılım</span>
                    </div>
                </div>
            </div>

            {/* Category Scores */}
            <div className="results-section animate-fade-in-up stagger-1">
                <h2 className="section-title">Kategori Puanları</h2>
                <div className="category-grid">
                    {categoryScores.map((cat) => {
                        const Icon = cat.icon;
                        return (
                            <Card key={cat.label} variant="gradient" className="category-card">
                                <div className="category-header">
                                    <div className="category-icon">
                                        <Icon size={18} />
                                    </div>
                                    <span className={`category-trend ${cat.trend >= 0 ? 'up' : 'down'}`}>
                                        {cat.trend >= 0 ? '+' : ''}{cat.trend}%
                                    </span>
                                </div>
                                <div className="category-score-wrap">
                                    <span className="category-score">{cat.score}</span>
                                    <span className="category-max">/100</span>
                                </div>
                                <p className="category-label">{cat.label}</p>
                                <div className="category-bar">
                                    <div
                                        className="category-bar-fill"
                                        style={{ width: `${cat.score}%` }}
                                    />
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </div>

            {/* Charts */}
            <div className="results-section animate-fade-in-up stagger-2">
                <h2 className="section-title">Detaylı Dağılım</h2>
                <div className="results-charts">
                    <ChartPlaceholder type="pie" title="Puan Dağılımı" height={240} />
                    <ChartPlaceholder type="bar" title="Metrik Karşılaştırması" height={240} />
                </div>
            </div>

            {/* Key Findings */}
            <div className="results-section animate-fade-in-up stagger-3">
                <h2 className="section-title">Önemli Bulgular</h2>
                <div className="findings-list">
                    {[
                        { text: 'Yıllık %23 güçlü gelir artışı ivmesi', type: 'positive' },
                        { text: 'Pazar payı 4. çeyrekte %4.2 arttı', type: 'positive' },
                        { text: 'Müşteri edinme maliyeti optimizasyonu gerekli', type: 'warning' },
                        { text: 'Borç/özsermaye oranı sektör ortalamasının üzerinde', type: 'negative' },
                    ].map((finding, i) => (
                        <Card key={i} className={`finding-item finding-${finding.type}`} hover={false}>
                            <div className={`finding-dot ${finding.type}`} />
                            <span>{finding.text}</span>
                        </Card>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div className="results-cta animate-fade-in-up stagger-4">
                <Button
                    size="lg"
                    icon={Sparkles}
                    onClick={() => navigate('/recommendations')}
                >
                    Yapay Zeka Önerilerini Gör
                    <ArrowRight size={18} />
                </Button>
            </div>
        </div>
    );
};

export default AnalysisResult;
