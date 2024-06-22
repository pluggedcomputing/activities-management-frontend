import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'autocomplete-input',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent {
  @Input() options: string[] = [];
  @Input() placeholder: string = "";
  @Output() selectedOptionChange = new EventEmitter<string>();
  
  myControl = new FormControl('');
  filteredOptions: string[];

  constructor() {
    this.filteredOptions = [];
    this.myControl.valueChanges.subscribe(() => {
      this.filter();
    });
  }

  ngOnChanges() {
    this.filteredOptions = this.options.slice();
  }

  get value(): string {
    return this.myControl.value || '';
  }

  filter(): void {
    const filterValue = this.myControl.value ? this.myControl.value.toLowerCase() : '';
    this.filteredOptions = this.options.filter(o => o.toLowerCase().includes(filterValue));
    
    // Emitir evento com a opção selecionada (se houver apenas uma correspondência)
    if (this.filteredOptions.length === 1) {
      this.selectedOptionChange.emit(this.filteredOptions[0]);
    }
  }

  optionSelected(option: string): void {
    this.selectedOptionChange.emit(option);
  }
}