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
  getAllQuestion(idApp: string){
    return this.httpClient.get(`${this.API}?idApp=${idApp}`);
  }

   // Pega todas as respostas com datas específicas.
   getAllQuestionWithDate(idApp: string, startDate: Date, endDate: Date){
    return this.httpClient.get<Response[]>(`${this.API}?idApp=${idApp}&startDate=${startDate}&endDate=${endDate}`);
  }

  // Pega todas as respostas de uma questão específica
  getSearchQuestion(idApp: string, activity: string, phase: string){
    return this.httpClient.get<Response[]>(`${this.API}/getSearchResponse?idApp=${idApp}&phase=${phase}&activity=${activity}`)
  }

  // Pega todas as respostas de uma questão específica em uma data específica
  getSearchQuestionWithDate(idApp: string, activity: string, phase: string, startDate: Date, endDate: Date){
    return this.httpClient.get<Response[]>(`${this.API}/getSearchResponse?idApp=${idApp}&phase=${phase}&activity=${activity}&startDate=${startDate}&endDate=${endDate}`)
  }

  // Pega todas as estastísticas de uma questão específica
  getStatisticsResponse(idApp: string, activity: string, phase: string){
    return this.httpClient.get<ResponseStatistics>(`${this.API}/getStatisticsResponse?idApp=${idApp}&phase=${phase}&activity=${activity}`)
  }

  // Pega todas as estastísticas de uma questão específica em uma data específica
  getStatisticsResponseWithDate(idApp: string, activity: string, phase: string, startDate: Date, endDate: Date){
    return this.httpClient.get<ResponseStatistics>(`${this.API}/getStatisticsResponse?idApp=${idApp}&phase=${phase}&activity=${activity}&startDate=${startDate}&endDate=${endDate}`)
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

  // Pega todas as aplicações com respostas cadastradas no backend/db
  getApplications(){
    return this.httpClient.get<string[]>(`${this.API}/getApplications`)
  }

  // Pega todos os usuários com respostas cadastradas na aplicação específica
  getUsers(idApp: string){
    return this.httpClient.get<string[]>(`${this.API}/getUsers?idApp=${idApp}`);
  }

  getPhases(idApp: string){
    return this.httpClient.get<string[]>(`${this.API}/getPhases?idApp=${idApp}`);

  }
  
  getActivity(idApp: string, phase: string){
    return this.httpClient.get<string[]>(`${this.API}/getActivity?idApp=${idApp}&phase=${phase}`);
  }

}