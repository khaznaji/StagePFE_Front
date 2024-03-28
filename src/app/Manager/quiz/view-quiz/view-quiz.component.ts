import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { QuizService } from 'src/app/service/quiz.service';
import Swal from 'sweetalert2';
import { UpdateQuizComponent } from '../update-quiz/update-quiz.component';

@Component({
  selector: 'app-view-quiz',
  templateUrl: './view-quiz.component.html',
  styleUrls: ['./view-quiz.component.css']
})
export class ViewQuizComponent implements OnInit {
  quiz: any;
  constructor(private quizService: QuizService, private router: Router      
    ) {}

  ngOnInit(): void {
    this.reloadData();
  }
  reloadData() {
    this.quizService.getAllQuiz().subscribe(
      (data) => {
        this.quiz = data;
      },
      (error) => {
        console.log(error);
        Swal.fire('Error!', 'server loading error', 'error');
      }
    );
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
  ToEdit(postid :number  ){
    this.router.navigate(['managerService/update-test', postid]);
   }
   ToQuestion(postid :number  ){
    this.router.navigate(['managerService/add-question', postid]);
   }
  
}
