import { z } from "zod";

export const sUser = z.object({
  id: z.string(),
  email: z.string().email(),
  password: z.string(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const sUserRegistrationBody = sUser.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const sUserValidResponse = sUser.omit({
  password: true,
});

export const sUserPatchBody = sUserRegistrationBody.partial();
