import { useState } from "react";
import { NavLink } from "react-router";
import Avatar from "@/components/UserMenu/Avatar";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";
import EmojiPicker from "emoji-picker-react";
import { SendHorizontal, SmilePlus } from "lucide-react";
import { Button } from "../ui/button";

const AddCommentForm = () => {
  const [emojiPicker, setEmojiPicker] = useState(false);
  const [comments, setComments] = useState("");

  return (
    <div className="flex gap-2">
      <NavLink to={`/profile/john`}>
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
          onChange={(e) => setComments(e.target.value)}
          value={comments}
        />
        <div
          hidden={!emojiPicker}
          className="absolute z-10 bottom-[110%] right-10 md:right-16"
        >
          <EmojiPicker
            className=""
            onEmojiClick={(e) => {
              setComments((prev) => prev + e.emoji.toString());
            }}
          />
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
  );
};

export default AddCommentForm;
