import z from "zod";

// This schema is used to validate the user input for sign-up and sign-in forms
// It ensures that the email is a valid email format and the password is at least 1 character long
const schema  = z.object({
    email: z.string().email(),
    password: z.string().min(1),
});

export { schema };