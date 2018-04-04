import { AuthGuard } from './guards/auth.guards';
import { UserAuthService } from './services/user-auth.service';
import { ValidationService } from './services/validation.service';
import { HouseService } from './services/house.service';

import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';

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
  {path :"account", component:AccountComponent, canActivate:[AuthGuard]},
  {path :"dashboard", component:DashboardComponent, canActivate: [AuthGuard]},

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
    CommonModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule.forRoot(),
  ],
  providers: [ValidationService, UserAuthService, AuthGuard, HouseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
