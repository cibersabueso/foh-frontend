import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// Models
import { SaleDetail, SaleDetailProducts } from 'src/app/models/sale.model';

// Services
import { SaleService } from 'src/app/services/sale.service';

@Component({
  selector: 'app-sale-details',
  templateUrl: './sale-details.component.html',
  styleUrls: ['./sale-details.component.css']
})
export class SaleDetailsComponent implements OnInit {

  currentSale?: SaleDetail;
  currentSaleProducts?: SaleDetailProducts[];
  currentSaleID: string = '';

  dataSource = new MatTableDataSource<SaleDetailProducts>();
  displayedColumns: string[] = ['Producto', 'PrecioUnitario', 'Cantidad', 'Subtotal'];


  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  constructor(
    private saleService: SaleService,
    private dialogRef: MatDialogRef<SaleDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.currentSaleID = data.ventaID;
    this.getSaleDetails(data.ventaID);
  }

  ngOnInit() {
    this.getSaleDetails(this.currentSaleID);
  }

  getSaleDetails(ventaID: string): void {
    this.saleService.getDetails(ventaID)
      .subscribe(
        data => {
          this.currentSale = data;
        },
        error => {
          console.error("salesByDate.error ", error);
        }
      )

    this.saleService.getDetailsProducts(ventaID)
      .subscribe(
        data => {
          this.dataSource = new MatTableDataSource<SaleDetailProducts>(data);
        },
        error => {
          console.error("salesByDate.error ", error);
        }
      )
  }

  close() {
    this.dialogRef.close();
  }

}
