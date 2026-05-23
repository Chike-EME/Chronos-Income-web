import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;

export const Left = styled.div`
  flex: 1;
  overflow: hidden;
  position: relative;
`;

export const ColorOverlay = styled.div`
  position: absolute;
  inset: 0;

  background: ${({ theme }) => theme.colors.white};
  z-index: 5;
  pointer-events: none;
`;

export const LogoImg = styled.img`
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);

  z-index: 10;
  pointer-events: none;
`;

export const Right = styled.div`
  flex: 1;
  overflow: hidden;
  position: relative;
  background-color: ${({ theme }) => theme.colors.primary[40]};
`;

export const FormContainer = styled.form`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 555px;

  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;

  border-radius: 24px;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 32px;
`;

export const Logo = styled.img`
  width: 268px;
  height: 127px;
  margin-bottom: 48px;
`;

export const TitleCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 26px;
  margin-bottom: 24px;
`;

export const Title = styled.h1`
  width: 100%;
  font-size: 24px;
  font-family: var(--font-poppins);
  font-weight: 600;

  color: ${({ theme }) => theme.colors.primary[100]};
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 48px;
`;

export const RegisterText = styled.h3`
  width: 100%;
  font-size: 10pt;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.secondary[100]};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  text-decoration: none;
  margin-top: 24px;
`;

export const CheckboxText = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
`;

export const CheckboxLabel = styled.label`
  font-size: 16px;
  font-family: var(--font-poppins);
  font-weight: 400;
  color: ${({ theme }) => theme.colors.neutral[80]};
`;

export const CheckboxLabelButton = styled.button`
  font-size: 16px;
  font-family: var(--font-poppins);
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary[100]};
  text-decoration: underline;

  background: none;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
`;

export const Field = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;

  .icon {
    position: absolute;
    right: 20px;
    bottom: 10px;
    cursor: pointer;
  }
`;
