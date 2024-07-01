import { Component, OnInit } from '@angular/core';
import { ResponseService } from 'src/app/service/response/response.service';
import { ResponseStatistics } from 'src/app/models/responseStatistics';

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
  responseStatistics: ResponseStatistics = new ResponseStatistics();

  constructor(private responseService: ResponseService) { }

  ngOnInit(): void {
    this.loadApplications();
  }



  searchResponses(idApp: string){
    if (this.startDate && this.endDate != null){
      this.loadAllQUestionsWithDate(idApp);
      this.getStaticsWithDate();
    } else {
      this.loadAllQuestions(idApp);
      this.getStatics();
    }
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


  private getStatics() {
    this.responseService.getStatisticsAllResponse(this.idApp).subscribe(
      (questionStatistics: ResponseStatistics) => {
        this.responseStatistics = questionStatistics;
        console.log(this.responseStatistics);
        this.errorMessageOn = false;
        this.errorMessage = "";
      },

      (error) => {
        console.error('Ocorreu um erro ao buscar as estatísticas das respostas:', error);
        this.responseStatistics = new ResponseStatistics();
        this.errorMessage = "Ocorreu um erro ao buscar as estatísticas das respostas. Por favor, tente novamente mais tarde.";
        this.errorMessageOn = true;
      }
    );
  }
 
  private getStaticsWithDate() {
    if (this.startDate != null && this.endDate != null) {
      this.responseService.getStatisticsAllResponseWithDate(this.idApp, this.startDate, this.endDate).subscribe(
        (questionStatistics: ResponseStatistics) => {
          this.responseStatistics = questionStatistics;
          console.log(this.responseStatistics);
          this.errorMessage = "";
          this.errorMessageOn = false;
        },
        (error) => {
          console.error('Ocorreu um erro ao buscar as estatísticas das respostas, erro:', error);
          this.responseStatistics = new ResponseStatistics();
          this.errorMessage = "Ocorreu um erro ao buscar as estatísticas das respostas. Por favor, tente novamente mais tarde.";
          this.errorMessageOn = true;
        }
      );
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
