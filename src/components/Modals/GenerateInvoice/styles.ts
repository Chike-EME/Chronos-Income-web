import styled from 'styled-components';

export {
  Body,
  Footer,
  Field,
  Label,
  Input,
  PeriodRow,
  PeriodField,
  SelectWrapper,
  Select,
  ChevronIcon,
} from '../ReportFilter/styles';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 200;

  background: rgba(0, 0, 0, 0.4);

  display: flex;
  align-items: center;
  justify-content: center;
`;

export { Modal, Header, Title, CloseButton } from '../AddClient/styles';

export { FilterButton as SubmitButton } from '../ReportFilter/styles';
