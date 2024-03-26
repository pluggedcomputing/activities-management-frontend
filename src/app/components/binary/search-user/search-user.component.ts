import { Component, OnInit } from '@angular/core';
import { ResponsesBinaryService } from 'src/app/service/responses-binary/responses-binary.service';
import { Question } from 'src/app/models/question.model';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css']
})
export class SearchUserComponent implements OnInit {

  idUser = "";
  idApp = "WEB-BINARIOS 1.0";
  userQuestions: any[] = [];
  errorMessage: string = "";

  

  constructor(private responseBinary: ResponsesBinaryService) { }

  ngOnInit(): void {
  }

  searchUser() {
    // Verifica se o id do usuário está preenchido
    if (this.idUser.trim() !== "") {
      
      this.responseBinary.getQuestionsOfUser(this.idUser, this.idApp) // Chama o método getQuestionsOfUser passando o id do usuário
        .subscribe(
          (questions: Question[]) => {
            if (questions.length > 0) { // Verifica se há perguntas retornadas  
              this.userQuestions = questions; // Atribui as perguntas do usuário retornado pelo serviço à variável userQuestions
              this.errorMessage = ""; // Limpa a mensagem de erro, caso exista
            } else {
              // Limpa a lista de perguntas do usuário e exibe a mensagem de erro
              this.userQuestions = [];
              this.errorMessage = "Nenhuma pergunta encontrada para o ID de usuário especificado.";
            }
            console.log(this.userQuestions);
          },
          (error) => {
            console.error('Ocorreu um erro ao buscar as perguntas do usuário:', error);
            // Limpa a lista de perguntas do usuário e exibe a mensagem de erro
            this.userQuestions = [];
            this.errorMessage = "Ocorreu um erro ao buscar as perguntas do usuário. Por favor, tente novamente mais tarde.";
          }
        );
    } else {
      // Limpa a lista de perguntas do usuário se o id do usuário não estiver preenchido
      this.userQuestions = [];
      this.errorMessage = "Por favor, insira um ID de usuário válido.";
    }
  }


  getUserStatics(){

  }
}
