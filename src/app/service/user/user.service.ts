import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly API = 'https://activities.a4s.dev.br/api/user';


  constructor(private httpClient: HttpClient) { }

  getUsers(){
    return this.httpClient.get<string[]>(`${this.API}/getUsers`);
  }


}
