export interface Cliente {
  id: number;
  titular?: string | null;
  [key: string]: unknown;
}