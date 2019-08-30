import { environment } from 'src/environments/environment';

export const API_ROUTES = {
  SHEET_CONCAT: (spreadshitId: string) =>
    `${environment.API_ENDPOINT}/spreadsheet/${spreadshitId}/sheet_concat`,
};
