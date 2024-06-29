import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TableroCRUDComponent } from './tablero-crud/tablero-crud.component';
import {TreeTableModule} from 'primeng/treetable';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { PaisesService } from './service/paises.service';
import { DepartamentoService } from './service/departamento.service';
import { CiudadService } from './service/ciudad.service';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    TableroCRUDComponent
    ],
  imports: [
    BrowserModule,
    TooltipModule,
    TreeTableModule,
    ButtonModule,
    BrowserAnimationsModule,
    DialogModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [PaisesService,DepartamentoService,CiudadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
