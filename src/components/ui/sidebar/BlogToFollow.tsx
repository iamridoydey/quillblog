import Link from 'next/link';
import React from 'react'
import { BlogToFollowPayload } from './interfaces';

const BlogToFollow = ({ blogs, title }: { blogs: BlogToFollowPayload[], title:string }) => {
  return (
    <div className="tags_container border-[1px] border-zinc-600 rounded-lg">
      <h3 className="title p-2 font-[22px]">{title} </h3>
      <hr className="border-zinc-600" />
      <ul className="tag_items py-3 px-4 flex flex-col gap-3">
        {blogs.map((blog, index) => (
          <li
            className="tag_item flex justify-between items-center"
            key={index}
          >
            <Link href="#" className="flex items-center gap-2">
              <span className="user_emoji_pic">{blog.image}</span>
              <span className="flex flex-col ">
                <span className="max-w-36 text-[18px] whitespace-nowrap truncate hover:text-blue-600 hover:underline">
                  {blog.title}
                </span>
                <span className="text-[14px] ">{`@${blog.shortname}`}</span>
              </span>
            </Link>

            <button className="follow_button text-[18px] text-gray-800 font-semibold py-1 px-3 rounded-full bg-white hover:bg-blue-600 hover:text-white">
              follow
            </button>
          </li>
        ))}
      </ul>
      <hr className="border-zinc-600" />
      <h3 className="py-2 ml-2 text-blue-600 text-center">
        <Link href="#">show more</Link>
      </h3>
    </div>
  );
}

export default BlogToFollow