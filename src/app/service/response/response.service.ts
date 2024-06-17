import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from 'src/app/models/response.model';
import { ResponseStatistics } from 'src/app/models/responseStatistics';
import { UserStatistics } from 'src/app/models/userStatistics';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {

  private readonly API = 'https://activities.a4s.dev.br/api/response';

  constructor(private httpClient: HttpClient) { }

  // Pega todas as respostas.
  getAllQuestion(){
    return this.httpClient.get(`${this.API}`);
  }

   // Pega todas as respostas com datas específicas.
   getAllQuestionWithDate(startDate: Date, endDate: Date){
    return this.httpClient.get<Response[]>(`${this.API}?startDate=${startDate}&endDate=${endDate}`);
  }

  // Pega todas as respostas de uma questão específica
  getSearchQuestion(activity: string, phase: string){
    return this.httpClient.get<Response[]>(`${this.API}/getSearchResponse?phase=${phase}&activity=${activity}`)
  }

  // Pega todas as respostas de uma questão específica em uma data específica
  getSearchQuestionWithDate(activity: string, phase: string, startDate: Date, endDate: Date){
    return this.httpClient.get<Response[]>(`${this.API}/getSearchResponse?phase=${phase}&activity=${activity}&startDate=${startDate}&endDate=${endDate}`)
  }

  // Pega todas as estastísticas de uma questão específica
  getStatisticsResponse(activity: string, phase: string){
    return this.httpClient.get<ResponseStatistics>(`${this.API}/getStatisticsResponse?phase=${phase}&activity=${activity}`)
  }

  // Pega todas as estastísticas de uma questão específica em uma data específica
  getStatisticsResponseWithDate(activity: string, phase: string, startDate: Date, endDate: Date){
    return this.httpClient.get<ResponseStatistics>(`${this.API}/getStatisticsResponse?phase=${phase}&activity=${activity}&startDate=${startDate}&endDate=${endDate}`)
  }

  // Pega todas as questões de um usuário específico.
  getQuestionsOfUser(userID: string, idApp: string) {
    return this.httpClient.get<Response[]>(`${this.API}/getUniqueUser?userID=${userID}&idApp=${idApp}`);
  }
  
  // Pega todas as questões de um usuário específico e em uma data específica.
  getQuestionsOfUserWithDate(userID: string, idApp: string, startDate: Date, endDate: Date) {
    return this.httpClient.get<Response[]>(`${this.API}/getUniqueUser?userID=${userID}&idApp=${idApp}&startDate=${startDate}&endDate=${endDate}`);
  }
  
  // Pega todas as estastísticas de um usuário específico.
  getStatisticsUser(userID: string, idApp: string){
    return this.httpClient.get<UserStatistics>(`${this.API}/getStatisticsUser?userID=${userID}&idApp=${idApp}`);
  }
    
  // Pega todas as estastísticas de um usuário específico em uma data específica.
  getStatisticsUserWithDate(userID: string, idApp: string, startDate: Date, endDate: Date){
    return this.httpClient.get<UserStatistics>(`${this.API}/getStatisticsUser?userID=${userID}&idApp=${idApp}&startDate=${startDate}&endDate=${endDate}`);
  }

}