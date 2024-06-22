import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ResponseService } from 'src/app/service/response/response.service';
import { Response } from 'src/app/models/response.model';
import { UserStatistics } from 'src/app/models/userStatistics';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css'],
})
export class SearchUserComponent implements OnInit {
  

  userID: string = "";
  idApp: string = "";
  userQuestions: Response[] = [];
  errorMessage: string = "";
  statisticsUser: UserStatistics = new UserStatistics();
  startDate: Date | null = null;
  endDate: Date | null = null;
  dataOn: boolean = false;
  containerSearchOn: boolean = false;
  usersOptions: string[] = [];
  applicationsOptions: string[] = [];
  isBloqueada: boolean = true;

  @ViewChild('autocompleteInput') autocompleteInput!: ElementRef;

  constructor(
    private responseService: ResponseService
  ) {}

  // Ciclo de vida do componente
  ngOnInit(): void {
    this.loadApplications();
  }

  private verifyApp(app: string): boolean {
    return this.applicationsOptions.includes(app);
}

  // Verifica se contém uma aplicação válida digitada
  onClickHandler(idApp: string) {
    if (this.verifyApp(idApp)) {
      if (idApp != this.idApp){ // Faz uma verificação para que não fazer requisições descenessárias
        this.getUsers(idApp); // Define a lista de Users que vai ser mostrada 
        this.idApp = idApp; // Define o idApp que vai ser usado para pesquisar os Users
        this.errorMessage = "";
      }
     
    } else{
       this.errorMessage = "Por favor, digite uma aplicação válida!"
    }
}

  // Carregar as opções de aplicações disponíveis
  private loadApplications(): void {
    this.responseService.getApplications().subscribe(
      (idApps: string[]) => {
        if (idApps.length > 0) {
          this.applicationsOptions = idApps;
          console.log("Apps:", this.applicationsOptions);
        }
      },
      (error) => {
        console.error('Erro ao buscar as aplicações:', error);
        this.errorMessage = "Ocorreu um erro ao buscar as aplicações no banco";
        this.applicationsOptions = [];
      }
    );
  }

  // Carregar usuários com base no idApp selecionado
  getUsers(idApp: string): void {
    console.log("idApp:", idApp);
    this.responseService.getUsers(idApp).subscribe(
      (usersID: string[]) => {
        if (usersID.length > 0) {
          this.usersOptions = usersID;
          console.log("Users:", this.usersOptions);
          this.containerSearchOn = true;
        }
      },
      (error) => {
        console.error('Erro ao buscar os usuários:', error);
        this.errorMessage = "Ocorreu um erro ao buscar os usuários no banco";
        this.usersOptions = [];
      }
    );
  }

  // Acionar a pesquisa com base no valor do input autocomplete
  filterButtonClick(autocompleteValue: string): void {
    console.log('Valor do autocomplete-input:', autocompleteValue);
    this.userID = autocompleteValue;
    this.searchUser();
  }

  // Realizar a pesquisa do usuário
  private searchUser(): void {
    if (this.userID.trim()) {
      if (this.startDate && this.endDate) {
        this.getQuestionsOfUserWithDate();
        this.getStatisticsWithDate();
      } else {
        this.getQuestionsOfUser();
        this.getStatistics();
      }
    } else {
      this.userQuestions = [];
      this.errorMessage = "Por favor, insira um usuário válido.";
    }
  }

  // Buscar perguntas do usuário sem data específica
  private getQuestionsOfUser(): void {
    this.responseService.getQuestionsOfUser(this.userID, this.idApp).subscribe(
      (questions: Response[]) => {
        if (questions.length > 0) {
          this.userQuestions = questions.reverse();
          console.log("Questions:", this.userQuestions);
        } else {
          this.userQuestions = [];
          this.errorMessage = "Nenhuma pergunta encontrada para o ID de usuário especificado.";
        }
      },
      (error) => {
        console.error('Erro ao buscar as perguntas do usuário:', error);
        this.userQuestions = [];
        this.errorMessage = "Ocorreu um erro ao buscar as perguntas do usuário. Por favor, tente novamente mais tarde.";
      }
    );
  }

  // Buscar perguntas do usuário com data específica
  private getQuestionsOfUserWithDate(): void {
    if (this.startDate && this.endDate) {
      this.responseService.getQuestionsOfUserWithDate(this.userID, this.idApp, this.startDate, this.endDate).subscribe(
        (questions: Response[]) => {
          if (questions.length > 0) {
            this.userQuestions = questions.reverse();
            this.errorMessage = "";
            console.log("Questions with date:", this.userQuestions);
          } else {
            this.userQuestions = [];
            this.errorMessage = "Nenhuma pergunta encontrada para o ID de usuário especificado.";
          }
        },
        (error) => {
          console.error('Erro ao buscar as perguntas do usuário com data:', error);
          this.userQuestions = [];
          this.errorMessage = "Ocorreu um erro ao buscar as perguntas do usuário. Por favor, tente novamente mais tarde.";
        }
      );
    }
  }

  // Buscar estatísticas do usuário sem data específica
  private getStatistics(): void {
    this.responseService.getStatisticsUser(this.userID, this.idApp).subscribe(
      (statistics: UserStatistics) => {
        this.statisticsUser = statistics;
        console.log("Statistics:", this.statisticsUser);
        this.errorMessage = "";
      },
      (error) => {
        console.error('Erro ao buscar as estatísticas do usuário:', error);
        this.statisticsUser = new UserStatistics();
        this.errorMessage = "Ocorreu um erro ao buscar as estatísticas do usuário. Por favor, tente novamente mais tarde.";
      }
    );
  }

  // Buscar estatísticas do usuário com data específica
  private getStatisticsWithDate(): void {
    if (this.startDate && this.endDate) {
      this.responseService.getStatisticsUserWithDate(this.userID, this.idApp, this.startDate, this.endDate).subscribe(
        (statistics: UserStatistics) => {
          this.statisticsUser = statistics;
          console.log("Statistics with date:", this.statisticsUser);
          this.errorMessage = "";
        },
        (error) => {
          console.error('Erro ao buscar as estatísticas do usuário com data:', error);
          this.statisticsUser = new UserStatistics();
          this.errorMessage = "Ocorreu um erro ao buscar as estatísticas do usuário. Por favor, tente novamente mais tarde.";
        }
      );
    }
  }
}
