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
        this.orderQuestions(); // Ordena as questões por data após o carregamento
        this.filterQuestions(); // Aplica os filtros
      },
      // Callback de erro
      error => {
        console.error('Erro ao buscar detalhes da atividade:', error);
      }
    );
  }

// Método para filtrar as questões com base no termo de pesquisa e na ordem selecionada
filterQuestions(): void {
  if (this.questions && this.selectedOrder && this.searchTerm.trim() !== '') {
    // Filtra as questões com base no termo de pesquisa e na ordem selecionada
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



  // Método para ordenar as questões com base na ordem selecionada
  orderQuestions(): void {
    this.questions.sort((a, b) => {
      // Converte as datas para objetos Date e compara para ordenar
      const dateA = new Date(a[this.selectedOrder]);
      const dateB = new Date(b[this.selectedOrder]);
      return dateB.getTime() - dateA.getTime(); // Retorna a diferença entre as datas
    });
  }

  // Método para limpar o termo de pesquisa e a ordem selecionada
  clearSearch(): void {
    this.searchTerm = '';
    this.selectedOrder = '';
    this.filterQuestions(); // Aplica os filtros novamente para mostrar todas as questões
  }
}
