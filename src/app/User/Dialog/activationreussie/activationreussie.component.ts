import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-activationreussie',
  templateUrl: './activationreussie.component.html',
  styleUrls: ['./activationreussie.component.css']
})
export class ActivationreussieComponent {
  constructor(public bsModalRef: BsModalRef) {}

  closeModal() {
    this.bsModalRef.hide();
  }
}
