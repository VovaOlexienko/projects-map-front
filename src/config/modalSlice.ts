import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  modals: Record<string, { data?: any; isModalOpen: boolean }>;
}

const initialState: ModalState = {
  modals: {},
};

interface ModalPayload {
  name: string;
  data?: any;
}

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    initModal: (state, { payload: { name } }: PayloadAction<ModalPayload>) => {
      state.modals[name] = state.modals[name] || {
        isModalOpen: false,
        data: null,
      };
    },
    openModal: (
      state,
      { payload: { name, data } }: PayloadAction<ModalPayload>,
    ) => {
      state.modals[name].isModalOpen = true;
      state.modals[name].data = data;
    },
    closeModal: (state, { payload: { name } }: PayloadAction<ModalPayload>) => {
      state.modals[name].isModalOpen = false;
      state.modals[name].data = null;
    },
  },
});
