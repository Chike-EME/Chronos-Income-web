import styled from 'styled-components';
import Ellipse from '@/assets/icons/Ellipse.svg';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 100vh;

  background-color: ${({ theme }) => theme.colors.primary40};
`;

export const Container = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;

  width: 555px;
  padding: 32px 32px 42px 32px;

  border-radius: 12px;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.colors.white};
`;

export const Logo = styled.img`
  width: 268px;
  height: 127px;
  margin-bottom: 48px;
`;

export const TitleCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 94px;
  margin-bottom: 32px;
`;

export const Title = styled.h1`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 26px;
  font-family: var(--font-poppins);
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 12px;

  color: ${({ theme }) => theme.colors.primary100};
`;

export const SubTitle = styled.p`
  text-align: left;
  width: 100%;
  font-family: var(--font-lato);
  font-weight: 400;
  font-size: 18px;
  margin-bottom: 32px;
  color: ${({ theme }) => theme.colors.neutral80};
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;

  display: flex;
  flex-direction: column;

  .icon {
    position: absolute;
    right: 16px;
    top: 58%;
    transform: translateY(-50%);
    cursor: pointer;
    width: 24px;
    height: 24px;
  }
`;

export const RequirementsContainer = styled.div`
  width: 100%;
  height: 104px;
`;

export const Requirement = styled.div<{ $hasErrors: boolean }>`
  width: 100%;
  height: 26px;

  display: flex;
  align-items: center;
  gap: 10px;

  span {
    font-size: 16px;
    font-family: var(--font-lato);
    font-weight: 600;
    color: ${({ $hasErrors, theme }) =>
      $hasErrors ? theme.colors.error : theme.colors.primary100};
  }
`;

export const EllipseIcon = styled(Ellipse)<{ $hasError: boolean }>`
  width: 6px;
  height: 6px;
  color: ${({ $hasError, theme }) =>
    $hasError ? theme.colors.error : theme.colors.primary100};
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

export const RegisterText = styled.h3`
  width: 100%;
  font-size: 10pt;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.secondary100};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  text-decoration: none;
`;
