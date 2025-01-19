import PostEditor from "@/components/ui/editor/PostEditor";
import MiniNav from "../../../components/ui/mininav/MiniNav";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { MiniNavPayload } from "../../../components/ui/mininav/interfaces";
import FollowingUser from "@/components/home_components/FollowingUser";
import FollowingBlogs from "@/components/home_components/FollowingBlogs";

export default function Home() {
  const pathname = usePathname();
  const [path, setPath] = useState<string | null>(null);

  useEffect(() => {
    setPath(pathname.substring(1));
  }, [pathname]);

  const navItems = ["Feeds", "Following User", "Following Blogs"];

  const navComponents: { [key: string]: React.FC } = {
    followinguser: FollowingUser,
    followingblogs: FollowingBlogs,
  };

  return (
    <div className="home_container text-white relative">
      {/* Home dynamic nav */}
      <MiniNav navItems={navItems} />

      {/* Create Post */}
      <PostEditor />

      {/* Active context */}
    </div>
  );
}
