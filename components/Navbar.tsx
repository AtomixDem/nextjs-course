"use client"; // necessario se aggiungi interazioni con stato o effetti (opzionale per solo link)

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-zinc-900 text-white px-6 py-4 shadow-lg">
      <div className="max-w-6xl mx-auto flex justify-between items-center">

        <Link href="/" className="text-xl font-bold text-white hover:text-zinc-300">
          Miosito
        </Link>

        <ul className="flex gap-6">
          <li>
            <Link href="/" className="hover:text-zinc-400 transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-zinc-400 transition-colors">
              About
            </Link>
          </li>
          <li>
            <Link href="/blog" className="hover:text-zinc-400 transition-colors">
              Blog
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-zinc-400 transition-colors">
              Contatti
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
