import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/service/user-auth.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manager-menu',
  templateUrl: './manager-menu.component.html',
  styleUrls: ['./manager-menu.component.css']
})
export class ManagerMenuComponent {
  constructor(private userService: UserService  ,private router: Router  ,      private Auth: UserAuthService,
  ){ }
data: any = [];
username!:string;
email!:string;
role!:string;
matricule!:string;
numtel!:number;
genre!:number;

listUsers: any[] = [];

image!:string;
ngOnInit(): void {
  this.getUserByid(localStorage.getItem('id'));
  this.userService.getAll().subscribe(
    (response: any) => {
      this.listUsers = response; // Assuming response is an array of user objects
    },
    (error: any) => {
      console.error(error);
    }
  );
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
redirectionChat(id:any){
  this.router.navigate(['/managerService/chat/'+id]);
}



logout() {
  Swal.fire({
    title: 'Êtes-vous sûr(e) ?',
    text: 'Vous êtes sur le point de vous déconnecter.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Se deconnecter!'
  }).then((result) => {
    if (result.isConfirmed) {
      // Clear authentication data (assuming this.Auth.clear() does the job)
      this.Auth.clear();

      // Navigate to the login page
      this.router.navigate(['/signin']);
    }
  });
}

}
