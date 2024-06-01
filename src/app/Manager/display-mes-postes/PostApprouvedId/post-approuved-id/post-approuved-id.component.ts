import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
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
  styleUrls: ['./post-approuved-id.component.css'],
})
export class PostApprouvedIdComponent implements OnInit {
  collaborateursEnAttente: number = 0;
  collaborateursAcceptees: number = 0;
  collaborateursRefusees: number = 0;
  filteredPostes: any[] = [];
  searchTerm: string = '';
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.postId = +params['postId']; // Convertissez la chaîne en nombre
      this.loadPosteDetails();

      this.loadQuizzesByPostId(this.postId);

      // Fetch post details when component initializes
    });
  }
  postId!: number;
  poste: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private quizService: QuizService,
    private posteService: PosteService,
    public dialog: MatDialog,
    private modalService: BsModalService
  ) {}
  private loadPosteDetails() {
    this.posteService.getPosteById(this.postId).subscribe(
      (data) => {
        this.poste = data;
        console.log('Poste details:', this.poste);
      },
      (error) => {
        console.error('Error loading poste details:', error);
      }
    );
  }

  modalRef!: BsModalRef;

  openModal(postId: number): void {
    const initialState = {
      postId: postId,
    };
    this.modalRef = this.modalService.show(AddQuizComponent, { initialState });
  }

  quizzes: Quiz[] = [];

  loadQuizzesByPostId(postId: number): void {
    this.quizService.getQuizzesByPostId(postId).subscribe(
      (quizzes: Quiz[]) => {
        this.quizzes = quizzes;
      },
      (error) => {
        console.error('Error fetching quizzes:', error);
        // Gérer l'erreur, par exemple, afficher un message d'erreur à l'utilisateur
      }
    );
  }
  ToEdit(postid: number) {
    this.router.navigate(['managerService/update-test', postid]);
  }
  deleteQuiz(qid: any) {
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
  hasEnoughQuestions(quizzes: any[]): boolean {
    // Vérifiez si au moins un des quizzes a au moins 5 questions
    return quizzes.some((quiz) => quiz.questions.length >= 5);
  }
  publierPoste(postId: number): void {
    // Afficher une boîte de dialogue de confirmation
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir publier ce poste ?',
      text: 'Cette action est irréversible !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, publier le poste !',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.isConfirmed) {
        // Si l'utilisateur clique sur le bouton "Oui"
        this.posteService.PubliePoste(postId).subscribe(
          () => {
            // Si la publication est réussie, afficher une boîte de dialogue de succès
            Swal.fire(
              'Publié !',
              'Le poste a été publié avec succès.',
              'success'
            );
            console.log('Poste publié avec succès');
            // Ajoutez ici votre logique après la publication du poste
          },
          (error) => {
            // Si une erreur se produit lors de la publication, afficher une boîte de dialogue d'erreur
            Swal.fire({
              icon: 'error',
              title: 'Erreur!',
              text: error.error,
            });
            console.error('Erreur lors de la publication du poste :', error);

            // Ajoutez ici votre logique pour gérer les erreurs de publication du poste
          }
        );
      }
    });
  }
}
