import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public isLogin!: boolean;

  constructor(private noti: NotifierService, private router: Router) {}

  public ngOnInit(): void {
    if (localStorage.getItem('logged')) {
      this.isLogin = true;
    }
  }

  public onExecute() {
    if (localStorage.getItem('logged')) {
      this.router.navigate(['/execute']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  public onLogin() {
    this.router.navigate(['/login']);
  }

  public onLogout() {
    this.noti.notify('warning', 'Đăng xuất thành công!');
    localStorage.removeItem('logged');
    this.isLogin = false;
  }
}
