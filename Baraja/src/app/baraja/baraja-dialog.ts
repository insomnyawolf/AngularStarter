import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { Baraja } from './baraja';
import { ApiService } from '../shared/api/api.service';
import { DeletePopupComponent } from '../delete-popup/delete-popup.component';
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
              private ApiService: ApiService,
              public dialog: MatDialog,) {}

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

  addBaraja(form: NgForm) {
    const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
    this.ApiService.apiPost(this.endpoint, form, headers).subscribe(
      data => console.log('success!', data),
      error => console.error('couldn\'t post because', error)
    );
    this.closeDialog();
  }

  editBaraja(form: NgForm) {
    const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
    this.ApiService.apiPut(this.endpoint, form, this.baraja.id, headers).subscribe(
      data => console.log('success!', data),
      error => console.error('couldn\'t post because', error)
    );
    this.closeDialog();
  }

  deleteBaraja() {
    const dialogRef = this.dialog.open(DeletePopupComponent, {
      width: '90%',
      height: '90%',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ngOnInit();
    });/*
    const endpoint = '/baraja';
    this.ApiService.apiDelete(endpoint, this.baraja.id).subscribe(
      data => console.log('success!', data),
      error => console.error('couldn\'t post because', error)
    );
    this.closeDialog();
    */
  }
}
