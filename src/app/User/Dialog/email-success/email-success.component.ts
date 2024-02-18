import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-email-success',
  templateUrl: './email-success.component.html',
  styleUrls: ['./email-success.component.css']
})
export class EmailSuccessComponent {
  constructor(public bsModalRef: BsModalRef) {}

  closeModal() {
    this.bsModalRef.hide();
  }

}
