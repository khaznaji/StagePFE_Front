import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateGroupsComponent } from 'src/app/Admin/Formation/create-groups/create-groups.component';
import { DetailsGroupComponent } from 'src/app/Admin/Formation/details-group/details-group.component';
import { FormationService } from 'src/app/service/formation.service';
import { GroupsService } from 'src/app/service/groups.service';
import { ParticapationFormationService } from 'src/app/service/particapation-formation.service';
import Swal from 'sweetalert2';
import { DetailsGroupsOfFormateurComponent } from '../details-groups-of-formateur/details-groups-of-formateur.component';

@Component({
  selector: 'app-get-by-id-formation',
  templateUrl: './get-by-id-formation.component.html',
  styleUrls: ['./get-by-id-formation.component.css']
})
export class GetByIdFormationComponent implements OnInit  {
  constructor(private route: ActivatedRoute ,  private modalService: BsModalService,
    private participationFormation : ParticapationFormationService , private formationService: FormationService , private groupsService: GroupsService , private http: HttpClient , private modalRef: BsModalRef) { }
  id!: number;
  formationsAcceptees: any[] = []; // Initialisez une variable pour stocker les formations acceptées

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id']; 
   this.getFormation(); // Appel de la méthode pour récupérer les informations du collaborateur
this.getFormationsAccepte();
this.getGroupesByFormation();

    });}
  
     
  formationInfo: any;
  groupes: any;
  openCreateGroupsModal(formationId: number): void {
    const initialState = {
      formationId: formationId
    };
    this.modalService.show(CreateGroupsComponent, { initialState });
  }
  openModael(groupId: number): void {
    const initialState = {
      groupId: groupId,
      id: this.id, // Passer l'ID de la route

    };
    this.modalService.show(DetailsGroupsOfFormateurComponent, { initialState });
  }
  deleteGroup(groupId: number): void {
    // Utilisation de SweetAlert2 pour afficher une boîte de dialogue de confirmation
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Vous ne pourrez pas annuler cette action!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!'
    }).then((result) => {
      if (result.isConfirmed) {
        // Appel de la méthode deleteGroup du service
        this.groupsService.deleteGroup(groupId)
          .subscribe(
            response => {
              console.log(response);
              // Afficher un message de succès
              Swal.fire(
                'Supprimé!',
                'Le groupe a été supprimé avec succès.',
                'success'
              );
              this.getGroupesByFormation();

            },
            error => {
              console.error('Error:', error);
              // Afficher un message d'erreur en cas d'échec de la suppression
              Swal.fire(
                'Erreur!',
                'Une erreur est survenue lors de la suppression du groupe.',
                'error'
              );
            }
          );
      }
    });
  }
   
  getFormation(): void {
    this.formationService.getFormationByIdForCollab(this.id)
       .subscribe(data => {
         this.formationInfo = data; 
         console.log('Données reçues:', data); // Ajoutez cette ligne pour vérifier les données
      console.log(this.formationInfo);// Corrigez cette ligne
       }, error => {
         console.log('Une erreur s\'est produite lors de la récupération des informations de la formation:', error);
       });
   }
   getGroupesByFormation(): void {
    this.groupsService.getGroupesByFormation(this.id)
      .subscribe(
        (data: any[]) => {
          this.groupes = data;
        },
        error => {
          console.log(error);
        }
      );
  }
  getGroupesDetails(groupId: number): void {
    this.groupsService.getGroupesDetails(groupId)
      .subscribe(
        (data: any[]) => {
          this.groupes = data;
        },
        error => {
          console.log(error);
        }
      );
  }
   getFormationsAccepte() {

    // Appelez la méthode du service pour récupérer les formations acceptées pour un utilisateur spécifique
    this.participationFormation.getFormationsAccepte(this.id).subscribe(
      (data: any[]) => {
        // Stockez les données récupérées dans la variable formationsAcceptees
        this.formationsAcceptees = data;
        console.log(data); // Vous pouvez supprimer cette ligne si vous n'avez pas besoin d'afficher les données dans la console
      },
      (error) => {
        console.log(error); // Gérez les erreurs éventuelles ici
      }
    );
  }
  updateEtatAccepte(participationId: number): void {
    Swal.fire({
      title: 'Confirmer',
      text: 'Voulez-vous vraiment accepter cette participation ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non'
    }).then((result) => {
      if (result.isConfirmed) {
        this.participationFormation.updateEtatParticipationConfime(participationId).subscribe(
          response => {
            Swal.fire('Succès', 'L\'état de participation a été mis à jour avec succès.', 'success');
            setTimeout(() => {
              window.location.reload(); // Rechargement de la page après confirmation et délai de 3 secondes
            }, 3000); // 3 secondes
          },
          error => {
            Swal.fire('Erreur', 'Une erreur s\'est produite lors de la mise à jour de l\'état de participation.', 'error');
            console.error('Une erreur s\'est produite lors de la mise à jour de l\'état de participation :', error);
            // Gérez l'erreur de manière appropriée
          }
        );
      }
    });
  }
  
  // Méthode pour mettre à jour l'état de participation à "Refusee"
  updateEtatRefusee(participationId: number): void {
    Swal.fire({
      title: 'Confirmer',
      text: 'Voulez-vous vraiment refuser cette participation ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non'
    }).then((result) => {
      if (result.isConfirmed) {
        this.participationFormation.updateEtatParticipationRefusee(participationId).subscribe(
          response => {
            Swal.fire('Succès', 'L\'état de participation a été mis à jour avec succès.', 'success');
            setTimeout(() => {
              window.location.reload(); // Rechargement de la page après confirmation et délai de 3 secondes
            }, 3000); // 3 secondes
          },
          error => {
            Swal.fire('Erreur', 'Une erreur s\'est produite lors de la mise à jour de l\'état de participation.', 'error');
            console.error('Une erreur s\'est produite lors de la mise à jour de l\'état de participation :', error);
            // Gérez l'erreur de manière appropriée
          }
        );
      }
    });
  }
 

}
