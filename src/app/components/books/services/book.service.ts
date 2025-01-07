import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiResponse } from '../../../shared/models/api-response.model';
import { Book } from '../models/book.model';


@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'https://localhost:7010/api'; // URL da API

  constructor(private http: HttpClient) {}

  // Método GET para obter todos os assuntos
  getBooks(): Observable<ApiResponse<Book>> {
    return this.http.get<ApiResponse<Book>>(this.apiUrl + '/list-Books');
  }

  getBook(id:number): Observable<ApiResponse<Book>> {
    const params = new HttpParams().set('BookId', id.toString());
    return this.http.get<ApiResponse<Book>>(this.apiUrl + '/get-Book', { params });
}
  // Método POST para adicionar um novo Book
  addBook(Book: Book): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(this.apiUrl + '/create-Book', Book);
  }

  // Método PUT para editar um Book existente
  updateBook(id: number, Book: Book): Observable<ApiResponse<string>> {
    Book.bookId = id;
    return this.http.put<ApiResponse<string>>(`${this.apiUrl + '/update-Book'}`, Book);
  }

  // Método DELETE para excluir um Book
  deleteBook(id: number): Observable<ApiResponse<string>> {
    const params = new HttpParams().set('BookId', id.toString());

    return this.http.delete<ApiResponse<string>>(this.apiUrl + '/delete-Book', { params });
  }
  
}