import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Quiz } from '../model/quiz.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private baseUrl = 'http://localhost:8080/api/quizz';

  constructor(private http: HttpClient) {}
  public addQuiz(data: any) {
    console.log(data);
    return this.http.post(`${this.baseUrl}/add`, data);
  }
  addQuizToPost(postId: number, quiz: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/add/${postId}`, quiz)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong, please try again later.');
  }
  updateQuiz(quizId: number, updatedQuiz: Quiz): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${quizId}`, updatedQuiz);
  }
  public getAllQuiz() {
    return this.http.get(`${this.baseUrl}/getall`);
  }
  public deleteQuiz(qid: any) {
    return this.http.delete(`${this.baseUrl}/delete/${qid}`);
  }
  getQuiz(quizId: number): Observable<Quiz> {
    return this.http.get<Quiz>(`${this.baseUrl}/${quizId}`);
  }
  getQuizzesByPostId(id: number): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${this.baseUrl}/poste/${id}`);
  }
}
