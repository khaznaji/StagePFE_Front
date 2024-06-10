import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormationService } from 'src/app/service/formation.service';
import { ParticapationFormationService } from 'src/app/service/particapation-formation.service';
import { UserAuthService } from 'src/app/service/user-auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formation-detail',
  templateUrl: './formation-detail.component.html',
  styleUrls: ['./formation-detail.component.css']
})
export class FormationDetailComponent implements OnInit  {
  @Input() formationId!: number;
  constructor(private formationService: FormationService , private authService: UserAuthService , private http: HttpClient , private modalRef: BsModalRef) { }

  ngOnInit(): void {
    if (this.modalRef.content) {
      this.formationId = this.modalRef.content.formationId;
      this.getFormation(); // Appel de la méthode pour récupérer les informations du collaborateur

   }
   this.getFormation(); // Appel de la méthode pour récupérer les informations du collaborateur

  }
  formationInfo: any;

  getFormation(): void {
    this.formationService.getFormationByIdForCollab(this.formationId)
       .subscribe(data => {
         this.formationInfo = data; 
         console.log('Données reçues:', data); // Ajoutez cette ligne pour vérifier les données
      console.log(this.formationInfo);// Corrigez cette ligne
       }, error => {
         console.log('Une erreur s\'est produite lors de la récupération des informations de la formation:', error);
       });
   }
   private BASE_URL2 = 'http://192.168.56.2:8085/api/ParticipationFormation';

   postulerAuPoste(postId: number): void {
     console.log("Début de la méthode postulerAuPoste");
 
     const authToken = this.authService.getToken();
     console.log("AuthToken:", authToken);
 
     const headers = new HttpHeaders({
         'Authorization': `Bearer ${authToken}`
     });
     console.log("Headers:", headers);
 
     // Supprimez l'en-tête 'Content-Type' pour permettre au navigateur de le définir automatiquement
     headers.delete('Content-Type');
 
     console.log("Envoi de la requête HTTP POST avec postId:", postId);
     this.http.post<string>(`${this.BASE_URL2}/inscription/${postId}` ,{}, {headers}).subscribe(
         response => {
             console.log("Réponse de la requête POST:", response);
             Swal.fire({
                 icon: 'success',
                 title: 'Demande d inscription réussie!',
                 text: 'Votre postulation a été enregistrée avec succès.',
             });
             setTimeout(() => {
               location.reload();
             }, 3000);
         },
         error => {
             console.error("Erreur lors de la requête POST:", error);
             // Extraire le message d'erreur du corps de la réponse
             const errorMessage = error.error ? error.error.error : 'Une erreur s\'est produite lors de la postulation.';
             Swal.fire({
                 icon: 'error',
                 title: 'Erreur!',
                 text: errorMessage,
             });
         }
     );
 }
 

}
