import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormationService } from 'src/app/service/formation.service';

@Component({
  selector: 'app-get-by-id-formation',
  templateUrl: './get-by-id-formation.component.html',
  styleUrls: ['./get-by-id-formation.component.css']
})
export class GetByIdFormationComponent implements OnInit  {
  @Input() formationId!: number;
  constructor(private formationService: FormationService , private modalRef: BsModalRef) { }

  ngOnInit(): void {
    if (this.modalRef.content) {
      this.formationId = this.modalRef.content.formationId;
      this.getFormation(); // Appel de la méthode pour récupérer les informations du collaborateur

   }
   this.getFormation(); // Appel de la méthode pour récupérer les informations du collaborateur

  }
  formationInfo: any;

  getFormation(): void {
    this.formationService.getFormationById(this.formationId)
       .subscribe(data => {
         this.formationInfo = data; 
         console.log('Données reçues:', data); // Ajoutez cette ligne pour vérifier les données
      console.log(this.formationInfo);// Corrigez cette ligne
       }, error => {
         console.log('Une erreur s\'est produite lors de la récupération des informations de la formation:', error);
       });
   }

}
