import { Component, OnInit, OnDestroy } from '@angular/core';
import { GoogleAuthService } from '../../services/google-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public loggedIn;
  constructor(private googleAuthService: GoogleAuthService, private router: Router) {
    this.googleAuthService.loggedInObservable.subscribe(
      logStatus => (this.loggedIn = logStatus)
    );
  }

  signInWithGoogle(): void {
    this.googleAuthService.signIn().then(_ => {
      this.router.navigate(['sheets']);
    });
  }

  signOut(): void {
    this.googleAuthService.signOut();
  }
}
