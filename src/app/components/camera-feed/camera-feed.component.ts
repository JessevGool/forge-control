import { Component, EffectRef, Injector, OnDestroy, OnInit, effect, inject, input } from '@angular/core';
import { PrinterService } from '../../services/printer.service';
import { Subscription, switchMap, timer } from 'rxjs';

@Component({
  selector: 'app-camera-feed',
  imports: [],
  templateUrl: './camera-feed.component.html',
  styleUrl: './camera-feed.component.css',
})
export class CameraFeedComponent implements OnInit, OnDestroy {
  private printerService = inject(PrinterService);
  private injector = inject(Injector);
  private feedEffect: EffectRef | null = null;
  private pollingSubscription: Subscription | null = null;
  private activeObjectUrl: string | null = null;

  printerId = input.required<string>();
  isFullSize = input(false, { transform: isFullSizeTransform });
  imageUrl: string | null = null;
  isLoading = true;
  errorMessage = '';

  ngOnInit(): void {
    this.feedEffect = effect(
      () => {
        const printerId = this.printerId();
        const isFullSize = this.isFullSize();
        this.startPolling(printerId, isFullSize);
      },
      { injector: this.injector },
    );
  }

  ngOnDestroy(): void {
    this.feedEffect?.destroy();
    this.stopPolling();
    this.clearObjectUrl();
  }

  private startPolling(printerId: string, isFullSize: boolean): void {
    this.stopPolling();
    this.errorMessage = '';
    this.isLoading = true;

    this.pollingSubscription = timer(0, 1000)
      .pipe(switchMap(() => this.printerService.getCameraFeed(printerId, isFullSize)))
      .subscribe({
        next: (blob) => {
          const nextUrl = URL.createObjectURL(blob);
          this.replaceObjectUrl(nextUrl);
          this.isLoading = false;
          this.errorMessage = '';
        },
        error: () => {
          this.isLoading = false;
          this.errorMessage = 'Unable to load camera feed.';
        },
      });
  }

  private stopPolling(): void {
    this.pollingSubscription?.unsubscribe();
    this.pollingSubscription = null;
  }

  private replaceObjectUrl(nextUrl: string): void {
    this.clearObjectUrl();
    this.activeObjectUrl = nextUrl;
    this.imageUrl = nextUrl;
  }

  private clearObjectUrl(): void {
    if (!this.activeObjectUrl) {
      return;
    }

    URL.revokeObjectURL(this.activeObjectUrl);
    this.activeObjectUrl = null;
  }

}

function isFullSizeTransform(value: boolean): boolean {
  return value === true;
}