import {toast, ToastContainer} from 'react-toastify';

export const NotifyContainer = () => {
    return (
        <ToastContainer position="bottom-right" autoClose={5000} closeOnClick={false} draggable={false} theme="light"/>
    );
};

export const notifyError = (message: string) => {
    toast.error(message);
};

export const notifySuccess = (message: string) => {
    toast.success(message);
};
