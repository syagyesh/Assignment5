import { Component, OnInit } from '@angular/core';
// import data from '../../data.json';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { MatTableDataSource } from '@angular/material/table';



@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  workData : any[] = [];
  
  data =  [
    {
        "id": "1",
        "ticket": "Json Working",
        "assignedTo": "Liam Livingstone",
        "status": "Open",
        "date": "2019-01-01T18:30:00.000Z"
    },
    {
        "id": "2",
        "ticket": "Doing Practice",
        "assignedTo": "Dwene Bravo",
        "status": "Closed",
        "date": "2020-01-01T18:30:00.000Z"
    }
]

  dataSource : MatTableDataSource<any>;
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(JSON.parse(JSON.stringify(this.data)));
  }
  displayedColumns : string[] = ['id', 'ticket', 'assigned', 'status', 'date', 'action']

  openDialog() {
    let dialogData = this.dialog.open(DialogComponent, {
      data: {editData: this.data,
            indexOfData: -1}
    });

    dialogData.afterClosed().subscribe(result => {
      this.data = [...this.data,result]
      this.dataSource = new MatTableDataSource(JSON.parse(JSON.stringify(this.data)));
      console.log("changes is",this.dataSource);
      console.log("result from data:",result);
    });
  }

  deleteData(id:string) {
    console.log("id is",id);
    for(let i = 0; i < this.data.length; i++) {
      if(parseInt(this.data[i].id) == parseInt(id)) {
        this.data.splice(i,1);
        this.dataSource = new MatTableDataSource(JSON.parse(JSON.stringify(this.data)));
        break;
      }
    }
    console.log(this.dataSource);
  }

  editData(id:string) {
    for(let i = 0; i < this.data.length; i++) {
      if(parseInt(this.data[i].id) == parseInt(id)) {
        const dialogData = this.dialog.open(DialogComponent, {
          data: {editData: this.data,
            indexOfData: i}
          });
        this.deleteData(id)
        dialogData.afterClosed().subscribe(result => {
          this.data = [...this.data,result]
          this.dataSource = new MatTableDataSource(JSON.parse(JSON.stringify(this.data)));
        });
      break;
      }
    }
  }

  filterData(value:string){ 
    const filterValue = this.data.filter((data) => {
      return data.status == value;
    });
    this.dataSource = new MatTableDataSource(JSON.parse(JSON.stringify([...filterValue])));
    if(value == "Total") {
      this.dataSource = new MatTableDataSource(JSON.parse(JSON.stringify(this.data)));
    }
  }

}
