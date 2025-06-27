import Link from "next/link";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface Post {
    slug: string; // URL
    title: string; // Titolo articolo
    description: string; // Descrizione breve
}

// Creiamo un Array di oggetti con i vari post fittizzi
const BlogPosts: Post[] = [
    {
        slug: "primo-post",
        title: "Il mio primo post",
        description: "Una breve introduzione al mio primo post...",
    },
    {
        slug: "secondo-post",
        title: "Il mio secondo post",
        description: "Una breve introduzione al mio secondo post...",
    },
    {
        slug: "terzo-post",
        title: "Il mio terzo post",
        description: "Una breve introduzione al mio terzo post...",
    },
];

export default async function Blog() {
    await sleep(2000); // 3 secondi di ritardo per mostrare il loading
    return (
        <div className="max-w-4xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-8">Blog</h1>

            <div className="space-y-6">
                {BlogPosts.map((post) => ( // "post" è un elemento arbitrario e identifica ogni elemento dell'array per ogni ciclo

                    <article className="p-6 bg-slate-50 rounded-lg shadow-xl">
                        <h2 className="text-xl font-bold mb-2">
                            <Link
                            href={`/blog/${post.slug}`}
                            className="hover:text-zinc-300 transition-colors"
                            >{post.title}</Link>
                        </h2>
                        <p className="text-zinc-400">{post.description}</p>
                    </article>

                ))}
            </div>
        </div>
    );
}