// Importando dependências necessárias do Angular
import { Component, OnInit } from '@angular/core';
import { ResponseService } from 'src/app/service/response/response.service';
import { Response } from 'src/app/models/response.model';
import { ResponseStatistics } from 'src/app/models/responseStatistics';

// Definindo interfaces para representar as fases e atividades
interface fase {
  value: string;
  viewValue: string;
}
interface atividade {
  value: string;
  viewValue: string;
}

// Componente Angular para pesquisa de questões
@Component({
  selector: 'app-search-question', // Seletor do componente
  templateUrl: './search-question.component.html', // Template HTML associado ao componente
  styleUrls: ['./search-question.component.css'] // Estilos CSS associados ao componente
})
export class SearchQuestionComponent implements OnInit {

  // Variáveis para armazenar datas de início e fim da pesquisa
  startDate = null;
  endDate = null;

  // Variável das estastísticas das respostass
  questionStatistics: ResponseStatistics = new ResponseStatistics();

  // Mensagem de erro
  errorMessage: string = "";

  // Array para armazenar as questões retornadas pela pesquisa
  questionSearch: any[] = [];

  // Variáveis para armazenar as fases e atividades selecionadas pelo usuário
  selectedFase = "";
  selectedAtividade = "";

  // Váriavel para mostrar ou não o menu de datas
  dataOn = false;

  // Opções para as fases e atividades
  allFases: fase[] = [
    {value: "1", viewValue: 'Fase 1'},
    {value: "2", viewValue: 'Fase 2'},
    {value: "3", viewValue: 'Fase 3'},
    {value: "4", viewValue: 'Fase 4'},
    {value: "5", viewValue: 'Fase 5'},
    {value: "6", viewValue: 'Fase 6'},
    {value: "7", viewValue: 'Fase 7'},
  ];
  allAtividades: atividade[] = [
    {value: "1", viewValue: 'Atividade 1'},
    {value: "2", viewValue: 'Atividade 2'},
    {value: "3", viewValue: 'Atividade 3'},
    {value: "4", viewValue: 'Atividade 4'},
    {value: "5", viewValue: 'Atividade 5'},
    {value: "6", viewValue: 'Atividade 6'},
    {value: "7", viewValue: 'Atividade 7'},
  ];

  constructor(private responseService: ResponseService) { }

  ngOnInit(): void {
  }

  // Método para realizar a pesquisa da questão
  searchQuestion() {
    // Verifica se há alguma fase ou atividade selecionada
    if (this.selectedAtividade.trim() !== "" || this.selectedFase.trim() !== "" ) {
      // Verifica se há uma data específica
      if (this.startDate != null && this.endDate != null) {      
        this.getQuestionWithDate();
        this.getStaticsWithDate();

      } else {     
        this.getQuestion();
        this.getStatics();

      }
    } else {  
      // Limpa a lista de respostas da questão e exibe a mensagem de erro se a fase ou a atividade não estiver preenchido
      this.questionSearch = [];
      this.errorMessage = "Por favor, selecione alguma FASE e ATIVIDADE!";
    }
  }

  // Método para buscar as respostas de uma questão sem uma data específica
  getQuestion() {
    this.responseService.getSearchQuestion(this.selectedAtividade,this.selectedFase).subscribe(
      // Callback de sucesso
      (questions: Response[]) => {
        // Verifica se há respostas retornadas
        if (questions.length > 0) {
          // Atribui as respostas retornadas pelo serviço à variável questionSearch
          this.questionSearch = questions;
          // Limpa a mensagem de erro, caso exista
          this.errorMessage = "";
        } else {
          // Limpa a lista de respostas e exibe a mensagem de erro
          this.questionSearch = [];
          this.errorMessage = "Nenhuma resposta encontrada para a FASE e ATIVIDADE especificadas.";
        }
        this.questionSearch.reverse(); // Coloca as respostas por ordem de respostas mais recente
        console.log(this.questionSearch);
      },
      // Callback de erro
      (error) => {
        console.error('Ocorreu um erro ao buscar as respostas dessa questão:', error);
        // Limpa a lista de respostas e exibe a mensagem de erro
        this.questionSearch = [];
        this.errorMessage = "Ocorreu um erro ao buscar as respostas dessa questão específica. Por favor, tente novamente mais tarde.";
      }
    );
  }

  // Método para buscar as respostas de uma questão com uma data específica
  getQuestionWithDate() {
    if (this.startDate != null && this.endDate != null) {
      this.responseService.getSearchQuestionWithDate(this.selectedAtividade, this.selectedFase, this.startDate, this.endDate).subscribe(
        // Callback de sucesso
        (questions: Response[]) => {
          // Verifica se há respostas retornadas
          if (questions.length > 0) {
            // Atribui as respostas da questção retornado pelo serviço à variável questionSearch
            this.questionSearch = questions;
            // Limpa a mensagem de erro, caso exista
            this.errorMessage = "";
          } else {
            // Limpa a lista de respostas e exibe a mensagem de erro
            this.questionSearch = [];
            this.errorMessage = "Nenhuma respostas encontrada para essa FASE, ATIVIDADE e DATA especificados.";
          }
          this.questionSearch.reverse(); // Coloca as respostas por ordem de respostas mais recente
          console.log(this.questionSearch);
        },
        // Callback de erro
        (error) => {
          console.error('Ocorreu um erro ao buscar as perguntas do usuário:', error);
          // Limpa a lista de respostas e exibe a mensagem de erro
          this.questionSearch = [];
          this.errorMessage = "Ocorreu um erro ao buscar as respostas da questão. Por favor, tente novamente mais tarde.";
        }
      );
    }
  }

  // Método para buscar as estatísticas das respostas sem uma data específica
  getStatics() {
    this.responseService.getStatisticsResponse(this.selectedAtividade,this.selectedFase).subscribe(
      // Callback de sucesso
      (questionStatistics: ResponseStatistics) => {
        // Atribui as estatísticas das respostas retornado pelo serviço à variável questionStatistics
        this.questionStatistics = questionStatistics;
        console.log(this.questionStatistics);
        // Limpa a mensagem de erro
        this.errorMessage = "";
      },
      // Callback de erro
      (error) => {
        console.error('Ocorreu um erro ao buscar as estatísticas do usuário:', error);
        // Limpa as estatísticas do usuário em caso de erro
        this.questionStatistics = new ResponseStatistics();
        // Exibe a mensagem de erro
        this.errorMessage = "Ocorreu um erro ao buscar as estatísticas da questão específicada. Por favor, tente novamente mais tarde.";
      }
    );
  }

  // Método para buscar as estatísticas da questão com uma data específica
  getStaticsWithDate() {
    if (this.startDate != null && this.endDate != null) {
      this.responseService.getStatisticsResponseWithDate(this.selectedAtividade, this.selectedFase, this.startDate, this.endDate).subscribe(
        // Callback de sucesso
        (questionStatistics: ResponseStatistics) => {
          // Atribui as estatísticas da questão retornado pelo serviço à variável questionStatistics
          this.questionStatistics = questionStatistics;
          console.log(this.questionStatistics);
          // Limpa a mensagem de erro
          this.errorMessage = "";
        },
        // Callback de erro
        (error) => {
          console.error('Ocorreu um erro ao buscar as estatísticas da questão específicada:', error);
          // Limpa as estatísticas do usuário em caso de erro
          this.questionStatistics = new ResponseStatistics();
          // Exibe a mensagem de erro
          this.errorMessage = "Ocorreu um erro ao buscar as estatísticas da questão específicada. Por favor, tente novamente mais tarde.";
        }
      );
    }
  }
}

