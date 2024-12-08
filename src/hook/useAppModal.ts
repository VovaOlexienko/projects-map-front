import { ModalStruct } from '../struct/ModalStruct';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../config/store';
import { modalSlice } from '../config/modalSlice';
import { useEffect } from 'react';

export const useAppModal = (name: string): ModalStruct => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(modalSlice.actions.initModal({ name }));
  }, [dispatch, name]);
  const modal = useSelector((state: RootState) => state.modal);

  const openModal = (data?: any) => dispatch(modalSlice.actions.openModal({ name, data }));
  const closeModal = () => dispatch(modalSlice.actions.closeModal({ name }));

  return { ...modal.modals[name], openModal, closeModal };
};
