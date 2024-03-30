import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../model/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private baseUrl = 'http://localhost:8080/api/question';

  constructor(private http: HttpClient) {}
  public addQuestion(data: any) {
    return this.http.post(`${this.baseUrl}/add`, data);
  }
  addQuestionToQuiz(quizId: number, question: Question): Observable<Question> {
    return this.http.post<Question>(`${this.baseUrl}/add-to-quiz/${quizId}`, question);
  }
  public deleteQuestion(quesId: any) {
    return this.http.delete(`${this.baseUrl}/delete/${quesId}`);
  }
  public getQuestionsOfQuiz(qid: any) {
    return this.http.get(`${this.baseUrl}/quiz/all/${qid}`);
  }
  public getQuestion(quesId:any){
    return this.http.get(`${this.baseUrl}/getbyid/${quesId}`);
  }
  public updateQuestion(data: any) {
    return this.http.put(`${this.baseUrl}/update`, data);
  }
  public getQuestionsOfQuizForUser(qid: any , candidatureId: any) {
    return this.http.get(`${this.baseUrl}/quiz/${qid}/candidature/${candidatureId}`);
  }
}
