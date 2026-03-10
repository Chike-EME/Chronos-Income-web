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

type ModalType =
  | { type: 'none' }
  | { type: 'success' }
  | { type: 'error' }
  | { type: 'emailError' };

export default function ForgotPassword() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [modal, setModal] = useState<ModalType>({ type: 'none' });

  const handleSubmit = () => {
    setLoading(true);

    if (email.trim() !== 'user@email.com') {
      setModal({ type: 'emailError' });
      setLoading(false);
      return;
    }

    setModal({ type: 'success' });
    setLoading(false);
  };

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
            Digite o e-mail cadastrado na plataforma. Nós enviaremos
            um link para você criar uma nova senha com segurança.
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
            disabled={loading}
            onClick={handleSubmit}
          >
            Enviar o link
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
            router.push('/redefinir-senha');
          }
        }}
        message={
          modal.type === 'success'
            ? 'Link enviado com sucesso! Verifique sua caixa de e-mail'
            : modal.type === 'emailError'
            ? 'Insira um email válido!'
            : 'Erro ao enviar o link, por favor tente novamente!'
        }
        customClose="none"
        customConfirm="Fechar"
      />
    </Wrapper>
  );
}
