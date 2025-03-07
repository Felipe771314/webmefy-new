export { default } from './<%= name %>';

import React from 'react';
import styles from './<%= name %>.module.scss';

interface <%= name %>Props {
  title: string;
}

const <%= name %>: React.FC<<%= name %>Props> = ({ title }) => {
  return (
    <div className={styles.container}>
      <h2>{title}</h2>
    </div>
  );
};

export default <%= name %>;


