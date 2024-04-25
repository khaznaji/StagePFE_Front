import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Collaborateur } from 'src/app/model/collaborateur.model';
import { GroupsService } from 'src/app/service/groups.service';
import { ParticapationFormationService } from 'src/app/service/particapation-formation.service';
import { SessionFormationService } from 'src/app/service/session-formation.service';

@Component({
  selector: 'app-details-group',
  templateUrl: './details-group.component.html',
  styleUrls: ['./details-group.component.css']
})
export class DetailsGroupComponent  implements OnInit {
  constructor(
    private groupsService: GroupsService,
    public dialog: MatDialog,
    private modalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private participationFormation: ParticapationFormationService,
    private route: ActivatedRoute // Ajout de ActivatedRoute pour récupérer le paramètre formationId


  ) {}
  @Input() id!: number; // Définir une propriété d'entrée pour recevoir l'ID de la route
  groupId!: number;
  groupForm!: FormGroup;
  collaborateursConfirme: any[] = [];
  showAddParticipantFormFlag: boolean = false;

  ngOnInit(): void {
    
    if (this.modalRef.content) {
      this.id = this.modalRef.content.id;
    }
    this.groupForm = this.formBuilder.group({
      collaborateursId: this.formBuilder.array([]) // Utilisation d'un FormArray
   });

    this.getGroupesDetails(); 
    this.participationFormation.getFormationsConfirme(this.id).subscribe(
      (data: Collaborateur[]) => {
        console.log('Données des collaborateurs confirmés :', data); // Ajoutez cette ligne pour afficher les données récupérées

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
   nom!: string;
   editing: boolean = false;
   editGroup() {
    this.groupsService.editGroupName(this.groupId, this.nom)
      .subscribe(
        response => {
          console.log('Le nom du groupe a été modifié avec succès : ', response);
          // Réinitialiser les valeurs après la modification réussie
          this.nom = '';
          this.editing = false;
        },
        error => {
          console.error('Une erreur est survenue lors de la modification du nom du groupe : ', error);
          // Gérer l'erreur ici, afficher un message à l'utilisateur, etc.
        }
      );
  }
  showEditForm(groupId: number, currentName: string) {
    this.groupId = groupId;
    this.nom = currentName;
    this.editing = true;
  }
   showAddParticipantForm(): void {
    this.showAddParticipantFormFlag = true;
  }
   groupes: any;
   removeUserFromGroup(userId: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur du groupe?')) {
      this.groupsService.removeUserFromGroup(this.groupId, userId)
        .subscribe(
          response => {
            console.log(response);
            // Rafraîchir les détails du groupe après la suppression de l'utilisateur
            this.getGroupesDetails();
          },
          error => {
            console.error('Erreur lors de la suppression de l\'utilisateur du groupe :', error);
            // Traiter l'erreur en conséquence
          }
        );
    }
  }

  getGroupesDetails(): void {
    this.groupsService.getGroupesDetails(this.groupId)
      .subscribe(
        (data: any[]) => {
          this.groupes = data;
        },
        error => {
          console.log(error);
        }
      );
  }
  ajouterGroupe(): void {
    const collaborateursId = (this.groupForm?.get('collaborateursId') as FormArray).controls
       .map((control, index) => control.value ? this.collaborateursConfirme[index].idC : null)
       .filter(id => id !== null); // Filtrer les valeurs null
   
    if ( collaborateursId.length > 0) {
       this.groupsService.addCollaborateursToGroup(this.id,this.groupId, collaborateursId)
         .subscribe(
           response => {
             console.log('Groupe ajouté avec succès' ,collaborateursId);
             this.showAddParticipantFormFlag = false;

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
