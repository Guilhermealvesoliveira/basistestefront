import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiResponse } from '../../../shared/models/api-response.model';
import { SaleTypeBookPrice } from '../models/saletypebookprice.model';


@Injectable({
  providedIn: 'root'
})
export class SaleTypeBookPriceService {
  private apiUrl = 'https://localhost:7010/api'; // URL da API

  constructor(private http: HttpClient) {}

  // Método GET para obter todos os assuntos
  getSaleTypeBookPrices(bookId: number ): Observable<ApiResponse<SaleTypeBookPrice>> {
    const params = new HttpParams().set('bookId', bookId.toString());
    return this.http.get<ApiResponse<SaleTypeBookPrice>>(this.apiUrl + '/list-SaleTypeBookPrice', { params });
  }

  getSaleTypeBookPrice(saleTypeId: number,bookId: number ): Observable<ApiResponse<SaleTypeBookPrice>> {
    const params = new HttpParams().set('saleTypeId', saleTypeId.toString()).append('bookId', bookId.toString());
    return this.http.get<ApiResponse<SaleTypeBookPrice>>(this.apiUrl + '/get-SaleTypeBookPrice', { params });
}
  // Método POST para adicionar um novo SaleTypeBookPrice
  addSaleTypeBookPrice(SaleTypeBookPrice: SaleTypeBookPrice): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(this.apiUrl + '/create-SaleTypeBookPrice', SaleTypeBookPrice);
  }

  // Método PUT para editar um SaleTypeBookPrice existente
  updateSaleTypeBookPrice(bookId: number,saleTypeId: number, SaleTypeBookPrice: SaleTypeBookPrice): Observable<ApiResponse<string>> {
    SaleTypeBookPrice.bookId = bookId;
    SaleTypeBookPrice.bookId = saleTypeId;
    return this.http.put<ApiResponse<string>>(`${this.apiUrl + '/update-SaleTypeBookPrice'}`, SaleTypeBookPrice);
  }

  // Método DELETE para excluir um SaleTypeBookPrice
  deleteSaleTypeBookPrice(saleTypeId: number,bookId: number ): Observable<ApiResponse<string>> {

    const params = new HttpParams().set('saleTypeId', saleTypeId.toString()).append('bookId', bookId.toString());

    return this.http.delete<ApiResponse<string>>(this.apiUrl + '/delete-SaleTypeBookPrice', { params });
  }
}