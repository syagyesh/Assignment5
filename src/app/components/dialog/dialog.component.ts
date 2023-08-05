import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  constructor(private formbuilder: FormBuilder,public dialogRef: MatDialogRef<any>,@Inject(MAT_DIALOG_DATA) public data: any) {}
  dataJson = [...this.data.editData];
  ngOnInit(): void {
    if(this.data.indexOfData != -1){
      this.dataForm.patchValue(this.dataJson[this.data.indexOfData]);
    }
  };

  Status : any[] = [{value: 'Open', viewValue: 'Open'},
                    {value: 'Pending', viewValue: 'InProgress'},
                    {value: 'Closed', viewValue: 'Closed'}]

  dataForm = this.formbuilder.group({
    id: (this.dataJson.length + 1).toString(),
    ticket: this.formbuilder.control(''),
    assignedTo: this.formbuilder.control(''),
    status: this.formbuilder.control(''),
    date: this.formbuilder.control(''),
    });

    addData() {
      this.dialogRef.close(this.dataForm.value);
    }
    
}
