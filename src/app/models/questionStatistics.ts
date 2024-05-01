export class QuestionStatistics {
    public quantityAllAnswers: number;
    public quantityCorrectsAnswers: number;
    public quantityWrongsAnswers: number;
    public percentageCorrectsAnswers: number;
    public percentageWrongsAnswers: number;
  
    constructor() {
      this.quantityAllAnswers = 0;
      this.quantityCorrectsAnswers = 0;
      this.quantityWrongsAnswers = 0;
      this.percentageCorrectsAnswers = 0;
      this.percentageWrongsAnswers = 0;
    }
  }
  