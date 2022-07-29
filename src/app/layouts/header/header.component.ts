import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public isToken!: boolean;

  constructor(private noti: NotifierService, private router: Router) {}

  public ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.isToken = true;
    }
  }

  public login() {
    this.router.navigate(['/login']);
  }

  public logout() {
    this.noti.notify('warning', 'Đăng xuất thành công!');
    localStorage.removeItem('token');
    this.isToken = false;
  }
}
