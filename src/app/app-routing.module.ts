import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { StatisticBinaryComponent } from './components/binary/all-answers/statistic-binary.component'
import { SearchUserComponent } from './components/binary/search-user/search-user.component';
import { SearchQuestionComponent } from './components/binary/search-question/search-question.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: HomeComponent},
  {path: 'statistics-binary', component: StatisticBinaryComponent},
  {path: 'search-user', component: SearchUserComponent},
  {path: 'search-question', component: SearchQuestionComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
