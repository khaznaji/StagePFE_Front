import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EntretienService } from 'src/app/service/entretien.service';

@Component({
  selector: 'app-evaluate-interview',
  templateUrl: './evaluate-interview.component.html',
  styleUrls: ['./evaluate-interview.component.css']
})
export class EvaluateInterviewComponent implements OnInit {
  candidatureId!: string;
  note: number = 0;
  commentaire: string = "";

  constructor(private route: ActivatedRoute ,     private entretienService: EntretienService // Injectez le service EntretienService
  ) { }

  ngOnInit(): void {
    this.candidatureId = this.route.snapshot.params['candidatureId'];
    // Vous pouvez utiliser candidatureId pour effectuer des actions spécifiques à cette candidature, comme récupérer les données de l'entretien à évaluer, etc.
    console.log('Candidature ID:', this.candidatureId);
  }
  noterEntretien(): void {
    // Appelez la méthode noter du service EntretienService
    this.entretienService.noter(+this.candidatureId, this.note, this.commentaire)
      .subscribe(response => {
        console.log(response); // Affichez la réponse de l'API
        // Faites quelque chose après avoir noté l'entretien, par exemple, redirigez l'utilisateur vers une autre page ou affichez un message de confirmation.
      }, error => {
        console.error(error); // Gérez les erreurs
        // Faites quelque chose en cas d'erreur, par exemple, affichez un message d'erreur à l'utilisateur.
      });
  }}
