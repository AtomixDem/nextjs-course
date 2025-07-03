import { SignOut } from "@/components/(auth)/Sign-out";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const Page = async () => {
  // Check if the user is logged in. If not, redirect to the sign-in page
  const session = await auth();
  if (!session) redirect("/sign-in");

  return (
    <>
      <div className="bg-gray-100 rounded-lg p-4 text-center mb-6">
        <h2 className="text-xl">Welcome in the Dashboard</h2>
        <p className="font-medium">This is your name: <b>{session.user?.name}</b></p>
        <p className="font-medium">This is your email: <b>{session.user?.email}</b></p>
      </div>
      <SignOut />
    </>
  );
};

export default Page;