import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GoogleAuthService } from './services/google-auth.service';
import { LoginComponent } from './pages/login/login.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { GoogleSheetService } from './services/google-sheet.service';
import { SheetsPreviewComponent } from './pages/sheets-preview/sheets-preview.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { httpInterceptorProviders } from './interceptors';
import { HttpClientModule } from '@angular/common/http';

export function initGapi(gapiSession: GoogleAuthService) {
  return () => gapiSession.initClient();
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavigationComponent,
    SheetsPreviewComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initGapi,
      deps: [GoogleAuthService],
      multi: true,
    },
    GoogleSheetService,
    httpInterceptorProviders,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
