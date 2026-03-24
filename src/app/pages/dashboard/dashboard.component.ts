import { Component, inject } from '@angular/core';
import { Printer } from '../../models/dto/printer';
import { PrinterCardComponent } from '../../components/printer-card/printer-card.component';
import { PrinterService } from '../../services/printer.service';

@Component({
  selector: 'app-dashboard',
  imports: [PrinterCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
   private printerService = inject(PrinterService);

    protected printers: Printer[] = [];

   constructor() {
    this.printerService.getPrinters().subscribe((response) => {
      this.printers = response;
    }
    );
   }
}
