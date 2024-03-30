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
  styleUrls: ['./mestesttechnique.component.css']
})
export class MestesttechniqueComponent implements OnInit{
  tests: any[] = [];
  constructor(private posteService : PosteService ,     private router: Router
    ) { }
 
 


  ngOnInit(): void {
   
    this.getMesTestTechnique();

  }
  
 
  getMesTestTechnique() {
    this.posteService.getMesTestTechnique()
      .subscribe(
        (data: any[]) => {
          this.tests = data;
          console.log('Postulations récupérées:');

        },
        error => {
          console.error('Une erreur s\'est produite:', error);
        }
      );
  }
  // Poste 
  startQuiz(qid: number, candidatureId: number) {
    Swal.fire({
      title: 'Do you want to start the Quiz?',
      showDenyButton: true,
      confirmButtonText: 'Start',
      denyButtonText: `Don't start`,
      icon: 'info',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/collaborateur/start-test/' + qid + '/' + candidatureId]);;
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }
}
