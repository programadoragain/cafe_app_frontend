import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { BillService } from 'src/app/services/bill.service';

@Component({
  selector: 'app-view-bill',
  templateUrl: './view-bill.component.html',
  styleUrls: ['./view-bill.component.scss']
})
export class ViewBillComponent implements OnInit {

  displayedColums: string[] = ['name', 'email', 'contactNumber', 'paymentMethod', 'total','view'];
  dataSource: any;
  responseMessage: any;

  constructor(private billService: BillService, 
    public ngxService: NgxUiLoaderService, 
    private dialog: MatDialog, 
    private snackbarService: SnackbarService, 
    private router: Router) { }

    ngOnInit(): void {
      this.ngxService.start();
      this.tableData();
    }
  
    tableData() {
      this.billService.getBills().subscribe((response: any) => {
        this.ngxService.stop();
        this.dataSource = new MatTableDataSource(response);
      }, (error: any) => {
        this.ngxService.stop();
        console.log(error.error?.message);
        if (error.error?.message) this.responseMessage = error.error?.message;
        else
          this.responseMessage = GlobalConstants.genericError;
  
        this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
      });
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  
    handleViewAction(values: any) { 
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        action: values
      };
      dialogConfig.width = "100%";
      const dialogRef = this.dialog.open(ViewBillProductsComponent, dialogConfig);
      this.router.events.subscribe(() => dialogRef.close());
  
    }


}
