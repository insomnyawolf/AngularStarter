import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Http Client
import { HttpClientModule } from '@angular/common/http';

// Material
import { MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
  MatSortModule, MatTableModule, MatDialogModule, MatButtonModule } from '@angular/material';

// Browser Animation
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// Reactive Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// BootStrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Componentes Proyecto
import { BarajaComponent } from './baraja/baraja.component';
import { ErrorComponent } from './error/error.component';
import { BarajaDialogComponent } from './baraja/baraja-dialog';

@NgModule({
  declarations: [
    AppComponent,
    BarajaComponent,
    ErrorComponent,
    BarajaDialogComponent
  ],
  entryComponents: [
    BarajaDialogComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
