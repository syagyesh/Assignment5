import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CardComponent } from '../card/card.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  constructor(private formbuilder: FormBuilder,@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data);
    
    // if(data != null) {
    //   this.dataForm.setValue({
    //     ID: data.ID,
    //     Ticket: data.Ticket,
    //     AssignedTo: data.AssignedTo,
    //     Status: data.Status,
    //     Date: data.Date
    //   });

      // if(typeof(data) == 'number') {
      //   // this.dataForm.setValue({
      //   //   ID: (this.dataJson.length + 1).toString(),
      //   //   Ticket: '',
      //   //   AssignedTo: '',
      //   //   Status: '',
      //   //   Date: ''
      //   // })
      //   this.dataForm.controls['ID'].disable();
      // }
    // }
    
   }
  Status : any[] = 
    [
      {value: 'Open', viewValue: 'Open'},
      {value: 'Inprogress', viewValue: 'InProgress'},
      {value: 'Closed', viewValue: 'Closed'}
    ]

    dataForm = this.formbuilder.group({
      ID: [''],
      Ticket: [''],
      AssignedTo: [''],
      Status: [''],
      Date: ['']
    });

    dataJson : any[] = JSON.parse(localStorage.getItem("dataJson") || '[]');

    addData() {
      console.log(this.dataForm.value);
      this.dataJson.push(this.dataForm.value);
      localStorage.setItem("dataJson",JSON.stringify(this.dataJson));
    }
}
