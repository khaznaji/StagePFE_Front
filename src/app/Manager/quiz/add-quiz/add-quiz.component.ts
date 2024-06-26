import { Component, Input, OnInit } from '@angular/core';
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
  @Input() postId!: number;

  quizForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private quizService: QuizService,
    private route: ActivatedRoute , 
    private router: Router,
    private modalRef: BsModalRef

  ) {
    this.quizForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      
    });
  }

  ngOnInit(): void {
    if (this.modalRef.content) {
      this.postId = this.modalRef.content.postId;

   }
  
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
            text: 'Test Technique ajouté avec succès!',

            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            window.location.reload();
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
