import db from "./db/db";
import { executeAction } from "./executeAction";
import { schema } from "./schema";
import bcrypt from "bcryptjs"; // Importa bcryptjs

const signUp = async (FormData: FormData) => {
    const email = FormData.get("email");
    const password = FormData.get("password");
    const validatedData = schema.parse({ email, password });

    // Controlla se l'utente esiste già
    const existingUser = await db.user.findUnique({
        where: { email: validatedData.email.toLowerCase() },
    });

    if (existingUser) {
        return {
            success: false,
            error: "already_exists",
            message: "Un account con questa email esiste già.",
        };
    }

    // Hasha la password
    const hashedPassword = await bcrypt.hash(validatedData.password, 10); // 10 è il numero di round di hashing

    // Se l'utente non esiste, procedi con la creazione
    return executeAction({
        actionFn: async () => {
            await db.user.create({
                data: {
                    email: validatedData.email.toLowerCase(),
                    password: hashedPassword, // Salva la password hashata
                },
            });
        },
        successMessage: "Account creato con successo.",
    });
};

export { signUp };