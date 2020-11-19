import React from 'react';

import './Card.scss';

type CardProps = {
  children?: any;
  secondary?: boolean;
};

const renderClass = (className: string) => (apply: boolean) =>
  apply ? ` ada-c-card--${className}` : '';

const Card = ({ children, secondary = false }: CardProps) => {
  const isSecondary = renderClass('secondary');

  return (
    <div className={`ada-c-card${isSecondary(secondary)}`}>{children}</div>
  );
};

export default Card;
