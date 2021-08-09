import { Component, OnInit } from '@angular/core';

import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  constructor(private http:HttpClient) { }
  employees:any = [];
  departments:any = [];
  employeeName:string = "";
  employeeId:number = 0;
  department:string = "";
  dateOfJoining:string = "";
  PhotoFileName = "anonymous.png";
  PhotoPath = environment.PHOTO_URL;
  modalTitle:string = "";

  ngOnInit(): void {
    this.refreshList();
  }
  refreshList(){
    this.http.get<any>(environment.API_URL+'employee')
    .subscribe(data=>{
      this.employees=data;
    });

    this.http.get<any>(environment.API_URL+'department')
    .subscribe(data=>{
      this.departments=data;
    });
  }

  addClick(){
    this.modalTitle = "Add employee";
    this.employeeName = "";
    this.employeeId = 0;
  }

  editClick(emp:any){
    this.modalTitle = "Edit employee";
    this.employeeId = parseInt(emp.EmployeeId);
    this.employeeName = emp.EmployeeName;
    this.department = emp.Department;
    this.dateOfJoining = emp.DateOfJoining;
    this.PhotoFileName = emp.PhotoFileName;
  }

  createClick(){
    var val = {
      EmployeeName:this.employeeName,
      Department:this.department,
      DateOfJoinig:this.dateOfJoining,
      PhotoFileName:this.PhotoFileName
    };

    this.http.post(environment.API_URL+'employee',val)
    .subscribe(res=>{
      alert(res.toString());
      this.refreshList();
    })
  }

  updateClick(){
    var val = {
      EmployeeId:this.employeeId,
      EmployeeName:this.employeeName,
      Department:this.department,
      DateOfJoinig:this.dateOfJoining,
      PhotoFileName:this.PhotoFileName
    };

    this.http.put(environment.API_URL+'employee',val)
    .subscribe(res=>{
      alert(res.toString());
      this.refreshList();
    })
  }

  deleteClick(id:any){
    if(confirm('Are you sure?'))

    this.http.delete(environment.API_URL+'employee/'+id)//send hhtp request
    .subscribe(res=>{
      alert(res.toString());
      this.refreshList();
    });
  }
  imageUpload(evt:any){
    var file = evt.target.files[0];
    const formData:FormData = new FormData();
    formData.append("file",file,file.name);

    this.http.post(environment.API_URL+"employee/savefile",formData)
    .subscribe((data:any)=>{
      this.PhotoFileName=data.toString();
    });
  }

}
