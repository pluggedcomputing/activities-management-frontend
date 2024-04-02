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
  searchTerm = '';
  selectedOrder = 'dateResponse';

  constructor(private responseBinary: ResponsesBinaryService) { }

  ngOnInit(): void {
    this.loadAllQuestions();
  }

  loadAllQuestions(): void {
    this.responseBinary.getAllQuestion().subscribe(
      (data: any) => {
        this.questions = data;
        this.orderQuestions(); // Ordena as questões por data após o carregamento
        this.filterQuestions(); // Aplica os filtros
      },
      error => {
        console.error('Erro ao buscar detalhes da atividade:', error);
      }
    );
  }

  filterQuestions(): void {
    if (this.selectedOrder && this.searchTerm.trim() !== '') {
      this.filteredQuestions = this.questions.filter(question =>
        question[this.selectedOrder].toString().toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredQuestions = this.questions.slice();
    }
  }

  orderQuestions(): void {
    this.questions.sort((a, b) => {
      const dateA = new Date(a[this.selectedOrder]);
      const dateB = new Date(b[this.selectedOrder]);
      return dateB.getTime() - dateA.getTime();
    });
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.selectedOrder = '';
    this.filterQuestions();
  }
}
