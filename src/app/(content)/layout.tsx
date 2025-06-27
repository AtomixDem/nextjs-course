export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-4xl mx-auto">
        <p className="bg-violet-700 text-white w-full text-center py2">
            Sono nel layout (content)
        </p>
        <main>{children}</main>
    </div>
  );
}