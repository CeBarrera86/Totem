export interface Ticket {
  letra?: string | null;
  numero?: number | string | null;
  [key: string]: unknown;
}