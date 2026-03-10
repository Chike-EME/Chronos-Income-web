'use client';

import {
  Overlay,
  ModalBox,
  IconWrapper,
  ButtonGroup,
  Button,
} from './styles';

interface ModalProps {
  isOpen: boolean;
  variant: 'warning' | 'danger' | 'success' | 'info';
  onClose: () => void;
  onConfirm?: () => void;
  message?: string;
  customTitle?: string;
  customClose?: string;
  customConfirm?: string;
}

export function Modal({
  isOpen,
  variant,
  onClose,
  onConfirm,
  message,
  customTitle,
  customClose,
  customConfirm,
}: ModalProps) {
  if (!isOpen) return null;

  const variantConfig = {
    warning: {
      title: 'Atenção!',
      src: '/img/modals/WarningIcon.svg',
      primaryColor: '#E1CF36',
      secondaryColor: '#FEFEFE',
    },
    danger: {
      title: 'Atenção!',
      src: '/img/modals/DangerIcon.svg',
      primaryColor: '#DE3737',
      secondaryColor: '#FEFEFE',
    },
    success: {
      title: 'Sucesso!',
      src: '/img/modals/SucessIcon.svg',
      primaryColor: '#2DAC3E',
      secondaryColor: '#FEFEFE',
    },
    info: {
      title: 'Atenção!',
      src: '/img/modals/WarningIcon.svg',
      primaryColor: '#E1CF36',
      secondaryColor: '#FEFEFD',
    },
  };

  const {
    title: defaultTitle,
    src,
    primaryColor,
    secondaryColor,
  } = variantConfig[variant];
  const title = customTitle || defaultTitle;

  return (
    <Overlay
      onClick={() => (customClose === 'none' ? undefined : onClose())}
    >
      <ModalBox onClick={e => e.stopPropagation()}>
        <IconWrapper>
          <img
            src={src}
            alt={title}
            style={{ width: 44, height: 44 }}
          />
        </IconWrapper>
        <h2>{title}</h2>

        <h3>{message && <p>{message}</p>}</h3>

        <ButtonGroup>
          {customClose === 'none' ? (
            <Button
              $primary
              $borderColor={primaryColor}
              style={{ background: primaryColor, width: '422px' }}
              onClick={onConfirm}
            >
              {customConfirm ? customConfirm : 'Fechar'}
            </Button>
          ) : (
            <>
              <Button
                $borderColor={primaryColor}
                style={{
                  background: secondaryColor,
                  color: primaryColor,
                }}
                onClick={onClose}
              >
                {customClose ? customClose : 'Cancelar'}
              </Button>
              <Button
                $primary
                $borderColor={primaryColor}
                style={{ background: primaryColor }}
                onClick={onConfirm}
              >
                {customConfirm ? customConfirm : 'Continuar'}
              </Button>
            </>
          )}
        </ButtonGroup>
      </ModalBox>
    </Overlay>
  );
}
