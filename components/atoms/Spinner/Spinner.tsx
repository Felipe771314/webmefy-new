import React from 'react';
import classNames from 'classnames';

export interface SpinnerProps {
  variant?: 'border' | 'grow';
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Átomo: Spinner (Bootstrap).
 * Asegúrate de importar 'bootstrap/dist/css/bootstrap.min.css' en tu configuración de Storybook o globalmente.
 */
const Spinner: React.FC<SpinnerProps> = ({
  variant = 'border',
  color = 'primary',
  size = 'md',
}) => {
  const spinnerClass = classNames(
    `spinner-${variant}`,
    `text-${color}`,
    {
      [`spinner-${variant}-sm`]: size === 'sm',
    }
  );

  // Para el tamaño "lg", agregamos estilos inline ya que Bootstrap no lo define por defecto.
  const style = size === 'lg' ? { width: '3rem', height: '3rem' } : {};

  return <div className={spinnerClass} role="status" style={style} />;
};

export default Spinner;
