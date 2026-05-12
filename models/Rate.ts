export interface Rate {
  _id?: string;
  tenantId: string;
  type: string;
  rate: number;
  duration: string;
  isActive: boolean;
}