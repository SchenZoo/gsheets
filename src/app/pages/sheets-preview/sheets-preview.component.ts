import { Component, OnInit } from '@angular/core'
import { GoogleSheetService } from 'src/app/services/google-sheet.service'
import { GoogleAuthService } from 'src/app/services/google-auth.service'

@Component({
  selector: 'app-sheets-preview',
  templateUrl: './sheets-preview.component.html',
  styleUrls: ['./sheets-preview.component.css'],
})
export class SheetsPreviewComponent implements OnInit {
  public googleSheets: any[]
  public displayedColumns: string[] = ['Title', 'ID', 'Link', 'Action']
  constructor(private sheetsService: GoogleSheetService) {
    this.sheetsService.sheetsObservable.subscribe(sheets => {
      this.googleSheets = sheets
    })
  }

  ngOnInit() {}

  navigate(link: string) {
    location.href = link
  }
}
