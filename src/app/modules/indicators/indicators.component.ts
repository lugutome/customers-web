import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/services/alert.service';
import { CustomerService } from 'src/app/services/customer.service';
import { COLUMNS_TABLE_INDICATOR } from 'src/app/shared/constants/columns-table-indicator';
import { ResultResponse } from 'src/app/shared/enums/result-response.enum';
import { SweetAlertType } from 'src/app/shared/enums/sweet-alert-type.enum';
import { DatatableIndicator } from 'src/app/shared/models/indicator/datatable-indicator';

@Component({
    selector: 'app-indicators',
    templateUrl: './indicators.component.html',
    styleUrls: ['./indicators.component.scss']
})
export class IndicatorsComponent implements OnInit {
    displayedColumns = COLUMNS_TABLE_INDICATOR;
    dataRowsBirthMajorInYearMonth = new MatTableDataSource<DatatableIndicator>([]);
    dataRowsBirthMinorInYearMonth = new MatTableDataSource<DatatableIndicator>([]);
    dataRowsBirthByYearMonth = new MatTableDataSource<DatatableIndicator>([]);
    dataRowsBirthRateByYearMonth = new MatTableDataSource<DatatableIndicator>([]);

    activeLoadTable: boolean = false;

    constructor(
        private customerService: CustomerService,
        private alertService: AlertService,
    ) {
    }

    ngOnInit() {
        this.loadIndicators();
    }

    loadIndicators(){
        this.activeLoadTable = true;
        this.customerService.getDataIndicators().subscribe(response => {
            this.activeLoadTable = false;
            if (response.severity === ResultResponse.success) {
                this.dataRowsBirthMajorInYearMonth.data = response.object.customerGivenBirthMajorInYearMonth;
                this.dataRowsBirthMinorInYearMonth.data = response.object.customerGivenBirthMinorInYearMonth;
                this.dataRowsBirthByYearMonth.data = response.object.customerGivenBirthByYearMonth;
                this.dataRowsBirthRateByYearMonth.data = response.object.customerGivenBirthRateByYearMonth;
            } else {
                this.alertService.alert(SweetAlertType.error, response.summary);
            }
        });
    }
}