import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { SweetAlertType } from 'src/app/shared/enums/sweet-alert-type.enum';
import { Observable, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  alert(type: SweetAlertType, message: string, title?: string) {
    Swal.fire({
      title: this.changeTitleSimple(type, title),
        html: message,
        icon: type,
        customClass: 'swal-wide'
    });
  }

  alertConfirm(type: SweetAlertType, message: string, title?: string): Observable<boolean> {
      return new Observable((observer: Subscriber<boolean>) => {
      Swal.fire({
        title: this.changeTitleSimple(type, title),
        html: message,
        icon: type,
        customClass: 'swal-wide',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.value) {
          observer.next(true);
        } else {
          observer.next(false);
        }
      });
    });
  }

  private changeTitleSimple(type: SweetAlertType, setTitle?: string): string {
    let title = '';
    if (setTitle && setTitle.toString().trim() !== '') {
      title = setTitle;
    } else {
      switch (type) {
        case SweetAlertType.error:
          title = '¡Error!';
          break;
        case SweetAlertType.info:
          title = 'Información';
          break;
        case SweetAlertType.question:
          title = '¿Está seguro?';
          break;
        case SweetAlertType.success:
          title = '¡Éxito!';
          break;
        case SweetAlertType.warning:
          title = '¡Tenga Cuidado!';
          break;
        default:
          break;
      }
    }
    return title;
  }
}
