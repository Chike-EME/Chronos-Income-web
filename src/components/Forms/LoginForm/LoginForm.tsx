'use-client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { ILoginForm, LoginSchema } from '@/validations/LoginSchema';
import { localStorageKeys } from '@/utils/localStorageKeys';
import { useAuth } from '@/hooks/useAuth';
import handleError from '@/utils/handleToast';

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

const LoginForm = () => {
  const router = useRouter();
  const { setUser } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checked, setIsChecked] = useState(false);
  const [show, setShow] = useState<boolean>(false);
  const [modal, setModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>({
    resolver: yupResolver(LoginSchema),
  });

  const validateCredentials = (
    email: string,
    password: string,
  ): boolean => {
    return email === 'user@email.com' && password === 'Senha1!@';
  };

  const onSubmit: SubmitHandler<ILoginForm> = async data => {
    try {
      setIsSubmitting(true);

      const isValid = validateCredentials(data.email, data.password);

      if (!isValid) {
        setModal(true);
        return;
      }

      // login OK
      const user = {
        id: 1,
        username: 'User Test',
        email: data.email,
      };

      setUser(user);

      localStorage.setItem(localStorageKeys.accessToken, '123');
      localStorage.setItem(
        localStorageKeys.user,
        JSON.stringify(user),
      );
      localStorage.setItem(localStorageKeys.refreshToken, '123');

      router.push('/empreendimentos');
    } catch (error) {
      handleError(error);
      setModal(true);
    } finally {
      setIsSubmitting(false);
    }
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
              {show ? (
                <img
                  src="/img/login/EyeOn.svg"
                  className="icon"
                  alt="Ocultar Senha"
                  color="black"
                  onClick={() => setShow(false)}
                />
              ) : (
                <img
                  src="/img/login/EyeOff.svg"
                  className="icon"
                  alt="Mostrar Senha"
                  color="black"
                  onClick={() => setShow(true)}
                />
              )}
            </Field>

            <RegisterText>
              <Checkbox
                checked={checked}
                onChange={() => setIsChecked(!checked)}
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
            disabled={isSubmitting}
          >
            Entrar
          </Button>
        </FormContainer>
      </Right>
      <Modal
        isOpen={modal}
        variant={'danger'}
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
