import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';
import { first, take } from 'rxjs/operators';

@Component({
  selector: 'app-unsubscribe',
  templateUrl: './unsubscribe.component.html',
  styleUrls: ['./unsubscribe.component.scss'],
})
export class UnsubscribeComponent implements OnInit {
  private _subscription1: Subscription;
  public valueSubscription1!: number;

  public subscription2: Observable<any>;

  private _subscription3: Subscription;
  public valueSubscription3!: number;

  private _subscription4: Observable<any>;
  public valueSubscription4!: number;

  constructor() {}

  ngOnInit(): void {
    this._subscription1 = interval(1000).subscribe((value: number) => {
      this.valueSubscription1 = value;
    });

    this.subscription2 = interval(1000);

    this._subscription3 = interval(1000)
      .pipe(take(10))
      .subscribe((value: number) => {
        this.valueSubscription3 = value;
      });

    this._subscription4 = interval(1000);
    this._subscription4
      .pipe(first((val) => val == 10))
      .subscribe((value: number) => {
        this.valueSubscription4 = value;
      });
  }

  public onUnsubscribe1() {
    this._subscription1.unsubscribe();
  }

  public onUnsubscribe2() {}

  public onUnsubscribe3() {}

  public onUnsubscribe4() {}
}
