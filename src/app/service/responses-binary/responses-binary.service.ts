import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from 'src/app/models/question.model';
import { UserStatistics } from 'src/app/models/userStatistics';

@Injectable({
  providedIn: 'root'
})
export class ResponsesBinaryService {

  private readonly API = 'api/question';

  constructor(private httpClient: HttpClient) { }

  getAllQuestion(){
    return this.httpClient.get(this.API);
  }


  getQuestionsOfUser(idUser: string, idApp: String) {
    return this.httpClient.get<Question[]>(`${this.API}/getUniqueUser?idUser=${idUser}&idApp=${idApp}`);
  }

  getStatisticsUser(idUser: string, idApp: String){
    return this.httpClient.get<UserStatistics>(`${this.API}/getStatisticsUser?idUser=${idUser}&idApp=${idApp}`);
  }
}
