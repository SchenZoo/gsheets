import { Component, OnInit } from '@angular/core'
import { GoogleAuthService } from 'src/app/services/google-auth.service'
import { Router } from '@angular/router'
import { User } from 'src/app/models/user'

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  public loggedIn: boolean = null
  public user: User = null

  constructor(private googleAuthService: GoogleAuthService, private router: Router) {
    this.googleAuthService.loggedInObservable.subscribe(
      logStatus => (this.loggedIn = logStatus)
    )
    this.googleAuthService.userObservable.subscribe(user => {
      console.log(user)
      this.user = user
    })
  }

  ngOnInit() {}

  signOut(): void {
    this.googleAuthService.signOut()
    this.router.navigate(['/login'])
  }
}
