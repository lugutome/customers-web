import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { CustomerService } from 'src/app/services/customer.service';
import { COLUMNS_TABLE_CUSTOMER } from 'src/app/shared/constants/columns-table-customer';
import { ResultResponse } from 'src/app/shared/enums/result-response.enum';
import { SweetAlertType } from 'src/app/shared/enums/sweet-alert-type.enum';
import { DatatableCustomer } from 'src/app/shared/models/customer/datatable-customer';
import { CustomerNewComponent } from './customer-new.component';

@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
    @ViewChild('paginatorDataRows', { static: false }) paginator: MatPaginator;
    displayedColumns = COLUMNS_TABLE_CUSTOMER;
    dataRows = new MatTableDataSource<DatatableCustomer>([]);
    activeLoadTable: boolean = false;
    txtDni: string;
    txtEmail: string;

    constructor(
        private customerService: CustomerService,
        private alertService: AlertService,
        public dialog: MatDialog,
        private router: Router,
    ) {
    }

    ngOnInit() {
        this.txtDni = '';
        this.txtEmail = '';
        this.searchCustomer();
    }

    searchCustomer() {
        this.activeLoadTable = true;
        let request = {
            dni: this.txtDni,
            email: this.txtEmail
        }
        this.customerService.listData(request).subscribe(response => {
            this.activeLoadTable = false;
            if (response.severity === ResultResponse.success) {
                this.dataRows.data = response.objects;
                setTimeout(() => this.dataRows.paginator = this.paginator);
            } else {
                this.alertService.alert(SweetAlertType.error, response.summary);
            }
        });
    }

    newCustomer() {
        const dialogRef = this.dialog.open(CustomerNewComponent, {
            disableClose: true,
            width: '400px',
            data: {}
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result && result.dni){
                this.customerService.createData(result).subscribe(response => {
                    if (response.severity === ResultResponse.success) {
                        this.alertService.alert(SweetAlertType.success, response.summary);
                    } else {
                        this.alertService.alert(SweetAlertType.error, response.summary);
                    }
                });
            }
        });
    }
}