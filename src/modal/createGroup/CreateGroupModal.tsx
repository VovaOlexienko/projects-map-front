import { Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FormField } from "../../component/form/FormField.tsx";
import groupSchema from "./validation.ts";
import { FormProvider } from "react-hook-form";
import { groupApi } from "../../api/groupApi.ts";
import { ModalStruct } from "../../struct/ModalStruct.ts";
import { useAppForm } from "../../hook/useAppForm.ts";
import { useAppModal } from "../../hook/useAppModal.ts";

export const CreateGroupModal = () => {
  const modalStruct = useAppModal("createGroup");
  return <>{modalStruct.isModalOpen && <CreateGroup {...modalStruct} />}</>;
};

const CreateGroup = ({ isModalOpen, closeModal }: ModalStruct) => {
  const [createGroup] = groupApi.useCreateGroupMutation();
  const navigate = useNavigate();

  const { formInstance, submitForm } = useAppForm({
    defaultValues: {
      name: "",
    },
    validationSchema: groupSchema,
    onFormSubmit: async (values) => {
      const response = await createGroup(values);
      if (!("error" in response)) {
        closeModal();
        navigate(`/group/${response.data.id}`);
      }
    },
  });

  return (
    <Modal show={isModalOpen} onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Створити групу проєктів</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormProvider {...formInstance}>
          <Form>
            <FormField id="name" name="Назва">
              <Form.Control type="text" placeholder="Веддіть назву..." />
            </FormField>
          </Form>
        </FormProvider>
      </Modal.Body>
      <Modal.Footer className="justify-content-between">
        <Button variant="outline-warning" onClick={closeModal}>
          Відмінити
        </Button>
        <Button variant="success" onClick={submitForm}>
          Створити
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
