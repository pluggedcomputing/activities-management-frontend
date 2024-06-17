// Importando dependências necessárias do Angular
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ResponsesBinaryService } from 'src/app/service/response/responses-binary.service';
import { UserService } from 'src/app/service/user/user.service';
import { Question } from 'src/app/models/question.model';
import { UserStatistics } from 'src/app/models/userStatistics';
import { User } from 'src/app/models/user.model';




@Component({
  selector: 'app-search-user', 
  templateUrl: './search-user.component.html', 
  styleUrls: ['./search-user.component.css'],
})
export class SearchUserComponent implements OnInit {

  userID = "";
  idApp = "WEB-BINARIOS 1.0";
  userQuestions: any[] = [];
  errorMessage: string = "";
  statisticsUser: UserStatistics = new UserStatistics;
  startDate = null;
  endDate = null;
  dataOn = false;
  parentOptions: string[] = [];
  @ViewChild('autocompleteInput') autocompleteInput!: ElementRef;

  constructor(private responseBinaryService: ResponsesBinaryService, private userService: UserService) { }

  // Método do ciclo de vida do componente, chamado após a inicialização do componente
  ngOnInit(): void {
     this.userService.getUsers().subscribe(

      (usersID: string[]) =>  {
        if (usersID.length > 0){
          this.parentOptions = usersID;
          console.log("users: " + this.parentOptions);
        }
      },

      (error) => {
        console.error('Ocorreu um erro ao buscar os usuários no banco:', error);
        this.errorMessage = ("Ocorreu um erro ao buscar os usuários no banco");
        this.parentOptions = [];

      }
    );
     
  }


  filterButtonClick(autocompleteValue: string) {
    console.log('Valor do autocomplete-input:', autocompleteValue);
    this.userID = autocompleteValue;
    this.searchUser();
}
  

  // Método para realizar a pesquisa do usuário
  searchUser() {
    // Verifica se o ID do usuário está preenchido
    if (this.userID.trim() !== "") {
      // Verifica se há uma data específica
      if (this.startDate != null && this.endDate != null) {
        this.getQuestionOfUserWithDate();
        this.getStaticsWithDate();

      } else {
        this.getQuestionOfUser();
        this.getStatics();

      }
    } else {
      // Limpa a lista de perguntas do usuário e exibe a mensagem de erro se o ID do usuário não estiver preenchido
      this.userQuestions = [];
      this.errorMessage = "Por favor, insira um usuário válido.";
    }
  }

  // Método para buscar as perguntas do usuário sem uma data específica
  getQuestionOfUser() {
    this.responseBinaryService.getQuestionsOfUser(this.userID, this.idApp).subscribe(
      // Callback de sucesso
      (questions: Question[]) => {
        // Verifica se há perguntas retornadas
        if (questions.length > 0) {
          this.userQuestions = questions;  // Atribui as perguntas do usuário retornado pelo serviço à variável userQuestions
          this.userQuestions.reverse(); // Coloca as respostas por ordem de respostas mais recente
          console.log(this.userQuestions);
        } else {
          // Limpa a lista de perguntas do usuário e exibe a mensagem de erro
          this.userQuestions = [];
          this.errorMessage = "Nenhuma pergunta encontrada para o ID de usuário especificado.";
          console.log("Quantidade de responses: " + questions.length);
        }
        
      },
      // Callback de erro
      (error) => {
        console.error('Ocorreu um erro ao buscar as perguntas do usuário:', error);
        // Limpa a lista de perguntas do usuário e exibe a mensagem de erro
        this.userQuestions = [];
        this.errorMessage = "Ocorreu um erro ao buscar as perguntas do usuário. Por favor, tente novamente mais tarde.";
      }
    );
  }

  // Método para buscar as perguntas do usuário com uma data específica
  getQuestionOfUserWithDate() {
    if (this.startDate != null && this.endDate != null) {
      this.responseBinaryService.getQuestionsOfUserWithDate(this.userID, this.idApp, this.startDate, this.endDate).subscribe(
        // Callback de sucesso
        (questions: Question[]) => {
          // Verifica se há perguntas retornadas
          if (questions.length > 0) {
            // Atribui as perguntas do usuário retornado pelo serviço à variável userQuestions
            this.userQuestions = questions;
            // Limpa a mensagem de erro, caso exista
            this.errorMessage = "";
          } else {
            // Limpa a lista de perguntas do usuário e exibe a mensagem de erro
            this.userQuestions = [];
            this.errorMessage = "Nenhuma pergunta encontrada para o ID de usuário especificado.";
          }
          this.userQuestions.reverse(); // Coloca as respostas por ordem de respostas mais recente
          console.log(this.userQuestions);
        },
        // Callback de erro
        (error) => {
          console.error('Ocorreu um erro ao buscar as perguntas do usuário:', error);
          // Limpa a lista de perguntas do usuário e exibe a mensagem de erro
          this.userQuestions = [];
          this.errorMessage = "Ocorreu um erro ao buscar as perguntas do usuário. Por favor, tente novamente mais tarde.";
        }
      );
    }
  }

  // Método para buscar as estatísticas do usuário sem uma data específica
  getStatics() {
    this.responseBinaryService.getStatisticsUser(this.userID, this.idApp).subscribe(
      // Callback de sucesso
      (userStatistics: UserStatistics) => {
        // Atribui as estatísticas do usuário retornado pelo serviço à variável statisticsUser
        this.statisticsUser = userStatistics;
        console.log(this.statisticsUser);
        // Limpa a mensagem de erro
        this.errorMessage = "";
      },
      // Callback de erro
      (error) => {
        console.error('Ocorreu um erro ao buscar as estatísticas do usuário:', error);
        // Limpa as estatísticas do usuário em caso de erro
        this.statisticsUser = new UserStatistics();
        // Exibe a mensagem de erro
        this.errorMessage = "Ocorreu um erro ao buscar as estatísticas do usuário. Por favor, tente novamente mais tarde.";
      }
    );
  }

  // Método para buscar as estatísticas do usuário com uma data específica
  getStaticsWithDate() {
    if (this.startDate != null && this.endDate != null) {
      this.responseBinaryService.getStatisticsUserWithDate(this.userID, this.idApp, this.startDate, this.endDate).subscribe(
        // Callback de sucesso
        (userStatistics: UserStatistics) => {
          // Atribui as estatísticas do usuário retornado pelo serviço à variável statisticsUser
          this.statisticsUser = userStatistics;
          console.log(this.statisticsUser);
          // Limpa a mensagem de erro
          this.errorMessage = "";
        },
        // Callback de erro
        (error) => {
          console.error('Ocorreu um erro ao buscar as estatísticas do usuário:', error);
          // Limpa as estatísticas do usuário em caso de erro
          this.statisticsUser = new UserStatistics();
          // Exibe a mensagem de erro
          this.errorMessage = "Ocorreu um erro ao buscar as estatísticas do usuário. Por favor, tente novamente mais tarde.";
        }
      );
    }
  }
}
