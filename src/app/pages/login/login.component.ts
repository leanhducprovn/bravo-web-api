import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { delay, timeout, debounceTime } from 'rxjs/operators';
import { timer } from 'rxjs/internal/observable/timer';
import { Subscription } from 'rxjs/internal/Subscription';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  public loading = false;
  public submitted = false;
  public counter = 4;
  private _countDown: Subscription;
  private _returnUrl: string;
  private _login: Subscription;

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

  public ngOnDestroy(): void {
    this._countDown?.unsubscribe();
  }

  public onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    } else {
      this.loading = true;
      this._countDown = timer(0, 1000).subscribe(() => --this.counter);
      let _url = 'http://192.168.0.74:6886/token';
      let _params = new HttpParams({
        fromObject: {
          username: this.loginForm.value.username,
          password: this.loginForm.value.password,
          grant_type: 'password',
        },
      });
      setTimeout(() => {
        this.http
          .post(_url, _params)
          // .pipe(delay(3000))
          .subscribe(
            (response) => {
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
      }, 3000);
    }
  }

  public onCancel() {
    this.loading = false;
  }
}
