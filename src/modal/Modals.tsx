import { CreateGroupModal } from "./createGroup/CreateGroupModal.tsx";
import { CreateProjectModal } from "./createProject/CreateProjectModal.tsx";
import { DeleteGroupModal } from "./deleteGroup/DeleteGroupModal.tsx";
import { DeleteProjectModal } from "./deleteProject/DeleteProjectModal.tsx";
import { UpdateProjectModal } from "./updateProject/UpdateProjectModal.tsx";

export const Modals = () => {
  return (
    <>
      <CreateGroupModal />
      <DeleteGroupModal />
      <CreateProjectModal />
      <UpdateProjectModal />
      <DeleteProjectModal />
    </>
  );
};
