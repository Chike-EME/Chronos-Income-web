import styled from 'styled-components';

export const MasterLayoutContainer = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  align-items: stretch;

  background-color: ${({ theme }) => theme.colors.white};
`;

export const MasterLayoutContent = styled.div`
  width: 100%;
  margin-left: 88px;
  overflow: auto;
  flex-direction: column;
`;
