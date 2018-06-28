import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CatalogComponent } from './catalog/catalog.component';


export const ROUTES: Routes = [
  {
    path: '',
    component: CatalogComponent
  }
];
