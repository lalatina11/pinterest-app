import BackButton from "@/components/BackButton";
import Comments from "@/components/Comments";
import Gallery from "@/components/Gallery";
import ImageRenderer from "@/components/Gallery/ImageRenderer";
import Metadata from "@/components/Metadata";
import PostInterraction from "@/components/PostInterraction";
import Avatar from "@/components/UserMenu/Avatar";
import { apiRequest } from "@/lib";
import { useQuery } from "@tanstack/react-query";
import { NavLink, useParams } from "react-router";
import NotFoundPage from "./NotFoundPage";

const PostPage = () => {
  const { id } = useParams();

  const { data, error, isPending } = useQuery({
    queryKey: ["pin", id],
    queryFn: async () => {
      const { data } = await apiRequest.get(`/api/pins/${id}`);
      return data.data;
    },
  });

  if (isPending) {
    return <h1 className="flex justify-center items-center">Loading...</h1>;
  }
  if (error) {
    return NotFoundPage();
  }

  if (!data) return NotFoundPage();

  return (
    <>
      <Metadata title="Pin | Single" />
      <div className="flex flex-col gap-16">
        <div className="flex flex-col md:flex-row gap-6 justify-between">
          <div className="flex-0 lg:flex-0">
            <BackButton />
          </div>
          <div className="flex-1/3 lg:flex-1/3">
            <ImageRenderer
              imageUrl={data.media}
              className="w-full m-auto rounded-md"
              width={736}
            />
          </div>
          <div className="flex flex-col gap-4 flex-1/3">
            <PostInterraction />
            <NavLink
              to={"/profile/" + data.user.username}
              className="flex gap-2 items-center w-fit"
            >
              <Avatar avatarUrl={data.user.avatar} className="w-8 h-8" />
              <span className="text-sm lg:text-lg">{data.user.name}</span>
            </NavLink>
            <div className="w-full h-[1px] bg-zinc-500" />
            <Comments />
          </div>
        </div>
        <div className="w-full h-[1px] bg-zinc-500" />
        <Gallery />
      </div>
    </>
  );
};

export default PostPage;
