import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../shared/models/api-response.model';
import { SaleType } from '../models/saletype.model';


@Injectable({
  providedIn: 'root'
})
export class SaleTypeService {
  private apiUrl = 'https://localhost:7010/api'; // URL da API

  constructor(private http: HttpClient) {}

  // Método GET para obter todos os assuntos
  getSaleTypes(): Observable<ApiResponse<SaleType>> {
    return this.http.get<ApiResponse<SaleType>>(this.apiUrl + '/list-saleTypes');
  }

  getSaleType(id:number): Observable<ApiResponse<SaleType>> {
    const params = new HttpParams().set('saleTypeId', id.toString());
    return this.http.get<ApiResponse<SaleType>>(this.apiUrl + '/get-saleType', { params });
}
  // Método POST para adicionar um novo SaleType
  addSaleType(SaleType: SaleType): Observable<ApiResponse<string>> {
    alert("this.saleType.saleTypeId")

    return this.http.post<ApiResponse<string>>(this.apiUrl + '/create-saleType', SaleType);
  }

  // Método PUT para editar um SaleType existente
  updateSaleType(id: number, SaleType: SaleType): Observable<ApiResponse<string>> {
    SaleType.saleTypeId = id;
    return this.http.put<ApiResponse<string>>(`${this.apiUrl + '/update-saleType'}`, SaleType);
  }

  // Método DELETE para excluir um SaleType
  deleteSaleType(id: number): Observable<ApiResponse<string>> {
    const params = new HttpParams().set('saleTypeId', id.toString());

    return this.http.delete<ApiResponse<string>>(this.apiUrl + '/delete-saleType', { params });
  }
}