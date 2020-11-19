import React from 'react';
import './Link.scss';

type LinkProps = {
  children: any;
};

const Link = ({ children }: LinkProps) => (
  <span className="ada-c-link">{children}</span>
);

export default Link;
