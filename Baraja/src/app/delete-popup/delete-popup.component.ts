import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ApiService } from '../shared/api/api.service';

@Component({
  selector: 'app-delete-popup',
  templateUrl: './delete-popup.component.html',
  styleUrls: ['./delete-popup.component.scss']
})
export class DeletePopupComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DeletePopupComponent>,
              private apiService: ApiService,
              @Inject(MAT_DIALOG_DATA) public id: number) { }


  ngOnInit() {
    this.dialogRef.disableClose = true;
    id: this.id;
  }

  confirm(){
    const endpoint = '/baraja';
    this.apiService.apiDelete(endpoint, this.id).subscribe(
      data => console.log('success!', data),
      error => console.error('couldn\'t post because', error)
    );
    this.cancel();
  }

  cancel(){
    this.dialogRef.close(null);
  }

}
