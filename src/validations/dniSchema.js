import * as z from 'zod';

export const dniSchema = z.object({
  dni: z.string()
    .min(7, "DNI mínimo 7 dígitos.")
    .max(10, "DNI máximo 10 dígitos.")
    .regex(/^\d+$/, "Solo números.")
});