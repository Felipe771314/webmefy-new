/* eslint-disable @next/next/no-img-element */
import React from 'react';
import classNames from 'classnames';
import styles from './Card.module.scss';
import Button from '../../atoms/Button/Button';

export interface CardProps {
  title: string;
  content: string;
  imageUrl?: string;
  onCardClick?: () => void;
  actionsAlignment?: 'left' | 'center' | 'right';
  primaryButtonLabel?: string;
  primaryButtonOnClick?: () => void;
  primaryButtonAlignment?: 'left' | 'center' | 'right';
  secondaryButtonLabel?: string;
  secondaryButtonOnClick?: () => void;
  secondaryButtonAlignment?: 'left' | 'center' | 'right';
}

const Card: React.FC<CardProps> = ({
  title,
  content,
  imageUrl,
  onCardClick,
  actionsAlignment = 'left',
  primaryButtonLabel = 'Primary Action',
  primaryButtonOnClick,
  primaryButtonAlignment = 'left',
  secondaryButtonLabel = 'Secondary Action',
  secondaryButtonOnClick,
  secondaryButtonAlignment = 'left',
}) => {
  return (
    <div className={styles.card} onClick={onCardClick}>
      {imageUrl && <img src={imageUrl} alt={title} className={styles.image} />}
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.content}>{content}</p>
      <div
        className={classNames(styles.actions, {
          [styles.alignLeft]: actionsAlignment === 'left',
          [styles.alignCenter]: actionsAlignment === 'center',
          [styles.alignRight]: actionsAlignment === 'right',
        })}
      >
        <Button
          label={primaryButtonLabel}
          onClick={primaryButtonOnClick}
          alignment={primaryButtonAlignment}
          variant="primary"
        />
        <Button
          label={secondaryButtonLabel}
          onClick={secondaryButtonOnClick}
          alignment={secondaryButtonAlignment}
          variant="secondary"
        />
      </div>
    </div>
  );
};

export default Card;
