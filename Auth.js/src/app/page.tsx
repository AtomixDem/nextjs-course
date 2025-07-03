import { Button } from "@/components/(UI)/Button";
import { auth } from "@/lib/auth";
import Link from "next/link";

const Page = async () => {
  const session = await auth();

  return (
    <>
      <div className="bg-gray-100 rounded-lg p-4 text-center">
        <p className="font-medium">Welcome in the Homepage</p>
        {session && (
          <>
            <Button className="mt-3">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </>
        )}
      </div>
    </>
  );
};

export default Page;