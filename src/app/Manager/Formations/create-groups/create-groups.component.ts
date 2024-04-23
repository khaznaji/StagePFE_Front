import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Collaborateur } from 'src/app/model/collaborateur.model';
import { GroupsService } from 'src/app/service/groups.service';
import { ParticapationFormationService } from 'src/app/service/particapation-formation.service';

@Component({
  selector: 'app-create-groups',
  templateUrl: './create-groups.component.html',
  styleUrls: ['./create-groups.component.css']
})
export class CreateGroupsComponent implements OnInit {

  formationId!: number;
  groupForm!: FormGroup;
  collaborateursConfirme: any[] = [];
  collaborateurIds: number[] = [];
  nom!: string;
  constructor(
    private groupsService: GroupsService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private participationFormation: ParticapationFormationService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.formationId = +params['formationId'];

      this.groupForm = this.formBuilder.group({
        nom: ['', Validators.required],
        collaborateurIds: [[]] // Utilisation d'un tableau vide comme valeur par défaut
      });
      
      this.groupForm = this.formBuilder.group({
        nom: ['', Validators.required],
        collaborateursId: [''] // Vous pouvez le changer selon vos besoins
      });
   

      this.participationFormation.getFormationsConfirme(this.formationId).subscribe(
        (data: Collaborateur[]) => {
          this.collaborateursConfirme = data;
        },
        error => {
          console.error('Erreur lors de la récupération des collaborateurs confirmés : ', error);
        }
      );
    });
  }
  selectedCollaborateurs: number[] = []; // Déclarez la propriété selectedCollaborateurs


 
  ajouterGroupe(): void {
    const nom = this.groupForm?.get('nom')?.value;
    const collaborateursId = this.groupForm?.get('collaborateursId')?.value.split(',').map((id: string | number)=> +id);
  
    if (nom && collaborateursId) {
      this.groupsService.addGroupWithFormationAndCollaborateurs(this.formationId, nom, collaborateursId)
        .subscribe(
          response => {
            console.log('Groupe ajouté avec succès');
            // Réinitialiser le formulaire après l'ajout
            this.groupForm.reset();
          },
          error => {
            console.error('Erreur lors de l\'ajout du groupe :', error);
          }
        );
    } else {
      console.error("Le formulaire n'est pas initialisé correctement.");
    }
  }
  
}
