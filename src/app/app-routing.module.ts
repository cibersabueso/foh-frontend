import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { SalesListComponent } from './components/sales-list/sales-list.component';
import { SaleDetailsComponent } from './components/sale-details/sale-details.component';

// Routes
const routes: Routes = [
  { path: '', redirectTo: 'ventas', pathMatch: 'full' },
  { path: 'ventas', component: SalesListComponent },
  { path: 'ventas/:id', component: SaleDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
