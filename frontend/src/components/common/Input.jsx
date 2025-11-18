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
    <div className={clsx('mb-3', className)}>
      {label ? (
        <label htmlFor={id} className="form-label fw-semibold text-muted">
          {label}
          {required ? <span className="text-danger ms-1">*</span> : null}
        </label>
      ) : null}

      <div className={clsx('position-relative flex items-center', Icon ? 'gap-2' : null)}>
        {Icon ? (
          <Icon
            size={18}
            className="text-muted position-absolute top-50 start-0 translate-middle-y ms-3"
          />
        ) : null}
        <Component
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={clsx(inputClasses, Icon ? 'ps-5' : null)}
          {...props}
        />
      </div>

      {helperText && !error ? <div className="form-text text-muted">{helperText}</div> : null}
      {error ? <div className="invalid-feedback d-block">{error}</div> : null}
    </div>
  );
};

export default Input;

