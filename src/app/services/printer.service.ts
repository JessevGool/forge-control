import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Printer } from '../models/dto/printer';
import { ResponseMessage } from '../models/dto/responseMessage';

@Injectable({
  providedIn: 'root',
})
export class PrinterService {
  private httpClient = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/api';

  constructor() {
    console.log('PrinterService initialized');
  }

  //TODO create metadata call to get all info
  public getBedTemperature(id: string): Observable<ResponseMessage<number>> {
    return this.httpClient.get<ResponseMessage<number>>(
      `${this.baseUrl}/printer/${id}/bed-temperature`
    );
  }

  public getPrinters(): Observable<Printer[]> {
    return this.httpClient.get<Printer[]>(`${this.baseUrl}/printers`);
  }

  public getCameraFeed(id: string, isFullSize: boolean): Observable<Blob> {
    let url = isFullSize ? `${this.baseUrl}/printer-camera/${id}/camera-frame` : `${this.baseUrl}/printer-camera/${id}/camera-frame-resized`;
    return this.httpClient.get(url, { responseType: 'blob' });
  }
}
