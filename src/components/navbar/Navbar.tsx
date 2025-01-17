import { NavItemObj } from "./interface";
import Webnav from "./Webnav";

export default function Navbar() {
  const items: NavItemObj[] = [
    { title: "Home", url: "home", icon: "home" },
    { title: "Search Items", url: "search", icon: "search" },
    { title: "Blogs", url: "blogs", icon: "blogs" },
    { title: "Saved Items", url: "saveditems", icon: "savedItems" },
    { title: "Profile", url: "profile", icon: "profile" },
    { title: "Settings", url: "settings", icon: "settings" },
  ];

  return (
    <nav className="fixed top-0 flex-shrink-0 min-w-0">
      <div className="logo mt-4">
      </div>
      <Webnav items={items} />
    </nav>
  );
}
