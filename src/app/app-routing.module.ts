import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './User/signup/signup.component';
import { SigninComponent } from './User/signin/signin.component';
import { AllUsersComponent } from './Admin/all-users/all-users.component';
import { MenuComponent } from './menu/menu.component';
import { MenuloginComponent } from './User/menulogin/menulogin.component';

const routes: Routes = [
  {path:"",component:MenuloginComponent,
  children:[
    { path: 'signup', component:SignupComponent  },
    { path: 'signin', component:SigninComponent  }    
  ]}
 ,
 {  path: 'admin', component: MenuComponent ,children: [
  {path:'all', component:AllUsersComponent},
  


]}

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule ]
})
export class AppRoutingModule { }
