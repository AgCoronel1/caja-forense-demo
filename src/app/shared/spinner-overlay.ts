import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgIf } from '@angular/common';
import { SpinnerService } from '../_core/services/spinner.service';


@Component({
  selector: 'app-spinner-overlay',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, NgIf],
  template: `
    <div class="spinner-overlay" *ngIf="spinner.loading$ | async">
      <mat-progress-spinner
        diameter="80"
        mode="indeterminate"
        color="primary">
      </mat-progress-spinner>
    </div>
  `,
  styles: [`
    .spinner-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(255, 255, 255, 0.75);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(2px);
    }
  `]
})
export class SpinnerOverlayComponent {
  constructor(public spinner: SpinnerService) {}
}
