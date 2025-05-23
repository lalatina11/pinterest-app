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
interface FormCommentBody {
  pin: string;
  description: string;
}

// interface CreateCommentResponse {
//   message: string;
//   comment: {
//     _id: string;
//     pin: string;
//     user: string;
//     description: string;
//     createdAt: string;
//     updatedAt: string;
//     // any other fields
//   };
//   error: boolean;
// }

const addComments = async ({ pin, description }: FormCommentBody) => {
  const body = { pin, description };
  const { data } = await apiRequest.post("/api/comments/create", body);
  return data.data;
};

interface Props {
  pinId: string;
}

const AddCommentForm = (props: Props) => {
  const [emojiPicker, setEmojiPicker] = useState(false);
  const [description, setDescription] = useState("");
  const { currentUser } = useAuthStore();
  const { pinId: pin } = props;
  const { invalidateQueries } = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async ({ pin, description }: FormCommentBody) => {
      return await addComments({ pin, description });
    },
    onSuccess: (data) => {
      console.log("data= " + data);
      invalidateQueries({
        queryKey: ["comments", props.pinId],
      });
      setDescription("");
      toast("Komentar berhasil ditambahkan!");
      setEmojiPicker(false);
    },
    onError: (error) => {
      console.error("error= " + (error as Error));
      setDescription("");
      setEmojiPicker(false);
      toast("Gagal menambahkan komentar!");
    },
  });
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (description.trim().length < 1) {
      return toast("Tuliskan sesuatu");
    }
    mutate({ pin, description });
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
            className=""
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
