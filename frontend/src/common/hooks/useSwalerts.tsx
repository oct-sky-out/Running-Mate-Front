import Swal, { SweetAlertIcon, SweetAlertPosition } from 'sweetalert2';

const useSwalerts = () => {
  const successAlert = (
    title: string,
    text: string,
    showConfirmButton?: boolean,
    timer?: number
  ) =>
    Swal.fire({
      title,
      text,
      showConfirmButton,
      timer,
      icon: 'success',
      position: 'center',
    });

  const errorAlert = (
    title: string,
    text: string,
    showConfirmButton?: boolean,
    timer?: number
  ) =>
    Swal.fire({
      title,
      text,
      showConfirmButton,
      timer,
      icon: 'error',
      position: 'center',
    });

  const informationAlert = (
    title: string,
    text: string,
    showConfirmButton?: boolean,
    timer?: number
  ) =>
    Swal.fire({
      title,
      text,
      showConfirmButton,
      timer,
      icon: 'info',
      position: 'center',
    });

  const customAlert = (
    title: string,
    text: string,
    icon: SweetAlertIcon,
    position: SweetAlertPosition,
    showConfirmButton?: boolean,
    timer?: number
  ) =>
    Swal.fire({
      title,
      text,
      showConfirmButton,
      timer,
      icon,
      position,
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

  const customToast = (
    title: string,
    text: string,
    icon: SweetAlertIcon,
    timerProgressBar: boolean,
    showCloseButton: boolean,
    timer: number,
    position: SweetAlertPosition
  ) =>
    Swal.fire({
      toast: true,
      title,
      text,
      icon,
      position,
      timerProgressBar,
      showCloseButton,
      timer,
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
