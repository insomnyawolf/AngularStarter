import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ApiService } from '../shared/api/api.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { Baraja } from './baraja';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-baraja-dialog',
  templateUrl: './baraja-dialog.html',
  styleUrls: ['./baraja.dialog.scss']
})

export class BarajaDialogComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<BarajaDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public baraja: Baraja,
              private fbuilder: FormBuilder,
              private apiService: ApiService) {}

  formGroup: FormGroup;


  ngOnInit(): void {
    this.formGroup = this.fbuilder.group({
      id: this.baraja.id,
      nombre: new FormControl(null),
      cantidadCartas: new FormControl(null),
      marca: new FormControl(null),
    });
  }

  closeDialog() {
    this.closeDialog();
  }

  addBaraja(form: NgForm) {
    const endpoint = '/addBaraja';
    const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
    this.apiService.apiPost(endpoint, form, headers).subscribe(
      data => console.log('success!', data),
      error => console.error('couldn\'t post because', error)
    );
    this.closeDialog();
  }

  editBaraja(form: NgForm) {
    const endpoint = '/editBaraja';
    const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
    this.apiService.apiPut(endpoint, form, this.baraja.id, headers).subscribe(
      data => console.log('success!', data),
      error => console.error('couldn\'t post because', error)
    );
    this.closeDialog();
  }

  deleteBaraja() {
    const endpoint = '/deleteBaraja';
    this.apiService.apiDelete(endpoint, this.baraja.id).subscribe(
      data => console.log('success!', data),
      error => console.error('couldn\'t post because', error)
    );
    this.closeDialog();
  }
}
