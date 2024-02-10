import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-signup-success-dialog',
  templateUrl: './signup-success-dialog.component.html',
  styleUrls: ['./signup-success-dialog.component.css']
})
export class SignupSuccessDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

}
