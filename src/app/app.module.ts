import { ApidataService } from './services/apidata.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';



import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { NavComponent } from './components/nav/nav.component';
import { RegisterComponent } from './components/register/register.component';
import { SigninComponent } from './components/signin/signin.component';
import { AccountComponent } from './components/account/account.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';

const appRoutes: Routes = [
  {path :"", component:HomeComponent},
  {path :"register", component:RegisterComponent},
  {path :"signin", component:SigninComponent},
  {path :"account", component:AccountComponent},
  {path :"dashboard", component:DashboardComponent},

]

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    RegisterComponent,
    SigninComponent,
    AccountComponent,
    DashboardComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [ApidataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
