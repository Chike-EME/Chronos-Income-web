'use client';

import { useEffect, useState } from 'react';
import {
  ButtonGroup,
  Container,
  EllipseIcon,
  InputContainer,
  InputWrapper,
  Logo,
  Requirement,
  RequirementsContainer,
  SubTitle,
  Title,
  TitleCard,
  Wrapper,
} from '../styles';
import { Button, ErrorMessage, Input, Label } from '@/styles/global';
import { Modal } from '@/components/Modals';
import { useRouter, useSearchParams } from 'next/navigation';

type ModalType =
  | { type: 'none' }
  | { type: 'success' }
  | { type: 'error' }
  | { type: 'diferentError' }
  | { type: 'sameError' };

export default function ForgotPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState<ModalType>({ type: 'none' });
  const [triedSend, setTriedSend] = useState(false);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState({
    new: [true, true, true, true],
    confirm: '',
  });

  const handleSubmit = async () => {
    //if (!code) return;

    try {
      setLoading(true);
      setTriedSend(true);

      if (!hasErrors()) {
        setLoading(false);
        return;
      }

      console.log(
        'Payload: \n code:',
        code,
        'password:',
        newPassword,
        'passwordConfirmation:',
        confirmPassword,
      );

      setModal({ type: 'success' });
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const hasErrors = () => {
    const errors = {
      new: [true, true, true, true],
      confirm: '',
    };

    let valid = true;

    if (!confirmPassword && newPassword) {
      // confirmation
      errors.confirm = '*Confirme a nova senha.';
      valid = false;
    } else if (newPassword !== confirmPassword) {
      errors.confirm = '*As senhas não coincidem.';
      valid = false;
    }

    // empty password
    if (!newPassword && !triedSend) {
      setPasswordErrors(errors);
      return valid;
    } else if (newPassword.length < 8) {
      // password less than 8
      errors.new[0] = false;
      valid = false;
    }

    // capital letters
    if (!/(?=.*[A-Z])/.test(newPassword)) {
      errors.new[1] = false;
      valid = false;
    }

    // lowercase letters
    if (!/(?=.*[a-z])/.test(newPassword)) {
      errors.new[2] = false;
      valid = false;
    }

    // special letters
    if (!/(?=.*[!@#$%&*().])/.test(newPassword)) {
      errors.new[3] = false;
      valid = false;
    }

    setPasswordErrors(errors);
    return valid;
  };

  useEffect(() => {
    console.log('antes:', passwordErrors);
    hasErrors();
    console.log('depois:', passwordErrors);
  }, [newPassword]);

  useEffect(() => {
    if (triedSend) hasErrors();
  }, [newPassword, confirmPassword]);

  useEffect(() => {
    if (triedSend) return;
    if (newPassword !== '' && confirmPassword !== '') {
      setTriedSend(true);
      hasErrors();
    }
  }, [newPassword, confirmPassword]);

  return (
    <Wrapper>
      <Container>
        <Logo
          style={{ marginBottom: '32px' }}
          src="/img/login/Logo.svg"
          alt="Chronos Income"
        />
        <Title>Redefinir a senha</Title>

        <InputContainer style={{ marginBottom: '32px' }}>
          <Label>Insira a nova senha</Label>

          <InputWrapper style={{ marginBottom: '20px' }}>
            <Input
              type={showNew ? 'text' : 'password'}
              placeholder="Digite sua senha"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              hasError={passwordErrors.new.some(e => e === false)}
            />
            <img
              src={
                showNew
                  ? '/img/login/EyeOn.svg'
                  : '/img/login/EyeOff.svg'
              }
              className="icon"
              alt="Ocultar Senha"
              onClick={() => setShowNew(prev => !prev)}
            />
          </InputWrapper>

          <RequirementsContainer style={{ marginBottom: '20px' }}>
            <Requirement $hasErrors={!passwordErrors.new[0]}>
              <EllipseIcon $hasError={!passwordErrors.new[0]} />
              <span>8 Caracteres</span>
            </Requirement>
            <Requirement $hasErrors={!passwordErrors.new[1]}>
              <EllipseIcon $hasError={!passwordErrors.new[1]} />
              <span>1 Letra maiúscula</span>
            </Requirement>
            <Requirement $hasErrors={!passwordErrors.new[2]}>
              <EllipseIcon $hasError={!passwordErrors.new[2]} />
              <span>1 Letra minúscula</span>
            </Requirement>
            <Requirement $hasErrors={!passwordErrors.new[3]}>
              <EllipseIcon $hasError={!passwordErrors.new[3]} />
              <span>1 Caractere especial</span>
            </Requirement>
          </RequirementsContainer>

          <Label>Confirmar nova senha</Label>

          <InputWrapper>
            <Input
              type={showConfirm ? 'text' : 'password'}
              placeholder="Digite sua senha"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              hasError={passwordErrors.confirm !== ''}
            />
            <img
              src={
                showConfirm
                  ? '/img/login/EyeOn.svg'
                  : '/img/login/EyeOff.svg'
              }
              className="icon"
              alt="Ocultar Senha"
              color="black"
              onClick={() => setShowConfirm(prev => !prev)}
            />
            {passwordErrors.confirm !== '' && (
              <ErrorMessage>{passwordErrors.confirm}</ErrorMessage>
            )}
          </InputWrapper>
        </InputContainer>
        <ButtonGroup>
          <Button
            className="colored"
            type="button"
            style={{ height: '46px' }}
            disabled={loading}
            onClick={handleSubmit}
          >
            Salvar
          </Button>
        </ButtonGroup>
      </Container>
      <Modal
        isOpen={modal.type !== 'none'}
        variant={modal.type === 'success' ? 'success' : 'danger'}
        onClose={() => setModal({ type: 'none' })}
        onConfirm={() => {
          setModal({ type: 'none' });
          if (modal.type === 'success') {
            router.push('../');
          }
        }}
        message={
          modal.type === 'success'
            ? 'Senha redefinida com sucesso!'
            : modal.type === 'sameError'
            ? 'A nova senha não pode ser igual a antiga!'
            : 'Erro ao redefinir senha, por favor tente novamente!'
        }
        customClose="none"
        customConfirm="Fechar"
      />
    </Wrapper>
  );
}
