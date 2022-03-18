import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Employees } from 'src/app/models/Employees';
import { EmployeeService } from 'src/app/services/employee.service';
import { DepartmentService } from 'src/app/services/department.service';
import { Departments } from 'src/app/models/Departments';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [EmployeeService, DepartmentService]
})
export class EmployeeComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>
  displayedColumns: string[] = ['id', 'foto', 'nome', 'rg', 'departamentoId', 'actions']
  dataSource!: Employees[]
  dataDepartment!: Departments[]

  isChange!: boolean
  isCreate!: boolean
  checkPhoto!: boolean
  id!: number
  nome!: string
  foto!: string
  rg!: any
  departamentoId!: number
  employee!: Employees
  response!: {dbPath: ''}

  constructor(
    public employeeService: EmployeeService,
    public departmentService: DepartmentService
    ) {
      this.employeeService.getEmployee()
      .subscribe(res => {
        this.dataSource = res as Employees[];
        console.log(res)
      })
      this.departmentService.getDepartment()
      .subscribe((data: Departments[]) => {
        this.dataDepartment = data
      })
    }  

    ngOnInit(): void {
      this.isCreate = false
      this.isChange = false
      this.checkPhoto = false
    }

    onCreate = () => {
      if (this.nome == '' || this.rg == '' || this.checkPhoto == false || this.departamentoId == 0) {
        alert('Há campos inválidos')
      } else {
        this.employee = {
          id: this.employee?.id,
          nome: this.nome,
          rg: this.rg,
          foto: this.response?.dbPath,
          departamentoId: this.departamentoId
        } 
        this.employeeService.addEmployee(this.employee)
        .subscribe(res => {
          console.log('dados:', this.employee, 'res:', res)
          this.isCreate = false
          this.checkPhoto = false
          this.getEmployees();
          this.table?.renderRows()
        }) 
      } 
    }

    onEdit = () =>  {
      if (this.nome == '' || this.rg == '' || this.checkPhoto == false || this.departamentoId == 0) {
        alert('Há campos inválidos')
      } else {
        this.employee = {
          id: this.id,
          nome: this.nome,
          rg: this.rg,
          foto: this.foto,
          departamentoId: this.departamentoId
        } 
        this.employeeService.editEmployee(this.employee)
        .subscribe(res => {
          console.log('dados:', this.employee, 'res:', res)
          this.isCreate = false
          this.checkPhoto = false
          this.getEmployees();
          this.table?.renderRows()
        }) 
      }    
    }

    onCancel(): void {
      this.isCreate = false
      this.isChange = false
    }

    getDepartmentId(employee: Employees) {
      const idDepartment = employee.departamentoId
      const result = this.dataDepartment?.find(item => item.id === idDepartment)
      return result?.nome 
    }

    returnToCreate = () => {
      this.isChange = false
      this.isCreate = true
      this.nome = ''
      this.foto = ''
      this.rg = ''
      this.departamentoId = 0
    }

    private getEmployees = () => {
      this.employeeService.getEmployee()
      .subscribe(res => {
        this.dataSource = res as Employees[];
      })
    }

    public uploadFinished = (event: any) => {
      this.response = event
      this.checkPhoto = true
    }

    public createImgPath = (serverPath: string) => {
      return `http://localhost:7157/${serverPath?.split('wwwroot').pop()}`
    }
    
    editEmployee(employee: Employees) {
      this.isCreate = true
      this.isChange = true    
      this.id = employee?.id
      this.foto = employee?.foto
      this.nome = employee?.nome
      this.rg = employee?.rg
      this.departamentoId = employee?.departamentoId
    } 
  
    deleteEmployee(id: number): void {
      this.employeeService.deleteEmployee(id)
      .subscribe(() => {
        this.dataSource = this.dataSource.filter(p => p.id !== id)
      })  
    }   
}
