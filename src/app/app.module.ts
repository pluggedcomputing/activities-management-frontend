import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { StatisticBinaryComponent } from './components/binary/statistic-binary/statistic-binary.component';
import { HomeComponent } from './components/home/home.component';
import { HomeBinaryComponent } from './components/binary/home-binary/home-binary.component';
import { SearchUserComponent } from './components/binary/search-user/search-user.component';

@NgModule({
  declarations: [
    AppComponent,
    StatisticBinaryComponent,
    HomeComponent,
    HomeBinaryComponent,
    SearchUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
