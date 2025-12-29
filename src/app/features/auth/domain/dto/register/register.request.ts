export interface RegisterRequest {
  firstName: string;
  secondName: string;
  lastName: string;
  secondLastName: string;
  email: string;
  secondaryEmail?: string;
  password: string;
  roleId: number;
}
