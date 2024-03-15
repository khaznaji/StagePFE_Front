import { trigger, transition, style, animate } from '@angular/animations';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PosteService } from 'src/app/service/poste.service';
import { UserAuthService } from 'src/app/service/user-auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-get-all-poste-collab',
  templateUrl: './get-all-poste-collab.component.html',
  styleUrls: ['./get-all-poste-collab.component.css'] 

})
export class GetAllPosteCollabComponent implements OnInit {
  approvedPostes!: any[];

  constructor(private posteService: PosteService,private router: Router, private http: HttpClient , private authService: UserAuthService) {}

  ngOnInit(): void {
    this.getApprovedPostes();
  }
  getRandomColor(index: number) {
    const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6', '#34495e', '#1abc9c', '#d35400'];
    const setIndex = Math.floor(index / 10); // Calculate the set index based on competence index
    return colors[setIndex % colors.length]; // Use the set index to determine the color
  }
  
  private BASE_URL2 = 'http://localhost:8080/api/Poste';

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
    this.http.post<string>(`${this.BASE_URL2}/postuler/${postId}` ,{}, {headers}).subscribe(
        response => {
            console.log("Réponse de la requête POST:", response);
            Swal.fire({
                icon: 'success',
                title: 'Postulation réussie!',
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


  getApprovedPostes(): void {
    this.posteService.getApprovedAndNotAppliedPostes()
      .subscribe(
        (data) => {
          this.approvedPostes = data;
          console.log('Approved Postes:', this.approvedPostes);
        },
        (error) => {
          console.error('Error fetching approved postes:', error);
        }
      );
  }
}