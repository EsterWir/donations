
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-failed',
  templateUrl: './failed.component.html',
  styleUrls: ['./failed.component.scss'],
})
export class FailedComponent {
  @Input() message: string | null = null;
  @Input() subMessage: string | null = null;

  constructor() {}
}
