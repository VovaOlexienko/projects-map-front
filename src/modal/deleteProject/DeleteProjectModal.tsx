import { ConfirmModal } from "../ConfirmModal.tsx";
import { cropText } from "../../util/textUtil.ts";
import { useAppModal } from "../../hook/useAppModal.ts";
import { projectApi } from "../../api/projectApi.ts";
import { ModalStruct } from "../../struct/ModalStruct.ts";

export const DeleteProjectModal = () => {
  const modalStruct = useAppModal("deleteProject");
  return <>{modalStruct.isModalOpen && <DeleteProject {...modalStruct} />}</>;
};

const DeleteProject = (modalStruct: ModalStruct) => {
  const [deleteProject] = projectApi.useDeleteProjectMutation();
  const { data: { id, groupId, name } = {} } = modalStruct;

  const onProjectDelete = async () => {
    const response = await deleteProject({ projectId: id, groupId });
    if (!("error" in response)) {
      modalStruct.closeModal();
    }
  };

  return (
    <>
      {name && (
        <ConfirmModal onConfirm={onProjectDelete} {...modalStruct}>
          Видалити проєкт "{cropText({ value: name, length: 20 })}"?
        </ConfirmModal>
      )}
    </>
  );
};
