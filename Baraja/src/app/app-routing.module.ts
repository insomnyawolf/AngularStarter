import { NgModule, OnInit } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BarajaComponent } from './baraja/baraja.component';
import { ErrorComponent } from './error/error.component';

// Definicion de rutas de la aplicacion
const routes: Routes = [
  // Mapeo de componentes
  { path: 'baraja', component: BarajaComponent },
  // Ruta por defecto
  { path: '', redirectTo: '/baraja', pathMatch: 'full' },
  // ** mapea cualquier ruta no definida previamente
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
