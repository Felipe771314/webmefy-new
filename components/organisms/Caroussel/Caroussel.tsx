import React, { useEffect, useRef, useState } from 'react';
import styles from './Caroussel.module.scss';
export type { CarousselProps };
import Image from 'next/image';

interface CarousselProps {
  title: string;
  items: string[];
  autoPlay?: boolean;
  showArrows?: boolean;
  loop?: boolean;
  transitionType?: 'slide' | 'fade';
  itemStyle?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
  arrowsPosition?: 'inside' | 'outside' | 'bottom';
}

const Caroussel: React.FC<CarousselProps> = ({
  title,
  items = [],
  autoPlay = false,
  showArrows = true,
  loop = false,
  transitionType = 'slide',
  itemStyle = {},
  containerStyle = {},
  arrowsPosition = 'inside',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === items.length - 1) {
        return loop ? 0 : prevIndex;
      }
      return prevIndex + 1;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === 0) {
        return loop ? items.length - 1 : 0;
      }
      return prevIndex - 1;
    });
  };

  useEffect(() => {
    if (autoPlay) {
      timeoutRef.current = setTimeout(() => {
        nextSlide();
      }, 3000);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentIndex, autoPlay]);

  const arrowsClass =
    arrowsPosition === 'outside'
      ? styles.arrowsOutside
      : arrowsPosition === 'bottom'
      ? styles.arrowsBottom
      : styles.arrows;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return (
      <div className={styles.container}>
        <h2>{title}</h2>
        <p>No items to display</p>
      </div>
    );
  }

  return (
    <div className={styles.container} style={containerStyle}>
      <h2>{title}</h2>
      <div
        data-transition={transitionType}
        data-testid="carousel-track"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {(items ?? []).map((item, index) => (
          <div
            key={index}
            className={styles.item + (index === currentIndex ? ' active' : '')}
            style={itemStyle}
          >
            {item.startsWith('http') ? (
              <Image
                src={item}
                alt={`item-${index}`}
                width={800}
                height={400}
                style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
              />
            ) : (
              item
            )}
          </div>
        ))}
      </div>
      {showArrows && (
        <div className={arrowsClass} data-testid={`arrows-${arrowsPosition}`}>
          <button onClick={prevSlide}>{'<'}</button>
          <button onClick={nextSlide}>{'>'}</button>
        </div>
      )}
    </div>
  );
};

export default Caroussel;

export const carousselCases = [
  {
    title: 'Flechas dentro (default)',
    items: Array.from({ length: 10 }, (_, i) => `https://picsum.photos/id/${1031 + i}/800/400`),

    arrowsPosition: 'inside',
  },
  {
    title: 'Flechas afuera',
    items: Array.from({ length: 10 }, (_, i) => `https://picsum.photos/id/${1031 + i}/800/400`),

    arrowsPosition: 'outside',
  },
  {
    title: 'Flechas en la parte inferior',
    items: Array.from({ length: 10 }, (_, i) => `https://picsum.photos/id/${1031 + i}/800/400`),

    arrowsPosition: 'bottom',
  },
  {
    title: 'Sin flechas',
    items: Array.from({ length: 10 }, (_, i) => `https://picsum.photos/id/${1031 + i}/800/400`),

    showArrows: false,
  },
  {
    title: 'Autoplay + loop + bottom arrows',
    items: Array.from({ length: 10 }, (_, i) => `https://picsum.photos/id/${1031 + i}/800/400`),

    autoPlay: true,
    loop: true,
    arrowsPosition: 'bottom',
  },
  {
    title: 'Muchos elementos con flechas fuera',
    items: Array.from({ length: 10 }, (_, i) => `https://picsum.photos/id/${1031 + i}/800/400`),
    arrowsPosition: 'outside',
  },
  {
    title: 'Flechas dentro + autoplay',
    items: Array.from({ length: 10 }, (_, i) => `https://picsum.photos/id/${1031 + i}/800/400`),
    autoPlay: true,
    arrowsPosition: 'inside',
  },
  {
    title: 'Loop sin autoplay con flechas afuera',
    items: Array.from({ length: 10 }, (_, i) => `https://picsum.photos/id/${1031 + i}/800/400`),

    loop: true,
    autoPlay: false,
    arrowsPosition: 'outside',
  },
  {
    title: 'Transición fade con flechas en bottom',
    items: Array.from({ length: 10 }, (_, i) => `https://picsum.photos/id/${1031 + i}/800/400`),

    transitionType: 'fade',
    arrowsPosition: 'bottom',
  },
  {
    title: 'Sin autoplay y sin loop',
    items: Array.from({ length: 10 }, (_, i) => `https://picsum.photos/id/${1031 + i}/800/400`),

    autoPlay: false,
    loop: false,
    arrowsPosition: 'inside',
  },
];
