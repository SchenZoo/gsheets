import { Injectable } from '@angular/core'
import { BehaviorSubject, ReplaySubject } from 'rxjs'
import { environment } from 'src/environments/environment'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root',
})
export class GoogleAuthService {
  googleAuth: gapi.auth2.GoogleAuth
  private userSubject = new ReplaySubject<null | gapi.auth2.BasicProfile>(1)
  public userObservable = this.userSubject.asObservable()
  private loggedInSubject = new ReplaySubject<boolean>(1)
  public loggedInObservable = this.loggedInSubject.asObservable()
  private CLIENT_ID: string
  private API_KEY: string
  private SCOPES: string

  constructor() {
    this.CLIENT_ID = environment.GOOGLE_AUTH_ID
    this.API_KEY = environment.GOOGLE_API_KEY
    this.SCOPES =
      'https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/spreadsheets.readonly'
  }

  public initClient() {
    return new Promise((resolve, reject) => {
      gapi.load('client:auth2', () => {
        return gapi.client
          .init({
            apiKey: this.API_KEY,
            clientId: this.CLIENT_ID,
            scope: this.SCOPES,
          })
          .then(() => {
            this.googleAuth = gapi.auth2.getAuthInstance()
            this.loggedInSubject.next(this.isSignedIn)
            if (this.isSignedIn) {
              this.userSubject.next(this.googleAuth.currentUser.get().getBasicProfile())
            } else {
            }
            resolve()
          })
      })
    })
  }

  get isSignedIn(): boolean {
    return this.googleAuth.isSignedIn.get()
  }

  signIn() {
    return this.googleAuth.signIn().then((googleUser: gapi.auth2.GoogleUser) => {
      this.loggedInSubject.next(true)
      this.userSubject.next(googleUser.getBasicProfile())
    })
  }

  signOut(): void {
    this.loggedInSubject.next(false)
    this.userSubject.next(null)
    this.googleAuth.signOut()
  }
}
