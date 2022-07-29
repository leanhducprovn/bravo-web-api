import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { URLSearchParams } from 'url';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    let body = new URLSearchParams();
    body.set('username', 'WEBAPI');
    body.set('password', 'Bravo12345@');
    body.set('grant_type', 'password');
    let headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    let option = { headers: headers };
    this.http
      .post('http://192.168.0.74:6886/token', body, option)
      .subscribe((res: any) => {
        console.log(res);
      });
  }
}
