import Avatar from "@/components/UserMenu/Avatar";
import { useAuthStore } from "@/utils/zustandStores";
import EmojiPicker from "emoji-picker-react";
import { SendHorizontal, SmilePlus } from "lucide-react";
import { useState, type FormEventHandler } from "react";
import { NavLink } from "react-router";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { apiRequest } from "@/lib";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Comment } from "@/types";

interface FormCommentBody {
  pin: string;
  description: string;
}

const addComments = async ({ pin, description }: FormCommentBody) => {
  const body = { pin, description };
  const { data } = await apiRequest.post("/api/comments/create", body);
  return data.data as Comment;
};

interface Props {
  pinId: string;
}

const AddCommentForm = ({ pinId: pin }: Props) => {
  const [emojiPicker, setEmojiPicker] = useState(false);
  const [description, setDescription] = useState("");
  const { currentUser } = useAuthStore();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      pin,
      description,
    }: {
      pin: string;
      description: string;
    }) => await addComments({ pin, description }),
    onMutate: async (newComment) => {
      await queryClient.cancelQueries({ queryKey: ["comments", pin] });

      const previousComments = queryClient.getQueryData<Comment[]>([
        "comments",
        pin,
      ]);

      queryClient.setQueryData<Comment[]>(["comments", pin], (old) => [
        {
          _id: Date.now().toString(),
          description: newComment.description,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          pin: newComment.pin,
          user: currentUser,
          __v: 0, // ← Add this to satisfy the type
        },
        ...(old ?? []),
      ]);

      return { previousComments };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(["comments", pin], context?.previousComments);
      toast("Gagal menambahkan komentar!");
    },
    onSuccess: () => {
      toast("Komentar berhasil ditambahkan!");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", pin] });
    },
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (description.trim().length < 1) {
      return toast("Tuliskan sesuatu");
    }
    mutation.mutate({ pin, description });
  };

  return (
    <div className="flex gap-2">
      <NavLink to={`/profile/${currentUser?.username}`}>
        <Avatar avatarUrl={currentUser?.avatar || ""} />
      </NavLink>
      <form
        className="flex justify-between flex-1 gap-3 relative max-h-12"
        onSubmit={handleSubmit}
      >
        <Textarea
          className="ring ring-zinc-500"
          placeholder="Berikan Komentar..."
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        <div
          hidden={!emojiPicker}
          className="absolute z-10 bottom-[110%] right-10 md:right-16"
        >
          <EmojiPicker
            onEmojiClick={(e) => {
              setDescription((prev) => prev + e.emoji.toString());
            }}
          />
        </div>
        <span
          onClick={() => setEmojiPicker((prev) => !prev)}
          className="cursor-pointer"
        >
          <SmilePlus />
        </span>
        <Button disabled={description.trim().length < 1}>
          <SendHorizontal />
        </Button>
      </form>
    </div>
  );
};

export default AddCommentForm;
