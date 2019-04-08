import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator, Sort } from '@angular/material';
import { Baraja } from './baraja';
import { HttpClient } from '@angular/common/http';
import { BarajaDialogComponent } from './baraja-dialog';
import { BarajaServiceService } from '../shared/Baraja-service/Baraja-service.service';

@Component({
  selector: 'app-baraja',
  templateUrl: './baraja.component.html',
  styleUrls: ['./baraja.component.scss']
})

export class BarajaComponent implements OnInit {

  constructor(public dialog: MatDialog, private barajaService: BarajaServiceService) {}

  dataSource = new MatTableDataSource<Baraja>();
  selectedBaraja = null;


  barajaColumns = ['nombre', 'cantidadCartas', 'marca' ];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.barajaService.getAllBarajas().subscribe(data => {
        this.dataSource.data = data;
        console.log(this.dataSource);
    }, error => {
      console.log(error);
    });
  }

  dialogOpen(row) {
    // Inicias un formulario pasandole el objeto con los datos de la baraja
    console.log(row);
    const dialogRef = this.dialog.open(BarajaDialogComponent, {
      width: '90%',
      height: '90%',
      data: row
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ngOnInit();
    });
  }

  dialogOpenNew() {
    // Abre un dialogo con un objeto vacio
    this.dialogOpen(new Baraja());
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  // Esta funcion compara y ordena los objetos de la tabla
  sortData(sort: Sort) {
    const data: Baraja[] = this.dataSource.data.slice();
    if (!sort.active || sort.direction === '') {
        this.dataSource.data = data;
        return;
    }

    this.dataSource.data = data.sort((a, b) => {
    const isAsc = sort.direction === 'asc';
    switch (sort.active) {
        case 'Nombre': return compare(a.nombre, b.nombre, isAsc);
        case 'Primer Apellido': return compare(a.cantidadCartas, b.cantidadCartas, isAsc);
        case 'Segundo Apellido': return compare(a.marca, b.marca, isAsc);
        default : return compare(a.id, b.id, isAsc);
    }
    });

    function compare(a: number | string, b: number | string, isAsc: boolean) {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
  }

  select(baraja) {
    if (baraja === this.selectedBaraja) {
      this.selectedBaraja = null;
    } else {
      this.selectedBaraja = baraja;
    }
  }
}
