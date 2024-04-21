import { z } from 'zod';

const signInSchema = z.object({
  email: z.string().min(1, { message: 'Email address is required' }).email(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters longs' })
    .regex(/.*[!@#$%^&*()_+{}|[\]\\:";'<>?,./].*/, {
      message: 'Password should contain at least 1 special character',
    }),
});

type signInType = z.infer<typeof signInSchema>;

export { signInSchema, type signInType };
