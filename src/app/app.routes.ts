import {Routes} from '@angular/router';
import {About} from './about/about';
import {Home} from './home/home';
import {RepoBrowser} from './github/repo-browser/repo-browser';
import {RepoList} from './github/repo-list/repo-list';
import {RepoDetail} from './github/repo-detail/repo-detail';
import {Users} from './users/users'
import {Login} from './login/login';
import {AuthGuard} from './services/Auth.service';

export const rootRouterConfig: Routes = [
  // comment faire pour rediriger sur login quand le token  existe pas ou est ko ?
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', component: Home, canActivate: [AuthGuard] },
  { path: 'about', component: About },
  // FIXME : delete this, here this for example with sub route
  {
    path: 'github', component: RepoBrowser,
    children: [
      { path: '', component: RepoList },
      {
        path: ':org', component: RepoList,
        children: [
          { path: '', component: RepoDetail },
          { path: ':repo', component: RepoDetail }
        ]
      }]
  },
  { path: 'users', component: Users, canActivate: [AuthGuard] },
  { path: 'login', component: Login }
];
