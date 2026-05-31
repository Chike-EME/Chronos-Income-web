// app/login/page.tsx
'use-client';

import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';

import { ILoginForm, LoginSchema } from '@/validations/LoginSchema';
import { localStorageKeys } from '@/utils/localStorageKeys';
import { useAuth } from '@/hooks/useAuth';

import {
  Container,
  FormContainer,
  Title,
  RegisterText,
  CheckboxLabel,
  Field,
  Right,
  Left,
  LogoImg,
  ColorOverlay,
  CheckboxText,
  TitleCard,
  InputContainer,
  CheckboxLabelButton,
  Logo,
} from './styles';
import { Modal } from '@/components/Modals';
import { Button, Checkbox, Input, Label } from '@/styles/global';
import { useLogin } from '@/components/services/auth/useLogin';

const LoginForm = () => {
  const router = useRouter();
  const { setUser } = useAuth();

  const [checked, setIsChecked] = useState(false);
  const [show, setShow] = useState(false);
  const [modal, setModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>({
    resolver: yupResolver(LoginSchema),
  });

  const { mutate: submitLogin, isPending } = useLogin({
    onSuccess: data => {
      const user = { username: data.name, email: data.email };

      setUser(user);

      localStorage.setItem(localStorageKeys.accessToken, data.token);
      localStorage.setItem(localStorageKeys.user, JSON.stringify(user));

      // "manter conectado" — persiste token em cookie de longa duração
      if (checked) {
        document.cookie = `${localStorageKeys.accessToken}=${
          data.token
        }; max-age=${60 * 60 * 24 * 30}; path=/`;
      }

      router.push('/calendario');
    },
    onError: () => setModal(true),
  });

  const onSubmit: SubmitHandler<ILoginForm> = data => {
    submitLogin({ email: data.email, password: data.password });
  };

  return (
    <Container>
      <Left>
        <ColorOverlay />
        <LogoImg src="/img/login/amico.svg" alt="Logo Central" />
      </Left>

      <Right>
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
          <Logo src="/img/login/Logo.svg" alt="Chronos Income" />
          <TitleCard>
            <Title>Login</Title>
          </TitleCard>

          <InputContainer>
            <Label>E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="Digite seu e-mail"
              {...register('email')}
            />

            <Field>
              <Label style={{ marginTop: '28px' }}>Senha</Label>
              <Input
                id="password"
                type={show ? 'text' : 'password'}
                placeholder="Digite sua senha"
                {...register('password')}
              />
              <img
                src={show ? '/img/login/EyeOn.svg' : '/img/login/EyeOff.svg'}
                className="icon"
                alt={show ? 'Ocultar Senha' : 'Mostrar Senha'}
                onClick={() => setShow(s => !s)}
              />
            </Field>

            <RegisterText>
              <Checkbox
                checked={checked}
                onChange={() => setIsChecked(c => !c)}
              />
              <CheckboxText>
                <CheckboxLabel>Manter conectado</CheckboxLabel>
                <CheckboxLabelButton
                  type="button"
                  onClick={() => router.push('/esqueci-senha')}
                >
                  Esqueci a senha
                </CheckboxLabelButton>
              </CheckboxText>
            </RegisterText>
          </InputContainer>

          <Button
            className="colored"
            type="submit"
            style={{ height: '46px' }}
            disabled={isPending}
          >
            {isPending ? 'Entrando...' : 'Entrar'}
          </Button>
        </FormContainer>
      </Right>

      <Modal
        isOpen={modal}
        variant="danger"
        onClose={() => setModal(false)}
        onConfirm={() => setModal(false)}
        customTitle="Dados incorretos"
        message="E-mail ou senha incorretos. Verifique os dados informados e tente novamente"
        customClose="none"
        customConfirm="Tentar novamente"
      />
    </Container>
  );
};

export default LoginForm;
