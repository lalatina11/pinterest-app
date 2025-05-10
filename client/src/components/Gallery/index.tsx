import { tempItems } from "@/lib/dummyData";
import GalleryItems from "./GalleryItems";

const Gallery = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-4 auto-rows-[10px]">
      {tempItems.map((data, i) => (
        <GalleryItems item={data} itemId={i + 1} key={i} />
      ))}
    </div>
  );
};

export default Gallery;
