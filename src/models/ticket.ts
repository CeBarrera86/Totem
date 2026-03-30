export interface Ticket {
  message?: string | null;
  data?: string | null;
  letra?: string | null;
  numero?: number | string | null;
  [key: string]: unknown;
}