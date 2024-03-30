import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PosteService } from 'src/app/service/poste.service';
import { QuestionService } from 'src/app/service/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start-test',
  templateUrl: './start-test.component.html',
  styleUrls: ['./start-test.component.css']
})
export class StartTestComponent implements OnInit {
  qid: any;
  questions: any;
  marksGot = 0;
  correctAnswer = 0;
  attempted = 0;
  maximumMarks = 0;
  isSubmit = false;
  timer: any;
  counter: any;
  interval: any;
  value: any;
  test: number = 0;
  currentQuestionIndex = 0; // Ajoutez cette ligne

  constructor(
    private locationStrategy: LocationStrategy,
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private router: Router , 
    private posteService: PosteService
  ) {}
  candidatureId: any; // Variable pour stocker l'ID de la candidature

  ngOnInit(): void {
    this.qid = this.route.snapshot.params['qid'];
    this.candidatureId = this.route.snapshot.params['candidatureId']; // Récupérez l'ID de la candidature à partir de l'URL
console.log(this.qid)
    this.preventBackButton();
    this.loadQuestions();
  }
  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    }
 }

 previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
 }
 selectAnswer(question: any, answer: any) {
  question.givenAnswer = answer;
}
  loadQuestions() {
    this.questionService.getQuestionsOfQuizForUser(this.qid , this.candidatureId).subscribe(
      (data) => {
        this.questions = data;
        console.log(this.questions);

        this.questions.forEach((ques: any) => {
          ques['givenAnswer'] = '';
        });
        this.startTimer();
      },
      (error) => {}
    );
  }
  preventBackButton() {
    history.pushState(null, '', location.href);
    this.locationStrategy.onPopState(() => {
      history.pushState(null, '', location.href);
    });
  }

  submitQuiz() {
    Swal.fire({
      title: 'Do you want to submit the Quiz?',
      showCancelButton: true,
      confirmButtonText: 'Submit',

      icon: 'info',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.evaluateQuiz();
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }
  evaluateQuiz() {
    this.isSubmit = true;
    this.value = this.timer;
    this.questions.forEach((ques: any) => {
      if (ques.givenAnswer == ques.answer) {
        this.correctAnswer++;
        this.maximumMarks = this.questions[0].quiz.maxMarks;
        let eachQuestionMark = this.maximumMarks / this.questions.length;
        this.marksGot += eachQuestionMark;
      }
      if (ques.givenAnswer.trim() != '') {
        this.attempted++;
      }
    });
    this.updateScore();

  }
  
  updateScore() {
    const newScore = this.marksGot; // Utilisez le nouveau score (marksGot)

    this.posteService.updateScore(this.candidatureId, newScore).subscribe(
      (response) => {
        // Gestion de la réponse de l'API en cas de succès
        console.log(response);
        Swal.fire('Score soumis avec succès!', '', 'success');
      },
      (error) => {
        // Gestion de l'erreur
        console.error(error);
        Swal.fire('Erreur lors de la soumission du score', '', 'error');
      }
    );
  }
  startTimer() {
    this.timer = 303;
    const exist = localStorage.getItem('counter');
    if (exist) {
      if (parseInt(exist) <= 0) {
        this.value = this.timer;
      } else {
        this.value = localStorage.getItem('counter');
      }
    } else {
      this.value = this.timer;
    }

    this.counter = function () {
      if (this.value <= 0) {
        localStorage.setItem('counter', this.timer);
        clearInterval(this.interval);

        this.evaluateQuiz();
      } else {
        this.value = parseInt(this.value) - 1;
        localStorage.setItem('counter', this.value);
      }
    };

    this.interval = setInterval(() => {
      this.counter();
    }, 1000);
  }

  getFormattedTime() {
    let mm = Math.floor(this.value / 60);
    let ss = this.value - mm * 60;

    return `${mm} min : ${ss} sec`;
  }
  print() {
    window.print();
  }
}
