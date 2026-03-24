import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrinterService } from '../../services/printer.service';

@Component({
  selector: 'app-printer',
  imports: [],
  templateUrl: './printer.component.html',
  styleUrl: './printer.component.css',
})
export class PrinterComponent {
  private activatedRoute = inject(ActivatedRoute);
  private printerService = inject(PrinterService);
  protected bedTemperature: string | null = null;
  
  
  constructor() {
    console.log(this.activatedRoute);
    const printerId = this.activatedRoute.snapshot.paramMap.get('id');
    if (printerId) {
      this.printerService.getBedTemperature(printerId).subscribe((response) => {
        this.bedTemperature = response.message.toFixed(2);
      });
    } else {
      console.error('No printer ID found in route parameters');
    }
  }
}
