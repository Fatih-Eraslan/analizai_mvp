import { useState } from 'react';
import './Input.css';

const Input = ({
    label,
    type = 'text',
    value,
    onChange,
    placeholder = '',
    error = '',
    icon: Icon,
    textarea = false,
    rows = 4,
    required = false,
    name,
}) => {
    const [focused, setFocused] = useState(false);
    const hasValue = value && value.length > 0;

    const inputProps = {
        type,
        value,
        onChange,
        placeholder: focused ? placeholder : '',
        name,
        required,
        onFocus: () => setFocused(true),
        onBlur: () => setFocused(false),
        className: `input-field ${error ? 'input-error' : ''}`,
    };

    return (
        <div className={`input-group ${focused ? 'focused' : ''} ${hasValue ? 'has-value' : ''}`}>
            {Icon && (
                <div className="input-icon">
                    <Icon size={18} />
                </div>
            )}
            {textarea ? (
                <textarea {...inputProps} rows={rows} />
            ) : (
                <input {...inputProps} />
            )}
            {label && <label className="input-label">{label}</label>}
            {error && <span className="input-error-text">{error}</span>}
        </div>
    );
};

export default Input;
