import { NgModule, NgProbeToken } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientsPage } from './components/clients.page';
import { ClientDetailsPage } from './components/client-details.page';
import { FatturaDetailsPage } from './components/fattura-details.page';
import { FatturePage } from './components/fatture.page';
import { LoginPage } from './components/login.page';
import { SignupPage } from './components/signup.page';
import { HomepageComponent } from './components/homepage/homepage.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UsersPage } from './components/users.page';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyHttpInterceptor } from './interceptors/my-http.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FattureClientePage } from './components/fatture-cliente.page';
import { FatturaNewPage } from './components/fattura-new.page';
import { EditClientPage } from './components/edit-client.page';

@NgModule({
  declarations: [
    AppComponent,
    ClientsPage,
    FatturaDetailsPage,
    FatturePage,
    LoginPage,
    SignupPage,
    HomepageComponent,
    NavbarComponent,
    UsersPage,
    ClientDetailsPage,
    FattureClientePage,
    FatturaNewPage,
    EditClientPage,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
