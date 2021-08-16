import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// Models
import { SalesList } from 'src/app/models/sale.model';

// Services
import { SaleService } from 'src/app/services/sale.service';

// Others components
import { SaleDetailsComponent } from 'src/app/components/sale-details/sale-details.component';

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.css']
})
export class SalesListComponent implements AfterViewInit, OnInit {

  sales?: SalesList[];
  currentSale: SalesList = {};
  currentIndex = -1;

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  dataSource = new MatTableDataSource<SalesList>();
  displayedColumns: string[] = ['CLIENTE', 'FECHA', 'TOTAL', 'VENTA_ID'];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private saleService: SaleService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.refreshList();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // Reset sort
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
  }

  getSales(): void {
    this.saleService.findByDate("2021-08-15")
      .subscribe(
        data => {
          this.dataSource = new MatTableDataSource<SalesList>(data);
        },
        error => {
          console.error("sales.error ", error);
        }
      )
  }

  refreshList(): void {
    this.getSales();
    this.currentSale = {};
    this.currentIndex = -1;
  }

  searchByDate(): void {
    this.currentSale = {};
    this.currentIndex = -1;

    this.saleService.findByDate(this.date)
      .subscribe(
        data => {
          this.dataSource = new MatTableDataSource<SalesList>(data);
        },
        error => {
          console.error("salesByDate.error ", error);
        }
      )
  }

  // Detalle de la venta
  openDialog(ventaID: string): void {
    const dialogRef = this.dialog.open(SaleDetailsComponent, {
      width: '60%',
      height: '60%',
      disableClose: true,
      autoFocus: true,
      data: {
        title: 'Detalle de venta',
        ventaID: ventaID
      }
    });

    dialogRef.updatePosition({
      top: '10%',
      left: '20%'
    })

    dialogRef.afterClosed().subscribe(
      data => console.log("Dialog output:", data)
    );
  }
}
