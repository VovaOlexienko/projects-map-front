import { ProjectDto } from "../dto/ProjectDto";
import { CrudProjectDto } from "../dto/CrudProjectDto.ts";
import { ProjectDetailsDto } from "../dto/ProjectDetailsDto.ts";
import { api } from "./api.ts";
import { GroupProject } from "../dto/GroupProject.ts";

export const projectApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProjectDetails: builder.query<ProjectDetailsDto, GroupProject>({
      query: ({ groupId, projectId }) => ({
        url: `/group/${groupId}/project/${projectId}/details`,
      }),
      keepUnusedDataFor: 0,
    }),
    createProject: builder.mutation<ProjectDto, CrudProjectDto & Omit<GroupProject, "projectId">>({
      query: ({ groupId, ...body }) => ({
        url: `/group/${groupId}/project`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Group"],
    }),
    updateProject: builder.mutation<void, CrudProjectDto & GroupProject>({
      query: ({ groupId, projectId, ...body }) => ({
        url: `/group/${groupId}/project/${projectId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Group"],
    }),
    deleteProject: builder.mutation<void, GroupProject>({
      query: ({ groupId, projectId }) => ({
        url: `/group/${groupId}/project/${projectId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Group"],
    }),
  }),
});
