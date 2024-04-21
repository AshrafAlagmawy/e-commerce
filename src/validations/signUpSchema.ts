import { z } from 'zod';

const signUpSchema = z
  .object({
    firstName: z.string().min(1, { message: 'First name is required' }),
    lastName: z.string().min(1, { message: 'Last name is required' }),
    email: z.string().min(1, { message: 'Email address is required' }).email(),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' })
      .regex(/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*?_ ]).*$/, {
        message:
          'Password must contain at least 8 characters, one letter, one number, and one special character',
      }),
    confirmPassword: z
      .string()
      .min(8, { message: 'Confirm Password is required' }),
  })
  .refine((input) => input.password === input.confirmPassword, {
    message: 'Password and confirm password are not matched !',
    path: ['confirmPassword'],
  });

type signUpType = z.infer<typeof signUpSchema>;

export { signUpSchema, type signUpType };
