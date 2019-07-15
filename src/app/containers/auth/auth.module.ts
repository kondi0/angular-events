import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { LoginContainerComponent } from './login-container/login-container.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';

export const routes: Routes = <Routes>[{ path: '', component: LoginContainerComponent, pathMatch: 'full' }];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        TranslateModule,
        ReactiveFormsModule,
        MatCardModule,
        MatListModule,
        MatIconModule
    ],
    declarations: [LoginContainerComponent]
})
export class AuthModule {}
