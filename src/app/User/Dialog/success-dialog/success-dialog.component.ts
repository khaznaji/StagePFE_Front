import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-success-dialog',
  templateUrl: './success-dialog.component.html',
  styleUrls: ['./success-dialog.component.css']
})
export class SuccessDialogComponent {
  constructor(public bsModalRef: BsModalRef) {}

  closeModal() {
    this.bsModalRef.hide();
  }
}
