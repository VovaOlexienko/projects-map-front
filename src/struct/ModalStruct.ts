export type ModalStruct = {
  isModalOpen: boolean;
  data?: any;
  openModal: (data?: any) => void;
  closeModal: () => void;
};
