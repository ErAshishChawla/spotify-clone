import { z } from "zod";

export const signupFormSchema = z.object({
  email: z
    .string()
    .email({
      message:
        "This email is invalid. Make sure it's written like example@email.com",
    })
    .min(1, { message: "Email is required" }),
  password: z
    .string()
    .min(8, { message: "Password must be of 8 characters or more" })
    .max(20, { message: "Password cannot be longer than 20 characters" })
    .regex(/^(?=.*[a-z])/, {
      message: "Password must contain atleast one lowercase letter",
    })
    .regex(/^(?=.*[A-Z])/, {
      message: "Password must contain atleast one lowercase letter",
    })
    .regex(/^(?=.*\d)/, {
      message: "Password must contain atleast one lowercase letter",
    })
    .regex(/^(?=.*[@$!%*?&])/, {
      message:
        "Password must contain atlease one special character from  '@', '$' , '!', '%', '*', '?', '&'",
    }),
});
