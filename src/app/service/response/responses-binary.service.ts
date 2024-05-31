import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from 'src/app/models/question.model';
import { UserStatistics } from 'src/app/models/userStatistics';
import { QuestionStatistics } from 'src/app/models/questionStatistics';

@Injectable({
  providedIn: 'root'
})
export class ResponsesBinaryService {

  private readonly API = 'https://activities.a4s.dev.br/api/response';

  constructor(private httpClient: HttpClient) { }

  // Pega todas as questões.
  getAllQuestion(){
    return this.httpClient.get(`${this.API}`);
  }

  // Pega todas as respostas de uma questão específica
  getSearchQuestion(atividade: string, fase: string){
    return this.httpClient.get<Question[]>(`${this.API}/getSearchResponse?fase=${fase}&atividade=${atividade}`)
  }

  // Pega todas as respostas de uma questão específica em uma data específica
  getSearchQuestionWithDate(atividade: string, fase: string, startDate: Date, endDate: Date){
    return this.httpClient.get<Question[]>(`${this.API}/getSearchResponse?fase=${fase}&atividade=${atividade}&startDate=${startDate}&endDate=${endDate}`)
  }

  // Pega todas as estastísticas de uma questão específica
  getStatisticsResponse(atividade: string, fase: string){
    return this.httpClient.get<QuestionStatistics>(`${this.API}/getStatisticsResponse?fase=${fase}&atividade=${atividade}`)
  }

  // Pega todas as estastísticas de uma questão específica em uma data específica
  getStatisticsResponseWithDate(atividade: string, fase: string, startDate: Date, endDate: Date){
    return this.httpClient.get<QuestionStatistics>(`${this.API}/getStatisticsResponse?fase=${fase}&atividade=${atividade}&startDate=${startDate}&endDate=${endDate}`)
  }
}
