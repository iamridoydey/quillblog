import { NavItemObj } from "./interface";
import Webnav from "./Webnav";

export default function Navbar() {
  const items: NavItemObj[] = [
    { title: "Home", url: "home", icon: "home" },
    { title: "Search Items", url: "search", icon: "search" },
    { title: "My Blog", url: "myblog", icon: "myblog" },
    { title: "Bookmarks", url: "bookmarks", icon: "bookmarks" },
    { title: "Profile", url: "profile", icon: "profile" },
    { title: "Settings", url: "settings", icon: "settings" },
  ];

  return (
    <nav className="fixed top-0 border-r border-gray-600  min-w-0 min-h-[100dvh]">
      <div className="logo mt-4"></div>
      <Webnav items={items} />
    </nav>
  );
}