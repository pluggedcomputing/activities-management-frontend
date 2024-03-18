import { Component, OnInit } from '@angular/core';
import { ResponsesBinaryService } from 'src/app/service/responses-binary/responses-binary.service';

@Component({
  selector: 'app-statistic-binary',
  templateUrl: './statistic-binary.component.html',
  styleUrls: ['./statistic-binary.component.css']
})
export class StatisticBinaryComponent implements OnInit {

  questions: any[] = [];
  filteredQuestions: any[] = [];
  searchTerm: string = '';
  selectedFilter: string = '';
  selectedOrder: string = 'dateResponse'; // Adicionando a variável para o critério de ordenação inicial

  constructor(private responseBinary: ResponsesBinaryService) { }

  getAllQuestions(){
    this.responseBinary.getAllQuestion().subscribe(
      (data: any) => {
        this.questions = data;
        // Ao receber os dados, atualize as perguntas filtradas inicialmente
        this.filterQuestions();
      },
      error => {
        console.error('Erro ao buscar detalhes da atividade:', error);
      }
    );
  }

  ngOnInit(): void {
    this.getAllQuestions();
  }

  // Método para filtrar perguntas com base no termo de pesquisa, no filtro selecionado e no critério de ordenação
  filterQuestions() {
    if (this.selectedFilter && this.searchTerm.trim() !== '') {
      this.filteredQuestions = this.questions.filter(question =>
        question[this.selectedFilter].toString().toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredQuestions = this.questions;
    }
    // Ordenar as perguntas após aplicar o filtro
    this.orderQuestions();
  }

  // Método para ordenar as perguntas de acordo com o critério selecionado
  orderQuestions() {
    this.filteredQuestions.sort((a, b) => {
      const dateA = new Date(a[this.selectedOrder]);
      const dateB = new Date(b[this.selectedOrder]);
      return dateA.getTime() - dateB.getTime();
    });
  }

  // Método para limpar o campo de pesquisa, redefinir os filtros e reaplicar os filtros
  clearSearch() {
    this.searchTerm = '';
    this.selectedFilter = '';
    this.filterQuestions(); // Reaplicar os filtros após limpar
  }
}
