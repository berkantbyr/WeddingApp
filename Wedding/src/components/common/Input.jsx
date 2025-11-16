import React from 'react';
import clsx from 'clsx';

const Input = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  helperText,
  required = false,
  as = 'input',
  icon: Icon,
  className,
  ...props
}) => {
  const Component = as;
  const inputClasses = clsx(
    'form-control bg-white/90 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/30 shadow-sm py-2.5',
    {
      'is-invalid': Boolean(error)
    }
  );

  return (
    <div className={clsx('mb-0', className)} style={{ marginBottom: '16px' }}>
      {label ? (
        <label 
          htmlFor={id} 
          className="form-label d-block mb-2"
          style={{
            fontSize: '14px',
            fontWeight: '600',
            color: '#1e293b',
            letterSpacing: '0.2px'
          }}
        >
          {label}
          {required ? <span className="text-danger ms-1" style={{ fontSize: '14px' }}>*</span> : null}
        </label>
      ) : null}

      <div className={clsx('position-relative', Icon ? 'd-flex align-items-center' : null)}>
        {Icon ? (
          <Icon
            size={18}
            className="text-muted position-absolute"
            style={{
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 1
            }}
          />
        ) : null}
        <Component
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={clsx(
            'form-control',
            Icon ? 'ps-5' : '',
            error ? 'is-invalid' : ''
          )}
          style={{
            padding: Icon ? '12px 16px 12px 48px' : '12px 16px',
            fontSize: '15px',
            border: error 
              ? '2px solid #ef4444' 
              : '2px solid #e2e8f0',
            borderRadius: '12px',
            background: '#ffffff',
            color: '#1e293b',
            transition: 'all 0.3s ease',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
          }}
          onFocus={(e) => {
            if (!error) {
              e.target.style.borderColor = '#6366f1';
              e.target.style.boxShadow = '0 0 0 4px rgba(99, 102, 241, 0.1)';
            }
          }}
          onBlur={(e) => {
            if (!error) {
              e.target.style.borderColor = '#e2e8f0';
              e.target.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
            }
            if (onBlur) onBlur(e);
          }}
          {...props}
        />
      </div>

      {helperText && !error ? (
        <div 
          className="form-text mt-2"
          style={{
            fontSize: '13px',
            color: '#64748b',
            lineHeight: '1.4'
          }}
        >
          {helperText}
        </div>
      ) : null}
      {error ? (
        <div 
          className="d-flex align-items-center gap-1 mt-2"
          style={{
            fontSize: '13px',
            color: '#ef4444'
          }}
        >
          <i className="bi bi-exclamation-circle-fill" style={{ fontSize: '14px' }}></i>
          <span>{error}</span>
        </div>
      ) : null}
    </div>
  );
};

export default Input;

