import {notifyError} from '../component/notifier/Notifier.tsx';

export const apiErrorHandler = () => (next: any) => (action: any) => {
    if (action?.meta?.rejectedWithValue) {
        notifyError('Сталася помилка, перезавантажте сторінку та спробуйте ще раз');
    }
    return next(action);
};
