import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login'; 
import { CatalogoComponent } from './pages/catalogo/catalogo';
import { AdminPanel } from './pages/admin-panel/admin-panel';
import { Registro } from './pages/registro/registro';
import { authGuard } from './guards/auth-guard';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: Registro }, 
  

  { 
    path: 'catalogo', 
    component: CatalogoComponent, 
    canActivate: [authGuard] 
  },
  { 
    path: 'admin', 
    component: AdminPanel, 
    canActivate: [authGuard] 
  },
  
  { path: '**', redirectTo: 'login' }
];