import { SignOut } from "@/components/(auth)/Sign-out";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import db from "@/lib/db/db"; // Importa Prisma Client

const Page = async () => {
  // Check if the user is logged in. If not, redirect to the sign-in page
  const session = await auth();
  if (!session || !session.user?.email) redirect("/sign-in");

  // Recupera l'utente dal database usando l'email della sessione
  const user = await db.user.findUnique({
    where: { email: session.user.email.toLowerCase() },
    select: { nameSurname: true }, // Seleziona solo nameSurname per ottimizzare
  });

  return (
    <>
      <div className="bg-gray-100 rounded-lg p-4 text-center mb-6">
        <h2 className="text-xl">Welcome in the Dashboard</h2>
        <p className="font-medium">
          This is your name: <b>{user?.nameSurname || "Utente"}</b>
        </p>
        <p className="font-medium">
          This is your email: <b>{session.user?.email}</b>
        </p>
      </div>
      <SignOut />
    </>
  );
};

export default Page;