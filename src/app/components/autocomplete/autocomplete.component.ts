import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'autocomplete-input',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent {
  @Input() options: string[] = []; 
  @Output() selectedOptionChange = new EventEmitter<string>();
  myControl = new FormControl('');
  filteredOptions: string[];
  selectedOption: string = ''; 

  // Adiciona uma propriedade value para acessar o valor do FormControl
  get value(): string {
    return this.myControl.value || ''; // Retorna uma string vazia se o valor for null
  }
  
  constructor() {
    this.filteredOptions = [];
  }

  ngOnChanges() {
    // Atualizar filteredOptions quando options mudar
    this.filteredOptions = this.options.slice();
  }

  filter(): void {
    const filterValue = this.myControl.value ? this.myControl.value.toLowerCase() : ''; // Trata o valor nulo
    this.filteredOptions = this.options.filter(o => o.toLowerCase().includes(filterValue));
  }
}
