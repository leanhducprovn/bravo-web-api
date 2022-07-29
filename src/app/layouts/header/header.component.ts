import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public isToken!: boolean;

  constructor(private noti: NotifierService) {}

  public ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.isToken = true;
    }
  }

  public logout() {
    this.noti.notify('warning', 'Đăng xuất thành công!');
    localStorage.removeItem('token');
    this.isToken = false;
  }
}
