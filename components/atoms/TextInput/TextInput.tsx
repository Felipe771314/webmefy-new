import React from 'react';
import classNames from 'classnames';
import styles from './TextInput.module.scss';

export interface TextInputProps {
  id?: string;
  name?: string;
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  type?: 'text' | 'password' | 'email' | 'search' | 'number';
}

/**
 * Átomo: Input de texto (Bootstrap).
 */
const TextInput: React.FC<TextInputProps> = ({
  id,
  name,
  value,
  placeholder,
  onChange,
  disabled = false,
  type = 'text',
}) => {
  const inputClass = classNames('form-control', styles.customInput);

  return (
    <input
      id={id}
      name={name}
      className={inputClass}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      disabled={disabled}
    />
  );
};

export default TextInput;
