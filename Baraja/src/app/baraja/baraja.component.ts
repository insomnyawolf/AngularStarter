import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {COMMA, ENTER, SPACE} from '@angular/cdk/keycodes';
import {
  MatDialog,
  MatTableDataSource,
  MatSort,
  MatPaginator,
  Sort,
  MatAutocompleteSelectedEvent,
  MatChipInputEvent,
  MatAutocomplete
} from '@angular/material';
import { Baraja } from './baraja';
import { BarajaDialogComponent } from './baraja-dialog';
import { ApiService } from '../shared/api/api.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';


export interface Tag {
  name: string;
}

@Component({
  selector: 'app-baraja',
  templateUrl: './baraja.component.html',
  styleUrls: ['./baraja.component.scss']
})

export class BarajaComponent implements OnInit {

  constructor(
    public dialog: MatDialog, private apiService: ApiService) {
      this.filteredTags = this.tagsCtrl.valueChanges.pipe(
        startWith(null),
        map((tag: string | null) => tag ? this._filter(tag) : this.allTags.slice()));
    }

  dataSource = new MatTableDataSource<Baraja>();
  selectedBaraja = null;
  endpoint = '/baraja';

  barajaColumns = ['nombre', 'cantidadCartas', 'marca' ];

  // Table
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  // Autocomplete
  @ViewChild('tagsInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];
  tags: string[] = [];
  tagsCtrl = new FormControl();
  filteredTags: Observable<string[]>;
  allTags: string[] = [];

  add(event: MatChipInputEvent): void {
    // Add tag only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our tag
      if ((value || '').trim()) {
        this.tags.push(value.trim());
      }

      // Reset the input value
      if (input.value !== '') {
        input.value = '';
      }
      this.tagsCtrl.setValue(null);
    }
    this.applyFilter();
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
    this.applyFilter();
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.tagsCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toString().toLowerCase();

    return this.allTags.filter(tag => tag.toString().toLowerCase().indexOf(filterValue) === 0);
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.apiService.apiGet(this.endpoint).subscribe(dat => {
      this.dataSource.data = dat;
      const data: Baraja[] = dat;
      data.forEach(element => {
        if (element.nombre != null) {
          this.allTags.push(element.nombre);
        }
        if (element.cantidadCartas != null) {
          this.allTags.push(element.cantidadCartas);
        }
        if (element.marca != null) {
          this.allTags.push(element.marca);
        }
      });
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

  applyFilter() {
    let filterValue = '';
    this.tags.forEach(element => {
      filterValue = filterValue + ' ' + element;
    });
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    console.log(filterValue);
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
