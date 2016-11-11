import {NgModule} from '@angular/core'
import {RouterModule} from "@angular/router";
import {rootRouterConfig} from "./app.routes";
import {AppComponent} from "./app";
import {Github} from "./github/shared/github";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";
import {About} from './about/about';
import {Home} from './home/home';
import {RepoBrowser} from './github/repo-browser/repo-browser';
import {RepoList} from './github/repo-list/repo-list';
import {RepoDetail} from './github/repo-detail/repo-detail';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {provideAuth} from 'angular2-jwt';
import {Users} from './users/users';
import {Login} from './login/login';
import {Auth, AuthGuard} from './services/Auth.service';

@NgModule({
  declarations: [AppComponent, About, RepoBrowser, RepoList, RepoDetail, Home, Users, Login],
  imports: [BrowserModule, FormsModule, HttpModule, RouterModule.forRoot(rootRouterConfig)],
  providers: [Github, { provide: LocationStrategy, useClass: HashLocationStrategy }, provideAuth({
    headerName: 'Authorization',
    headerPrefix: '',
    tokenName: 'jwt',
    tokenGetter: (() => localStorage.getItem('jwt')),
    globalHeaders: [{ 'Content-Type': 'application/json' }],
    // noJwtError: true,
    noTokenScheme: true
  }), Auth,
    AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}