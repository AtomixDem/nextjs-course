interface Post {
    slug: string; // URL
    title: string; // Titolo articolo
    content: string; // Contenuto dell'articolo
}

const BlogPosts: Post[] = [
    {
        slug: "primo-post",
        title: "Il mio primo post",
        content: "Questo è il contenuto del mio primo post...",
    },
    {
        slug: "secondo-post",
        title: "Il mio secondo post",
        content: "Questo è il contenuto del mio secondo post...",
    },
];

// Dalla pagina precedente prendiamo il parametro "slug" per identificare il post specifico
export default function BlogPost({ params }: { params: { slug: string } }) {
    const post = BlogPosts.find(post => post.slug === params.slug) // Troviamo il post corrispondente allo slug

    if (!post) {
        return <div>Post non trovato</div>;
    }

    return (
        <article className="max-w-4xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <p>{post.content}</p>
        </article>
    );
}

// Nota: In un'applicazione reale, i dati dei post verrebbero probabilmente recuperati da un database o da un'API.