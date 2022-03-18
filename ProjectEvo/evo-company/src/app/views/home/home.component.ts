import { Component, OnInit, ViewChild } from '@angular/core';
import { DepartmentDialogComponent } from 'src/app/shared/department-dialog/department-dialog.component';
import { MatDialog } from "@angular/material/dialog"
import { MatTable } from '@angular/material/table';
import { Departments } from 'src/app/models/Departments';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employees } from 'src/app/models/Employees';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DepartmentService, EmployeeService]
})

export class HomeComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>
  displayedColumns: string[] = ['id', 'nome', 'sigla', 'actions']
  displayedColumnsEmp: string[] = ['id', 'foto', 'nome', 'rg', 'departamentoId', 'actions']
  dataEmployee!: Employees[]
  dataSource!: Departments[]

  isListing!: boolean
  isRelated!: boolean
  isCreate!: boolean
  checkPhoto!: boolean
  isEditingEmployee!: boolean;
  idDepartment!: number 
  id!: number
  nome!: string
  foto!: string
  rg!: number
  departamentoId!: number
  employee!: Employees
  department!: Departments
  response!: {dbPath: ''} 

  constructor(
    public dialog: MatDialog,
    public departmentService: DepartmentService,
    public employeeService: EmployeeService
    ) {
      this.departmentService.getDepartment()
      .subscribe((data: Departments[]) => {
        this.dataSource = data
      })
      this.getEmployees()
    }

  ngOnInit(): void {
    this.isListing = false
    this.isCreate = false
    this.isEditingEmployee = false 
    this.checkPhoto = false
  }

  onCancel(): void {
    this.isCreate = false
    this.isRelated = true
    this.isEditingEmployee = true
  }

  onEdit = () =>  {
    if (this.nome == '' || this.departamentoId == 0) {
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
        this.isCreate = false
        this.checkPhoto = false 
        this.isEditingEmployee = false
        this.isListing = false
        this.getEmployees();
        this.table?.renderRows()           
      }) 
    }   
  }

  openDialog(department: Departments | null): void {
    const dialogRef = this.dialog.open(DepartmentDialogComponent, {
      panelClass: 'my-class',
      data: department === null ? {
        nome: '',
        sigla: null
      } : {
        id: department.id,
        nome: department.nome,
        sigla: department.sigla
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined) {
        if (this.dataSource.map(p => p.id).includes(result.id)) {
          this.departmentService.editDepartment(result)
          .subscribe((data: Departments) => {
            this.dataSource[result] = data
            this.getDepartments()
            this.table.renderRows()
          }) 
        } else {
          this.departmentService.addDepartment(result)
          .subscribe((data: Departments) => {
            this.dataSource.push(data)
            this.table.renderRows()
          }) 
        }   
      }
    })
  }

  getDepartmentId(employee: Employees) {
    this.idDepartment = employee.departamentoId
    const result = this.dataSource?.find(item => item.id === this.idDepartment)
    return result?.nome 
  }

  listEmployees(department: Departments): void {
    this.isListing = true
    this.isEditingEmployee = true
    const idDepartamento = department?.id
    const result: any[] = this.dataEmployee?.filter(item => item.departamentoId === idDepartamento)

    if (result != []) {
      this.isRelated = true
      this.employeeService.getEmployee()
      .subscribe(res => {
        this.dataEmployee = result;
      }) 
    }      
  }

  backToDepartment(): void {
    this.isListing = false
    this.isRelated = false
    this.isEditingEmployee = false
    this.getEmployees()
  }

  private getDepartments() {
    this.departmentService.getDepartment()
    .subscribe((data: Departments[]) => {
      this.dataSource = data
      this.table.renderRows()
    })
  }

  editDepartment(department: Departments): void {
    this.openDialog(department)
  }

  deleteDepartment(id: number): void {
    this.departmentService.deleteDepartment(id)
    .subscribe(() => {
      this.dataSource = this.dataSource.filter(p => p.id !== id)
    })  
  }

  //----------EmployeeComponent Methods----------

  returnToCreate = () => {  
    this.isCreate = true
    this.nome = ''
    this.foto = ''
    this.rg = 0
    this.departamentoId = 0
  }

  private getEmployees() {
    this.employeeService.getEmployee()
    .subscribe(res => {
      this.dataEmployee = res as Employees[];
      this.isRelated = false
    }) 
  }

  public uploadFinished = (event: any) => {
    this.response = event
    this.foto = this.response?.dbPath
    this.checkPhoto = true
  }

  public createImgPath = (serverPath: string) => {
    return `http://localhost:7157/${serverPath?.split('wwwroot').pop()}`
  }
  
  editEmployee(employee: Employees) {
    this.isCreate = true  
    this.isRelated = false  
    this.isEditingEmployee = false
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
