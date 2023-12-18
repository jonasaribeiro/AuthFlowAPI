import { z } from "zod";

const checkPasswordComplexity = (value: string) => {
  const hasUpperCase = /[A-Z]/.test(value);
  const hasLowerCase = /[a-z]/.test(value);
  const hasNumber = /[0-9]/.test(value);
  const hasMinimumLength = value.length >= 8;

  return hasUpperCase && hasLowerCase && hasNumber && hasMinimumLength;
};

export const sUser = z.object({
  id: z.string(),
  email: z.string().email(),
  password: z.string(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const sUserRegistrationBody = sUser
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    password: z.string().refine(checkPasswordComplexity, {
      message:
        "Password must be at least 8 characters long and include uppercase, lowercase, and numbers.",
    }),
  });

export const sUserValidResponse = sUser.omit({
  password: true,
});

export const sUserPatchBody = sUserRegistrationBody.partial();
