import React from 'react';
import clsx from 'clsx';

const variantClassMap = {
  primary: 'btn btn-primary bg-primary border-primary hover:bg-secondary hover:border-secondary',
  outline: 'btn btn-outline-primary text-primary border-primary hover:bg-primary hover:text-white',
  light: 'btn btn-light text-dark border-light hover:bg-primary hover:text-white',
  link: 'btn btn-link text-primary hover:text-secondary'
};

const sizeClassMap = {
  sm: 'btn-sm px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'btn-lg px-5 py-3 text-lg'
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  className,
  icon: Icon,
  iconPosition = 'left',
  isLoading = false,
  disabled = false,
  fullWidth = false,
  ...props
}) => {
  const classes = clsx(
    'inline-flex items-center justify-center gap-2 font-semibold transition duration-200',
    variantClassMap[variant],
    sizeClassMap[size],
    {
      'opacity-75 pointer-events-none': isLoading || disabled,
      'w-100': fullWidth
    },
    className
  );

  return (
    <button type={type} className={classes} disabled={disabled || isLoading} {...props}>
      {Icon && iconPosition === 'left' ? <Icon size={18} /> : null}
      <span>{isLoading ? 'Lütfen bekleyin...' : children}</span>
      {Icon && iconPosition === 'right' ? <Icon size={18} /> : null}
    </button>
  );
};

export default Button;

