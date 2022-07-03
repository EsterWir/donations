
import { Observable } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import { UohErrorHandlerService } from '@haifauniversity/ngx-tools';

/**
 * Displays error messages stored in the errorHandler service.
 */
@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnInit {
  @Input() select: string | null = null;
  message$: Observable<string> = new Observable();

  constructor(private errorHandler: UohErrorHandlerService) {}

  ngOnInit(): void {
    /**
     * Select the message acording to the error label.
     * Only errors corresponding to the given label will be displayed in this instance of the component.
     */
    this.message$ = this.errorHandler.select(this.select);
  }
}
