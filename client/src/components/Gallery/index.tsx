import type { Pin } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import GalleryItems from "./GalleryItems";

const Gallery = () => {
  const { error, isPending, data } = useQuery({
    queryKey: ["pins"],
    queryFn: async () => {
      const { data: axiosData } = await axios.get(
        import.meta.env.VITE_API_KEY + "/api/pins"
      );
      return axiosData.data as Pin[];
    },
  });

  if (error) return error.message;

  if (isPending) return <h1>Loading</h1>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-4 auto-rows-[10px]">
      {data.map((data, i: number) => (
        <GalleryItems item={data} itemId={data._id || 0} key={i} />
      ))}
    </div>
  );
};

export default Gallery;
