// Importando dependências necessárias do Angular
import { Component, OnInit } from '@angular/core';
import { ResponsesBinaryService } from 'src/app/service/responses-binary/responses-binary.service';
import { Question } from 'src/app/models/question.model';

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

  // Mensagem de erro
  errorMessage: string = "";

  // Array para armazenar as questões retornadas pela pesquisa
  questionSearch: Question[] | null = null;

  // Variáveis para armazenar as fases e atividades selecionadas pelo usuário
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

  // Método do ciclo de vida do componente, chamado após a inicialização do componente
  ngOnInit(): void {
  }

  // Método para realizar a pesquisa de questões
  searchQuestion() {
    // Verifica se a fase e a atividade foram selecionadas
    if (this.selectedFase == "" || this.selectedAtividade == "") {
      this.errorMessage = "Por favor, escolha o número da atividade e da fase";
    } else {
      // Chama o serviço de busca de questões com os parâmetros selecionados
      this.responseBinary.getSearchQuestion(this.selectedAtividade, this.selectedFase).subscribe(
        // Callback de sucesso
        (questions: Question[]) => {
          console.log(questions);
          // Verifica se nenhuma questão foi encontrada
          if (!questions || questions.length === 0) {
            this.errorMessage = "Nenhuma resposta encontrada com esses parâmetros";
            this.questionSearch = null;
          } else {
            // Atribui as questões encontradas à variável questionSearch
            this.questionSearch = questions;
          }
        },
        // Callback de erro
        (error) => {
          console.error('Erro ao buscar questões:', error);
          // Exibe mensagem de erro e limpa os resultados da pesquisa
          this.errorMessage = "Ocorreu um erro ao buscar questões. Por favor, tente novamente mais tarde.";
          this.questionSearch = null;
        }
      )
    }
  }
}
