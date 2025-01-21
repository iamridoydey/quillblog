import { ActiveMiniNavProvider } from "@/hook/ActiveMiniNavItem";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ActiveMiniNavProvider>
      <section className="main_layout">{children}</section>
    </ActiveMiniNavProvider>
  );
}
