// Importando dependências necessárias do Angular
import { Component, OnInit } from '@angular/core';
import { ResponsesBinaryService } from 'src/app/service/response/responses-binary.service';


// Componente Angular para exibição de estatísticas de questões binárias
@Component({
  selector: 'app-statistic-binary', // Seletor do componente
  templateUrl: './statistic-binary.component.html', // Template HTML associado ao componente
  styleUrls: ['./statistic-binary.component.css'] // Estilos CSS associados ao componente
})
export class StatisticBinaryComponent implements OnInit {

  // Variáveis para armazenar todas as questões, questões filtradas, termo de pesquisa e ordem selecionada
  questions: any[] = [];
  filteredQuestions: any[] = [];
  searchTerm = '';
  selectedOrder: string = 'phaseActivity';
  dataOn = true;
  startDate = null;
  endDate = null;

  constructor(private responseBinary: ResponsesBinaryService) { }

  // Método do ciclo de vida do componente, chamado após a inicialização do componente
  ngOnInit(): void {
    this.loadAllQuestions(); // Carrega todas as questões ao inicializar o componente
  }

  // Método para carregar todas as questões 
  loadAllQuestions(): void {
    this.responseBinary.getAllQuestion().subscribe(
      // Callback de sucesso
      (data: any) => {
        this.questions = data;
        this.questions.reverse(); // deixa as respostas com as mais recentes em cima
        this.filterQuestions(); // Aplica os filtros
      },
      // Callback de erro
      error => {
        console.error('ro ao buscar detalhes da atividade:', error);
      }
    );
  }

// Método para filtrar as questões com base no termo de pesquisa e na ordem selecionada
filterQuestions(): void {
   // Filtra as questões com base no termo de pesquisa e na ordem selecionada
  if (this.questions && this.selectedOrder && this.searchTerm.trim() !== '') {
    this.filteredQuestions = this.questions.filter(question => {
      const value = question[this.selectedOrder];
      return value !== undefined && value !== null &&
             value.toString().toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  } else {
    // Se não houver termo de pesquisa ou selectedOrder, retorna todas as questões
    this.filteredQuestions = this.questions ? this.questions.slice() : [];
  }
}



}
