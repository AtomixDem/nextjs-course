import Link from "next/link";
import Image from "next/image";

export default function Contact() {
    return (
        <>
            <Link href="/about">About</Link>
            <Image 
            src="/Logo.jpg" 
            width={244} 
            height={245} 
            alt="Vecchio logo di AtomixDem"
            sizes="(max-widh: 768px) 100vw, 50vw"
            style={{objectFit: "cover"}}
            ></Image>
        </>
    );
}