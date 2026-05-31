import { ClientDetails } from '@/components/types/clients/types';
import {
  Overlay,
  Modal,
  Header,
  Title,
  CloseButton,
  InfoText,
  MetaRow,
  MetaItem,
  ProjectCard,
  ProjectName,
  ProjectDescription,
  ProjectMeta,
  AddProjectButton,
} from './styles';
import { ClientDetailsSkeleton } from '@/components/skeletons/clients/details';
import { ClientInfo, ProjectsRow } from '@/styles/global';

interface ClientDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: ClientDetails | null;
  loading?: boolean;
  onAddProject?: () => void;
}

export function ClientDetailsModal({
  isOpen,
  onClose,
  client,
  loading = false,
  onAddProject,
}: ClientDetailsModalProps) {
  if (!isOpen) return null;

  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <Overlay onClick={handleOverlayClick}>
      <Modal>
        <Header>
          <Title>Detalhes do cliente</Title>
          <CloseButton onClick={onClose} aria-label="Fechar">
            <img src="/img/CloseIcon.svg" alt="fechar" width={24} height={24} />
          </CloseButton>
        </Header>

        {loading ? (
          <ClientDetailsSkeleton />
        ) : client ? (
          <ClientInfo>
            <InfoText>
              <strong>Nome:</strong> {client.name}
            </InfoText>
            {client.description && (
              <InfoText>
                <strong>Descrição:</strong> {client.description}
              </InfoText>
            )}
            <MetaRow>
              <MetaItem>CNPJ: {client.cnpj}</MetaItem>
              <MetaItem>{client.projectCount} Projetos</MetaItem>
            </MetaRow>

            <ProjectsRow>
              {client.projects.map(project => (
                <ProjectCard key={project.id} $color={project.color}>
                  <ProjectName>{project.name}</ProjectName>
                  <ProjectDescription>{project.description}</ProjectDescription>
                  <ProjectMeta>Cliente: {project.client}</ProjectMeta>
                  <ProjectMeta>
                    <strong>Total de horas:</strong>
                    <br />
                    {project.totalHours}
                  </ProjectMeta>
                </ProjectCard>
              ))}
              <AddProjectButton
                onClick={onAddProject}
                aria-label="Adicionar projeto"
              >
                +
              </AddProjectButton>
            </ProjectsRow>
          </ClientInfo>
        ) : null}
      </Modal>
    </Overlay>
  );
}
