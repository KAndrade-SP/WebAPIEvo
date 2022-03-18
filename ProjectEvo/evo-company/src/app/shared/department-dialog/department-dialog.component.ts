import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Departments } from 'src/app/models/Departments';

@Component({
  selector: 'app-department-dialog',
  templateUrl: './department-dialog.component.html',
  styleUrls: ['./department-dialog.component.css']
})
export class DepartmentDialogComponent implements OnInit {

  department!: Departments
  isChange!: boolean

  constructor(
    @Inject(MAT_DIALOG_DATA) 
    public data: Departments,
    public dialogRef: MatDialogRef<DepartmentDialogComponent>,  
  ) {}

  ngOnInit(): void {
    if (this.data.id != null) {
      this.isChange = true
    } else {
      this.isChange = false
    }
  }

  onCancel(): void {
    this.dialogRef.close()
  }
}
