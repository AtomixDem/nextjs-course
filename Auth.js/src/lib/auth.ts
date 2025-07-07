import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import db from "./db/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { v4 as uuid } from "uuid";
import { encode } from "next-auth/jwt";
import { loginSchema } from "./schema";
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
          provider: "github",
          nameSurname: profile.name || "Utente GitHub",
        };
      },
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        console.log("Credentials received:", credentials); // Debug: log delle credenziali
        const validateCredentials = loginSchema.parse(credentials);
        console.log("Validated credentials:", validateCredentials); // Debug: log delle credenziali validate
        const user = await db.user.findUnique({
          where: { email: validateCredentials.email.toLowerCase() },
        });
        console.log("User found:", user); // Debug: log dell'utente trovato
        if (!user || user.provider !== "credentials" || !user.password) {
          console.log("Authorization failed: user not found, wrong provider, or no password");
          return null;
        }
        const isPasswordValid = await bcrypt.compare(validateCredentials.password, user.password);
        console.log("Password valid:", isPasswordValid); // Debug: log della validità della password
        if (!isPasswordValid) {
          return null;
        }
        return user;
      },
    }),
  ],
  callbacks: {
    // Aggiungi la callback signIn
    async signIn({ user, account, profile }) {
      if (account && account.provider === "github") {
        // Cerca un utente esistente con la stessa email
        if (!profile || !profile.email) {
          // Blocca l'accesso se l'email non è disponibile
          return "/sign-in?error=no_email";
        }
        const existingUser = await db.user.findUnique({
          where: { email: profile.email },
        });

        // Se esiste un utente con questa email e il provider non è "github"
        if (existingUser && existingUser.provider !== "github") {
          // Blocca l'accesso e reindirizza con un errore
          return "/sign-in?error=email_exists";
        }
      }
      // Altrimenti, permetti l'accesso
      return true;
    },
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
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
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