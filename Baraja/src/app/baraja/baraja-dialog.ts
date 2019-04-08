import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { Baraja } from './baraja';
import { ApiService } from '../shared/api/api.service';

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

  endpoint = '/baraja';

  ngOnInit(): void {
    this.dialogRef.disableClose = true;
    this.formGroup = this.fbuilder.group({
      id: this.baraja.id,
    });
  }

  closeDialog() {
    this.dialogRef.close(null);
  }

  addBaraja() {
    const formObj = this.formGroup.getRawValue();
    const serializedForm = JSON.stringify(formObj);
    console.log(serializedForm);
    const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
    this.apiService.apiPost(this.endpoint, serializedForm, headers).subscribe(
      data => console.log('success!', data),
      error => console.error('couldn\'t post because', error)
    );
    this.closeDialog();
  }

  editBaraja() {
    const formObj = this.formGroup.getRawValue();
    const serializedForm = JSON.stringify(formObj);
    console.log(serializedForm);
    const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
    this.apiService.apiPut(this.endpoint, serializedForm, this.baraja.id, headers).subscribe(
      data => console.log('success!', data),
      error => console.error('couldn\'t post because', error)
    );
    this.closeDialog();
  }

  deleteBaraja() {
    this.apiService.apiDelete(this.endpoint, this.baraja.id).subscribe(
      data => console.log('success!', data),
      error => console.error('couldn\'t post because', error)
    );
    this.closeDialog();
  }
}
