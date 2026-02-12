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
        title: 'Optimize Customer Acquisition',
        description: 'Reduce CAC by 18% through targeted digital campaigns and referral program implementation. Focus on high-intent channels.',
        impact: 'High Impact',
        category: 'Growth',
        icon: Users,
        metrics: '$2.4M potential savings',
    },
    {
        id: 2,
        priority: 'high',
        title: 'Expand Market Presence',
        description: 'Enter 3 untapped regional markets with localized strategies. Current market penetration is at 34%, below the 50% industry benchmark.',
        impact: 'High Impact',
        category: 'Market',
        icon: Globe,
        metrics: '16% market share increase',
    },
    {
        id: 3,
        priority: 'medium',
        title: 'Strengthen Financial Reserves',
        description: 'Increase cash reserves by restructuring short-term debt. Improve debt-to-equity ratio from 1.8 to the industry standard of 1.2.',
        impact: 'Medium Impact',
        category: 'Financial',
        icon: DollarSign,
        metrics: 'Risk reduction by 25%',
    },
    {
        id: 4,
        priority: 'medium',
        title: 'Implement AI-Driven Analytics',
        description: 'Deploy predictive analytics for inventory management and demand forecasting. Expected efficiency gain of 30% in operations.',
        impact: 'Medium Impact',
        category: 'Operations',
        icon: Zap,
        metrics: '30% efficiency gain',
    },
    {
        id: 5,
        priority: 'low',
        title: 'Enhance Cybersecurity Framework',
        description: 'Upgrade security infrastructure to meet SOC 2 Type II compliance. This will strengthen client trust and open enterprise-level contracts.',
        impact: 'Low Impact',
        category: 'Security',
        icon: Shield,
        metrics: 'Compliance readiness',
    },
    {
        id: 6,
        priority: 'low',
        title: 'Diversify Revenue Streams',
        description: 'Explore SaaS subscription models alongside existing offerings. Recurring revenue can stabilize cash flow and improve valuation multiples.',
        impact: 'Low Impact',
        category: 'Strategy',
        icon: Target,
        metrics: 'Revenue stability +40%',
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
                        Back
                    </Button>
                </div>
                <div className="recs-header-content">
                    <div className="recs-icon">
                        <Sparkles size={24} />
                    </div>
                    <h1 className="section-title">AI Recommendations</h1>
                    <p className="section-subtitle">Personalized strategies to improve your business performance</p>
                </div>
            </div>

            {/* Priority Filter */}
            <div className="recs-filters animate-fade-in-up stagger-1">
                <span className="filter-label">Filter by priority:</span>
                <div className="filter-chips">
                    <button className="filter-chip active">All</button>
                    <button className="filter-chip high">High</button>
                    <button className="filter-chip medium">Medium</button>
                    <button className="filter-chip low">Low</button>
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
                    Back to Dashboard
                </Button>
            </div>
        </div>
    );
};

export default AIRecommendations;
