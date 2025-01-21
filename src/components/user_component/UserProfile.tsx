import Image from "next/image";
import QuillBlogFallbackCover from "@/public/images/QuillBlogFallbackCover.svg";
import QuillBlogFallbackProfile from "@/public/images/QuillBlogFallbackProfile.svg";
import { BriefcaseBusiness, Edit, MapPin, User } from "lucide-react";

const UserProfile = () => {
  return (
    <div className="user_profile p-6 border-b border-zinc-700 bg-gray-900 text-white rounded-md shadow-lg relative">
      {/* Profile Cover */}
      <div className="relative max-h-[200px]">
        <div className="thumbnail_container overflow-hidden rounded-t-md">
          <Image
            src={QuillBlogFallbackCover}
            alt="thumbnail"
            layout="responsive"
            objectFit="cover"
          />
        </div>
      </div>

      {/* Profile Picture and User Details */}
      <div className="relative flex flex-col items-start mt-[-40px] mx-4">
        {/* Profile Picture */}
        <div className="profile_container w-36 h-36 rounded-full border-4 border-gray-900 overflow-hidden shadow-lg">
          <Image src={QuillBlogFallbackProfile} alt="profile" />
        </div>

        {/* User Details */}
        <div className="user_data_wrapper mt-6">
          <h3 className="user_fullname text-2xl font-bold tracking-wide">
            {`John Doe`}
          </h3>
          <h4 className="user_username text-gray-400 text-sm">{`@johndoe`}</h4>

          {/* Bio */}
          <div className="user_bio_container mt-4 text-gray-200">
            <h4 className="user_bio_title flex items-center gap-2 font-medium">
              <User size={18} className="text-gray-400" />
              <span>Bio:</span>
            </h4>
            <p className="user_bio mt-2 text-sm text-gray-400 leading-relaxed max-w-[400px] ml-6">
              Passionate software engineer with a love for creating intuitive
              user experiences. Enthusiast of open-source projects, learning,
              and collaboration.
            </p>
          </div>

          {/* Title and Location */}
          <div className="user_additional_info mt-4 space-y-2 text-gray-200">
            <div className="user_title flex items-center gap-2">
              <BriefcaseBusiness size={18} className="text-gray-400" />
              <span>Senior Software Developer</span>
            </div>
            <div className="user_location flex items-center gap-2">
              <MapPin size={18} className="text-gray-400" />
              <span>New York, USA</span>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Button */}
      <div className="edit_button_container absolute right-5 bottom-5">
        <button className="p-2 rounded-full text-gray-400 hover:text-blue-500 hover:bg-gray-800 transition duration-300">
          <Edit size={20} />
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
