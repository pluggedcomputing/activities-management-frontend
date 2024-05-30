import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {
  menuActive = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleMenu(): void {
    this.menuActive = !this.menuActive;
  }
}
