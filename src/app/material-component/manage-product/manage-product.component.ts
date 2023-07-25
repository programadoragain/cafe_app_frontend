import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-manage-product',        
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss']
})
export class ManageProductComponent implements OnInit {

  displayedColums: string[] = ['name', 'categoryName', 'description', 'price', 'edit','status'];
  dataSource: any;
  responseMessage: any;
  length: any;

  constructor(private productService: ProductService, 
    public ngxService: NgxUiLoaderService, 
    private dialog: MatDialog, 
    private snackbarService: SnackbarService, 
    private router: Router) { }

  ngOnInit(): void {
    this.ngxService.start();
    this.tableData();
  }

  tableData() {
    this.productService.getProducts().subscribe((response: any) => {
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

  handleAddAction() { /*
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Add'
    };
    dialogConfig.width = "400px";
    const dialogRef = this.dialog.open(productComponent, dialogConfig);
    this.router.events.subscribe(() => dialogRef.close());

    const sub = dialogRef.componentInstance.onAddCategory.subscribe((response:any) => this.tableData()); */
  }

  handleEditAction(values: any) {/*
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Edit',
      data: values
    };
    dialogConfig.width = "400px";
    const dialogRef = this.dialog.open(productComponent, dialogConfig);
    this.router.events.subscribe(() => dialogRef.close());

    const sub = dialogRef.componentInstance.onAddCategory.subscribe((response:any) => this.tableData()); */
  }

  handleDeleteAction(values: any) {}

  onChange(status: any, id: any) {

  }

}
