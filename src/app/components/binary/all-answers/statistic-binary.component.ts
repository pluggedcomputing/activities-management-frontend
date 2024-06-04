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
<<<<<<< HEAD
  selectedOrder = 'phaseActivity'; 
=======
  selectedOrder: string = 'phaseActivity';
>>>>>>> test
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
<<<<<<< HEAD
        this.orderQuestions();
        this.filterQuestions();
=======
        this.questions.reverse(); // deixa as respostas com as mais recentes em cima
        this.filterQuestions(); // Aplica os filtros
>>>>>>> test
      },
      error => {
        console.error('ro ao buscar detalhes da atividade:', error);
      }
    );
  }

<<<<<<< HEAD
  
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
          this.orderQuestions();
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
  }
  

  orderQuestions(): void {
    if (this.selectedOrder) {
      this.questions.sort((a, b) => {
        const dateA = new Date(a[this.selectedOrder]);
        const dateB = new Date(b[this.selectedOrder]);
        return dateB.getTime() - dateA.getTime();
      });
    }
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.selectedOrder = 'phaseActivity'; 
    this.filterQuestions();
=======
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
>>>>>>> test
  }
}



}
