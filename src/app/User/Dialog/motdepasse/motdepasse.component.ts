import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-motdepasse',
  templateUrl: './motdepasse.component.html',
  styleUrls: ['./motdepasse.component.css']
})
export class MotdepasseComponent {
  constructor(public bsModalRef: BsModalRef) {}

  closeModal() {
    this.bsModalRef.hide();
  }
}
