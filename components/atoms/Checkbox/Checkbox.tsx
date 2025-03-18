import React from 'react';

export interface CheckboxProps {
  id?: string;
  label?: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

/**
 * Átomo: Checkbox (Bootstrap).
 */
const Checkbox: React.FC<CheckboxProps> = ({
  id,
  label,
  checked,
  onChange,
  disabled = false,
}) => {
  // Genera un id único si no se proporcionó uno
  const generatedId = React.useId();
  const checkboxId = id || generatedId;

  return (
    <div className="form-check">
      <input
        id={checkboxId}
        type="checkbox"
        className="form-check-input"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      {label && (
        <label htmlFor={checkboxId} className="form-check-label">
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;
