import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { StatisticBinaryComponent } from './components/binary/statistic-binary/statistic-binary.component'
import { SearchUserComponent } from './components/binary/search-user/search-user.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: HomeComponent},
  {path: 'statistics-binary', component: StatisticBinaryComponent},
  {path: 'search-user', component: SearchUserComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
