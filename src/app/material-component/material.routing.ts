import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { ManageOrderComponent } from './manage-order/manage-order.component';
import { ViewBillComponent } from './view-bill/view-bill.component';


export const MaterialRoutes: Routes = [
    {
        path: 'manage-category',
        component: ManageCategoryComponent,
    },
    {
        path: 'manage-product',
        component: ManageProductComponent,
    },
    {
        path: 'manage-order',
        component: ManageOrderComponent,
    },
    {
        path: 'view-bill',
        component: ViewBillComponent,
    }
];
