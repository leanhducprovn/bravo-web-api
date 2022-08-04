import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-dog',
  templateUrl: './dog.component.html',
  styleUrls: ['./dog.component.scss'],
})
export class DogComponent implements OnInit, OnDestroy {
  public dogs: Dog[] = [];
  public isLoading: boolean = false;
  public isDogList: boolean = false;
  private _dogs: Dog[] = [];
  private _paginate: number = 8;
  private _start: number = 0;
  private _end: number = this._paginate;

  private _subscription!: Subscription;

  constructor(private http: HttpClient) {}

  public ngOnInit(): void {
    this.getData();
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  private getData() {
    this.isLoading = true;
    this.isDogList = false;
    let _api = 'https://shibe.online/api/shibes';
    let _count = 100;
    let _urls = true;
    let _httpsUrls = true;
    let _params = `?count=${_count}&urls=${_urls}&httpsUrls=${_httpsUrls}`;
    let _url = _api + _params;
    this._subscription = this.http.get(_url).subscribe(
      (res: any) => {
        for (let i = 0; i < res.length; i++) {
          this._dogs.push(new Dog(res[i]));
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        this.dogs = this._dogs.splice(this._start, this._end);
        this.isLoading = false;
        this.isDogList = true;
      }
    );
  }

  public onScroll() {
    this.isLoading = true;
    if (this._dogs.length == 0) {
      this.isLoading = false;
      return;
    }
    setTimeout(() => {
      if (this._paginate > this._dogs.length) {
        this.dogs.push(...this._dogs.splice(this._start, this._dogs.length));
        return;
      }
      this.dogs.push(...this._dogs.splice(this._start, this._end));
      this.isLoading = false;
    }, 2000);
  }
}

export class Dog {
  public url: string;
  constructor(url: string) {
    this.url = url;
  }
}
