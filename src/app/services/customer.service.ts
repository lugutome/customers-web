import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscriber } from 'rxjs';
import { GeneralResponse } from 'src/app/shared/models/response/general.response';
import { ResultResponse } from 'src/app/shared/enums/result-response.enum';
import { DatatableCustomer } from '../shared/models/customer/datatable-customer';
import { CustomerRequest } from '../shared/models/request/customer.request';
import { Indicator } from '../shared/models/indicator/indicator';

@Injectable()
export class CustomerService {

    private urlEndPoint: string;

    constructor(
        private http: HttpClient
    ) {
        this.urlEndPoint = `${environment.apiUrl}/customer`;
    }

    listData(request: CustomerRequest): Observable<GeneralResponse<DatatableCustomer[]>> {
        return new Observable((observer: Subscriber<GeneralResponse<DatatableCustomer[]>>) => {
            this.http.post<GeneralResponse<DatatableCustomer[]>>(`${this.urlEndPoint}/consult`, request).subscribe(response => {
                let data: DatatableCustomer[];
                let result: ResultResponse = ResultResponse.error;
                let mensaje = '';
                if (response) {
                    result = response.severity;
                    mensaje = response.summary;
                    if (result === ResultResponse.success) {
                        data = response.objects;
                    }
                }
                observer.next({
                    severity: result,
                    summary: mensaje,
                    objects: data,
                });
            }, err => {
                observer.next({
                    severity: ResultResponse.error,
                    summary: err.error.error || err.mensaje || 'No se pudo realizar la consulta.'
                });
            });
        });
    }

    createData(request: CustomerRequest): Observable<GeneralResponse<DatatableCustomer[]>> {
        return new Observable((observer: Subscriber<GeneralResponse<DatatableCustomer[]>>) => {
            this.http.post<GeneralResponse<DatatableCustomer[]>>(`${this.urlEndPoint}/create`, request).subscribe(response => {
                let data: DatatableCustomer[];
                let result: ResultResponse = ResultResponse.error;
                let mensaje = '';
                if (response) {
                    result = response.severity;
                    mensaje = response.summary;
                    if (result === ResultResponse.success) {
                        data = response.objects;
                    }
                }
                observer.next({
                    severity: result,
                    summary: mensaje,
                    objects: data,
                });
            }, err => {
                observer.next({
                    severity: ResultResponse.error,
                    summary: err.error.error || err.mensaje || 'No se pudo grabar el resgistro.'
                });
            });
        });
    }

    getDataIndicators(): Observable<GeneralResponse<Indicator>> {
        return new Observable((observer: Subscriber<GeneralResponse<Indicator>>) => {
            this.http.get<GeneralResponse<Indicator>>(`${this.urlEndPoint}/indicators`).subscribe(response => {
                let data: Indicator;
                let result: ResultResponse = ResultResponse.error;
                let mensaje = '';
                if (response) {
                    result = response.severity;
                    mensaje = response.summary;
                    if (result === ResultResponse.success) {
                        data = response.object;
                    }
                }
                observer.next({
                    severity: result,
                    summary: mensaje,
                    object: data,
                });
            }, err => {
                observer.next({
                    severity: ResultResponse.error,
                    summary: err.error.error || err.mensaje || 'No se pudo realizar la consulta.'
                });
            });
        });
    }
}
