import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { ProductComponent } from '../dialog/product/product.component';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { BillService } from 'src/app/services/bill.service';

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.scss']
})
export class ManageOrderComponent implements OnInit {

  displayedColums: string[] = ['name', 'categoryName', 'price', 'quantity', 'total', 'edit'];
  dataSource: any = [];
  manageOrderForm: any = FormGroup;
  categorys: any = [];
  products: any = [];
  price: any;
  totalAmount: any = 0;
  responseMessage: any;

  constructor(private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService, 
    private billService: BillService,
    public ngxService: NgxUiLoaderService, 
    private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.ngxService.start();
    this.getCategorys();

    this.manageOrderForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
      product: [null, [Validators.required]],
      categoryName: [null, [Validators.required]],
      price: [null, [Validators.required]],
      quantity: [null, [Validators.required]],
      total: [null, [Validators.required]],
      paymentMethod: [null, [Validators.required]]
    });
  }

  getCategorys() {
    this.categoryService.getCategorys().subscribe((response:any) => {
      this.ngxService.stop();
      this.categorys= response;
    });
  }

  getProductByCategory(values: any) {
    this.productService.getProductByCategory(values.id).subscribe((response:any) => {
      this.products= response;
      this.manageOrderForm.controls['price'].setValue('');
      this.manageOrderForm.controls['quantity'].setValue('');
      this.manageOrderForm.controls['total'].setValue('');
    })
  }

  getProductDetails(value: any) {
    this.productService.getById(value.id).subscribe((response:any) => {
      this.price= response.price;
      this.manageOrderForm.controls['price'].setValue(response.price);
      this.manageOrderForm.controls['quantity'].setValue(1);
      this.manageOrderForm.controls['total'].setValue(this.price * 1);
    });
  }  

  setQuantity(value: any) {
    var temp= this.manageOrderForm.controls['quantity'].value;
    if (temp > 0) this.manageOrderForm.comtrols['total'].setValue(this.manageOrderForm.controls['quantity'].value * this.manageOrderForm.controls['price'].value);
    else 
      if ((temp <= 0) || (temp=""))  {
        this.manageOrderForm.controls['quantity'].setValue(0);
        this.manageOrderForm.controls['total'].setValue(0);
      }
  }

  validateProductAdd() {
    if (this.manageOrderForm.controls['total'].value <= 0 || this.manageOrderForm.controls['total'].value === null)
      return true;
    else
      return false;    
  }

  validateSubmit() {
    if (this.totalAmount === 0 || this.manageOrderForm.controls['name'].value === null ||
    this.manageOrderForm.controls['email'].value === null || this.manageOrderForm.controls['paymentMethod'].value === null) 
      return true;
    else
      return false;  
  }

  add() {
    var formData= this.manageOrderForm.value;
    var productName= this.dataSource.find((e: { id: any; }) => e.id === formData.product.id);
    if (productName === undefined) {
      this.totalAmount= this.totalAmount + formData.total;
      this.dataSource.push({id:formData.product.id, name:formData.product.name, category: formData.category.name, quantity: formData.quantity, price: formData.price, total: formData.total});
      this.dataSource= [...this.dataSource];
      this.snackbarService.openSnackBar(GlobalConstants.productAdded,"success");
    }
  }

  handleDeleteAction(value: any, element: any) {
    this.totalAmount= this.totalAmount - element.total;
    this.dataSource.splice(value,1);
    this.dataSource= [...this.dataSource];
  }

  submitAction() {
    var formData= this.manageOrderForm.value;
    var data= {
      name: formData.name,
      email: formData.email,
      contactNumber: formData.contactNumber,
      paymentMethod: formData.paymentMethod,
      totalAmount: this.totalAmount.toString(),
      productDetails: JSON.stringify(this.dataSource)
    }    

    this.ngxService.start();
    this.billService.generateReport(data).subscribe((response:any) => {
      this.downloadFile(response?.uuid);
      this.manageOrderForm.reset();
      this.dataSource= [];
      this.totalAmount= 0;
    });
  }

  downloadFile(fileName: string) {
    var data= {
      uuid: fileName
    }

    this.billService.getPdf(data).subscribe((response:any) => {
      saveAs(response, fileName + '.pdf');
      this.ngxService.stop();
    });
  }

}


