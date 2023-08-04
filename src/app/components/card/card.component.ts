import { Component, ViewChild, OnInit } from '@angular/core';
import data from '../../data.json';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { MatTable, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  workData = data;
  dataSource = [...this.workData];
  additionalData : any[] = [];
  @ViewChild(MatTable) table: MatTable<any>;
  constructor(public dialog: MatDialog) {
    this.addData();
    this.showData();
  }

 

  displayedColumns : string[] = ['id', 'ticket', 'assigned', 'status', 'date', 'action']

  openDialog(index: number) {
    this.dialog.open(DialogComponent, {
      data: index
    });
  }

  addData() {
    if(localStorage.getItem("dataJson") != null) {
      let dataJ = JSON.parse(localStorage.getItem("dataJson") || 'null');
      this.additionalData.push(...dataJ);
    }
    this.dataSource.push(...this.additionalData);
  }

  showData(){
    console.log(this.dataSource);
  }

  deleteData(id:string) {
    for(let i = 0; i < this.dataSource.length; i++) {
      if(parseInt(this.dataSource[i].ID) == parseInt(id)) {
        this.dataSource.splice(i,1);
        for(let j = 0; j < this.additionalData.length; j++) {
          if(parseInt(this.additionalData[j].ID) == parseInt(id)) {
            this.additionalData.splice(j,1);
            localStorage.setItem("dataJson", JSON.stringify(this.additionalData));
            break;
          }
          else{
            for(let k = 0; k < this.workData.length; k++) {
              if(parseInt(this.workData[k].ID) == parseInt(id)) {
                this.workData.splice(k,1);
                break;
              }
            }
          }
        }
        break;
      }
    }
    console.log(this.dataSource);
  }

  editData(id:string) {
    for(let i = 0; i < this.dataSource.length; i++) {
      if(parseInt(this.dataSource[i].ID) == parseInt(id)) {
        this.deleteData(id)
        this.dialog.open(DialogComponent, {
          data: this.dataSource[i]
        });
        break;
      }
    }
  }

  filterData(value:string){
    // this.dataSource = this.workData.filter((data) => {
    //   return data.Status == value;
    // });
    const filterValue = this.dataSource.filter((data) => {
      return data.Status == value;
    });
    let tempData = this.dataSource;
    this.dataSource = [...filterValue];
    if(value == "Total") {
      this.dataSource = [...tempData];
    }
  }

}
