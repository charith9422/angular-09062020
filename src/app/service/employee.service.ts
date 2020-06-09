import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as configuration from '../../assets/configuration.json';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee';
import { catchError, retry } from 'rxjs/operators';
import { Data } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  host = configuration.host;
  employees = configuration.endpoints.employees;

  getAllEmployees(): Observable<Data[]>{
    return this.http.get<Data[]>(`${this.host}${this.employees}`)
    .pipe(
      retry(3)
    );
  }
}
