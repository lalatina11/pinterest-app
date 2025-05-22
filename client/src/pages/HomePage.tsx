import Gallery from "@/components/Gallery";
import Metadata from "@/components/Metadata";
import { apiRequest } from "@/lib";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router";

const HomePage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await apiRequest("/api/users/current-user");
      return data;
    },
  });

  return (
    <>
      <Metadata title="Pin | Home" />
      <h1>
        {isLoading ? (
          "Loading..."
        ) : error ? (
          <Navigate to={"/auth?type=login"} />
        ) : (
          data.user.username
        )}
      </h1>
      <Gallery />
    </>
  );
};

export default HomePage;
