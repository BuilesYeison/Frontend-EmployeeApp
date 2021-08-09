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

  departmentNameFilter = "";
  departmentIdFilter = "";
  departmentsWithoutFilter:any = "";

  ngOnInit(): void {
    this.refreshList();
  }
  refreshList(){
    this.http.get<any>(environment.API_URL+'department')
    .subscribe(data=>{
      this.departments=data;
      this.departmentsWithoutFilter = data;
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

  filterFn(){
    var DepartmentIdFilter=this.departmentIdFilter;
    var DepartmentNameFilter=this.departmentNameFilter;


    this.departments=this.departmentsWithoutFilter.filter(
      function(el:any){
        return el.DepartmentId.toString().toLowerCase().includes(
          DepartmentIdFilter.toString().trim().toLowerCase()
        )&&
          el.DepartmentName.toString().toLowerCase().includes(
          DepartmentNameFilter.toString().trim().toLowerCase())
      }
    );
  }

  sortResult(prop:any,asc:any){
    this.departments=this.departmentsWithoutFilter.sort(function(a:any,b:any){
      if(asc){
        return (a[prop]>b[prop])?1:((a[prop]<b[prop])?-1:0);
      }
      else{
        return (b[prop]>a[prop])?1:((b[prop]<a[prop])?-1:0);
      }
    });
  }

}
