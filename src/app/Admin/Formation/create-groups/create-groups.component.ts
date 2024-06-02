import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Collaborateur } from 'src/app/model/collaborateur.model';
import { GroupsService } from 'src/app/service/groups.service';
import { ParticapationFormationService } from 'src/app/service/particapation-formation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-groups',
  templateUrl: './create-groups.component.html',
  styleUrls: ['./create-groups.component.css']
})
export class CreateGroupsComponent implements OnInit {

  formationId!: number;
  groupForm!: FormGroup;
  collaborateursConfirme: any[] = [];

  constructor(
    private groupsService: GroupsService,
    private modalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private participationFormation: ParticapationFormationService
  ) { }

  ngOnInit(): void {
    if (this.modalRef.content) {
      this.formationId = this.modalRef.content.formationId;
    }

    this.groupForm = this.formBuilder.group({
      nom: ['', Validators.required],
      collaborateursId: this.formBuilder.array([]) // Utilisation d'un FormArray
   });
  
   // Récupération des collaborateurs confirmés
   this.participationFormation.getFormationsConfirme(this.formationId).subscribe(
      (data: Collaborateur[]) => {
        this.collaborateursConfirme = data;
        // Ajout des contrôles de checkbox pour chaque collaborateur
        data.forEach(collaborateur => {
          const control = new FormControl(false); // Initialisé à false
          (this.groupForm.get('collaborateursId') as FormArray).push(control);
        });
      },
      error => {
        console.error('Erreur lors de la récupération des collaborateurs confirmés : ', error);
      }
   );
  }

  selectedCollaborateurs: number[] = []; // Déclarez la propriété selectedCollaborateurs

  
ajouterGroupe(): void {
  const nom = this.groupForm?.get('nom')?.value;
  const collaborateursId = (this.groupForm?.get('collaborateursId') as FormArray).controls
     .map((control, index) => control.value ? this.collaborateursConfirme[index].idC : null)
     .filter(id => id !== null); // Filtrer les valeurs null
 
  if (nom && collaborateursId.length > 0) {
     this.groupsService.addGroupWithFormationAndCollaborateurs(this.formationId, nom, collaborateursId)
       .subscribe(
         response => {
           console.log('Groupe ajouté avec succès' ,collaborateursId);
           Swal.fire('Succès', 'Groupe ajouté avec succès', 'success');
           this.groupForm.reset();
         },
         error => {
           console.error('Erreur lors de l\'ajout du groupe :', error);
           Swal.fire('Erreur', 'Une erreur est survenue lors de l\'ajout du groupe', 'error');
         }
       );
  } else {
     console.error("Le formulaire n'est pas initialisé correctement.");
     Swal.fire('Erreur', 'Le formulaire n\'est pas initialisé correctement', 'error');
  }
}
   
  
}
