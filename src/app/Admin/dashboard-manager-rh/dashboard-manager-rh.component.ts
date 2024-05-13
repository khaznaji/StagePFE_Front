import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/service/user-auth.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard-manager-rh',
  templateUrl: './dashboard-manager-rh.component.html',
  styleUrls: ['./dashboard-manager-rh.component.css']
})
export class DashboardManagerRhComponent {
  constructor(private userService: UserService  ,private router: Router,private http: HttpClient ,       private Auth: UserAuthService,
    ){ }
  data: any = [];
  username!:string;
  email!:string;
  role!:string;
  matricule!:string;
  numtel!:number;
  genre!:number;
  
  
  image!:string;
  ngOnInit(): void {
    this.getUserByid(localStorage.getItem('id'));
  }
  getUserByid(id: any) {
    const headers = { 'Authorization': 'Bearer ' + this.Auth.getToken() };
    this.userService.getUserById2(id,headers).subscribe((res) => {      this.data = res;
      console.log(this.data);
      this.username = this.data.nom + ' ' + this.data.prenom;
      this.image = this.data.image;
      this.email = this.data.email;
      this.role = this.data.role;
      this.matricule = this.data.matricule;
      this.numtel = this.data.numtel;
      this.genre = this.data.gender;
  
      console.log('User info:', this.data);
      console.log('User photo:', this.image);
    });
  }
 
  
  }
  