import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public loading = false;
  public submitted = false;

  public get form() {
    return this.loginForm.controls;
  }

  public constructor(private http: HttpClient, private fb: FormBuilder) {}

  public ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  public onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    } else {
      this.loading = true;
      let _url = 'http://192.168.0.74:6886/token';
      let _params = new HttpParams({
        fromObject: {
          username: this.loginForm.value.username,
          password: this.loginForm.value.password,
          grant_type: 'password',
        },
      });
      this.http.post(_url, _params).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          setTimeout(() => {
            this.loading = false;
          }, 500);
          console.log('Tài khoản hoặc mật khẩu không đúng!');
        },
        () => {
          setTimeout(() => {
            this.loading = false;
          }, 500);
          console.log('Đăng nhập thành công!');
        }
      );
    }
  }
}
