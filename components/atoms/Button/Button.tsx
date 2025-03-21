import React from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';

export interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark'
    | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onHover?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  /**
   * Alineación del contenido dentro del botón.
   * Esto también afectará la posición del botón en su contenedor si se aplican estilos adecuados.
   */
  alignment?: 'left' | 'center' | 'right';
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  icon,
  fullWidth = false,
  type = 'button',
  onHover,
  onFocus,
  onBlur,
  alignment = 'left',
}) => {
  return (
    <button
      className={classNames(styles.button, styles[variant], styles[size], {
        [styles.fullWidth]: fullWidth,
        [styles.alignLeft]: alignment === 'left',
        [styles.alignCenter]: alignment === 'center',
        [styles.alignRight]: alignment === 'right',
      })}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={onHover}
      onFocus={onFocus}
      onBlur={onBlur}
      type={type}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {label}
    </button>
  );
};

export default Button;
