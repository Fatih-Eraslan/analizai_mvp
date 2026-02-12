import './Card.css';

const Card = ({ children, variant = 'default', className = '', onClick, hover = true }) => {
    return (
        <div
            className={`card card-${variant} ${hover ? 'card-hover' : ''} ${className}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default Card;
