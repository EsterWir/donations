import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-amount-info-dialog',
  templateUrl: './amount-info-dialog.component.html',
  styleUrls: ['./amount-info-dialog.component.scss']
})
export class AmountInfoDialogComponent {
  link: string = 'https://www.boi.org.il/he/Markets/ExchangeRates/Pages/Default.aspx';

  constructor(private dialogRef: MatDialogRef<AmountInfoDialogComponent>) {}

  close(): void {
    this.dialogRef.close();
  }
}
