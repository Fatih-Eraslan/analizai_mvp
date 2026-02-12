import { useNavigate } from 'react-router-dom';
import {
    Plus, TrendingUp, BarChart3, Clock, ChevronRight,
    Briefcase, ArrowUpRight, Activity
} from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import ScoreCard from '../components/ScoreCard';
import ChartPlaceholder from '../components/ChartPlaceholder';
import './Dashboard.css';

const recentAnalyses = [
    { id: 1, name: 'Vizyon Teknoloji', industry: 'Teknoloji', score: 82, date: '2 saat önce', trend: 5 },
    { id: 2, name: 'Yeşil Gıda Ltd.', industry: 'Gıda', score: 67, date: '1 gün önce', trend: -3 },
    { id: 3, name: 'Kent Yapı A.Ş.', industry: 'İnşaat', score: 74, date: '3 gün önce', trend: 8 },
    { id: 4, name: 'Veri Akış Sistemleri', industry: 'Yazılım', score: 91, date: '1 hafta önce', trend: 12 },
];

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="page-container dashboard">
            {/* Welcome Header */}
            <div className="dash-header animate-fade-in-up">
                <div className="dash-welcome">
                    <h1 className="dash-title">İyi Akşamlar, Alex</h1>
                    <p className="dash-subtitle">İşte iş zekası genel bakışınız</p>
                </div>
                <Button icon={Plus} onClick={() => navigate('/add-analysis')}>
                    Yeni Analiz
                </Button>
            </div>

            {/* Stats Row */}
            <div className="dash-stats animate-fade-in-up stagger-1">
                <Card variant="gradient" className="stat-card">
                    <div className="stat-icon-wrap blue">
                        <BarChart3 size={20} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-value">24</span>
                        <span className="stat-label">Toplam Analiz</span>
                    </div>
                </Card>
                <Card variant="gradient" className="stat-card">
                    <div className="stat-icon-wrap purple">
                        <TrendingUp size={20} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-value">78.5</span>
                        <span className="stat-label">Ort. Puan</span>
                    </div>
                </Card>
                <Card variant="gradient" className="stat-card">
                    <div className="stat-icon-wrap green">
                        <Activity size={20} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-value">+12%</span>
                        <span className="stat-label">İyileşme</span>
                    </div>
                </Card>
            </div>

            {/* Charts */}
            <div className="dash-charts animate-fade-in-up stagger-2">
                <ChartPlaceholder type="line" title="Performans Trendi" height={220} />
                <ChartPlaceholder type="bar" title="Kategori Dağılımı" height={220} />
            </div>

            {/* Recent Analyses */}
            <div className="dash-section animate-fade-in-up stagger-3">
                <div className="dash-section-header">
                    <h2 className="section-title">Son Analizler</h2>
                    <button className="see-all-btn">Tümünü Gör <ChevronRight size={16} /></button>
                </div>

                <div className="analysis-list">
                    {recentAnalyses.map((item) => (
                        <Card
                            key={item.id}
                            className="analysis-item"
                            onClick={() => navigate('/results')}
                        >
                            <div className="analysis-left">
                                <div className="analysis-icon">
                                    <Briefcase size={18} />
                                </div>
                                <div className="analysis-info">
                                    <h3 className="analysis-name">{item.name}</h3>
                                    <span className="analysis-meta">
                                        {item.industry} • <Clock size={12} /> {item.date}
                                    </span>
                                </div>
                            </div>
                            <div className="analysis-right">
                                <ScoreCard score={item.score} size="sm" />
                                <ArrowUpRight size={16} className="analysis-arrow" />
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
