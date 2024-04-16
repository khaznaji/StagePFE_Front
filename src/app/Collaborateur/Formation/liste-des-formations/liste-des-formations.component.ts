import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateFormationComponent } from 'src/app/Formateur/create-formation/create-formation.component';
import { GetByIdFormationComponent } from 'src/app/Formateur/get-by-id-formation/get-by-id-formation.component';
import { FormationService } from 'src/app/service/formation.service';
import { FormationDetailComponent } from '../formation-detail/formation-detail.component';

@Component({
  selector: 'app-liste-des-formations',
  templateUrl: './liste-des-formations.component.html',
  styleUrls: ['./liste-des-formations.component.css']
})
export class ListeDesFormationsComponent implements OnInit {
ngOnInit(): void {
  this.reloadData(); 
}
events: any;
constructor(private formationService : FormationService ,    private modalService: BsModalService
){}
reloadData() {
  this.events = this.formationService.formationCollab().subscribe((res) => {
    this.events = res;
    console.log(res);
  });
}
modalRef!: BsModalRef;

openModalById(formationId: number): void {
  const initialState = {
    formationId: formationId,
  };
  this.modalRef = this.modalService.show(FormationDetailComponent, {
    initialState,
  });
}
}
