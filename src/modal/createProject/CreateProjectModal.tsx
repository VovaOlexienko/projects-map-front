import { Button, Form, Modal } from "react-bootstrap";
import { FormField } from "../../component/form/FormField.tsx";
import { FormProvider } from "react-hook-form";
import { ModalStruct } from "../../struct/ModalStruct.ts";
import { useAppForm } from "../../hook/useAppForm.ts";
import { useAppModal } from "../../hook/useAppModal.ts";
import { projectApi } from "../../api/projectApi.ts";
import { projectSchema } from "../commonValidation.ts";
import { object } from "yup";

export const CreateProjectModal = () => {
  const modalStruct = useAppModal("createProject");
  return <>{modalStruct.isModalOpen && <CreateProject {...modalStruct} />}</>;
};

const CreateProject = ({
  isModalOpen,
  closeModal,
  data: { id: groupId },
}: ModalStruct) => {
  const [createProject] = projectApi.useCreateProjectMutation();

  const { formInstance, submitForm } = useAppForm({
    defaultValues: {
      name: "",
      webAddress: "",
      groupId,
    },
    validationSchema: object(projectSchema),
    onFormSubmit: async (values) => {
      const response = await createProject(values);
      if (!("error" in response)) {
        closeModal();
      }
    },
  });

  return (
    <Modal show={isModalOpen} onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Створити проєкт</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormProvider {...formInstance}>
          <Form>
            <FormField id="name" name="Назва">
              <Form.Control type="text" placeholder="Веддіть назву..." />
            </FormField>
            <FormField id="webAddress" name="Веб-адреса">
              <Form.Control type="text" placeholder="Веддіть веб-адресу..." />
            </FormField>
          </Form>
        </FormProvider>
      </Modal.Body>
      <Modal.Footer className="justify-content-between">
        <Button variant="outline-warning" onClick={closeModal}>
          Відмінити
        </Button>
        <Button variant="outline-success" onClick={submitForm}>
          Створити
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
