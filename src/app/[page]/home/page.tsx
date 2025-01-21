import PostEditor from "@/components/ui/editor/PostEditor";
import MiniNav from "../../../components/ui/mininav/MiniNav";
import {
  BlogToFollowPayload,
  TrendingTagsPayload,
  UserToFollowPayload,
} from "@/components/ui/sidebar/interfaces";
import TrendingTags from "@/components/ui/sidebar/TrendingTags";
import UserToFollow from "@/components/ui/sidebar/UserToFollow";
import BlogToFollow from "@/components/ui/sidebar/BlogToFollow";
import { MiniNavPayload } from "@/components/ui/mininav/interfaces";

export default function Home() {
  const navItems: MiniNavPayload[] = [
    { item: "feed", title: "Feed" },
    { item: "followingusers", title: "Following Users" },
    { item: "followingblogs", title: "Following Blogs" },
  ];

  // Sidebar data
  const tags: TrendingTagsPayload[] = [
    { tag: "javascript", post: 8734 },
    { tag: "python", post: 4398 },
    { tag: "java", post: 2567 },
    { tag: "c++", post: 6721 },
    { tag: "react", post: 3458 },
    { tag: "kotlin", post: 9287 },
    { tag: "nextjs", post: 1834 },
  ];

  const users: UserToFollowPayload[] = [
    { image: "👨🏻‍💼", name: "John Doe", username: "johndoe123" },
    { image: "👩‍💼", name: "Jane Smith", username: "janesmith" },
    { image: "👨🏻‍💼", name: "Michael Brown", username: "mikebrown" },
    { image: "👩‍💼", name: "Emily Johnson", username: "emilyj" },
  ];

  const blogs: BlogToFollowPayload[] = [
    { image: "🅱️", title: "Mastering JavaScript", shortname: "javascript" },
    { image: "📘", title: "Python Essentials", shortname: "python" },
    { image: "🔥", title: "React in Action", shortname: "react" },
    { image: "🚀", title: "Kotlin for Android", shortname: "kotlin" },
    { image: "🌐", title: "Next.js Basics", shortname: "nextjs" },
  ];

  return (
    <div className="flex gap-8">
      {/* Main Content */}
      <div className="main_content w-[600px] border-r-[1px] border-zinc-600">
        <div className="home_container text-white relative">
          {/* Home dynamic nav */}
          <MiniNav navItems={navItems} />

          {/* Create Post */}
          <PostEditor />

          {/* Active context */}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="right_sidebar w-[300px] flex-shrink-0 font-lato">
        <div className="sticky top-0 mt-4">
          <div className="sidebar_items_wrapper flex flex-col gap-6">
            {/* Trending tags */}
            <TrendingTags tags={tags} />

            {/* You may follow */}
            <UserToFollow users={users} />

            {/* Blog you can follow */}
            <BlogToFollow blogs={blogs} title={"Blog To Follow"} />
          </div>
        </div>
      </div>
    </div>
  );
}
