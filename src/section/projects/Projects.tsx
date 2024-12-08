import { Button } from "react-bootstrap";
import { Pencil, Trash } from "react-bootstrap-icons";
import { useAppModal } from "../../hook/useAppModal.ts";
import { ProjectDetails } from "../projectDetails/ProjectDetails.tsx";
import { ProjectDto } from "../../dto/ProjectDto.ts";
import { LoaderStruct } from "../../struct/LoaderStruct.ts";
import Skeleton from "react-loading-skeleton";
import { Children, cloneElement, ReactElement } from "react";

const projectsMock = [{ id: "-1" }, { id: "-2" }, { id: "-3" }, { id: "-4" }] as ProjectDto[];

export const Projects = ({
  groupId,
  projects,
  showLoader,
}: {
  groupId?: string;
  projects?: ProjectDto[];
} & LoaderStruct) => {
  return (
    <ProjectsView
      groupId={groupId}
      showLoader={showLoader}
      projects={showLoader ? projectsMock : projects}
      headerComponent={showLoader ? <Skeleton height="25px" containerClassName="w-100" /> : <ProjectHeader />}
      staticFieldsComponent={showLoader ? <Skeleton /> : <ProjectStaticFields />}
    />
  );
};

const ProjectsView = ({
  groupId,
  projects,
  showLoader,
  headerComponent,
  staticFieldsComponent,
}: {
  groupId?: string;
  projects?: ProjectDto[];
  headerComponent: ReactElement;
  staticFieldsComponent: ReactElement;
} & LoaderStruct) => {
  return (
    <div className="w-100 py-3" style={{ minHeight: "100vh" }}>
      <div className="container">
        <div className="row  row-cols-2 row-cols-xl-3 row-cols-xxl-4 g-4">
          {projects?.map((project) => (
            <div className="col" key={project.id}>
              <div className="card h-100 shadow-sm position-relative">
                <div className="card-header d-flex justify-content-between align-items-center">
                  {Children.map(headerComponent, (child) => {
                    return cloneElement(child, { data: { project, groupId } });
                  })}
                </div>
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <p className="card-text">
                      {Children.map(staticFieldsComponent, (child) => {
                        return cloneElement(child, { data: { project } });
                      })}
                    </p>
                    <ProjectDetails groupId={groupId} projectId={project.id} showLoader={showLoader} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProjectHeader = ({ data }: { data?: { project: ProjectDto; groupId: string } }) => {
  const updateProjectModalStruct = useAppModal("updateProject");
  const deleteProjectModalStruct = useAppModal("deleteProject");

  return (
    data && (
      <>
        <h5 className="mb-0 text-break">{data.project.name}</h5>
        <div className="d-flex">
          <Button
            onClick={() =>
              updateProjectModalStruct.openModal({
                groupId: data.groupId,
                ...data.project,
              })
            }
            variant="light"
            className="w-auto p-0 m-1"
          >
            <Pencil size="32px" viewBox="-4 -4 24 24" />
          </Button>
          <Button
            onClick={() =>
              deleteProjectModalStruct.openModal({
                groupId: data.groupId,
                ...data.project,
              })
            }
            variant="light"
            className="w-auto p-0 m-1"
          >
            <Trash size="32px" viewBox="-4 -4 24 24" />
          </Button>
        </div>
      </>
    )
  );
};

const ProjectStaticFields = ({ data }: { data?: { project: ProjectDto } }) => {
  return (
    data && (
      <>
        <strong>Веб-адреса:</strong> {data.project.webAddress}
      </>
    )
  );
};
