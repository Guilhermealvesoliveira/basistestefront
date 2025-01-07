import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiResponse } from '../../../shared/models/api-response.model';
import { Author } from '../models/author.model';


@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private apiUrl = 'https://localhost:7010/api'; // URL da API

  constructor(private http: HttpClient) {}

  // Método GET para obter todos os assuntos
  getAuthors(): Observable<ApiResponse<Author>> {
    return this.http.get<ApiResponse<Author>>(this.apiUrl + '/list-Authors');
  }

  getAuthor(id:number): Observable<ApiResponse<Author>> {
    const params = new HttpParams().set('AuthorId', id.toString());
    return this.http.get<ApiResponse<Author>>(this.apiUrl + '/get-Author', { params });
}
  // Método POST para adicionar um novo Author
  addAuthor(Author: Author): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(this.apiUrl + '/create-Author', Author);
  }

  // Método PUT para editar um Author existente
  updateAuthor(id: number, Author: Author): Observable<ApiResponse<string>> {
    Author.authorId = id;
    return this.http.put<ApiResponse<string>>(`${this.apiUrl + '/update-Author'}`, Author);
  }

  // Método DELETE para excluir um Author
  deleteAuthor(id: number): Observable<ApiResponse<string>> {
    const params = new HttpParams().set('AuthorId', id.toString());

    return this.http.delete<ApiResponse<string>>(this.apiUrl + '/delete-Author', { params });
  }
}