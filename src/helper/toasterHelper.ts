import { toast, ToastOptions } from 'react-toastify';

/**
 * Show a toast notification using react-toastify.
 * @param {string} message - The message to display in the toast.
 * @param {ToastOptions<Record<string, never>>} options - Optional toast options.
 */
export const showToast = (
  message: string,
  options: ToastOptions<Record<string, never>> = {}
) => {
  /**
   * Default toast options.
   */
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

  /**
   * Merge the default options with the provided options.
   */
  const mergedOptions: ToastOptions<Record<string, never>> = {
    ...defaultOptions,
    ...options,
  };

  /**
   * Show the toast notification.
   */
  toast(message, mergedOptions);
};
