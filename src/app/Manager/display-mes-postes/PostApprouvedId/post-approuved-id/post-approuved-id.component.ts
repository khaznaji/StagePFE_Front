import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ViewCandidateByIdComponent } from 'src/app/Manager/gestion-poste-by-id/view-candidate-by-id/view-candidate-by-id.component';
import { AddQuizComponent } from 'src/app/Manager/quiz/add-quiz/add-quiz.component';
import { Candidature } from 'src/app/model/candidature.model';
import { Quiz } from 'src/app/model/quiz.model';
import { PosteService } from 'src/app/service/poste.service';
import { QuizService } from 'src/app/service/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post-approuved-id',
  templateUrl: './post-approuved-id.component.html',
  styleUrls: ['./post-approuved-id.component.css']
})
export class PostApprouvedIdComponent implements OnInit{
  collaborateursEnAttente: number = 0;
  collaborateursAcceptees: number = 0;
  collaborateursRefusees: number = 0;
  filteredPostes: any[] = [];
  searchTerm: string = ''; 
  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.postId = +params['postId']; // Convertissez la chaîne en nombre
      this.loadPosteDetails(); 
      
      this.loadQuizzesByPostId(this.postId);

      // Fetch post details when component initializes
    });
  }
  postId!: number;
  poste: any; 

  constructor( private route: ActivatedRoute ,private router: Router, private quizService : QuizService , private posteService: PosteService ,public dialog: MatDialog ,  private modalService: BsModalService) {}
  private loadPosteDetails() {
    this.posteService.getPosteById(this.postId).subscribe(
      data => {
        this.poste = data;
        console.log('Poste details:', this.poste);
      },
      error => {
        console.error('Error loading poste details:', error);
      }
    );
  }
 
 
 

  modalRef!: BsModalRef;
 
  
  
 openModal() {
  this.modalRef = this.modalService.show(AddQuizComponent);
}


quizzes: Quiz[] = [];

loadQuizzesByPostId(postId: number): void {
  this.quizService.getQuizzesByPostId(postId)
    .subscribe(
      (quizzes: Quiz[]) => {
        this.quizzes = quizzes;
      },
      (error) => {
        console.error('Error fetching quizzes:', error);
        // Gérer l'erreur, par exemple, afficher un message d'erreur à l'utilisateur
      }
    );
}
ToEdit(postid :number  ){
  this.router.navigate(['managerService/update-test', postid]);
 }
 deleteQuiz(qid:any) {
  Swal.fire({
    icon: 'info',
    title: 'Are you sure you want to delete?',
    confirmButtonText: 'Delete',
    showCancelButton: true,
  }).then((result) => {
    if (result.isConfirmed) {
      this.quizService.deleteQuiz(qid).subscribe(
        (data) => {
          this.ngOnInit();
          Swal.fire('Success!', 'Quiz Deleted ', 'success');
        },
        (error) => {
          Swal.fire('Error!', 'server loading error', 'error');
        }
      );
    }
  });
}
publierPoste(postId: number): void {
  this.posteService.PubliePoste(postId).subscribe(
    () => {
      console.log('Poste publié avec succès');
      // Ajoutez ici votre logique après la publication du poste
    },
    (error) => {
      console.error('Erreur lors de la publication du poste :', error);
      // Ajoutez ici votre logique pour gérer les erreurs de publication du poste
    }
  );
}
}
