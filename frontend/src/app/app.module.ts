import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
/*******SERVICES*****/
import { AuthenticationService } from './authentication.service';

/******COMPONENTS*****/
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AppRoutingModule, routingComponents } from './app.routing';
import { HomeComponent } from './home/home.component';
import { APP_CONFIG, AppConfig } from './app.config';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    AuthenticationService,
    { provide: APP_CONFIG, useValue: AppConfig }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
