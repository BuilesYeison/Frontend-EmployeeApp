import { Component, OnInit } from '@angular/core';

import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

  constructor(private http:HttpClient) { }
  departments:any = [];
  departmentName:string = "";
  departmentId:number = 0;
  modalTitle:string = "";

  ngOnInit(): void {
    this.refreshList();
  }
  refreshList(){
    this.http.get<any>(environment.API_URL+'department')
    .subscribe(data=>{
      this.departments=data;
    });
  }

  addClick(){
    this.modalTitle = "Add department";
    this.departmentName = "";
    this.departmentId = 0;
  }

  editClick(dep:any){
    this.modalTitle = "Edit department";
    this.departmentId = parseInt(dep.DepartmentId);
    this.departmentName = dep.DepartmentName;
  }

  createClick(){
    var val = {
      DepartmentName:this.departmentName
    };

    this.http.post(environment.API_URL+'department',val)
    .subscribe(res=>{
      alert(res.toString());
      this.refreshList();
    })
  }

  updateClick(){
    var val = {
      DepartmentId:this.departmentId,
      DepartmentName:this.departmentName
    };

    this.http.put(environment.API_URL+'department',val)
    .subscribe(res=>{
      alert(res.toString());
      this.refreshList();
    })
  }

  deleteClick(id:any){
    if(confirm('Are you sure?'))

    this.http.delete(environment.API_URL+'department/'+id)//send hhtp request
    .subscribe(res=>{
      alert(res.toString());
      this.refreshList();
    })
  }

}
