import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/service/employee.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from 'src/app/model/employee';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
})
export class AddEmployeeComponent implements OnInit {
  constructor(
    private employeeService: EmployeeService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  formEmployee = this.fb.group({
    name: ['', Validators.required],
    age: ['', Validators.required],
    salary: ['', Validators.required],
  });
  employee: Employee;
  ngOnInit(): void {}

  get name() {
    return this.formEmployee.get('name');
  }
  get age() {
    return this.formEmployee.get('age');
  }
  get salary() {
    return this.formEmployee.get('salary');
  }
  addEmployee() {
    if (this.formEmployee.invalid) {
      return;
    }
    const employee = this.formEmployee.value;
    if (this.formEmployee.valid) {
      this.employeeService
        .createEmployee(this.formEmployee.value)
        .subscribe((data) => {
          this.employee = data;
          console.log(this.formEmployee.value);
          this.formEmployee.reset();
          this.router.navigate(['/employees']);
        });
    }
  }
}
