import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Quiz } from 'src/app/model/quiz.model';
import { QuizService } from 'src/app/service/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {
  quizForm!: FormGroup;
  quizId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private quizService: QuizService
  ) { }

  ngOnInit(): void {
    this.quizForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      maxMarks: ['', Validators.required],
      numberOfQuestions: ['', Validators.required],
      active: [false]
    });
    
    this.route.params.subscribe(params => {
      this.quizId = params['id'];
      this.quizService.getQuiz(this.quizId).subscribe((quiz: Quiz) => {
        this.quizForm.patchValue({
          title: quiz.title,
          description: quiz.description,
          maxMarks: quiz.maxMarks,
          numberOfQuestions: quiz.numberOfQuestions,
          active: quiz.active
        });
      });
    });
  }

  onSubmit(): void {
    if (this.quizForm.valid) {
      const updatedQuizData: Quiz = this.quizForm.value;
      this.quizService.updateQuiz(this.quizId, updatedQuizData).subscribe(response => {
        console.log('Quiz updated successfully.');
      });
    }
  }
}