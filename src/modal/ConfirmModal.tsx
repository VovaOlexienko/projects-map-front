import { PropsWithChildren } from "react";
import { ModalStruct } from "../struct/ModalStruct.ts";
import { Button, Modal } from "react-bootstrap";

export const ConfirmModal = ({
  isModalOpen,
  closeModal,
  onConfirm,
  children,
}: PropsWithChildren<ModalStruct & { onConfirm: () => void }>) => {
  return (
    <Modal show={isModalOpen} onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Підтвердження</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer className="justify-content-between">
        <Button variant="outline-warning" onClick={closeModal}>
          Відмінити
        </Button>
        <Button variant="success" onClick={onConfirm}>
          Продовжити
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
