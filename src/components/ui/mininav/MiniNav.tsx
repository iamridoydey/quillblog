import Link from "next/link";

export default function MiniNav({navItems}:{navItems: string[]}){
  return (
    <nav className="home_navigation w-full border-b border-zinc-600 py-4 sticky top-0 z-10 bg-black">
      <ul className="home_nav_items flex justify-evenly">
        {navItems.map((item, index) => (
          <li className={`home_nav_item`} key={index}>
            <Link href="" className="hover:text-gray-400">
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}