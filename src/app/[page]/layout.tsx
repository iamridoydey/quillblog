
export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex gap-8">
      {/* Main Content */}
      <div className="main_content w-[600px] border-r-[1px] border-zinc-600">

        {children}
      </div>

      {/* Right Sidebar */}
      <div className="right_sidebar w-[300px] flex-shrink-0 border">
        <div className="sticky top-0">right sidebar</div>
      </div>
    </div>
  );
}
