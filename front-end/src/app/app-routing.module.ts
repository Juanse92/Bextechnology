import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableroCRUDComponent } from './tablero-crud/tablero-crud.component';

const routes: Routes = [
  {path:'', redirectTo: '/api',pathMatch:'full'},
  { path: 'api', component: TableroCRUDComponent,}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule { }
