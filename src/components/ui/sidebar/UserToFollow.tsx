import React from "react";
import { UserToFollowPayload } from "./interfaces";
import Link from "next/link";

const UserToFollow = ({ users }: { users: UserToFollowPayload[] }) => {
  return (
    <div className="tags_container border-[1px] border-zinc-600 rounded-lg">
      <h3 className="title p-2 font-[22px]">You May Follow</h3>
      <hr className="border-zinc-600" />
      <ul className="tag_items py-3 px-4 flex flex-col gap-3">
        {users.map((user, index) => (
          <li
            className="tag_item flex justify-between items-center"
            key={index}
          >
            <Link href="#" className="flex items-center gap-2">
              <span className="user_emoji_pic">{user.image}</span>
              <span className="flex flex-col ">
                <span className="text-[18px] hover:text-blue-600 hover:underline">
                  {user.name}
                </span>
                <span className="text-[14px] ">{`@${user.username}`}</span>
              </span>
            </Link>

            <button className="follow_button text-[18px] text-gray-800 font-semibold py-1 px-3 rounded-full bg-white hover:bg-blue-600 hover:text-white">follow</button>
          </li>
        ))}
      </ul>
      <hr className="border-zinc-600" />
      <h3 className="py-2 ml-2 text-blue-600 text-center">
        <Link href="#">show more</Link>
      </h3>
    </div>
  );
};

export default UserToFollow;
