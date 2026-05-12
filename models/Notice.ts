export interface Notice {
  _id?: string;
  tenantId: string;
  title: string;
  content: string;
  publishedAt: Date;
  isActive: boolean;
}