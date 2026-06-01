'use client';

import { useState } from 'react';
import { ClientDetails, Project } from '@/components/types/clients/types';
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
  ProjectCardHeader,
  ProjectName,
  ProjectDescription,
  ProjectMeta,
  EditButton,
  AddProjectButton,
} from './styles';
import { ClientDetailsSkeleton } from '@/components/skeletons/clients/details';
import { ClientInfo, ProjectsRow } from '@/styles/global';
import {
  EditProjectModal,
  ProjectToEdit,
} from '@/components/Modals/EditProject';
import { StatusBadge } from './statusBadge';
import { updateProjectStatus } from '@/components/services/clients/service';

interface ClientDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: ClientDetails | null;
  loading?: boolean;
  onAddProject?: () => void;
  onProjectEdited?: () => void;
}

export function ClientDetailsModal({
  isOpen,
  onClose,
  client,
  loading = false,
  onAddProject,
  onProjectEdited,
}: ClientDetailsModalProps) {
  const [editingProject, setEditingProject] = useState<ProjectToEdit | null>(
    null,
  );

  if (!isOpen) return null;

  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  function handleEditClick(project: Project) {
    setEditingProject({
      id: project.id,
      name: project.name,
      color: project.color,
      hourlyRate: project.hourlyRate,
      description: project.description,
      startDate: project.startDate,
      clientId: project.clientId,
      status: project.status,
    });
  }

  return (
    <>
      <Overlay onClick={handleOverlayClick}>
        <Modal>
          <Header>
            <Title>Detalhes do cliente</Title>
            <CloseButton onClick={onClose} aria-label="Fechar">
              <img
                src="/img/CloseIcon.svg"
                alt="fechar"
                width={24}
                height={24}
              />
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
                    <ProjectCardHeader>
                      <ProjectName>{project.name}</ProjectName>
                      <div
                        style={{
                          display: 'flex',
                          gap: 6,
                          alignItems: 'center',
                        }}
                      >
                        <StatusBadge
                          status={project.status}
                          onChange={async newStatus => {
                            await updateProjectStatus(project.id, newStatus);
                            onProjectEdited?.();
                          }}
                        />
                        {project.status !== 'COMPLETED' && (
                          <EditButton
                            onClick={() => handleEditClick(project)}
                            aria-label="Editar projeto"
                          >
                            <img
                              src="/img/EditIcon.svg"
                              alt="editar"
                              width={16}
                              height={16}
                            />
                          </EditButton>
                        )}
                      </div>
                    </ProjectCardHeader>

                    <ProjectDescription>
                      {project.description}
                    </ProjectDescription>
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

      {editingProject && (
        <EditProjectModal
          isOpen={!!editingProject}
          project={editingProject}
          onClose={() => setEditingProject(null)}
          onSuccess={() => {
            setEditingProject(null);
            onProjectEdited?.();
          }}
          onDeleted={() => {
            setEditingProject(null);
            onProjectEdited?.();
          }}
        />
      )}
    </>
  );
}
