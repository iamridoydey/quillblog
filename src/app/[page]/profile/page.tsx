import MiniNav from "@/components/ui/mininav/MiniNav";
import BlogToFollow from "@/components/ui/sidebar/BlogToFollow";
import { BlogToFollowPayload } from "@/components/ui/sidebar/interfaces";
import UserProfile from "@/components/user_component/UserProfile";

export default function Profile() {
  const navItems = [
    { item: "all", title: "All" },
    { item: "posts", title: "Posts" },
    { item: "articles", title: "Article's" },
    { item: "followingusers", title: "Following Users" },
    { item: "followingblogs", title: "Following Blogs" },
  ];

  const blogs: BlogToFollowPayload[] = [
    { image: "🅱️", title: "Mastering JavaScript", shortname: "javascript" },
    { image: "📘", title: "Python Essentials", shortname: "python" },
    { image: "🔥", title: "React in Action", shortname: "react" },
    { image: "🚀", title: "Kotlin for Android", shortname: "kotlin" },
    { image: "🌐", title: "Next.js Basics", shortname: "nextjs" },
  ];

  return (
    <div className="user_main_container flex gap-6">
      <div className="user_main max-w-[600px] border-r-[1px] border-zinc-600 box-border">
        {/* Blog profile */}
        <UserProfile />

        {/* Blog dynamic nav */}
        <MiniNav navItems={navItems} />
      </div>

      {/* sidebar */}
      <div className="right_sidebar w-[300px] flex-shrink-0 font-lato">
        <div className="sticky top-0 mt-4">
          <div className="sidebar_items_wrapper flex flex-col gap-6">
            {/* Blog you can follow */}
            <BlogToFollow blogs={blogs} title={"You May Follow"} />
          </div>
        </div>
      </div>
    </div>
  );
}
