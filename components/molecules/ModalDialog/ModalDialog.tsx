import React, { useState } from 'react';
import Button from '../../atoms/Button/Button';

export interface ModalDialogProps {
  title: string;
  content: string;
  primaryActionLabel?: string;
  onPrimaryAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
}

/**
 * Molécula: ModalDialog
 * Diálogo modal con encabezado, cuerpo y acciones.
 */
const ModalDialog: React.FC<ModalDialogProps> = ({
  title,
  content,
  primaryActionLabel = 'Aceptar',
  onPrimaryAction,
  secondaryActionLabel = 'Cancelar',
  onSecondaryAction,
}) => {
  const [show, setShow] = useState(false);

  const openModal = () => setShow(true);
  const closeModal = () => setShow(false);

  return (
    <>
      <Button label="Abrir Modal" onClick={openModal} variant="primary" />
      {show && (
        <div className="modal d-block" tabIndex={-1} role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{title}</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <p>{content}</p>
              </div>
              <div className="modal-footer">
                <Button label={secondaryActionLabel} onClick={() => { onSecondaryAction && onSecondaryAction(); closeModal(); }} variant="secondary" />
                <Button label={primaryActionLabel} onClick={() => { onPrimaryAction && onPrimaryAction(); closeModal(); }} variant="primary" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalDialog;
