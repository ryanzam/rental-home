import { HttpModule } from '@angular/http';
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
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';



import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { RegisterComponent } from './components/register/register.component';
import { SigninComponent } from './components/signin/signin.component';
import { AccountComponent } from './components/account/account.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { HouseComponent } from './components/house/house.component';
import { UpdateHouseComponent } from './components/update-house/update-house.component';
import { UpdateAccountComponent } from './components/update-account/update-account.component';

const appRoutes: Routes = [
  {path :"", component:HomeComponent},
  {path :"register", component:RegisterComponent},
  {path :"signin", component:SigninComponent},
  {path :"account", component:AccountComponent, canActivate:[AuthGuard]},
  {path :"dashboard", component:DashboardComponent, canActivate: [AuthGuard]},
  {path : "house/:id", component:HouseComponent},
  {path : "updatehouse/:id", component: UpdateHouseComponent},
  {path : "updateaccount/:id", component: UpdateAccountComponent},

]

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    RegisterComponent,
    SigninComponent,
    AccountComponent,
    DashboardComponent,
    HomeComponent,
    HouseComponent,
    UpdateHouseComponent,
    UpdateAccountComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule.forRoot(),
    NgxPaginationModule,
    HttpClientModule


  ],
  providers: [ValidationService, UserAuthService, AuthGuard, HouseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
