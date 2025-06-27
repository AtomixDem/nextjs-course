import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">404 - Pagina non trovata</h1>
      <p className="text-lg">La pagina che stai cercando non esiste.</p>
      <Link href="/" className="mt-4 text-blue-500 hover:underline">
        Torna alla home
      </Link>
    </div>
  );
}