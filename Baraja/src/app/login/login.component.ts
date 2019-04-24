import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ApiService } from '../shared/api/api.service';
import {
  FormGroup,
  FormBuilder } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { format } from 'util';
import { Key } from 'protractor';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private apiService: ApiService) {
  }

  hide = true;
  name = '';
  password = '';

  formGroup: FormGroup;
  endpoint = '/login';

  ngOnInit() {
  }

  tryLogin(form: NgForm) {
    console.log(form);
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'});
    let inp = '';
    inp = this.format(inp, 'username', this.name);
    inp = this.format(inp, 'password', this.password);
    console.log(inp);
    this.apiService.apiPostLogin(this.endpoint, inp, headers).subscribe(
      data => console.log('success!', data),
      error => console.error('couldn\'t post because', error)
    );
  }

  format(str: string, key: string, value: string): string {
    let sym = String('&');
    if (str === '') {
        sym = '';
    }
    return `${str}${sym}${key}=${value}`;
  }

}
