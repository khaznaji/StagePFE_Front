import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EntretienRhService } from 'src/app/service/entretien-rh.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-evaluate-interview-rh',
  templateUrl: './evaluate-interview-rh.component.html',
  styleUrls: ['./evaluate-interview-rh.component.css']
})
export class EvaluateInterviewRhComponent 
  implements OnInit {
    candidatureId!: string;
    salaire: number = 0;
  
    constructor(private route: ActivatedRoute , private router : Router ,    private entretienService: EntretienRhService // Injectez le service EntretienService
    ) { }
  
    ngOnInit(): void {
      this.candidatureId = this.route.snapshot.params['candidatureId'];
      // Vous pouvez utiliser candidatureId pour effectuer des actions spécifiques à cette candidature, comme récupérer les données de l'entretien à évaluer, etc.
      console.log('Candidature ID:', this.candidatureId);
    }
    noterEntretien(): void {
      // Appelez la méthode noter du service EntretienService
      this.entretienService.noter(+this.candidatureId, this.salaire)
        .subscribe(response => {
          {
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
                this.router.navigate(['/managerRh/dashboard']);
              }
            });
          }},
          // Faites quelque chose après avoir noté l'entretien, par exemple, redirigez l'utilisateur vers une autre page ou affichez un message de confirmation.
         error => {
          console.error(error); // Gérez les erreurs
          // Faites quelque chose en cas d'erreur, par exemple, affichez un message d'erreur à l'utilisateur.
        });
    }
}
