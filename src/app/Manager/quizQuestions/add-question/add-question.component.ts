import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/model/question.model';
import { QuestionService } from 'src/app/service/question.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  @Input() qid!: number;

  question: Question = new Question(); // Initialisation d'une nouvelle question

  ngOnInit(): void {
    if (this.modalRef.content) {
      this.qid = this.modalRef.content.qid;

   }
  }
  
  constructor(private questionService: QuestionService, private route: ActivatedRoute ,     private modalRef: BsModalRef
    ) { }


    addQuestionToQuiz(): void {
      this.questionService.addQuestionToQuiz(this.qid, this.question)
        .subscribe(
          (data) => {
            console.log('Question added to quiz:', data);
            Swal.fire({
              title: 'Succès!',
              text: 'La question a été ajoutée avec succès au quiz.',
              icon: 'success',
              confirmButtonText: 'OK'
            });
            // Handle the response, for example, refresh the list of quiz questions
          },
          (error) => {
            console.error('Error adding question to quiz:', error);
            Swal.fire({
              title: 'Erreur!',
              text: 'Une erreur s\'est produite lors de l\'ajout de la question au quiz.',
              icon: 'error',
              confirmButtonText: 'OK'
            });
            // Handle the error, for example, show an error message to the user
          }
        );
    }
}
