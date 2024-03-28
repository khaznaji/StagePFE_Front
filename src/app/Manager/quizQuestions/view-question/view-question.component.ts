import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/service/question.service';
import Swal from 'sweetalert2';
import { AddQuestionComponent } from '../add-question/add-question.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-view-question',
  templateUrl: './view-question.component.html',
  styleUrls: ['./view-question.component.css']
})
export class ViewQuestionComponent implements OnInit {
  qid: any;
  qtitle: any;
  question: any;
  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private router: Router , 
    private modalService: BsModalService  ) {}

  ngOnInit(): void {
    this.reloadData();
  }
  reloadData() {
    this.qid = this.route.snapshot.params['qid'];
    this.qtitle = this.route.snapshot.params['qtitle'];
    this.questionService.getQuestionsOfQuiz(this.qid).subscribe((data: any) => {
      console.log(data);
      this.question = data;
    });
  }

  deleteQuestion(quesId: any) {
    Swal.fire({
      icon: 'info',
      title: 'Are you sure you want to delete?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.questionService.deleteQuestion(quesId).subscribe(
          (data) => {
            this.reloadData();
            Swal.fire('Success!', 'Question Deleted ', 'success');
          },
          (error) => {
            Swal.fire('Error!', 'loading error', 'error');
          }
        );
      }
    });
  }

  updateQuestion(quesId: any) {
    this.router.navigate(['/managerService/update-question/', quesId]);
  }
  modalRef!: BsModalRef;
  openModal() {
   this.modalRef = this.modalService.show(AddQuestionComponent);
 }
}
