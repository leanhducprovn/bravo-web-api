import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  public listProduct!: any;
  public check = true;
  public perPage = 10;
  public previous = 1;
  public next = 1;
  public page = 1;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    if (!localStorage.getItem('logged')) {
      this.router.navigate(['/login']);
    }
    this.route.queryParams.subscribe((params) => {
      this.page = params['page'] ? params['page'] : 1;
      this.previous = this.page - 1;
      this.next = this.page - -1;
      this.check = this.page == 1 ? true : false;
    });
  }

  ngOnInit(): void {
    this.http.get('./assets/data/product.json').subscribe(
      (response) => {
        this.listProduct = response;
      },
      (error) => {},
      () => {}
    );
  }
}
