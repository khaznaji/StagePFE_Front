import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Quiz } from 'src/app/model/quiz.model';
import { QuizService } from 'src/app/service/quiz.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UpdateQuizComponent } from '../update-quiz/update-quiz.component';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {
  postId!: number;
  quizForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private quizService: QuizService,
    private route: ActivatedRoute , 
    private router: Router,

  ) {
    this.quizForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      maxMarks: ['', Validators.required],
      numberOfQuestions: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.postId = +params['id']; // Convertissez la chaîne en nombre
    });
  }

  get f() { return this.quizForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.quizForm.invalid) {
      return;
    }
    this.quizService.addQuizToPost(this.postId, this.quizForm.value)
      .subscribe(
        response => {
          console.log(response);
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Quiz ajouté avec succès!',

            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.router.navigate(['/managerService/poste-approuve', this.postId]);
          });
        },
        error => {
          console.error(error);
          Swal.fire({
            icon: 'error',
            title: 'Erreur!',
            text: 'Une erreur s\'est produite lors de l\'ajout du quiz. Veuillez réessayer plus tard.',
          });
        }
      );
  }
 
}
