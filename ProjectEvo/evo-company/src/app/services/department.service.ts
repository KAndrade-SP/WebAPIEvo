import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Departments } from '../models/Departments';

@Injectable()
export class DepartmentService {
  apiUrl = 'http://localhost:7157/api/departamentos'
  constructor(private http: HttpClient) { }

  getDepartment(): Observable<Departments[]> {
    return this.http.get<Departments[]>(this.apiUrl)
  }

  addDepartment(department: Departments): Observable<Departments> {
    return this.http.post<Departments>(this.apiUrl, department)
  }

  editDepartment(department: Departments): Observable<Departments> {
    return this.http.put<Departments>(`${this.apiUrl}/${department.id}`, department)
  }

  deleteDepartment(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`)
  }
}

