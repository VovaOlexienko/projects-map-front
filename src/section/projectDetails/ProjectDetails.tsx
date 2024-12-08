import { projectApi } from "../../api/projectApi.ts";
import { LoaderStruct } from "../../struct/LoaderStruct.ts";
import Skeleton from "react-loading-skeleton";
import { Children, cloneElement, ReactElement } from "react";
import { ProjectDetailsDto } from "../../dto/ProjectDetailsDto.ts";

const projectDetailsMock = { "-1": "-1", "-2": "-2" };

export const ProjectDetails = ({
  groupId,
  projectId,
  showLoader,
}: {
  groupId?: string;
  projectId: string;
} & LoaderStruct) => {
  const { data, isFetching } = projectApi.useGetProjectDetailsQuery(
    {
      groupId,
      projectId,
    },
    { skip: showLoader },
  );
  const showSkeleton = showLoader || isFetching;

  return (
    <ProjectDetailsView projectDetails={showSkeleton ? projectDetailsMock : data}>
      {showSkeleton ? <Skeleton /> : <KeyValue />}
    </ProjectDetailsView>
  );
};

const ProjectDetailsView = ({
  projectDetails,
  children,
}: {
  projectDetails?: ProjectDetailsDto;
  children: ReactElement;
}) => {
  return (
    projectDetails &&
    Object.entries(projectDetails).map(([key, value]) => (
      <p key={key} className="card-text">
        {Children.map(children, (child) => {
          return cloneElement(child, { data: { key, value } });
        })}
      </p>
    ))
  );
};

const KeyValue = ({ data }: { data?: { key: any; value: any } }) => {
  return (
    <>
      {data && (
        <>
          <strong>{data.key}:</strong> {data.value}
        </>
      )}
    </>
  );
};
