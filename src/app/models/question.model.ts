export class Question {
    public idUser: string;
    public idApp: string;
    public phaseActivity: string;
    public numberActivity: string;
    public userResponse: string;
    public expectedResponse: string;
    public isCorrect: boolean;
    public dateResponse: Date;
    public typeOfQuestion: string;
  
    constructor(idUser: string, idApp: string, phaseActivity: string, numberActivity: string, userResponse: string, expectedResponse: string, isCorrect: boolean, dateResponse: Date, typeOfQuestion: string) {
      this.idUser = idUser;
      this.idApp = idApp;
      this.phaseActivity = phaseActivity;
      this.numberActivity = numberActivity;
      this.userResponse = userResponse;
      this.expectedResponse = expectedResponse;
      this.isCorrect = isCorrect;
      this.dateResponse = dateResponse;
      this.typeOfQuestion = typeOfQuestion;
    }
  
    getIdUser(): string {
      return this.idUser;
    }
  
    getIdApp(): string {
      return this.idApp;
    }
  
    getPhaseActivity(): string {
      return this.phaseActivity;
    }
  
    getNumberActivity(): string {
      return this.numberActivity;
    }
  
    getUserResponse(): string {
      return this.userResponse;
    }
  
    getExpectedResponse(): string {
      return this.expectedResponse;
    }
  
    getIsCorrect(): boolean {
      return this.isCorrect;
    }
  
    getDateResponse(): Date {
      return this.dateResponse;
    }
  
    getTypeOfQuestion(): string {
      return this.typeOfQuestion;
    }
  }
  