import { Button, Form, Modal } from "react-bootstrap";
import { FormField } from "../../component/form/FormField.tsx";
import projectSchema from "./validation.ts";
import { FormProvider } from "react-hook-form";
import { ModalStruct } from "../../struct/ModalStruct.ts";
import { useAppForm } from "../../hook/useAppForm.ts";
import { useAppModal } from "../../hook/useAppModal.ts";
import { projectApi } from "../../api/projectApi.ts";

export const UpdateProjectModal = () => {
  const modalStruct = useAppModal("updateProject");
  return <>{modalStruct.isModalOpen && <UpdateProject {...modalStruct} />}</>;
};

const UpdateProject = ({
  isModalOpen,
  closeModal,
  data: { id: projectId, ...rest },
}: ModalStruct) => {
  const [updateProject] = projectApi.useUpdateProjectMutation();

  const { formInstance, submitForm } = useAppForm({
    defaultValues: { projectId, ...rest },
    validationSchema: projectSchema,
    onFormSubmit: async (values) => {
      const response = await updateProject(values);
      if (!("error" in response)) {
        closeModal();
      }
    },
  });

  return (
    <Modal show={isModalOpen} onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Редагувати проєкт</Modal.Title>
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
            {/*todo select group (move project to another group)*/}
          </Form>
        </FormProvider>
      </Modal.Body>
      <Modal.Footer className="justify-content-between">
        <Button variant="outline-warning" onClick={closeModal}>
          Відмінити
        </Button>
        <Button variant="success" onClick={submitForm}>
          Зберегти
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
