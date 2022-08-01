import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-execute',
  templateUrl: './execute.component.html',
  styleUrls: ['./execute.component.scss'],
})
export class ExecuteComponent implements OnInit {
  public searchForm: FormGroup;
  public loading = false;
  public submitted = false;
  public jsonData!: object;

  public get form() {
    return this.searchForm.controls;
  }

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private noti: NotifierService
  ) {
    if (!localStorage.getItem('logged')) {
      this.router.navigate(['/login']);
    }
  }

  public ngOnInit(): void {
    this.searchForm = this.fb.group({
      Type: ['', Validators.required],
      SurveyCampaignId: ['', Validators.required],
    });
  }

  public onClean() {
    this.noti.notify('success', 'Xóa thành công!');
    this.searchForm.reset();
    this.jsonData = null;
  }

  public onSearch() {
    this.submitted = true;
    if (this.searchForm.invalid) {
      return;
    } else {
      this.loading = true;
      let _url = 'http://192.168.0.74:6886/token';
      let _params = new HttpParams({
        fromObject: {
          username: 'WEBAPI',
          password: 'Bravo12345@',
          grant_type: 'password',
        },
      });
      setTimeout(() => {
        this.http.post(_url, _params).subscribe(
          (response: any) => {
            let _urlExecute =
              'http://192.168.0.74:6886/api/bravowebapi/execute';
            let _paramsExecute = {
              Type: this.searchForm.value.Type,
              SurveyCampaignId: this.searchForm.value.SurveyCampaignId,
            };
            let _headerExecute = new HttpHeaders({
              'Content-Type': 'application/json',
              Authorization: `Bearer ${response.access_token}`,
            });
            let _isData!: boolean;
            this.http
              .post(_urlExecute, _paramsExecute, { headers: _headerExecute })
              .subscribe(
                (response: any) => {
                  if (response[0].Message != '') {
                    _isData = false;
                    this.jsonData = null;
                  } else {
                    _isData = true;
                    this.jsonData = response[0].JsonData;
                  }
                },
                (error) => {},
                () => {
                  if (_isData) {
                    this.noti.notify('success', 'Tìm kiếm thành công!');
                  } else {
                    this.noti.notify('error', 'Không có dữ liệu!');
                  }
                }
              );
          },
          (error) => {
            this.loading = false;
          },
          () => {
            this.loading = false;
          }
        );
      }, 500);
    }
  }
}
