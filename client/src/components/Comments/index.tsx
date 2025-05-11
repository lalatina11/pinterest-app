import EmojiPicker from "emoji-picker-react";
import Avatar from "@/components/UserMenu/Avatar";
import { SendHorizontal, SmilePlus } from "lucide-react";
import { NavLink } from "react-router";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
const Comments = () => {
  const [emojiPicker, setEmojiPicker] = useState(false);
  // const [Emoji, setEmoji] = useState("");
  const comment = {
    count: 1,
    text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi, accusantium! Reiciendis saepe, a obcaecati enim accusantium expedita eum sint itaque in doloribus totam dignissimos quia tempora. Illum culpa qui quis.",
  };
  return (
    <div className="flex-1 flex flex-col gap-6 md:gap-0 h-full justify-between">
      {/* Commnents List */}
      <div className="flex flex-col gap-2 max-h-[100vh] p-2 md:max-h-[40vh] lg:max-h-[100vh] overflow-y-scroll">
        <span className="text-xs lg:text-sm flex gap-2">
          1<span className="text-zinc-500 mb-4">Comments</span>
        </span>
        <>
          <div className="flex gap-2 items-center justify-between pr-0 md:pr-5 lg:pr-10">
            <NavLink to={`profile/john`} className="flex gap-2 items-center">
              <Avatar avatarUrl="" />
              <span>John Doe</span>
            </NavLink>
            <span className="text-xs text-zinc-500">1h Ago</span>
          </div>
          <span className="text-xs lg:text-sm">{comment.text}</span>
          <hr className="h-[1px] bg-zinc-500" />
        </>
      </div>
      <div className="w-full h-[1px] mb-4 bg-zinc-500" />
      {/* Add Comment */}
      <div className="flex gap-2">
        <NavLink to={`/john`}>
          <Avatar avatarUrl="" />
        </NavLink>
        <form
          className="flex justify-between flex-1 gap-3 relative max-h-12"
          onSubmit={(e) => {
            e.preventDefault();
            toast("Komentar berhasil ditambahkan");
          }}
        >
          <Textarea
            className="ring ring-zinc-500"
            placeholder="Berikan Komentar..."
          />
          <div
            hidden={!emojiPicker}
            className="absolute z-10 bottom-[110%] right-10 md:right-16"
          >
            <EmojiPicker className="" />
          </div>
          <span
            onClick={() => setEmojiPicker((prev) => !prev)}
            className="cursor-pointer"
          >
            <SmilePlus />
          </span>
          <Button>
            <SendHorizontal />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Comments;
