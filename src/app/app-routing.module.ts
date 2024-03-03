import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './User/signup/signup.component';
import { SigninComponent } from './User/signin/signin.component';
import { AllUsersComponent } from './Admin/all-users/all-users.component';
import { MenuloginComponent } from './User/menulogin/menulogin.component';
import { RequestPasswordComponent } from './User/request-password/request-password.component';
import { ResetPasswordComponent } from './User/reset-password/reset-password.component';
import { ActivationCompteComponent } from './User/activation-compte/activation-compte.component';
import { EditProfileComponent } from './User/edit-profile/edit-profile.component';
import { ProfileComponent } from './User/profile/profile.component';
import { AcceuilComponent } from './Collaborateur/acceuil/acceuil.component';
import { AdminMenuComponent } from './menu/admin-menu/admin-menu.component';
import { CollabMenuComponent } from './menu/collab-menu/collab-menu.component';
import { ManagerMenuComponent } from './menu/manager-menu/manager-menu.component';
import { AddCompteComponent } from './Admin/ManagerService/add-compte/add-compte.component';
import { AddCompteCollabComponent } from './Admin/Collaborateur/add-compte-collab/add-compte-collab.component';
import { GestionCompetenceComponent } from './Admin/Competence/gestion-competence/gestion-competence.component';

const routes: Routes = [
  {path:"",component:MenuloginComponent,
  children:[
    { path: 'signup', component:SignupComponent  },
    { path: 'signin', component:SigninComponent  }    , 
    { path: 'request-password', component:RequestPasswordComponent  }    , 
    { path: 'reset-password', component: ResetPasswordComponent },
    { path: 'activate-account', component: ActivationCompteComponent },


  ]}
 ,
 {  path: 'managerRh', component: AdminMenuComponent ,children: [
  {path:'all', component:AllUsersComponent},
  {path:'edit-profile', component:EditProfileComponent},
  {path:'profile', component:ProfileComponent},
  {path:'add-manager-service', component:AddCompteComponent},
  {path:'add-collaborateur', component:AddCompteCollabComponent},
  {path:'competence', component:GestionCompetenceComponent},


]},

{  path: 'collaborateur', component: CollabMenuComponent ,children: [
  
 
]}, 
{  path: 'managerService', component: ManagerMenuComponent ,children: [
  
 
]}

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule ]
})
export class AppRoutingModule { }
