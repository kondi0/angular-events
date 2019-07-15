import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Subject } from 'rxjs';
import { User } from '../../models/auth/user.interface';
import { environment } from '../../../environments/environment';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class AuthService {
    public user: Subject<User> = new Subject<User>();

    constructor(private firebaseAuth: AngularFireAuth, private router: Router, private zone: NgZone) {}

    signInWithGoogle() {
        this.firebaseAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((response: any) => {
            const userInfo: User = {
                userName: response.additionalUserInfo.profile.name
            };
            localStorage.setItem(environment.userInfo, JSON.stringify(userInfo));
            this.user.next(userInfo);
            this.zone.run(() => {
                this.router.navigateByUrl('/events');
            });
        });
    }

    logout() {
        this.firebaseAuth.auth.signOut().then(() => {
            localStorage.removeItem(environment.userInfo);
            this.user.next(null);
            this.router.navigate(['/login']);
        });
    }
}
