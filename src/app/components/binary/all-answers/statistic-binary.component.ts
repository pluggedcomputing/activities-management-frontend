import { Component, OnInit } from '@angular/core';
import { ResponsesBinaryService } from 'src/app/service/response/responses-binary.service';

@Component({
  selector: 'app-statistic-binary',
  templateUrl: './statistic-binary.component.html',
  styleUrls: ['./statistic-binary.component.css']
})
export class StatisticBinaryComponent implements OnInit {
  questions: any[] = [];
  filteredQuestions: any[] = [];
  searchTerm = '';
  selectedOrder: string = 'phaseActivity';
  dataOn = true;
  startDate: Date | null = null;
  endDate: Date | null = null;

  constructor(private responseBinary: ResponsesBinaryService) { }

  ngOnInit(): void {
    this.loadAllQuestions();
  }

  loadAllQuestions(): void {
    this.responseBinary.getAllQuestion().subscribe(
      (data: any) => {
        this.questions = data;
        this.filterQuestions();
      },
      error => {
        console.error('ro ao buscar detalhes da atividade:', error);
      }
    );
  }

  filterQuestions(): void {
    if (this.selectedOrder && this.searchTerm.trim() !== '') {
      this.filteredQuestions = this.questions.filter(question =>
        question[this.selectedOrder] &&
        question[this.selectedOrder].toString().toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredQuestions = this.questions.slice();
    }
  
    if (this.selectedOrder === "dateResponse" && this.startDate !== null && this.endDate !== null) {
      this.responseBinary.getAllQuestionWithDate(this.startDate, this.endDate).subscribe(
        (data: any) => {
          this.questions = data;
          // Aplicar novamente o filtro de searchTerm após atualizar as questões
          if (this.searchTerm.trim() !== '') {
            this.filteredQuestions = this.questions.filter(question =>
              question[this.selectedOrder] &&
              question[this.selectedOrder].toString().toLowerCase().includes(this.searchTerm.toLowerCase())
            );
          } else {
            this.filteredQuestions = this.questions.slice();
          }
        },
        error => {
          console.error('Erro ao buscar detalhes da atividade:', error);
        }
      );
    }
    this.filteredQuestions.reverse(); // Coloca as respostas por ordem de respostas mais recente
  }
}
