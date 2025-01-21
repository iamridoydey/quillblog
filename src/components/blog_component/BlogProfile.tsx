import Image from "next/image";
import QuillBlogFallbackCover from "@/public/images/QuillBlogFallbackCover.svg";
import QuillBlogFallbackProfile from "@/public/images/QuillBlogFallbackProfile.svg";
import { Edit, FileText } from "lucide-react";

const BlogProfile = () => {
  return (
    <div className="blog_profile p-4 border-b-[1px] border-zinc-600 relative">
      {/* Blog Cover and Profile */}
      <div className="blog_profile_view relative">
        <div className="thumbnail_container w-full h-[200px] overflow-hidden rounded-t-lg">
          <Image
            src={QuillBlogFallbackCover}
            alt="thumbnail"
            layout="intrinsic"
            objectFit="cover"
            height={200}
            width={800} // Adjust width based on your design
          />
        </div>
        <div className="profile_container absolute left-8 bottom-[-35%] w-32 h-32 rounded-full border-4 border-white overflow-hidden shadow-lg">
          <Image src={QuillBlogFallbackProfile} alt="profile" />
        </div>
      </div>

      {/* Blog Details */}
      <div className="blog_data_wrapper mt-24">
        <h3 className="text-xl font-bold text-gray-300">{`Quill Blog - Blog Of The Decade`}</h3>
        <span className="text-sm text-zinc-500">{`@shortname`}</span>
      </div>

      {/* Bio */}
      <div className="blog_description_container mt-4 text-gray-200">
        <h4 className="blog_description_title flex items-center gap-2 font-medium">
          <FileText size={18} className="text-gray-400" />
          <span>Description:</span>
        </h4>
        <p className="user_bio mt-2 text-sm text-gray-400 leading-relaxed max-w-[400px] ml-6">
          This blog shares insightful articles, stories, and ideas, covering a
          variety of topics ranging from technology and development to personal
          experiences. It&apos;s a space for learning, sharing, and connecting with
          like-minded individuals.
        </p>
      </div>

      {/* Edit Profile Button */}
      <div className="edit_button_container absolute right-4 bottom-4">
        <button className="p-2 text-zinc-400 hover:text-blue-600 hover:bg-zinc-100 rounded-full transition-all duration-300">
          <Edit size={20} />
        </button>
      </div>
    </div>
  );
};

export default BlogProfile;
