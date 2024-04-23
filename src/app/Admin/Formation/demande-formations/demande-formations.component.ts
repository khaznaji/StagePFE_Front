import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { FormationService } from 'src/app/service/formation.service';
import { ParticapationFormationService } from 'src/app/service/particapation-formation.service';
import { UserAuthService } from 'src/app/service/user-auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-demande-formations',
  templateUrl: './demande-formations.component.html',
  styleUrls: ['./demande-formations.component.css']
})
export class DemandeFormationsComponent implements OnInit  {
  constructor(private route: ActivatedRoute , private participationFormation : ParticapationFormationService , private formationService: FormationService , private authService: UserAuthService , private http: HttpClient , private modalRef: BsModalRef) { }
  id!: number;
  formationsAcceptees: any[] = []; // Initialisez une variable pour stocker les formations acceptées

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id']; 
   this.getFormation(); // Appel de la méthode pour récupérer les informations du collaborateur
this.getFormationsAccepte();
    });}
  formationInfo: any;

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
