import { HttpClient } from '@angular/common/http';
import { Component, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/service/user.service';
import { EmailSuccessComponent } from '../Dialog/email-success/email-success.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-request-password',
  templateUrl: './request-password.component.html',
  styleUrls: ['./request-password.component.css']
})
export class RequestPasswordComponent {
  email: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient ,  private elementRef: ElementRef,private modalService: BsModalService) { }
  modalRef!: BsModalRef;

  onSubmit(form: NgForm): void {
    const formData = new FormData();
    formData.append('email', this.email);
  
    this.http.post<any>('http://localhost:8080/auth/request', formData , { responseType: 'text' as 'json' }).subscribe(
      response => {
        this.successMessage = response,
        this.openModal();

        form.resetForm();
      },
      error => {
        console.error('Error Response:', error);
      if (error.status === 404 && error.error === 'Email not found') { // Update this line
        this.errorMessage = 'L\'adresse e-mail n\'existe pas.';
      }
      }
    );
  }
  

  isSopraHrEmail(email: string): boolean {
    return email.endsWith('@soprahr.com') || email.endsWith('@gmail.com');
  }
  openModal() {
    this.modalRef = this.modalService.show(EmailSuccessComponent);
  }
}

function ViewChild(arg0: string): (target: RequestPasswordComponent, propertyKey: "form") => void {
  throw new Error('Function not implemented.');
}
