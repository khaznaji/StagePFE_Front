import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateFormationComponent } from 'src/app/Formateur/create-formation/create-formation.component';
import { GetByIdFormationComponent } from 'src/app/Formateur/get-by-id-formation/get-by-id-formation.component';
import { FormationService } from 'src/app/service/formation.service';
import { FormationDetailComponent } from '../formation-detail/formation-detail.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { UserAuthService } from 'src/app/service/user-auth.service';

@Component({
  selector: 'app-liste-des-formations',
  templateUrl: './liste-des-formations.component.html',
  styleUrls: ['./liste-des-formations.component.css']
})
export class ListeDesFormationsComponent implements OnInit {
ngOnInit(): void {
  this.reloadData(); 
}
constructor(private formationService : FormationService ,    private modalService: BsModalService , private http: HttpClient , private authService: UserAuthService 
){}
reloadData() {
  this.events = this.formationService.formationCollab().subscribe((res) => {
    this.events = res;
    console.log(res);
  });
}
events: any;

modalRef!: BsModalRef;

openModalById(formationId: number): void {
  const initialState = {
    formationId: formationId,
  };
  this.modalRef = this.modalService.show(FormationDetailComponent, {
    initialState,
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
