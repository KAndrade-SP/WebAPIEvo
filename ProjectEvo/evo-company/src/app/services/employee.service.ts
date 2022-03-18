import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employees } from '../models/Employees';

@Injectable()
export class EmployeeService {
  apiUrl = 'http://localhost:7157/api/funcionarios'

  constructor(private http: HttpClient) { }

  getEmployee(): Observable<Employees[]> {
    return this.http.get<Employees[]>(this.apiUrl)
  }

  addEmployee(employee: Employees): Observable<Employees> {
    return this.http.post<Employees>(this.apiUrl, employee)
  }

  editEmployee(employee: Employees): Observable<Employees> {
    return this.http.put<Employees>(`${this.apiUrl}/${employee.id}`, employee)
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`)
  }
}
