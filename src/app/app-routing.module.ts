import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth/auth-guard.service';

const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', redirectTo: 'events', pathMatch: 'full' },
            {
                path: 'login',
                loadChildren: () => import('./containers/auth/auth.module').then(module => module.AuthModule)
            },
            {
                path: 'events',
                loadChildren: () => import('./containers/events/events.module').then(module => module.EventsModule),
                canActivate: [AuthGuard],
                canActivateChild: [AuthGuard]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
