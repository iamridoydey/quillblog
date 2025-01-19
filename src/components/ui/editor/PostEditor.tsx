/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import DraftEditor from "./DraftEditor";
import { ImageIcon, Smile, User } from "lucide-react";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { EmojiPayload, FillPayload } from "./interfaces";

export default function PostEditor() {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [emoji, setEmoji] = useState<EmojiPayload>({
    timestamp: null,
    value: "",
  });

  const [fill, setFill] = useState<FillPayload[]>([
    { type: "image", isOn: false },
    { type: "emoji", isOn: false },
  ]);

  const pickerRef = useRef<HTMLDivElement>(null);
  const emojiRef = useRef<HTMLLIElement>(null);

  const toggleActionItem = (type: string) => {
    setFill((prev) =>
      prev.map((item) =>
        item.type === type ? { ...item, isOn: !item.isOn } : item
      )
    );

    if (type === "emoji") {
      setShowEmojiPicker((prev) => !prev);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      pickerRef.current &&
      !pickerRef.current.contains(event.target as Node) &&
      emojiRef.current &&
      !emojiRef.current.contains(event.target as Node)
    ) {
      setShowEmojiPicker(false);
      setFill((prev) =>
        prev.map((item) =>
          item.type === "emoji" ? { ...item, isOn: false } : item
        )
      );
    }
  };

  const handleEmojiClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleActionItem("emoji");
  };

  const onEmojiClick = (...args: any) => {
    setEmoji({ timestamp: new Date(), value: args[0].emoji });
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="post_editor">
      <div className="create_post_wrapper w-full pt-6 px-4">
        <div className="create_post_main w-full flex flex-col gap-2">
          <div className="user_container flex items-center gap-2">
            <figure className="profile_pic border border-zinc-600 rounded-full self-start w-10 h-10 flex justify-center items-center bg-gray-800">
              <User className="text-gray-400" />
            </figure>
            <Link href="#" className="text-[#0c49ac]">
              @username
            </Link>
          </div>
          <div className="editor rounded-lg flex-grow max-w-[600px] max-h-[100dvh]">
            <DraftEditor emoji={emoji} />
            <div className="post_action_container flex justify-between p-2 pt-4 my-1 border-t-[1px] border-zinc-600 relative">
              <ul className="flex gap-2">
                <li
                  className="action_item cursor-pointer hover:text-[#0c49ac]"
                  onClick={() => toggleActionItem("image")}
                >
                  <ImageIcon
                    fill={
                      fill.find((item) => item.type === "image")?.isOn
                        ? "#0c49ac"
                        : "none"
                    }
                  />
                </li>
                <li
                  className="action_item cursor-pointer hover:text-[#0c49ac]"
                  onClick={handleEmojiClick}
                  ref={emojiRef}
                >
                  <Smile
                    fill={
                      fill.find((item) => item.type === "emoji")?.isOn
                        ? "#0c49ac"
                        : "none"
                    }
                  />
                </li>
              </ul>
              {showEmojiPicker && (
                <div className="mt-14 w-[280px] absolute" ref={pickerRef}>
                  <EmojiPicker
                    aria-label="Open Emoji Picker"
                    height="400px"
                    width="280px"
                    theme={Theme.DARK}
                    className="custom_emoji_picker"
                    onEmojiClick={onEmojiClick}
                  />
                </div>
              )}

              <button className="bg-white hover:bg-slate-300 text-black font-bold px-5 py-2 rounded-full">
                post
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr className="border-zinc-500" />
    </div>
  );
}
