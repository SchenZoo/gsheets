import { Component, OnInit } from '@angular/core';
import { GoogleSheetService } from 'src/app/services/google-sheet.service';
import { ApiSheetService } from 'src/app/services/api-sheet.service';

@Component({
  selector: 'app-sheets-preview',
  templateUrl: './sheets-preview.component.html',
  styleUrls: ['./sheets-preview.component.css'],
})
export class SheetsPreviewComponent implements OnInit {
  public googleSheets: any[];
  public displayedColumns: string[] = ['Title', 'ID', 'Link', 'Action'];
  public isLoading = true;
  constructor(
    private sheetsService: GoogleSheetService,
    private apiSheetService: ApiSheetService
  ) {
    this.sheetsService.sheetsObservable.subscribe(sheets => {
      this.isLoading = false;
      this.googleSheets = sheets.filter(
        sheet => sheet.mimeType === 'application/vnd.google-apps.spreadsheet'
      );
    });
  }

  ngOnInit() {}

  navigate(link: string) {
    window.open(link, '_blank');
  }

  concatSheet(spreadsheetId: string) {
    this.isLoading = true;
    this.apiSheetService.concatSheetData(spreadsheetId).subscribe(
      res => {
        this.isLoading = false;
        alert('Spreadsheet is updated');
      },
      err => {
        this.isLoading = false;
        alert('There was an error with the request!');
      }
    );
  }
}
