'use client';

import { useState } from 'react';
import {
  ButtonGroup,
  Container,
  InputContainer,
  Logo,
  SubTitle,
  Title,
  TitleCard,
  Wrapper,
} from '../styles';
import { Button, Input, Label } from '@/styles/global';
import { Modal } from '@/components/Modals';
import { useRouter } from 'next/navigation';
import { useForgotPassword } from '@/components/services/auth/useForgotPassword';

type ModalType = { type: 'none' } | { type: 'success' } | { type: 'error' };

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [modal, setModal] = useState<ModalType>({ type: 'none' });

  const { mutate: sendForgotPassword, isPending } = useForgotPassword({
    onSuccess: () => setModal({ type: 'success' }),
    onError: () => setModal({ type: 'error' }),
  });

  return (
    <Wrapper>
      <Container>
        <Logo
          style={{ marginBottom: '64px' }}
          src="/img/login/Logo.svg"
          alt="Chronos Income"
        />

        <TitleCard>
          <Title>
            <img
              src="/img/login/ArrowIcon.svg"
              alt="Voltar"
              width={24}
              height={24}
              onClick={() => router.push('/')}
              style={{ cursor: 'pointer' }}
            />
            Esqueci a senha
          </Title>
          <SubTitle>
            Digite o e-mail cadastrado na plataforma. Nós enviaremos um link
            para você criar uma nova senha com segurança.
          </SubTitle>
        </TitleCard>

        <InputContainer style={{ marginBottom: '64px', height: '76px' }}>
          <Label>E-mail</Label>
          <Input
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </InputContainer>

        <ButtonGroup>
          <Button
            className="colored"
            type="button"
            style={{ height: '46px' }}
            disabled={isPending || !email.trim()}
            onClick={() => sendForgotPassword(email)}
          >
            {isPending ? 'Enviando...' : 'Enviar o link'}
          </Button>
        </ButtonGroup>
      </Container>

      <Modal
        isOpen={modal.type !== 'none'}
        variant={modal.type === 'success' ? 'success' : 'danger'}
        onClose={() => setModal({ type: 'none' })}
        onConfirm={() => setModal({ type: 'none' })}
        message={
          modal.type === 'success'
            ? 'Link enviado com sucesso! Verifique sua caixa de e-mail'
            : 'Erro ao enviar o link, por favor tente novamente!'
        }
        customClose="none"
        customConfirm="Fechar"
      />
    </Wrapper>
  );
}
