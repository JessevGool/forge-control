import { Component, input } from '@angular/core';
import { Printer } from '../../models/dto/printer';
import { RouterLink } from "@angular/router";
import { CameraFeedComponent } from "../camera-feed/camera-feed.component";

@Component({
  selector: 'app-printer-card',
  imports: [RouterLink, CameraFeedComponent],
  templateUrl: './printer-card.component.html',
  styleUrl: './printer-card.component.css',
})
export class PrinterCardComponent {
  printer = input.required<Printer>();
  
}
