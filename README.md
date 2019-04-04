# AngularStarter

## Caracteristicas de angular

* La logica esta escrita en typescript
* La vista en html
* Soporta multiples tipos de hojas de estilo:
  * [CSS](https://developer.mozilla.org/es/docs/Learn/CSS/Introduction_to_CSS/Como_funciona_CSS)
  * [SCSS](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#syntax)
  * [Sass](http://sass-lang.com/documentation/file.INDENTED_SYNTAX.html)
  * [Less](http://lesscss.org)
  * [Stylus](http://stylus-lang.com)
* Soporte para plantillas
* Optimizacion, debido a que solo carga el codigo requerido para la vista actual.
* Funciona en cualquier dispositivo capaz de cargar una web, ya que angular carga html/css y javascript.

## Requisitos

* Tener instalado [Node](https://nodejs.org/)  
* Dos consolas  
* Cualquier editor de texto:  
  * [VS Code](https://code.visualstudio.com/)  
  * [Eclipse](https://www.eclipse.org/)  

## Herramientas y otros recursos

[Angular IO](https://angular.io/)

## Primeros pasos

### Instalar Node

```sh
npm install -g @angular/cli
```

### Crear Nuevo Proyecto

```sh
ng new (Nombre proyecto)
```

### Iniciar servidor

```sh
cd (Nombre proyecto)
ng serve --open
```

Esto iniciará el servidor y una ventana del navegador predeterminado con la app  
Sobre esto vamos a crear una aplicacion de ejemplo, para ello usaremos Angular Material

### Instalar material y dependencias

```sh
npm install --save @angular/material @angular/cdk @angular/animations
npm install --save angular/material2-builds angular/cdk-builds angular/animations-builds
npm install --save hammerjs
```

![Instalacion de Dependencias](./img/instalacionDependencias.png "Instalacion de Dependencias")

Una vez que acabe de instalar nos mostrará:

![Instalacion de Dependencias Completada](./img/instalacionDependenciasCompletada.png "Instalacion de Dependencias Completada")

Aqui se pueden verlas advertencias y problemas que hayan surgido durante el proceso de instalacion y otra informacion util

### Administracion de dependencias instaladas

Para poder usar los paquetes instalado, primero tenemos que importar los modulos de estos.

```source/app/app.module.ts```

Este seria el fichero recien creado

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Sobre el vamos a importar las siguientes depencias:

* HttpClientModule
* MatInputModule
* MatTableModule
* MatPaginatorModule
* MatSortModule
* MatProgressSpinnerModule
* MatDialogModule
* BrowserAnimationsModule

Importante, HttpClientModule siempre se debe importar despues de haber importado BrowserModule

Este seria el archivo final

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
  MatSortModule, MatTableModule, MatDialogModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Componentes

Para la creacion de un nuevo componente usaremos el siguiente comando

```sh
ng generate component (nombre del componente)
```

En nuestro caso vamos a generar dos, uno para la aplicacion y otro para error

```sh
ng generate component baraja
ng generate component error
```

### Router

Para poder navegar entre vistas de una manera sencilla necesitamos implementar un router

```src/app/app-routing.module.ts```

Un ejemplo de router puede ser el siguiente:

```ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BarajaComponent } from './baraja/baraja.component';
import { ErrorComponent } from './error/error.component';

// Definicion de rutas de la aplicacion
const routes: Routes = [
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
```

En el se ve como mapeas cada ruta a un componente  
Cual va a ser la ruta por defecto  
Redirecciones y la pagina de error  

El contenido de el componente se mostrara entre las etiquetas ```<router-outlet></router-outlet>``` del archivo ```src/app/app.component.html```