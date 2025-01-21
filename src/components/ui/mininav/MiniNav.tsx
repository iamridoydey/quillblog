import Link from "next/link";
import { MiniNavPayload } from "./interfaces";
import { useActiveMiniNavItem } from "@/hook/ActiveMiniNavItem";

export default function MiniNav({ navItems }: { navItems: MiniNavPayload[] }) {
  const { activeMiniNav, setActiveMiniNav } = useActiveMiniNavItem();

  return (
    <nav className="mini_nav w-full border-b border-zinc-600 py-4 sticky top-0 z-10 bg-background">
      <div className="mini_nav_container w-full whitespace-nowrap overflow-x-auto scrollbar-none">
        <ul className="mini_nav_items flex md:justify-evenly space-x-4 px-4">
          {navItems.map((item, index) => (
            <li
              className={`mini_nav_item ${
                activeMiniNav === item.item ? "text-gray-400 font-bold" : ""
              }`}
              key={index}
            >
              <Link
                href=""
                className="hover:text-gray-400"
                onClick={() => setActiveMiniNav(item.item)}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
