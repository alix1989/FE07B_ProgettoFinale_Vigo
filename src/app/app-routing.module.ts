import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientDetailsPage } from './components/client-details.page';
import { ClientsPage } from './components/clients.page';
import { EditClientPage } from './components/edit-client.page';
import { FatturaDetailsPage } from './components/fattura-details.page';
import { FatturaNewPage } from './components/fattura-new.page';
import { FattureClientePage } from './components/fatture-cliente.page';
import { FatturePage } from './components/fatture.page';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginPage } from './components/login.page';
import { SignupPage } from './components/signup.page';
import { UsersPage } from './components/users.page';
import { AuthGuard } from './guard/auth.guard';


const routes: Routes = [
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: '',
    component: HomepageComponent,
  },
  {
    path: 'registrati',
    component: SignupPage,
  },
  {
    path: 'clienti',
    component: ClientsPage,
    canActivate:[AuthGuard]
  },
  {
    path: 'users',
    component: UsersPage,
    canActivate:[AuthGuard]

  },
  {
    path: 'fatture',
    component: FatturePage,
    canActivate:[AuthGuard]
  },
  {
    path: 'dettagliFattura/:id',
    component: FatturaDetailsPage,
    canActivate:[AuthGuard]
  },
  {
    path: 'dettagliCliente',
    component: ClientDetailsPage,
    canActivate:[AuthGuard]
  },
  {
    path: 'fatture-cliente/:id',
    component: FattureClientePage,
    canActivate:[AuthGuard]
  },
  {
    path: 'newFattura/:id',
    component: FatturaNewPage,
    canActivate:[AuthGuard]
  },
  {
    path: 'edit-cliente/:id',
    component: EditClientPage,
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
