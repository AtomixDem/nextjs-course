export default function Loading() {
    return (
        <div className="max-w-4xl mx-auto p-8 animate-pulse">
            <h1 className="text-3xl font-bold mb-8">Caricamento Blog...</h1>

            <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                    <article key={i} className="p-6 bg-slate-100 rounded-lg shadow-md">
                        <div className="h-6 bg-slate-300 rounded w-1/2 mb-4"></div>
                        <div className="h-4 bg-slate-300 rounded w-full"></div>
                        <div className="h-4 bg-slate-300 rounded w-5/6 mt-2"></div>
                    </article>
                ))}
            </div>
        </div>
    );
}
