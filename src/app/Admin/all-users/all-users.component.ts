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
    
  }
  events:any;

  constructor(private userService: UserService  ,private router: Router,private http: HttpClient){ }

  reloadData() {
    this.events = this.userService.getAll().subscribe((res)=>{
      this.events=res;
      console.log(res);
  
     });

  }

}
