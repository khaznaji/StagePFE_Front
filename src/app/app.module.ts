import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './User/signup/signup.component';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SuccessDialogComponent } from './User/Dialog/success-dialog/success-dialog.component';

@NgModule({
  declarations: [
    AppComponent, SignupComponent, SuccessDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,    
    HttpClientModule, FormsModule, MatDialogModule


    
 
  ],
  providers: [     
],
  bootstrap: [AppComponent]
})
export class AppModule { }
