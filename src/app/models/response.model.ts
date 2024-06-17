export class Response {
    public userID: string;
    public idApp: string;
    public phase: string;
    public activity: string;
    public userResponse: string;
    public expectedResponse: string;
    public isCorrect: boolean;
    public dateResponse: Date;
    public typeOfQuestion: string;
  
    constructor(userID: string, idApp: string, phase: string, activity: string, userResponse: string, expectedResponse: string, isCorrect: boolean, dateResponse: Date, typeOfQuestion: string) {
      this.userID = userID;
      this.idApp = idApp;
      this.phase = phase;
      this.activity = activity;
      this.userResponse = userResponse;
      this.expectedResponse = expectedResponse;
      this.isCorrect = isCorrect;
      this.dateResponse = dateResponse;
      this.typeOfQuestion = typeOfQuestion;
    }
  
    getuserID(): string {
      return this.userID;
    }
  
    getIdApp(): string {
      return this.idApp;
    }
  
    getphase(): string {
      return this.phase;
    }
  
    getactivity(): string {
      return this.activity;
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
  