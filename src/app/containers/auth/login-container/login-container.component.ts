import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
    selector: 'login-container',
    templateUrl: './login-container.component.html',
    styleUrls: ['./login-container.component.scss']
})
export class LoginContainerComponent implements OnInit {
    constructor(private authService: AuthService) {}

    ngOnInit() {
        this.authService.signInWithGoogle();
    }
}
