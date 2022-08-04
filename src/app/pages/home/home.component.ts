import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, expand, reduce } from 'rxjs/operators';
import { EMPTY, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public articleList: Article[] = [];
  public isLoading: boolean = false;
  public isArticleList: boolean = false;

  private _articleList: Article[] = [];
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
    this.isArticleList = false;
    let _url =
      'https://newsapi.org/v2/everything?domains=vnexpress.net&apiKey=8ce6b975213149d28540ddd6292ea73d';
    this._subscription = this.http
      .get(_url)
      .pipe(delay(1000))
      .subscribe(
        (res: any) => {
          for (let i = 0; i < res.articles.length; i++) {
            this._articleList.push(
              new Article(
                res.articles[i].author,
                res.articles[i].content,
                res.articles[i].description,
                res.articles[i].publishedAt,
                res.articles[i].title,
                res.articles[i].url,
                res.articles[i].urlToImage
              )
            );
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          this.articleList = this._articleList.splice(this._start, this._end);
          this.isLoading = false;
          this.isArticleList = true;
        }
      );
  }

  private getDataBlogger() {
    let _blogger = 'https://www.code.pro.vn';
    let _api = 'https://www.googleapis.com/blogger/v3/blogs/';
    let _key = 'AIzaSyB_oNm3jJm3m-eyPARIo--bTjRNTcVeZiU';
    let _request = 'byurl';
    let _param = `?url=${_blogger}`;
    let _operator = '&';
    let _page = '';
    let _url = _api + _request + _param + _operator + 'key=' + _key + _page;
    this.http.get(_url).subscribe((res: any) => {
      let _id = res.id;
      let _operator = '/posts?';
      let _url = _api + _id + _operator + 'key=' + _key;
      this.http
        .get(_url)
        .pipe(
          expand((data: any) =>
            data.nextPageToken
              ? this.http.get(_url + `&pageToken=${data.nextPageToken}`)
              : EMPTY
          ),
          reduce(
            (previous: any, current: any) => previous.concat(current.items),
            []
          )
        )
        .subscribe((res: any) => {
          console.log(res);
        });
    });
  }

  public onScroll() {
    this.isLoading = true;
    if (this._articleList.length == 0) {
      this.isLoading = false;
      return;
    }
    setTimeout(() => {
      if (this._paginate > this._articleList.length) {
        this.articleList.push(
          ...this._articleList.splice(this._start, this._articleList.length)
        );
        return;
      }
      this.articleList.push(
        ...this._articleList.splice(this._start, this._end)
      );
      this.isLoading = false;
    }, 2000);
  }
}

export class Article {
  public author!: string;
  public content!: string;
  public description!: string;
  public publishedAt!: Date;
  public title!: string;
  public url!: string;
  public urlToImage!: string;
  constructor(
    author: string,
    content: string,
    description: string,
    publishedAt: Date,
    title: string,
    url: string,
    urlToImage: string
  ) {
    this.author = author;
    this.content = content;
    this.description = description;
    this.publishedAt = publishedAt;
    this.title = title;
    this.url = url;
    this.urlToImage = urlToImage;
  }
}
