import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EntretienService } from 'src/app/service/entretien.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-evaluate-interview',
  templateUrl: './evaluate-interview.component.html',
  styleUrls: ['./evaluate-interview.component.css'],
})
export class EvaluateInterviewComponent implements OnInit {
  candidatureId!: string;
  note: number = 0;

  constructor(
    private route: ActivatedRoute,
    private entretienService: EntretienService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.candidatureId = this.route.snapshot.params['candidatureId'];
    // Vous pouvez utiliser candidatureId pour effectuer des actions spécifiques à cette candidature, comme récupérer les données de l'entretien à évaluer, etc.
    console.log('Candidature ID:', this.candidatureId);
  }
  noterEntretien(): void {
    // Appelez la méthode noter du service EntretienService
    this.entretienService.noter(+this.candidatureId, this.note).subscribe(
      (response) => {
        console.log(response); // Affichez la réponse de l'API

        // Affichez un message de succès à l'utilisateur
        Swal.fire({
          icon: 'success',
          title: 'Entretien noté avec succès',
          text: 'Votre entretien a été noté avec succès.',
          confirmButtonText: 'OK',
        }).then((result) => {
          // Faites quelque chose après avoir noté l'entretien, par exemple, redirigez l'utilisateur vers une autre page
          if (result.isConfirmed) {
            // Redirection vers une autre page
            this.router.navigate(['/managerService/dashboard']);
          }
        });
      },
      (error) => {
        console.error(error); // Gérez les erreurs

        // Affichez un message d'erreur à l'utilisateur
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: "Une erreur s'est produite lors de la notation de l'entretien. Veuillez réessayer.",
          confirmButtonText: 'OK',
        });
      }
    );
  }
}
