import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { API_ROUTES } from '../constants/api-routes'

@Injectable({
  providedIn: 'root',
})
export class ApiSheetService {
  constructor(private http: HttpClient) {}

  concatSheetData(spreadsheetId: string) {
    return this.http.post(API_ROUTES.SHEET_CONCAT(spreadsheetId), {})
  }
}
