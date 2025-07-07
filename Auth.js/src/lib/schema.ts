import z from "zod";

// Schema per il login (solo email e password)
const loginSchema = z.object({
    email: z.string().email().min(1),
    password: z.string().min(1),
});

// Schema per la registrazione (include nameSurname)
const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
    nameSurname: z.string().min(1, "Nome e Cognome sono obbligatori"),
});

export { loginSchema, registerSchema };