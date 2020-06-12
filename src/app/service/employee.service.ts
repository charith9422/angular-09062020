import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as configuration from '../../assets/configuration.json';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee';
import { catchError, retry } from 'rxjs/operators';
import { Data } from '@angular/router';
import { map } from 'rxjs/operators';
import { HttpErrorService, HandleError } from './http-error.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private handleError: HandleError;
  constructor(
    private http: HttpClient,
    private httpErrorHandler: HttpErrorService
  ) {
    this.handleError = httpErrorHandler.createHandleError('EmployeeService');
  }

  host = configuration.host;
  employees = configuration.endpoints.getEmployees;
  create = configuration.endpoints.createEmployee;

  getAllEmployees(): Observable<Data[]> {
    return this.http
      .get<Data[]>(`${this.host}${this.employees}`)
      .pipe(retry(3), catchError(this.handleError('getEmployees', [])));
  }
  createEmployee(employee: Employee): Observable<Employee> {
    return this.http
      .post<Employee>(`${this.host}${this.create}`, employee)
      .pipe(catchError(this.handleError('addEmployee', employee)));
  }
}
