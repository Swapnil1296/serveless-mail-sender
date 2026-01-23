import Swal from 'sweetalert2';

// Cyberpunk-styled alert system using SweetAlert2
class AlertManager {
  private getCustomClass(type: 'success' | 'error' | 'warning' | 'info') {
    const baseClasses = {
      popup: 'bg-gradient-to-br backdrop-blur-2xl rounded-3xl border-2 shadow-2xl',
      title: 'text-white font-extrabold text-2xl uppercase tracking-wide',
      htmlContainer: 'text-gray-200 text-base leading-relaxed',
      confirmButton: 'px-8 py-4 rounded-xl font-bold text-lg uppercase transition-all hover:scale-105 border-2',
      cancelButton: 'px-8 py-4 rounded-xl font-bold text-lg uppercase transition-all hover:scale-105 border-2',
    };

    const typeStyles = {
      success: {
        popup: `${baseClasses.popup} from-green-500/20 to-cyan-500/20 border-green-400/60`,
        confirmButton: `${baseClasses.confirmButton} bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-500 hover:to-cyan-500 border-green-400/50 text-white`,
        cancelButton: `${baseClasses.cancelButton} bg-gray-700 hover:bg-gray-600 border-gray-500/50 text-white`,
      },
      error: {
        popup: `${baseClasses.popup} from-red-500/20 to-orange-500/20 border-red-400/60`,
        confirmButton: `${baseClasses.confirmButton} bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 border-red-400/50 text-white`,
        cancelButton: `${baseClasses.cancelButton} bg-gray-700 hover:bg-gray-600 border-gray-500/50 text-white`,
      },
      warning: {
        popup: `${baseClasses.popup} from-yellow-500/20 to-orange-500/20 border-yellow-400/60`,
        confirmButton: `${baseClasses.confirmButton} bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 border-yellow-400/50 text-white`,
        cancelButton: `${baseClasses.cancelButton} bg-gray-700 hover:bg-gray-600 border-gray-500/50 text-white`,
      },
      info: {
        popup: `${baseClasses.popup} from-cyan-500/20 to-purple-500/20 border-cyan-400/60`,
        confirmButton: `${baseClasses.confirmButton} bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 border-cyan-400/50 text-white`,
        cancelButton: `${baseClasses.cancelButton} bg-gray-700 hover:bg-gray-600 border-gray-500/50 text-white`,
      },
    };

    return {
      popup: typeStyles[type].popup,
      title: baseClasses.title,
      htmlContainer: baseClasses.htmlContainer,
      confirmButton: typeStyles[type].confirmButton,
      cancelButton: typeStyles[type].cancelButton,
    };
  }

  success(message: string, title: string = 'Success') {
    return Swal.fire({
      icon: 'success',
      title,
      html: message,
      customClass: this.getCustomClass('success'),
      background: 'transparent',
      iconColor: '#10b981',
      showConfirmButton: true,
      confirmButtonText: 'OK',
      timer: 4000,
      timerProgressBar: true,
      showClass: {
        popup: 'animate__animated animate__bounceIn animate__faster',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOut animate__faster',
      },
    });
  }

  error(message: string, title: string = 'Error') {
    return Swal.fire({
      icon: 'error',
      title,
      html: message,
      customClass: this.getCustomClass('error'),
      background: 'transparent',
      iconColor: '#ef4444',
      showConfirmButton: true,
      confirmButtonText: 'OK',
      showClass: {
        popup: 'animate__animated animate__shakeX animate__faster',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOut animate__faster',
      },
    });
  }

  warning(message: string, title: string = 'Warning') {
    return Swal.fire({
      icon: 'warning',
      title,
      html: message,
      customClass: this.getCustomClass('warning'),
      background: 'transparent',
      iconColor: '#f59e0b',
      showConfirmButton: true,
      confirmButtonText: 'OK',
      timer: 4000,
      timerProgressBar: true,
      showClass: {
        popup: 'animate__animated animate__headShake animate__faster',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOut animate__faster',
      },
    });
  }

  info(message: string, title: string = 'Info') {
    return Swal.fire({
      icon: 'info',
      title,
      html: message,
      customClass: this.getCustomClass('info'),
      background: 'transparent',
      iconColor: '#06b6d4',
      showConfirmButton: true,
      confirmButtonText: 'OK',
      timer: 4000,
      timerProgressBar: true,
      showClass: {
        popup: 'animate__animated animate__bounceIn animate__faster',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOut animate__faster',
      },
    });
  }

  // Confirmation dialog
  confirm(message: string, title: string = 'Are you sure?') {
    return Swal.fire({
      icon: 'question',
      title,
      html: message,
      customClass: this.getCustomClass('warning'),
      background: 'transparent',
      iconColor: '#f59e0b',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      showClass: {
        popup: 'animate__animated animate__zoomIn animate__faster',
      },
      hideClass: {
        popup: 'animate__animated animate__zoomOut animate__faster',
      },
    });
  }
}

export const showAlert = new AlertManager();
