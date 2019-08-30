import { Injectable, NgZone } from '@angular/core';
import { GoogleAuthService } from './google-auth.service';
import { BehaviorSubject } from 'rxjs';
declare const gapi: any;

@Injectable({
  providedIn: 'root',
})
export class GoogleSheetService {
  private _googleSheets: any[] = [];
  private _driveLoaded = false;
  private _sheetsSubject = new BehaviorSubject<Array<any>>([]);
  public sheetsObservable = this._sheetsSubject.asObservable();

  constructor(private auth: GoogleAuthService, private ngZone: NgZone) {
    this.auth.loggedInObservable.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.retrieveAllFiles();
      } else {
        this._sheetsSubject.next([]);
      }
    });
    this.sheetsObservable.subscribe(sheets => {
      this._googleSheets = sheets;
    });
  }

  get googleSheets() {
    return this._googleSheets;
  }

  private retrieveAllFiles() {
    if (this._driveLoaded) {
      const initialRequest = gapi.client.drive.files.list();
      this._googleSheets = [];
      this.retrievePageOfFiles(initialRequest);
    } else {
      this._driveLoaded = true;
      gapi.client.load('drive', 'v2', () => {
        this.retrieveAllFiles();
      });
    }
  }

  private retrievePageOfFiles(request) {
    request.execute(resp => {
      this.ngZone.run(() => {
        this._sheetsSubject.next([...this._googleSheets, ...resp.items]);
      });
      const nextPageToken = resp.nextPageToken;
      if (nextPageToken) {
        request = gapi.auth2.drive.files.list({
          pageToken: nextPageToken,
        });
        this.retrievePageOfFiles(request);
      }
    });
  }
}
