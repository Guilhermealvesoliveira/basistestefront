import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from '../models/subject.model';
import { ApiResponse } from '../../../shared/models/api-response.model';


@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private apiUrl = 'https://localhost:7010/api'; // URL da API

  constructor(private http: HttpClient) {}

  // Método GET para obter todos os assuntos
  getSubjects(): Observable<ApiResponse<Subject>> {
    return this.http.get<ApiResponse<Subject>>(this.apiUrl + '/list-subjects');
  }

  getSubject(id:number): Observable<ApiResponse<Subject>> {
    const params = new HttpParams().set('subjectId', id.toString());
    return this.http.get<ApiResponse<Subject>>(this.apiUrl + '/get-subject', { params });
}
  // Método POST para adicionar um novo Subject
  addSubject(Subject: Subject): Observable<ApiResponse<string>> {
    alert("this.subject.subjectId")

    return this.http.post<ApiResponse<string>>(this.apiUrl + '/create-subject', Subject);
  }

  // Método PUT para editar um Subject existente
  updateSubject(id: number, Subject: Subject): Observable<ApiResponse<string>> {
    Subject.subjectId = id;
    return this.http.put<ApiResponse<string>>(`${this.apiUrl + '/update-subject'}`, Subject);
  }

  // Método DELETE para excluir um Subject
  deleteSubject(id: number): Observable<ApiResponse<string>> {
    const params = new HttpParams().set('subjectId', id.toString());

    return this.http.delete<ApiResponse<string>>(this.apiUrl + '/delete-subject', { params });
  }
}