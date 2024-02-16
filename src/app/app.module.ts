import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './User/signup/signup.component';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SuccessDialogComponent } from './User/Dialog/success-dialog/success-dialog.component';
import { SigninComponent } from './User/signin/signin.component';
import { AllUsersComponent } from './Admin/all-users/all-users.component';
import { MenuComponent } from './menu/menu.component';
import { MenuloginComponent } from './User/menulogin/menulogin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    AppComponent, SignupComponent, SuccessDialogComponent, SigninComponent, AllUsersComponent, MenuComponent, MenuloginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,    
    HttpClientModule, FormsModule, MatDialogModule, BrowserAnimationsModule,
    ModalModule.forRoot(),


    
 
  ],
  providers: [     
],
  bootstrap: [AppComponent]
})
export class AppModule { }
