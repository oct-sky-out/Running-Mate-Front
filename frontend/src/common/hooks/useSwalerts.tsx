import Swal, { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';

const useSwalerts = () => {
  const successAlert = (
    title: string,
    text: string,
    confirmButtonText: string = '확인',
    showConfirmButton: boolean = true,
    timer?: number
  ) =>
    Swal.fire({
      title,
      text,
      confirmButtonText,
      timer,
      showConfirmButton,
      icon: 'success',
      position: 'center',
    });

  const errorAlert = (
    title: string,
    text: string,
    confirmButtonText: string = '확인',
    showConfirmButton: boolean = true,
    timer?: number
  ) =>
    Swal.fire({
      title,
      text,
      showConfirmButton,
      timer,
      confirmButtonText,
      icon: 'error',
      position: 'center',
    });

  const informationAlert = (
    title: string,
    text: string,
    confirmButtonText: string = '확인',
    showConfirmButton: boolean = true,
    timer?: number
  ) =>
    Swal.fire({
      title,
      text,
      showConfirmButton,
      timer,
      confirmButtonText,
      icon: 'info',
      position: 'center',
    });

  const customAlert: (
    customOptions: SweetAlertOptions
  ) => Promise<SweetAlertResult<any>> = (customOptions) =>
    Swal.fire({
      ...customOptions,
    });

  const successToast = (title: string, text: string) =>
    Swal.fire({
      toast: true,
      title,
      text,
      icon: 'success',
      position: 'top-end',
      timer: 5000,
      timerProgressBar: true,
      showConfirmButton: false,
      showCloseButton: true,
    });

  const errorToast = (title: string, text: string) =>
    Swal.fire({
      toast: true,
      title,
      text,
      icon: 'error',
      position: 'top-end',
      timer: 5000,
      timerProgressBar: true,
      showConfirmButton: false,
      showCloseButton: true,
    });

  const customToast: (
    customOptions: SweetAlertOptions
  ) => Promise<SweetAlertResult<any>> = (customOptions) =>
    Swal.fire({
      ...customOptions,
      toast: true,
      showConfirmButton: false,
    });

  return {
    customAlert,
    customToast,
    errorAlert,
    errorToast,
    successAlert,
    successToast,
    informationAlert,
  };
};

export default useSwalerts;
