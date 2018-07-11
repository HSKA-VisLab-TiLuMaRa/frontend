import { Routes } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';


export const ROUTES: Routes = [
  {
    path: '',
    component: CatalogComponent
  },
  {
    path: 'code/:code',
    component: CatalogComponent
  }
];
