import { type Comment as CommentType } from "@/types";
import { useCommentStore } from "@/utils/zustandStores";
import { useEffect } from "react";
import AddCommentForm from "./AddCommentForm";
import Comment from "./Comment";

interface Props {
  pinId: string;
  commentData:CommentType[]
}

const Comments = (props: Props) => {
  const { comment, setComments } = useCommentStore();


  useEffect(() => {
    if (props.commentData) {
      setComments(props.commentData);
    }
  },[props.commentData, setComments]);

  

  return (
    <div className="flex-1 flex flex-col gap-6 md:gap-0 h-full justify-between">
      {/* Commnents List */}
      <div className="flex flex-col gap-2 max-h-[100vh] p-2 md:max-h-[40vh] lg:max-h-[100vh] overflow-y-auto h-full">
        <span className="text-xs lg:text-sm flex gap-2">
          {comment.length || 0}
          <span className="text-zinc-500 mb-4">Comments</span>
        </span>
        {comment.map((item) => (
          <Comment comment={item} key={item._id} />
        ))}
      </div>
      <div className="w-full h-[1px] mb-4 bg-zinc-500" />
      {/* Add Comment */}
      <AddCommentForm pinId={props.pinId} />
    </div>
  );
};

export default Comments;
