import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import db from "./db/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { v4 as uuid } from "uuid";
import { encode } from "next-auth/jwt";
import { schema } from "./schema";
import bcrypt from "bcryptjs";

const adapter = PrismaAdapter(db);

export const { auth, handlers, signIn } = NextAuth({
    adapter,
    providers: [
        GitHub({
            profile(profile) {
                return {
                    id: profile.id.toString(),
                    email: profile.email,
                    provider: "github", // Imposta il provider per GitHub
                };
            },
        }),
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                const validateCredentials = schema.parse(credentials);

                const user = await db.user.findUnique({
                    where: { email: validateCredentials.email.toLowerCase() },
                });

                if (!user) {
                    return null; // Utente non trovato
                }

                // Verifica che l'utente usi il provider "credentials"
                if (user.provider !== "credentials") {
                    return null; // Utente non registrato con credenziali
                }

                // Verifica che la password esista
                if (!user.password) {
                    return null; // Password mancante
                }

                // Confronta la password fornita con l'hash salvato
                const isPasswordValid = await bcrypt.compare(validateCredentials.password, user.password);

                if (!isPasswordValid) {
                    return null; // Password errata
                }

                return user; // Login riuscito
            },
        }),
    ],
    callbacks: {
        async jwt({ token, account }) {
            if (account?.provider === "credentials" || account?.provider === "github") {
                token.provider = account.provider;
            }
            return token;
        },
    },
    jwt: {
        encode: async function (params) {
            if (params.token?.provider) {
                const sessionToken = uuid();

                if (!params.token.sub) {
                    throw new Error("No user ID found in token");
                }

                const createdSession = await adapter?.createSession?.({
                    sessionToken: sessionToken,
                    userId: params.token.sub,
                    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Expire in 30 days
                });

                if (!createdSession) {
                    throw new Error("Failed to create session");
                }

                return sessionToken;
            }
            return encode(params);
        },
    },
});