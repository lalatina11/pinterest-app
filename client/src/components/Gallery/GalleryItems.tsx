import type { TempItems } from "@/types";
import { Link } from "react-router";
import { CiCircleMore, CiSaveDown2 } from "react-icons/ci";
import { FaShareAlt } from "react-icons/fa";
import "./galleryItems.css";
import { Image } from "@imagekit/react";

interface Props {
  item: TempItems;
  itemId: number;
}
const GalleryItems = (props: Props) => {
  const { item, itemId } = props;
  return (
    <div
      className="relative flex transition-all ease-in-out duration-300 cursor-pointer galleryItem"
      style={{ gridRowEnd: `span ${Math.ceil(item.height / 100)}` }}
    >
      <Image
        src={item.imageUrl}
        urlEndpoint={import.meta.env.VITE_IMAGE_KIT_API || "your end point"}
        className="w-full h-auto object-cover shadow shadow-zinc-500 rounded hover:rounded-xl"
      />
      {/* <img
        src={item.imageUrl || noImageUrl}
        alt=""
        className="w-full h-auto object-cover shadow shadow-zinc-500 rounded hover:rounded-xl"
      /> */}
      <Link
        className="overlay absolute top-0 w-full h-full"
        to={`/pin/${itemId}`}
      />
      <div className="overlayBtn gap-4 justify-between items-center bg-zinc-200 dark:bg-zinc-900">
        <span className="hover:scale-125 p-1 lg:p-1.5 rounded-md bg-zinc-900 dark:bg-zinc-200 text-zinc-200 dark:text-zinc-900 transition-all ease-in-out duration-300">
          <FaShareAlt />
        </span>
        <span className="hover:scale-125 p-1.5 rounded-md bg-zinc-900 dark:bg-zinc-200 text-zinc-200 dark:text-zinc-900 transition-all ease-in-out duration-300">
          <CiSaveDown2 />
        </span>
        <span className="hover:scale-125 p-1.5 rounded-md bg-zinc-900 dark:bg-zinc-200 text-zinc-200 dark:text-zinc-900 transition-all ease-in-out duration-300">
          <CiCircleMore />
        </span>
      </div>
    </div>
  );
};

export default GalleryItems;
