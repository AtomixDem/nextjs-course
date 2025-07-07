import { ErrorDisplay } from "@/components/(auth)/ErrorDisplay";
import { GithubSignIn } from "@/components/(auth)/Github-sign-in";
import { Button } from "@/components/(UI)/Button";
import { Input } from "@/components/(UI)/Input";
import { auth } from "@/lib/auth";
import { signIn } from "@/lib/auth";
import db from "@/lib/db/db";
import { executeAction } from "@/lib/executeAction";
import Link from "next/link";
import { redirect } from "next/navigation";

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
          // Estrai e converti l'email in minuscolo prima di passarla a signIn
          const email = formData.get("email")?.toString().toLowerCase();
          const password = formData.get("password")?.toString();
          if (!email || !password) {
            redirect("/sign-in?error=invalid_data");
          }
          const res = await executeAction({
            actionFn: async () => {
              const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
              });
              if (!result?.ok) {
                const user = await db.user.findUnique({
                  where: { email },
                });
                if (user && user.provider !== "credentials") {
                  throw new Error("wrong_provider");
                }
                throw new Error("invalid_credentials");
              }
            },
          });
          if (!res.success) {
            if (res.message === "wrong_provider") {
              redirect("/sign-in?error=wrong_provider");
            }
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
          <Link href="/sign-up">Don&apos;t have an account? Sign up</Link>
        </Button>
      </div>
    </div>
  );
};

export default Page;