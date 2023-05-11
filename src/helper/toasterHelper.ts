import { toast, ToastOptions } from 'react-toastify';

export const showToast = (
  message: string,
  options: ToastOptions<Record<string, never>> = {}
) => {
  const defaultOptions: ToastOptions<Record<string, never>> = {
    position: 'bottom-left',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    closeButton: false,
    theme: 'light',
  };

  const mergedOptions: ToastOptions<Record<string, never>> = {
    ...defaultOptions,
    ...options,
  };
  toast(message, mergedOptions);
};
