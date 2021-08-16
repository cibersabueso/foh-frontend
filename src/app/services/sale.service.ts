import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  SalesList, SaleDetail, SaleDetailProducts
} from '../models/sale.model';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  private apiUrl = 'http://25.94.177.14:8080/v1';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  findByDate(date: any): Observable<SalesList[]> {
    let body = JSON.stringify({
      dateFilter: date
    });
    return this.http.post<SalesList[]>(`${this.apiUrl}/listSales`, body, this.httpOptions);
  }

  getDetails(ventaID: string): Observable<SaleDetail> {
    return this.http.get<SaleDetail>(`${this.apiUrl}/detailSale/${ventaID}`);
  }

  getDetailsProducts(ventaID: string): Observable<SaleDetailProducts[]> {
    return this.http.get<SaleDetailProducts[]>(`${this.apiUrl}/DetailProducts/${ventaID}`);
  }
}
