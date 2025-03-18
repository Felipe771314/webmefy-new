import React from 'react';
import TextInput, { TextInputProps } from '../../atoms/TextInput/TextInput';
import classNames from 'classnames';

export interface FormInputGroupProps extends TextInputProps {
  label: string;
  helpText?: string;
  containerClassName?: string;
}

/**
 * Molécula: FormInputGroup
 * Combina una etiqueta, un input y un mensaje de ayuda.
 */
const FormInputGroup: React.FC<FormInputGroupProps> = ({
  label,
  helpText,
  containerClassName,
  id,
  ...inputProps
}) => {
  return (
    <div className={classNames('mb-3', containerClassName)}>
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <TextInput id={id} {...inputProps} />
      {helpText && <div className="form-text">{helpText}</div>}
    </div>
  );
};

export default FormInputGroup;
