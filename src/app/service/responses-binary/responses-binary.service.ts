import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from 'src/app/models/question.model';

@Injectable({
  providedIn: 'root'
})
export class ResponsesBinaryService {

  private readonly API = 'api/question';

  constructor(private httpClient: HttpClient) { }

  getAllQuestion(){
    return this.httpClient.get(this.API);
  }
}
