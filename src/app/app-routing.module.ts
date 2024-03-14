import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { StatisticBinaryComponent } from './components/binary/statistic-binary/statistic-binary.component'
import { HomeBinaryComponent } from './components/binary/home-binary/home-binary.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: HomeComponent},
  {path: 'statistics-binary', component: StatisticBinaryComponent},
  {path: 'home-binary', component: HomeBinaryComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
