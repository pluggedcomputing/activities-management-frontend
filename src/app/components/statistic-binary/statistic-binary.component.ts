import { Component, OnInit } from '@angular/core';
import { ResponsesBinaryService } from 'src/app/service/responses-binary/responses-binary.service';

@Component({
  selector: 'app-statistic-binary',
  templateUrl: './statistic-binary.component.html',
  styleUrls: ['./statistic-binary.component.css']
})

export class StatisticBinaryComponent implements OnInit {

  questions: any[] = [];

  

  constructor(private responseBinary: ResponsesBinaryService) { }
  
  getAllQuestions(){
    this.responseBinary.getAllQuestion().subscribe(
      (data: any) => {
        this.questions = data;
      },
      error => {
        console.error('Erro ao buscar detalhes da atividade:', error);
      }
    );
  }

  ngOnInit(): void {
    this.getAllQuestions();
  
  }

}
