import { Component, OnInit } from '@angular/core';
import { ResponseService } from 'src/app/service/response/response.service';
import { ResponseStatistics } from 'src/app/models/responseStatistics';
import { Response } from 'src/app/models/response.model';

@Component({
  selector: 'app-statistic-binary',
  templateUrl: './statistic-binary.component.html',
  styleUrls: ['./statistic-binary.component.css']
})
export class StatisticBinaryComponent implements OnInit {

  responses: Response[] = [];
  dataOn: boolean = false;
  startDate: Date | null = null;
  endDate: Date | null = null;
  errorMessageOn: boolean = false;
  errorMessage: string = "";
  idApp: string = "WEB-BINARIOS 1.0";
  applicationsOptions: string[] = [];
  responseStatistics: ResponseStatistics = new ResponseStatistics();

  // Variáveis de paginação
  page: number = 0;
  size: number = 30;
  totalPages: number = 0;

  constructor(private responseService: ResponseService) { }

  ngOnInit(): void {
    this.loadApplications();
  }

  searchResponses(idApp: string): void {
    if (this.startDate != null && this.endDate != null) {
      this.loadAllResponsesWithDate(idApp);
      this.getStatisticsWithDate();
    } else {
      this.loadAllResponses(idApp);
      this.getStatistics();
    }
  }

  private loadApplications(): void {
    this.errorMessage = "Carregando aplicações...";
    this.errorMessageOn = true;
    
    this.responseService.getApplications().subscribe(
      (idApps: string[]) => {
        if (idApps.length > 0) {
          this.applicationsOptions = idApps;
          console.log("Apps:", this.applicationsOptions);
          this.errorMessageOn = false;
        }
      },
      (error) => {
        console.error('Erro ao buscar as aplicações:', error);
        this.errorMessage = "Ocorreu um erro ao buscar as aplicações no banco";
        this.errorMessageOn = true;
        this.applicationsOptions = [];
      }
    );
  }

  private getStatistics(): void {
    this.responseService.getStatisticsAllResponse(this.idApp).subscribe(
      (questionStatistics: ResponseStatistics) => {
        this.responseStatistics = questionStatistics;
        console.log(this.responseStatistics);
        this.errorMessage = "";
        this.errorMessageOn = false;
      },
      (error) => {
        console.error('Ocorreu um erro ao buscar as estatísticas das respostas:', error);
        this.responseStatistics = new ResponseStatistics();
        this.errorMessage = "Ocorreu um erro ao buscar as estatísticas das respostas. Por favor, tente novamente mais tarde.";
        this.errorMessageOn = true;
      }
    );
  }

  private getStatisticsWithDate(): void {
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

  private loadAllResponsesWithDate(idApp: string): void {
    this.idApp = idApp;
    this.errorMessage = "Carregando respostas...";
    this.errorMessageOn = true;
    
    if (this.startDate != null && this.endDate != null) {
      this.responseService.getAllQuestionWithDate(this.idApp, this.startDate, this.endDate, this.page, this.size).subscribe(
        (data: any) => {
          if (data && data.content) {
            this.responses = data.content;
            this.totalPages = data.totalPages;
            this.errorMessageOn = false;
            if (this.responses.length === 0) {
              this.errorMessage = "Nenhuma resposta encontrada!";
              this.errorMessageOn = true;
            }
          } else {
            this.errorMessage = "Nenhum dado retornado!";
            this.errorMessageOn = true;
          }
        },
        error => {
          console.error('Erro ao buscar detalhes da atividade:', error);
          this.errorMessage = "Erro ao carregar respostas!";
          this.errorMessageOn = true;
        }
      );
    } else {
      this.errorMessage = "Datas inválidas!";
      this.errorMessageOn = true;
    }
  }
  


  private loadAllResponses(idApp: string): void {
    this.idApp = idApp;
    this.errorMessage = "Carregando respostas...";
    this.errorMessageOn = true;
    
    this.responseService.getAllQuestion(this.idApp, this.page, this.size).subscribe(
      (data: any) => {
        if (data && data.content) {
          this.responses = data.content;
          this.totalPages = data.totalPages;
          this.errorMessageOn = false;
          if (this.responses.length === 0) {
            this.errorMessage = "Nenhuma resposta encontrada!";
            this.errorMessageOn = true;
          }
        } else {
          this.errorMessage = "Nenhum dado retornado!";
          this.errorMessageOn = true;
        }
      },
      error => {
        console.error('Erro ao buscar detalhes da atividade:', error);
        this.errorMessage = "Erro ao carregar respostas!";
        this.errorMessageOn = true;
      }
    );
  }
  

  nextPage(): void {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.searchResponses(this.idApp);
    }
  }

  previousPage(): void {
    if (this.page > 0) {
      this.page--;
      this.searchResponses(this.idApp);
    }
  }
}
