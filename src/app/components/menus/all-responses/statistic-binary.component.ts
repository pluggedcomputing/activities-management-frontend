import { Component, OnInit } from '@angular/core';
import { ResponseService } from 'src/app/service/response/response.service';

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
  dataOn: boolean = false;
  startDate: Date | null = null;
  endDate: Date | null = null;
  errorMessageOn: boolean = false;
  errorMessage: string = "";
  idApp: string = "WEB-BINARIOS 1.0"
  applicationsOptions: string[] = [];

  constructor(private responseService: ResponseService) { }

  ngOnInit(): void {
    this.loadApplications();
  }

  private loadApplications(): void {
    this.errorMessageOn = true;
    this.errorMessage = "Carregando aplicações..."
    this.responseService.getApplications().subscribe(
      (idApps: string[]) => {
        if (idApps.length > 0) {
          this.applicationsOptions = idApps;
          console.log("Apps:", this.applicationsOptions);
          this.errorMessageOn = false;
        }
      },
      (error) => {
        this.errorMessageOn = true;
        console.error('Erro ao buscar as aplicações:', error);
        this.errorMessage = "Ocorreu um erro ao buscar as aplicações no banco";
        this.applicationsOptions = [];
      }
    );
  }

  searchResponses(idApp: string){
    if (this.startDate && this.endDate != null){
      this.loadAllQUestionsWithDate(idApp);
    } else {
    this.loadAllQuestions(idApp);
    }
  }

  private loadAllQUestionsWithDate(idApp: string): void {
    this.idApp = idApp;
    this.errorMessageOn = true;
    this.errorMessage = "Carregando respostas..."
    if (this.startDate && this.endDate != null){
      this.responseService.getAllQuestionWithDate(this.idApp, this.startDate,this.endDate).subscribe(
        (data: any) => {
          this.questions = data;
          this.questions.reverse();
          this.errorMessageOn = false;
          if (this.questions.length == 0){
            this.errorMessageOn = true;
            this.errorMessage = "Nenhuma resposta encontrada!"
          }
        },
        error => {
          this.errorMessageOn = true;
          console.error('erro ao buscar detalhes da atividade:', error);
          this.errorMessage = "Erro ao carregar respostas!"
        }
      );
    }
   
  }

  private loadAllQuestions(idApp: string): void {
    this.idApp = idApp;
    this.errorMessageOn = true;
    this.errorMessage = "Carregando respostas..."
    this.responseService.getAllQuestion(this.idApp).subscribe(
      (data: any) => {
        this.questions = data;
        this.questions.reverse();
        this.errorMessageOn = false;
        if (this.questions.length == 0){
          this.errorMessageOn = true;
          this.errorMessage = "Nenhuma resposta encontrada!"
        }
      },
      error => {
        this.errorMessageOn = true;
        console.error('erro ao buscar detalhes da atividade:', error);
        this.errorMessage = "Erro ao carregar respostas!"
      }
    );
  }


  

}
