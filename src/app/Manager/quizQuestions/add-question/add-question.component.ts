import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/model/question.model';
import { QuestionService } from 'src/app/service/question.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  quizId!: number;
  question: Question = new Question(); // Initialisation d'une nouvelle question

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.quizId = +params['id']; // Convertir la chaîne en nombre
    });
  }
  
  constructor(private questionService: QuestionService, private route: ActivatedRoute) { }

  addQuestionToQuiz(): void {
    this.questionService.addQuestionToQuiz(this.quizId, this.question)
      .subscribe(
        (data) => {
          console.log('Question added to quiz:', data);
          // Gérer la réponse, par exemple, actualiser la liste des questions du quiz
        },
        (error) => {
          console.error('Error adding question to quiz:', error);
          // Gérer l'erreur, par exemple, afficher un message d'erreur à l'utilisateur
        }
      );
  }
}
