// Importando dependências necessárias do Angular
import { Component, OnInit } from '@angular/core';
import { ResponsesBinaryService } from 'src/app/service/responses-binary/responses-binary.service';
import { Question } from 'src/app/models/question.model';
import { UserStatistics } from 'src/app/models/userStatistics';

// Componente Angular para pesquisa de usuário
@Component({
  selector: 'app-search-user', // Seletor do componente
  templateUrl: './search-user.component.html', // Template HTML associado ao componente
  styleUrls: ['./search-user.component.css'] // Estilos CSS associados ao componente
})
export class SearchUserComponent implements OnInit {

  idUser = "";
  idApp = "WEB-BINARIOS 1.0";
  userQuestions: any[] = [];
  errorMessage: string = "";
  statisticsUser: UserStatistics = new UserStatistics;
  startDate = null;
  endDate = null;

  constructor(private responseBinary: ResponsesBinaryService) { }

  // Método do ciclo de vida do componente, chamado após a inicialização do componente
  ngOnInit(): void {
  }

  // Método para realizar a pesquisa do usuário
  searchUser() {
    // Verifica se o ID do usuário está preenchido
    if (this.idUser.trim() !== "") {
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
      this.errorMessage = "Por favor, insira um ID de usuário válido.";
    }
  }

  // Método para buscar as perguntas do usuário sem uma data específica
  getQuestionOfUser() {
    this.responseBinary.getQuestionsOfUser(this.idUser, this.idApp).subscribe(
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

  // Método para buscar as perguntas do usuário com uma data específica
  getQuestionOfUserWithDate() {
    if (this.startDate != null && this.endDate != null) {
      this.responseBinary.getQuestionsOfUserWithDate(this.idUser, this.idApp, this.startDate, this.endDate).subscribe(
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
    this.responseBinary.getStatisticsUser(this.idUser, this.idApp).subscribe(
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
      this.responseBinary.getStatisticsUserWithDate(this.idUser, this.idApp, this.startDate, this.endDate).subscribe(
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
