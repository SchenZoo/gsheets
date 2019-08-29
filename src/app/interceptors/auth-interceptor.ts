import { Injectable } from '@angular/core'
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http'
import { GoogleAuthService } from '../services/google-auth.service'
import { switchMap } from 'rxjs/operators'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: GoogleAuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.auth.userObservable.pipe(
      switchMap(user => {
        if (user) {
          const authReq = req.clone({ setHeaders: { Authorization: user.authToken } })
          return next.handle(authReq)
        }
        return next.handle(req)
      })
    )
  }
}
