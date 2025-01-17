"use client";

import Image from "next/image";
import { NavItemObj } from "./interface";
import QuillBlogTextLogo from "@/public/images/QuillBlogTextLogo.svg";
import { useActivePage } from "@/hook/ActivePage";
import icons from "./icons";
import Link from "next/link";

export default function Webnav({ items }: { items: NavItemObj[] }) {
  const { activePage, setActivePage } = useActivePage();

  return (
    <div>
      <ul className="nav_items flex flex-col items-start gap-4">
        {/* QuillBlog logo */}
        <li className="nav_item px-3 mx-2" key="QuillBlog">
          <Link href="/home" className="flex flex-row gap-2">
            <Image
              src={QuillBlogTextLogo}
              alt="QuillBlog Logo"
              priority={true}
              className="w-28"
            />
          </Link>
        </li>

        {items.map((item) => {
          const IconComponent = icons[item.icon];
          return (
            <li
              className={`nav_item p-3 mx-2 rounded-xl hover:bg-neutral-800 ${
                activePage === item.url ? "bg-slate-900" : ""
              }`}
              key={item.title}
              onClick={()=>setActivePage(item.url)}
            >
              <Link href={`/${item.url}`} className="flex flex-row items-center justify-center gap-1 cursor-pointer">
                <span className="w-7 h-7">
                  {IconComponent && (
                    <IconComponent
                      fill={item.url === activePage ? "#fff" : "#000"}
                      stroke={item.url === activePage ? "gray" : "#fff"}
                    />
                  )}
                </span>
                <span className="text-md">{item.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
