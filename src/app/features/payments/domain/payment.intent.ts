export interface PaymentIntent {
  clientSecret: string;
  amount: number;
  currency: string;
}