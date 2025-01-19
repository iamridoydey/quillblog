
export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="main_layout">
      {children}
    </section>
  );
}
