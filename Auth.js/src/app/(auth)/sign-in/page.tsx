import { ErrorDisplay } from "@/components/(auth)/ErrorDisplay";
import { GithubSignIn } from "@/components/(auth)/Github-sign-in";
import { Button } from "@/components/(UI)/Button";
import { Input } from "@/components/(UI)/Input";
import { auth } from "@/lib/auth";
import { signIn } from "@/lib/auth";
import { executeAction } from "@/lib/executeAction";
import Link from "next/link";
import { redirect } from "next/navigation";
import db from "@/lib/db/db";

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const session = await auth();
  if (session) redirect("/dashboard");

  return (
    <div className="w-full max-w-sm mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

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

      {/* Email/Password Sign In */}
      <form
        className="space-y-4"
        action={async (formData) => {
          "use server";
          const email = formData.get("email");
          // Verifica che email sia una stringa
          if (typeof email !== "string") {
            redirect("/sign-in?error=invalid_email");
          }

          const user = await db.user.findUnique({
            where: { email: email.toLowerCase() },
          });

          if (user && user.provider !== "credentials") {
            redirect("/sign-in?error=use_github");
          }

          const res = await executeAction({
            actionFn: async () => {
              await signIn("credentials", formData);
            },
          });
          if (!res.success) {
            redirect("/sign-in?error=invalid_credentials");
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
          autoComplete="current-password"
        />
        <Button className="w-full" type="submit">
          Sign In
        </Button>
      </form>

      <div className="text-center">
        <Button variant="link">
          <Link href="/sign-up">Don't have an account? Sign up</Link>
        </Button>
      </div>
    </div>
  );
};

export default Page;