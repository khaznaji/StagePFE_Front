import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Candidature } from 'src/app/model/candidature.model';
import { Poste } from 'src/app/model/poste.model';
import { Quiz } from 'src/app/model/quiz.model';
import { PosteService } from 'src/app/service/poste.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mestesttechnique',
  templateUrl: './mestesttechnique.component.html',
  styleUrls: ['./mestesttechnique.component.css'],
})
export class MestesttechniqueComponent implements OnInit {
  tests: any[] = [];
  constructor(private posteService: PosteService, private router: Router) {}

  ngOnInit(): void {
    this.getMesTestTechnique();
  }

  getMesTestTechnique() {
    this.posteService.getMesTestTechnique().subscribe(
      (data: any[]) => {
        this.tests = data;
        console.log('Postulations récupérées:');
      },
      (error) => {
        console.error("Une erreur s'est produite:", error);
      }
    );
  }
  // Poste
  startQuiz(qid: number, candidatureId: number) {
    Swal.fire({
      title: 'Voulez-vous commencer le quiz?',
      html: `
        <ul>
          <li>Cliquez sur <b>Commencer</b> pour démarrer le quiz</li>
          <li>Vous ne pourrez pas reprendre le quiz s'il est interrompu</li>
          <li>Le temps commencera dès que vous aurez cliqué sur le quiz</li>
          <li>Un rapport sera généré sous forme de PDF</li>
        </ul>
      `,
      showDenyButton: true,
      confirmButtonText: 'Commencer',
      denyButtonText: `Ne pas commencer`,
      icon: 'info',
    }).then((result) => {
      if (result.isConfirmed) {
        // Appeler le service pour mettre à jour l'état du quiz
        this.posteService.updateEtatQuizz(candidatureId).subscribe(() => {
          // Naviguer vers la page de démarrage du quiz
          this.router.navigate(['/collaborateur/start-test/' + qid + '/' + candidatureId]);
        });
      } else if (result.isDenied) {
        this.router.navigate(['/collaborateur/mes-tests-techniques']);
      }
    });
  }
}
