import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public loading = false;
  public submitted = false;
  private _returnUrl: string;

  public get form() {
    return this.loginForm.controls;
  }

  public constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private noti: NotifierService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    if (localStorage.getItem('logged')) {
      this.router.navigate(['/']);
    }
  }

  public ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this._returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
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
      setTimeout(() => {
        this.http.post(_url, _params).subscribe(
          (response: any) => {
            localStorage.setItem('logged', JSON.stringify(true));
          },
          (error) => {
            this.loading = false;
            this.noti.notify('error', 'Tài khoản hoặc mật khẩu không đúng!');
          },
          () => {
            this.loading = false;
            this.noti.notify('success', 'Đăng nhập thành công!');
            this.router.navigate([this._returnUrl]);
          }
        );
      }, 500);
    }
  }
}
