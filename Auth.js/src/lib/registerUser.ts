import db from "./db/db";
import { executeAction } from "./executeAction";
import { registerSchema } from "./schema";
import bcrypt from "bcryptjs";

const signUp = async (FormData: FormData) => {
    const email = FormData.get("email");
    const password = FormData.get("password");
    const nameSurname = FormData.get("nameSurname");
    const validatedData = registerSchema.parse({ email, password, nameSurname });

    // Controlla se l'utente esiste già
    const existingUser = await db.user.findUnique({
        where: { email: validatedData.email.toLowerCase() },
    });

    if (existingUser) {
        if (existingUser.provider === "github") {
            return {
                success: false,
                error: "use_github",
                message: "Un account GitHub con questa email esiste già. Prova a fare il login con GitHub.",
            };
        } else {
            return {
                success: false,
                error: "already_exists",
                message: "Un account con questa email esiste già.",
            };
        }
    }

    // Hasha la password
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    // Se l'utente non esiste, procedi con la creazione
    return executeAction({
        actionFn: async () => {
            await db.user.create({
                data: {
                    email: validatedData.email.toLowerCase(),
                    password: hashedPassword,
                    provider: "credentials",
                    nameSurname: validatedData.nameSurname,
                },
            });
            console.log("New user created:"); // Debug: log dell'utente creato
        },
        successMessage: "Account creato con successo.",
    });
};

export { signUp };