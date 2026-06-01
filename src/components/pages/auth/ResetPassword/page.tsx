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
  Title,
  Wrapper,
} from '../styles';
import { Button, ErrorMessage, Input, Label } from '@/styles/global';
import { Modal } from '@/components/Modals';
import { useRouter, useSearchParams } from 'next/navigation';
import { useResetPassword } from '@/components/services/auth/useResetPassword';

type ModalType = { type: 'none' } | { type: 'success' } | { type: 'error' };

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') ?? '';

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

  const { mutate: submitReset, isPending } = useResetPassword({
    onSuccess: () => setModal({ type: 'success' }),
    onError: () => setModal({ type: 'error' }),
  });

  function validate(): boolean {
    const errors = { new: [true, true, true, true], confirm: '' };
    let valid = true;

    if (!newPassword) {
      setPasswordErrors(errors);
      return false;
    }
    if (newPassword.length < 8) {
      errors.new[0] = false;
      valid = false;
    }
    if (!/(?=.*[A-Z])/.test(newPassword)) {
      errors.new[1] = false;
      valid = false;
    }
    if (!/(?=.*[a-z])/.test(newPassword)) {
      errors.new[2] = false;
      valid = false;
    }
    if (!/(?=.*[!@#$%&*(.).])/.test(newPassword)) {
      errors.new[3] = false;
      valid = false;
    }

    if (!confirmPassword) {
      errors.confirm = '*Confirme a nova senha.';
      valid = false;
    } else if (newPassword !== confirmPassword) {
      errors.confirm = '*As senhas não coincidem.';
      valid = false;
    }

    setPasswordErrors(errors);
    return valid;
  }

  useEffect(() => {
    if (triedSend) validate();
  }, [newPassword, confirmPassword]);

  function handleSubmit() {
    setTriedSend(true);
    if (!validate()) return;
    submitReset({ token, newPassword });
  }

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
              hasError={passwordErrors.new.some(e => !e)}
            />
            <img
              src={showNew ? '/img/login/EyeOn.svg' : '/img/login/EyeOff.svg'}
              className="icon"
              alt="Mostrar/Ocultar"
              onClick={() => setShowNew(p => !p)}
            />
          </InputWrapper>

          <RequirementsContainer style={{ marginBottom: '20px' }}>
            {[
              '8 Caracteres',
              '1 Letra maiúscula',
              '1 Letra minúscula',
              '1 Caractere especial',
            ].map((label, i) => {
              console.log(
                `req[${i}]`,
                passwordErrors.new[i],
                '→ $hasErrors:',
                !passwordErrors.new[i],
              );
              return (
                <Requirement key={i} $hasErrors={!passwordErrors.new[i]}>
                  <EllipseIcon $hasError={!passwordErrors.new[i]} />
                  <span>{label}</span>
                </Requirement>
              );
            })}
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
                showConfirm ? '/img/login/EyeOn.svg' : '/img/login/EyeOff.svg'
              }
              className="icon"
              alt="Mostrar/Ocultar"
              onClick={() => setShowConfirm(p => !p)}
            />
            {passwordErrors.confirm && (
              <ErrorMessage>{passwordErrors.confirm}</ErrorMessage>
            )}
          </InputWrapper>
        </InputContainer>

        <ButtonGroup>
          <Button
            className="colored"
            type="button"
            style={{ height: '46px' }}
            disabled={isPending}
            onClick={handleSubmit}
          >
            {isPending ? 'Salvando...' : 'Salvar'}
          </Button>
        </ButtonGroup>
      </Container>

      <Modal
        isOpen={modal.type !== 'none'}
        variant={modal.type === 'success' ? 'success' : 'danger'}
        onClose={() => setModal({ type: 'none' })}
        onConfirm={() => {
          setModal({ type: 'none' });
          if (modal.type === 'success') router.push('/');
        }}
        message={
          modal.type === 'success'
            ? 'Senha redefinida com sucesso!'
            : 'Erro ao redefinir senha, por favor tente novamente!'
        }
        customClose="none"
        customConfirm="Fechar"
      />
    </Wrapper>
  );
}
