import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from 'src/app/models/question.model';
import { UserStatistics } from 'src/app/models/userStatistics';
import { QuestionStatistics } from 'src/app/models/questionStatistics';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly API = 'https://activities.a4s.dev.br/api/user';

  constructor(private httpClient: HttpClient) { }

  // Pega todas as questões.
  getAllQuestion(){
    return this.httpClient.get(`${this.API}`);
  }

  // Pega todas as questões de um usuário específico.
  getQuestionsOfUser(userName: string, idApp: String) {
    return this.httpClient.get<Question[]>(`${this.API}/getUniqueUser?userName=${userName}&idApp=${idApp}`);
  }

  // Pega todas as questões de um usuário específico e em uma data específica.
  getQuestionsOfUserWithDate(userName: string, idApp: String, startDate: Date, endDate: Date) {
    return this.httpClient.get<Question[]>(`${this.API}/getUniqueUser?userName=${userName}&idApp=${idApp}&startDate=${startDate}&endDate=${endDate}`);
  }

  // Pega todas as estastísticas de um usuário específico.
  getStatisticsUser(userName: string, idApp: String){
    return this.httpClient.get<UserStatistics>(`${this.API}/getStatisticsUser?userName=${userName}&idApp=${idApp}`);
  }

  // Pega todas as estastísticas de um usuário específico em uma data específica.
  getStatisticsUserWithDate(userName: string, idApp: String, startDate: Date, endDate: Date){
    return this.httpClient.get<UserStatistics>(`${this.API}/getStatisticsUser?userName=${userName}&idApp=${idApp}&startDate=${startDate}&endDate=${endDate}`);
  }

 
}
