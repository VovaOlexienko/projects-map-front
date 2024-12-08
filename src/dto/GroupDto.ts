import {ShortenedGroupDto} from "./ShortenedGroupDto.ts";
import {ProjectDto} from "./ProjectDto.ts";

export interface GroupDto extends ShortenedGroupDto {
    projects: ProjectDto[]
}