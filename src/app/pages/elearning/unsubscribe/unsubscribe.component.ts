import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, interval, Subject } from 'rxjs';
import { first, take, takeUntil } from 'rxjs/operators';

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

  private _subscription5: Observable<any>;
  public valueSubscription5!: number;

  private _subscription7 = new Subscription();
  public valueSubscription7!: number;

  private _notifier1 = new Subject();
  private _notifier2 = new Subject();

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

    this._subscription5 = interval(1000);
    this._subscription5
      .pipe(takeUntil(this._notifier1))
      .subscribe((value: number) => (this.valueSubscription5 = value));

    for (let i = 0; i < 100; i++) {
      let obsArr = [];
      obsArr[i] = interval(1000);
      obsArr[i].pipe(takeUntil(this._notifier2)).subscribe((value: number) => {
        console.log('Observable', i, '=>', value);
      });
      this._subscription7.add(
        interval(i).subscribe((value: number) => {
          console.log('Subscription', '=>', value);
        })
      );
    }
  }

  public onUnsubscribe1() {
    this._subscription1.unsubscribe();
  }

  public onUnsubscribe2() {}

  public onUnsubscribe3() {}

  public onUnsubscribe4() {}

  public onUnsubscribe5() {
    this._notifier1.next();
    this._notifier1.complete();
  }

  public onUnsubscribe6() {
    this._notifier2.next();
    this._notifier2.complete();
  }

  public onUnsubscribe7() {
    this._subscription7.unsubscribe();
  }
}
