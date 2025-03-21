import React from 'react';
import classNames from 'classnames';
import styles from './Badge.module.scss';

export interface BadgeProps {
  text: string;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
}

/**
 * Átomo: Badge (Bootstrap).
 */
const Badge: React.FC<BadgeProps> = ({ text, variant = 'primary' }) => {
  // Usamos `bg-*` para Bootstrap v5 (en v4 era `badge-*`)
  const badgeClass = classNames('badge', `bg-${variant}`, styles.customBadge);

  return <span className={badgeClass}>{text}</span>;
};

export default Badge;
