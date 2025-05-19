import Avatar from "@/components/UserMenu/Avatar";
import { apiRequest } from "@/lib";
import { useQuery } from "@tanstack/react-query";
import EmojiPicker from "emoji-picker-react";
import { SendHorizontal, SmilePlus } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { type Comment as CommentType } from "@/types";
import Comment from "./Comment";

interface Props {
  pinId: string;
}

const Comments = (props: Props) => {
  const [emojiPicker, setEmojiPicker] = useState(false);
  const [comments, setComments] = useState("");
  const { data, error, isLoading } = useQuery({
    queryKey: ["comments", props.pinId],
    queryFn: async () => {
      const { data } = await apiRequest.get(
        "/api/comments?pinId=" + props.pinId
      );
      return data.data as CommentType[];
    },
  });

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>{error.message}</h1>;

  if (!data) return <h1>Belum ada komentar di postingan ini</h1>;

  return (
    <div className="flex-1 flex flex-col gap-6 md:gap-0 h-full justify-between">
      {/* Commnents List */}
      <div className="flex flex-col gap-2 max-h-[100vh] p-2 md:max-h-[40vh] lg:max-h-[100vh] overflow-y-auto h-full">
        <span className="text-xs lg:text-sm flex gap-2">
          {data.length || 0}
          <span className="text-zinc-500 mb-4">Comments</span>
        </span>
        {data.map((comment) => (
          <Comment comment={comment} key={comment._id} />
        ))}
      </div>
      <div className="w-full h-[1px] mb-4 bg-zinc-500" />
      {/* Add Comment */}
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
    </div>
  );
};

export default Comments;
