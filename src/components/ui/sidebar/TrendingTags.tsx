import Link from 'next/link';
import React from 'react'
import { TrendingTagsPayload } from './interfaces';
import NumToShorter from '@/utility/NumToShorter';

const TrendingTags = ({ tags }: { tags: TrendingTagsPayload[] }) => {
  return (
    <div className="tags_container border-[1px] border-zinc-600 rounded-lg">
      <h3 className="title p-2 font-[22px]">Trending Tags</h3>
      <hr className="border-zinc-600" />
      <ul className="tag_items py-3 px-4 flex flex-col gap-2">
        {tags.map((obj, index) => (
          <li className="tag_item hover:text-blue-600 hover:underline" key={index}>
            <Link href="#" className="flex items-center gap-2">
              <span className="text-[18px]">{`#${obj.tag}`}</span>
              <span className="text-[14px]">{`(${NumToShorter(
                obj.post
              )} posts)`}</span>
            </Link>
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

export default TrendingTags