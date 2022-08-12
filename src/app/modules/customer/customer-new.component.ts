import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/services/alert.service';
import { SweetAlertType } from 'src/app/shared/enums/sweet-alert-type.enum';
import { GenericHelper } from 'src/app/utils/generic-helper';

export interface DialogData {
    dni: string;
    name: string;
    lastName: string;
    email: string;
    birthDate: string;
}

@Component({
    selector: 'app-customer-new',
    templateUrl: './customer-new.component.html',
    styleUrls: ['./customer-new.component.scss']
})
export class CustomerNewComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<CustomerNewComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private alertService: AlertService,
    ) {
    }

    ngOnInit() {
    }

    save() {
        if(this.validate()){
            this.dialogRef.close(this.data);
        }
    }

    validate(){
        let flag = true;
        if(GenericHelper.isNullOrEmpty(this.data.dni)){
            this.alertService.alert(SweetAlertType.warning, "Debe ingresar el dni!");
            flag = false;            
        }
        else
        if(!GenericHelper.isNullOrEmpty(this.data.dni) && !GenericHelper.isValidDni(this.data.dni)){
            this.alertService.alert(SweetAlertType.warning, "Debe ingresar un dni válido!");
            flag = false;
        }
        else
        if(GenericHelper.isNullOrEmpty(this.data.name)){
            this.alertService.alert(SweetAlertType.warning, "Debe ingresar el nombre!");
            flag = false;            
        }
        else
        if(GenericHelper.isNullOrEmpty(this.data.lastName)){
            this.alertService.alert(SweetAlertType.warning, "Debe ingresar el apellido!");
            flag = false;            
        }
        else
        if(GenericHelper.isNullOrEmpty(this.data.email)){
            this.alertService.alert(SweetAlertType.warning, "Debe ingresar el email!");
            flag = false;            
        }
        else
        if(!GenericHelper.isNullOrEmpty(this.data.email) && !GenericHelper.isValidEmail(this.data.email)){
            this.alertService.alert(SweetAlertType.warning, "Debe ingresar un email válido!");
            flag = false;
        }
        else
        if(GenericHelper.isNullOrEmpty(this.data.birthDate)){
            this.alertService.alert(SweetAlertType.warning, "Debe ingresar la fecha de nacimiento!");
            flag = false;            
        }        
        else
        if(!GenericHelper.isNullOrEmpty(this.data.birthDate) && !GenericHelper.isValidDateFormat(this.data.birthDate)){
            this.alertService.alert(SweetAlertType.warning, "Debe ingresar una fecha válida!");
            flag = false;
        }
        return flag;
    }

    cancel() {
        this.dialogRef.close();
    }
}