import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NotifierModule } from 'angular-notifier';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './layouts/header/header.component';
import { BodyComponent } from './layouts/body/body.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { ExecuteComponent } from './pages/bravowebapi/execute/execute.component';
import { BackToTopComponent } from './utilities/back-to-top/back-to-top.component';
import { ProductComponent } from './pages/bravowebapi/product/product.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ElearningComponent } from './pages/elearning/elearning.component';
import { UnsubscribeComponent } from './pages/elearning/unsubscribe/unsubscribe.component';
import { ElearningMainComponent } from './pages/elearning/elearning-main/elearning-main.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    MainComponent,
    ExecuteComponent,
    BackToTopComponent,
    ProductComponent,
    PageNotFoundComponent,
    ElearningComponent,
    UnsubscribeComponent,
    ElearningMainComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NotifierModule.withConfig({
      position: {
        horizontal: {
          position: 'left',
        },
        vertical: {
          position: 'bottom',
        },
      },
    }),
    InfiniteScrollModule,
  ],
  providers: [Title],
  bootstrap: [AppComponent],
})
export class AppModule {}
