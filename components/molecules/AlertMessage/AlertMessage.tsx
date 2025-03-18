import React, { useState } from 'react';
import Button from '../../atoms/Button/Button';

export interface AlertMessageProps {
  message: string;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
}

/**
 * Molécula: AlertMessage
 * Alerta que se puede cerrar manualmente.
 */
const AlertMessage: React.FC<AlertMessageProps> = ({
  message,
  variant = 'primary',
}) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className={`alert alert-${variant} d-flex justify-content-between align-items-center`} role="alert">
      <span>{message}</span>
      <Button label="X" onClick={() => setVisible(false)} variant="outline-dark" />
    </div>
  );
};

export default AlertMessage;
