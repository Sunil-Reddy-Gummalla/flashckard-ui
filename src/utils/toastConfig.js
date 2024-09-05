import { toast } from 'react-toastify';

const toastOptions = {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
};

export const showToast = (message, type = 'success') => {
    if (type === 'success') {
        toast.success(message, toastOptions);
    } else if (type === 'error') {
        toast.error(message, toastOptions);
    } else {
        toast(message, toastOptions);
    }
};
