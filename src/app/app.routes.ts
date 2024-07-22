import { Routes } from '@angular/router';
import { DbConnectionFormComponent } from './db-connection-form/db-connection-form.component';
import { DataAtlasPageComponent } from './data-atlas-page/data-atlas-page.component';

export const appRoutes: Routes = [
  { path: '', component: DbConnectionFormComponent },
  { path: 'success', component: DataAtlasPageComponent }
];
