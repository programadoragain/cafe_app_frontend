import { Component, OnInit } from '@angular/core';
import { CategoryComponent } from '../dialog/category/category.component';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.scss']
})
export class ManageCategoryComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
  }

  handleAddAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { 
      action: 'Add'
    };
    dialogConfig.width = "850px";
    const dialogRef= this.dialog.open(CategoryComponent ,dialogConfig);
    this.router.events.subscribe(() => dialogRef.close());

    const sub= dialogRef.componentInstance.onAddCategory.subscribe((response) => this.tableData());
  }
  
  handleEditAction(values: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Edit',
      data: values
    };
    dialogConfig.width = "850px";
    const dialogRef= this.dialog.open(CategoryComponent ,dialogConfig);
    this.router.events.subscribe(() => dialogRef.close());

    const sub= dialogRef.componentInstance.onAddCategory.subscribe((response) => this.tableData());
  }
}
