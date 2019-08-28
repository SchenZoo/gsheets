import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { LoginComponent } from './pages/login/login.component'
import { SheetsPreviewComponent } from './pages/sheets-preview/sheets-preview.component'
import { LoggedInGuard } from './guards/logged-in.guard'

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'sheets',
    component: SheetsPreviewComponent,
    canActivate: [LoggedInGuard],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
