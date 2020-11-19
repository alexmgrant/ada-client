import React, { useEffect, useState } from 'react';

import './Input.scss';
import { getEventValue } from '../../common/utils';

type InputProps = {
  type?: string;
  name: string;
  placeholder: string;
  onInputChange: Function;
};

const Input = ({
  type = 'text',
  name,
  placeholder,
  onInputChange,
}: InputProps) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    onInputChange(value);
  }, [value, onInputChange]);

  return (
    <input
      onChange={(event) => setValue(getEventValue(event))}
      type={type}
      name={name}
      placeholder={placeholder}
      className="ada-c-input"
    />
  );
};

export default Input;
