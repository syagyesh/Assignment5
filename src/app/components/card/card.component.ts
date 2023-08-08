import { Component, OnInit } from '@angular/core';
import data from '../../data.json';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';



@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  data : any[];
  dataSource : any[];

  // Filter Values
  totalData : number;
  openData: any[];
  openValue: number;
  pendingData: any[];
  pendingValue: number;
  closedData: any[];
  closedValue: number;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    localStorage.getItem('data') ? this.data = JSON.parse(localStorage.getItem('data') || 'null') : this.data = [...data];
    this.dataSource = this.data;
    localStorage.setItem('data', JSON.stringify(this.data));
    this.filterValues(this.data);
  }
  displayedColumns : string[] = ['id', 'ticket', 'assigned', 'status', 'date', 'action']

  openDialog() {
    let dialogData = this.dialog.open(DialogComponent, {
      data: {editData: this.data,
            indexOfData: -1}
    });

    dialogData.afterClosed().subscribe(result => {
      if(result == null) return;
      this.data = [...this.data,result]
      localStorage.setItem('data', JSON.stringify([...this.data]));
      this.filterValues(this.data);
      this.dataSource = [...this.data];
    });
  }

  deleteData(id:string) {
    for(let i = 0; i < this.data.length; i++) {
      if(parseInt(this.data[i].id) == parseInt(id)) {
        this.data.splice(i,1);
        localStorage.setItem('data', JSON.stringify(this.data));
        this.filterValues(this.data);
        this.dataSource = [...this.data];
        break;
      }
    }
  }

  editData(id:string) {
    for(let i = 0; i < this.data.length; i++) {
      if(parseInt(this.data[i].id) == parseInt(id)) {
        const dialogData = this.dialog.open(DialogComponent, {
          data: {editData: this.data,
            indexOfData: i}
          });
          dialogData.afterClosed().subscribe(result => {
          if(result == null) return;
          this.deleteData(id)
          this.data = [...this.data,result];
          localStorage.setItem('data', JSON.stringify([...this.data]));
          this.filterValues(this.data);
          this.dataSource = [...this.data];
        });
      break;
      }
    }
  }

  filterData(value:string){ 
    const filterValue = this.data.filter((data) => {
      return data.status == value;
    });
    this.dataSource = [...filterValue];
    if(value == "Total") {
      this.dataSource = [...this.data];
    }
  }

  filterValues(data: any[]) {
    this.totalData = data.length;
    this.openData = data.filter((data) => {
      return data.status == "Open";
    });
    this.openValue = this.openData.length;
    this.pendingData = data.filter((data) => {
      return data.status == "Pending";
    });
    this.pendingValue = this.pendingData.length;
    this.closedData = data.filter((data) => {
      return data.status == "Closed";
    });
    this.closedValue = this.closedData.length;
  } 
  
}
