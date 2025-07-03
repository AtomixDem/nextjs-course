import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { signUp } from "@/lib/registerUser";
import { GithubSignIn } from "@/components/(auth)/Github-sign-in";
import { Input } from "@/components/(UI)/Input";
import { Button } from "@/components/(UI)/Button";
import { signIn } from "@/lib/auth";
import { ErrorDisplay } from "@/components/(auth)/ErrorDisplay";
import db from "@/lib/db/db";

const Page = async () => {
  const session = await auth();
  if (session) redirect("/dashboard");

  return (
    <div className="w-full max-w-sm mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-center mb-6">Create Account</h1>

      <ErrorDisplay />

      <GithubSignIn />

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with email
          </span>
        </div>
      </div>

      {/* Email/Password Sign Up */}
      <form
        className="space-y-4"
        action={async (formData: FormData) => {
          "use server";
          const email = formData.get("email");
          if (typeof email !== "string") {
            redirect("/sign-up?error=invalid_email");
          }

          const existingUser = await db.user.findUnique({
            where: { email: email.toLowerCase() },
          });

          if (existingUser) {
            if (existingUser.provider === "github") {
              redirect("/sign-up?error=use_github");
            }
            redirect("/sign-up?error=already_exists");
          }

          const res = await signUp(formData);

          if (res.success) {
            // Se la registrazione ha successo, procedi con il sign-in
            const { email, password } = Object.fromEntries(formData.entries());
            const signInRes = await signIn("credentials", {
              email,
              password,
              redirect: false,
            });

            if (!signInRes?.ok) {
              redirect("/sign-in?error=login_failed");
            }
          } else {
            // Se la registrazione fallisce, controlla se c'è un errore specifico
            if ("error" in res && res.error === "already_exists") {
              redirect("/sign-up?error=already_exists");
            } else {
              redirect("/sign-up?error=generic");
            }
          }
        }}
      >
        <Input
          name="email"
          placeholder="Email"
          type="email"
          required
          autoComplete="email"
        />
        <Input
          name="password"
          placeholder="Password"
          type="password"
          required
          autoComplete="new-password"
        />
        <Button className="w-full" type="submit">
          Sign Up
        </Button>
      </form>

      <div className="text-center">
        <Button variant="link">
          <Link href="/sign-in">Already have an account? Sign in</Link>
        </Button>
      </div>
    </div>
  );
};

export default Page;