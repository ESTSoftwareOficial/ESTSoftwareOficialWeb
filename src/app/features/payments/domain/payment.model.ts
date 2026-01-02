export interface Payment {
  id?: string;
  userId: string;
  courseId: string;
  courseName: string;
  amount: number;
  originalAmount?: number;
  paymentMethod: 'card' | 'paypal' | 'mercadopago';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  createdAt: Date;
  updatedAt?: Date;
  transactionId?: string;
}