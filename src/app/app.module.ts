import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './User/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SuccessDialogComponent } from './User/Dialog/success-dialog/success-dialog.component';
import { SigninComponent } from './User/signin/signin.component';
import { MenuloginComponent } from './User/menulogin/menulogin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RecaptchaModule } from "ng-recaptcha";
import { RequestPasswordComponent } from './User/request-password/request-password.component';
import { EmailSuccessComponent } from './User/Dialog/email-success/email-success.component';
import { ResetPasswordComponent } from './User/reset-password/reset-password.component';
import { ActivationCompteComponent } from './User/activation-compte/activation-compte.component';
import { ActivationreussieComponent } from './User/Dialog/activationreussie/activationreussie.component';
import { MotdepasseComponent } from './User/Dialog/motdepasse/motdepasse.component';
import { EditProfileComponent } from './User/edit-profile/edit-profile.component';
import { ProfileComponent } from './User/profile/profile.component';
import { AdminMenuComponent } from './menu/admin-menu/admin-menu.component';
import { CollabMenuComponent } from './menu/collab-menu/collab-menu.component';
import { ManagerMenuComponent } from './menu/manager-menu/manager-menu.component';
import { AddCompteComponent } from './Admin/ManagerService/add-compte/add-compte.component';
import { AddCompteCollabComponent } from './Admin/Collaborateur/add-compte-collab/add-compte-collab.component';
import { GestionCompetenceComponent } from './Admin/Competence/gestion-competence/gestion-competence.component';
import {MatInputModule} from '@angular/material/input';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ToastrModule } from 'ngx-toastr';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AllcollabComponent } from './Admin/Collaborateur/List/allcollab/allcollab.component';
import { AllUsersComponent } from './Admin/all-manager-service/all-users.component';
import { UserByIdComponent } from './Admin/user-by-id/user-by-id.component';
import { DashboardAdminComponent } from './Admin/dashboard/dashboard-admin/dashboard-admin.component';
import { AddFicheDePosteComponent } from './Manager/add-fiche-de-poste/add-fiche-de-poste.component';
@NgModule({
  declarations: [
    AppComponent, SignupComponent, SuccessDialogComponent, SigninComponent,
     AllUsersComponent, MenuloginComponent, RequestPasswordComponent, 
     EmailSuccessComponent, ResetPasswordComponent, ActivationCompteComponent, ActivationreussieComponent,
      MotdepasseComponent, EditProfileComponent, ProfileComponent, AdminMenuComponent, CollabMenuComponent,
       ManagerMenuComponent, AddCompteComponent, AddCompteCollabComponent, GestionCompetenceComponent, AllcollabComponent, UserByIdComponent, DashboardAdminComponent, AddFicheDePosteComponent, 
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,MatInputModule, MatButtonModule,
    NgxPaginationModule,
    AppRoutingModule,    
    HttpClientModule, FormsModule, MatDialogModule, BrowserAnimationsModule,
    ModalModule.forRoot(),  
    RecaptchaModule, 
    MatPaginatorModule,
        ToastrModule.forRoot({
      timeOut: 5000,
      progressBar: true,
      // Ajoutez d'autres options de personnalisation de style ici
    }),BrowserAnimationsModule,
    ButtonsModule.forRoot(),
    BsDropdownModule.forRoot(),



    
 
  ],
  providers: [
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
