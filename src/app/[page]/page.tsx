"use client";
import { usePathname } from "next/navigation";
import React from "react";
import dynamic from "next/dynamic";
import NotFound from "@/components/Error/NotFound";

// Dynamically import pages
const Home = dynamic(() => import("./home/page"));
const Search = dynamic(() => import("./Search/page"));
const MyBlog = dynamic(() => import("./myblog/page"));
const Profile = dynamic(() => import("./profile/page"));
const Bookmarks = dynamic(() => import("./bookmarks/page"));
const Settings = dynamic(() => import("./settings/page"));

const PageHandlers: React.FC = () => {
  const pathname = usePathname();

  // Map routes to components
  const pages: { [key: string]: React.JSX.Element } = {
    home: <Home />,
    search: <Search />,
    myblog: <MyBlog />,
    profile: <Profile />,
    bookmarks: <Bookmarks />,
    settings: <Settings />,
  };

  // Extract path from pathname and remove the leading slash
  const path = pathname?.substring(1);

  // Render the appropriate page or NotFound if no match
  const currentPage = pages[path] || <NotFound />;

  return <>{currentPage}</>;
};

export default PageHandlers;
