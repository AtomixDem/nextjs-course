import { signIn } from "@/lib/auth";
import { Button } from "../(UI)/Button";

const GithubSignIn = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github");
      }}
    >
      <Button className="w-full" variant="outline">
        Continue with GitHub
      </Button>
    </form>
  );
};

export { GithubSignIn };