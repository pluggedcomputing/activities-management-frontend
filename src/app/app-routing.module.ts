import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { StatisticBinaryComponent } from './components/statistic-binary/statistic-binary.component'

const routes: Routes = [
  {path: '', pathMatch: 'full', component: HomeComponent},
  {path: 'statistics-binary', component: StatisticBinaryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
