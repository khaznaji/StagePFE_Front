import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {
  ngOnInit() {
    this.reloadData();
    this.getUserByid(localStorage.getItem('id'));

  }
  

  events:any;
  data: any = [];
  username!:string;
  constructor(private userService: UserService  ,private router: Router,private http: HttpClient){ }
  getUserByid(id: any) {
    this.userService.getUserById(id).subscribe((res) => {
      this.data = res;
      console.log(this.data);
      this.username = this.data.firstName + ' ' + this.data.lastName;
    });
  }
  reloadData() {
    this.events = this.userService.getAll().subscribe((res)=>{
      this.events=res;
      console.log(res);
  
     });

  }

}
