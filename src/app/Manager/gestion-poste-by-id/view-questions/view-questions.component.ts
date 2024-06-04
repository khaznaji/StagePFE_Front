import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { QuestionService } from 'src/app/service/question.service';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.css']
})
export class ViewQuestionsComponent implements OnInit {
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



  updateQuestion(quesId: any) {
    this.router.navigate(['/managerService/update-question/', quesId]);
  }
 
}
