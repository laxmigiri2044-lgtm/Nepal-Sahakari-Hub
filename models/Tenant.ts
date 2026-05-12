export interface Tenant {
  _id?: string;
  name: string;
  domain: string;
  logo: string;
  address: string;
  phone: string;
  email: string;
  isSetupComplete: boolean;
  adminPassword: string;
  createdAt: Date;
}