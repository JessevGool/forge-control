import { Component, input } from '@angular/core';
import { Printer } from '../../models/printer';

@Component({
  selector: 'app-printer-card',
  imports: [],
  templateUrl: './printer-card.component.html',
  styleUrl: './printer-card.component.css',
})
export class PrinterCardComponent {
  printer = input.required<Printer>();
  
}
