import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Http Client
import { HttpClientModule } from '@angular/common/http';

// Material
import { MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
  MatSortModule, MatTableModule, MatDialogModule, MatButtonModule, MatNativeDateModule,
  MatChipsModule, MatAutocompleteModule, MatBadgeModule, MatBottomSheetModule, MatButtonToggleModule,
  MatCardModule, MatCheckboxModule, MatDatepickerModule, MatDividerModule, MatExpansionModule,
  MatGridListModule, MatIconModule, MatListModule, MatMenuModule, MatProgressBarModule, MatRadioModule,
  MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule,
  MatSnackBarModule, MatStepperModule, MatTabsModule, MatToolbarModule, MatTooltipModule,
  MatTreeModule } from '@angular/material';
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
import { DeletePopupComponent } from './delete-popup/delete-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    BarajaComponent,
    ErrorComponent,
    BarajaDialogComponent,
    DeletePopupComponent
  ],
  entryComponents: [
    BarajaDialogComponent,
    DeletePopupComponent,
    BarajaComponent
  ],
  bootstrap: [
    AppComponent
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
    ReactiveFormsModule,
    MatNativeDateModule,
    MatChipsModule,
    MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: []
})
export class AppModule { }
