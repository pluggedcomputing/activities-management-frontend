import { Component, OnInit } from '@angular/core';
import { ResponsesBinaryService } from 'src/app/service/responses-binary/responses-binary.service';
import { Question } from 'src/app/models/question.model';

interface fase {
  value: string;
  viewValue: string;
}
interface atividade {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-search-question',
  templateUrl: './search-question.component.html',
  styleUrls: ['./search-question.component.css']
})
export class SearchQuestionComponent implements OnInit {

  startDate = null;
  endDate = null;
  errorMessage: string = "";
  questionSearch: Question[] | null = null;

  // Inicializando as variáveis para evitar o erro de inicialização estrita
  selectedFase: string = "";
  selectedAtividade: string = "";

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

  constructor(private responseBinary: ResponsesBinaryService) { }

  ngOnInit(): void {
  }

  searchQuestion() {
    console.log('Fase selecionada:', this.selectedFase);
    console.log('Atividade selecionada:', this.selectedAtividade);
    if (this.selectedFase == "" || this.selectedAtividade == "") {
      this.errorMessage = "Por favor, escolha o número da atividade e da fase"
    } else {
      this.responseBinary.getSearchQuestion(this.selectedAtividade, this.selectedFase).subscribe(
        (questions: Question[]) => {
          console.log(questions);
          if (questions == null || questions.length === 0) {
            this.errorMessage = "Nenhuma resposta encontrada com esses parâmetros";
            this.questionSearch = null;
          } else {
            this.questionSearch = questions;
          }
        },
        (error) => {
          console.error('Erro ao buscar questões:', error);
          this.errorMessage = "Ocorreu um erro ao buscar questões. Por favor, tente novamente mais tarde.";
          this.questionSearch = null;
        }
      )
    }
  }
}
