import { ConfirmModal } from "../ConfirmModal.tsx";
import { cropText } from "../../util/textUtil.ts";
import { useAppModal } from "../../hook/useAppModal.ts";
import { useNavigate } from "react-router-dom";
import { groupApi } from "../../api/groupApi.ts";
import { ModalStruct } from "../../struct/ModalStruct.ts";

export const DeleteGroupModal = () => {
  const modalStruct = useAppModal("deleteGroup");
  return <>{modalStruct.isModalOpen && <DeleteGroup {...modalStruct} />}</>;
};

export const DeleteGroup = (modalStruct: ModalStruct) => {
  const [deleteGroup] = groupApi.useDeleteGroupMutation();
  const navigate = useNavigate();
  const { data: { id, name } = {} } = modalStruct;

  const onGroupDelete = async () => {
    const response = await deleteGroup(id);
    if (!("error" in response)) {
      modalStruct.closeModal();
      navigate("/");
    }
  };

  return (
    <>
      {name && (
        <ConfirmModal onConfirm={onGroupDelete} {...modalStruct}>
          Видалити групу "{cropText({ value: name, length: 20 })}"?
        </ConfirmModal>
      )}
    </>
  );
};
