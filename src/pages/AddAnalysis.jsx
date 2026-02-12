import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Building2, Globe, DollarSign, Users, FileText,
    ChevronRight, ChevronLeft, Check
} from 'lucide-react';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import './AddAnalysis.css';

const steps = ['Company Info', 'Financial', 'Details'];

const industries = [
    'Technology', 'Healthcare', 'Finance', 'E-commerce',
    'Manufacturing', 'Education', 'Real Estate', 'SaaS', 'F&B', 'Other'
];

const AddAnalysis = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const [form, setForm] = useState({
        companyName: '',
        industry: '',
        website: '',
        revenue: '',
        employees: '',
        description: '',
        founded: '',
        location: '',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const nextStep = () => {
        if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        if (currentStep > 0) setCurrentStep(currentStep - 1);
    };

    const handleSubmit = () => {
        navigate('/loading');
    };

    return (
        <div className="page-container add-analysis">
            <div className="add-header animate-fade-in-up">
                <h1 className="section-title">New Analysis</h1>
                <p className="section-subtitle">Enter business details for AI-powered analysis</p>
            </div>

            {/* Step Progress */}
            <div className="step-progress animate-fade-in-up stagger-1">
                {steps.map((step, i) => (
                    <div key={step} className={`step-item ${i === currentStep ? 'active' : ''} ${i < currentStep ? 'completed' : ''}`}>
                        <div className="step-circle">
                            {i < currentStep ? <Check size={14} /> : i + 1}
                        </div>
                        <span className="step-label">{step}</span>
                        {i < steps.length - 1 && <div className="step-connector" />}
                    </div>
                ))}
            </div>

            <Card className="form-card animate-fade-in-up stagger-2" hover={false}>
                {/* Step 1: Company Info */}
                {currentStep === 0 && (
                    <div className="form-step">
                        <Input
                            label="Company Name"
                            name="companyName"
                            value={form.companyName}
                            onChange={handleChange}
                            icon={Building2}
                            required
                        />
                        <div className="industry-selector">
                            <label className="field-label">Industry</label>
                            <div className="industry-grid">
                                {industries.map((ind) => (
                                    <button
                                        key={ind}
                                        type="button"
                                        className={`industry-chip ${form.industry === ind ? 'selected' : ''}`}
                                        onClick={() => setForm({ ...form, industry: ind })}
                                    >
                                        {ind}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <Input
                            label="Website"
                            name="website"
                            value={form.website}
                            onChange={handleChange}
                            icon={Globe}
                            placeholder="https://example.com"
                        />
                    </div>
                )}

                {/* Step 2: Financial */}
                {currentStep === 1 && (
                    <div className="form-step">
                        <Input
                            label="Annual Revenue (USD)"
                            name="revenue"
                            value={form.revenue}
                            onChange={handleChange}
                            icon={DollarSign}
                            placeholder="e.g. 5,000,000"
                        />
                        <Input
                            label="Number of Employees"
                            name="employees"
                            value={form.employees}
                            onChange={handleChange}
                            icon={Users}
                            placeholder="e.g. 50"
                        />
                        <Input
                            label="Founded Year"
                            name="founded"
                            value={form.founded}
                            onChange={handleChange}
                            placeholder="e.g. 2020"
                        />
                        <Input
                            label="Location"
                            name="location"
                            value={form.location}
                            onChange={handleChange}
                            placeholder="e.g. San Francisco, CA"
                        />
                    </div>
                )}

                {/* Step 3: Details */}
                {currentStep === 2 && (
                    <div className="form-step">
                        <Input
                            label="Business Description"
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            icon={FileText}
                            textarea
                            rows={5}
                            placeholder="Describe the core business, products, services, and target market..."
                        />

                        <Card variant="gradient" hover={false} className="summary-card">
                            <h3 className="summary-title">Analysis Summary</h3>
                            <div className="summary-grid">
                                <div className="summary-item">
                                    <span className="summary-label">Company</span>
                                    <span className="summary-value">{form.companyName || '—'}</span>
                                </div>
                                <div className="summary-item">
                                    <span className="summary-label">Industry</span>
                                    <span className="summary-value">{form.industry || '—'}</span>
                                </div>
                                <div className="summary-item">
                                    <span className="summary-label">Revenue</span>
                                    <span className="summary-value">{form.revenue ? `$${form.revenue}` : '—'}</span>
                                </div>
                                <div className="summary-item">
                                    <span className="summary-label">Employees</span>
                                    <span className="summary-value">{form.employees || '—'}</span>
                                </div>
                            </div>
                        </Card>
                    </div>
                )}

                {/* Navigation */}
                <div className="form-actions">
                    {currentStep > 0 && (
                        <Button variant="secondary" onClick={prevStep} icon={ChevronLeft}>
                            Back
                        </Button>
                    )}
                    <div style={{ flex: 1 }} />
                    {currentStep < steps.length - 1 ? (
                        <Button onClick={nextStep} icon={ChevronRight}>
                            Continue
                        </Button>
                    ) : (
                        <Button onClick={handleSubmit}>
                            Start Analysis
                        </Button>
                    )}
                </div>
            </Card>
        </div>
    );
};

export default AddAnalysis;
