import { Loader2 } from 'lucide-react';
import './Button.css';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    fullWidth = false,
    icon: Icon,
    onClick,
    type = 'button',
    className = '',
}) => {
    return (
        <button
            type={type}
            className={`btn btn-${variant} btn-${size} ${fullWidth ? 'btn-full' : ''} ${className}`}
            onClick={onClick}
            disabled={disabled || loading}
        >
            {loading ? (
                <Loader2 size={18} className="btn-spinner" />
            ) : Icon ? (
                <Icon size={18} />
            ) : null}
            {children && <span>{children}</span>}
        </button>
    );
};

export default Button;
