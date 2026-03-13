import { Component } from '@angular/core';
import { Printer } from '../../models/printer';
import { PrinterCardComponent } from '../../components/printer-card/printer-card.component';

@Component({
  selector: 'app-dashboard',
  imports: [PrinterCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {


  printers: Printer[] = [
    {
      hostname: 'printer1.local',
      accessCode: '1234',
      serial: 'ABC123'
    },
    {
      hostname: 'printer2.local',
      accessCode: '5678',
      serial: 'DEF456'
    }
  ]
}
