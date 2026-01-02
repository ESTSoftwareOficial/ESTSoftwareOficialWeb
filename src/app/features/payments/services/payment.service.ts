import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Payment } from '../domain/payment.model';
import { PaymentIntent } from '../domain/payment.intent';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = `${environment.apiUrl}/payments`;

  constructor(private http: HttpClient) {}

  processPayment(paymentData: any): Observable<Payment> {
    return this.http.post<Payment>(`${this.apiUrl}/process`, paymentData);
  }

  createPaymentIntent(amount: number, courseId: string): Observable<PaymentIntent> {
    return this.http.post<PaymentIntent>(`${this.apiUrl}/create-intent`, { amount, courseId });
  }

  getPaymentHistory(): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.apiUrl}/history`);
  }

  getPaymentById(id: string): Observable<Payment> {
    return this.http.get<Payment>(`${this.apiUrl}/${id}`);
  }
}