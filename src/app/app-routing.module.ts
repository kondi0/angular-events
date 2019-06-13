import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './services/auth/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', redirectTo: 'events', pathMatch: 'full'},
      {
        path: 'login',
        loadChildren: 'app/containers/auth/auth.module#AuthModule'
      },
      {
        path: 'events',
        loadChildren: 'app/containers/events/events.module#EventsModule',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {
}
