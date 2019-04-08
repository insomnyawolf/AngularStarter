import { Component, Inject, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Baraja } from './baraja';

@Component({
  selector: 'app-baraja-dialog',
  templateUrl: './baraja-dialog.html',
})

export class BarajaDialogComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<BarajaDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public baraja: Baraja,
              private fbuilder: FormBuilder,
              private http: HttpClient) {}

  formGroup: FormGroup;

  servidor = 'http://192.168.1.175:8080';

  ngOnInit(): void {
    this.formGroup = this.fbuilder.group({
      id: this.baraja.id,
      nombre: new FormControl(null),
      cantidadCartas: new FormControl(null),
      marca: new FormControl(null),
    });
  }

  closeDialog() {
    this.dialogRef.close('Pizza!');
  }

  addBaraja() {
    const endpoint = '/addBaraja';
    const formObj = this.formGroup.getRawValue();
    const serializedForm = JSON.stringify(formObj);
    console.log(serializedForm);
    const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
    this.http.post<Baraja[]>(this.servidor + endpoint, serializedForm, {headers}).subscribe(
      data => console.log('success!', data),
      error => console.error('couldn\'t post because', error)
    );
    this.closeDialog();
  }

  editBaraja() {
    const endpoint = '/editBaraja';
    const formObj = this.formGroup.getRawValue();
    const serializedForm = JSON.stringify(formObj);
    console.log(serializedForm);
    const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
    this.http.put<Baraja[]>(this.servidor + endpoint, serializedForm, {headers}).subscribe(
      data => console.log('success!', data),
      error => console.error('couldn\'t post because', error)
    );
    this.closeDialog();
  }

  deleteBaraja() {
    const endpoint = '/deleteBaraja';
    this.http.delete<Baraja[]>(this.servidor + endpoint + '/' + this.baraja.id).subscribe(
      data => console.log('success!', data),
      error => console.error('couldn\'t post because', error)
    );
    this.closeDialog();
  }
}
