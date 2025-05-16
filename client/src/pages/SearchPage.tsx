import Gallery from "@/components/Gallery";
import Metadata from "@/components/Metadata";
import { useSearchParams } from "react-router";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const searchKeyword = searchParams.get("q");

  return (
    <>
      <Metadata title={`Pin | Search`} />
      <h1 className="font-semibold text-xl mb-5">Search For {searchKeyword}</h1>
      <Gallery searchKeyword={searchKeyword} />
    </>
  );
};

export default SearchPage;
