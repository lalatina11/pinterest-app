import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import CreatePage from "./pages/CreatePage";
import PostPage from "./pages/PostPage";
import AuthPage from "./pages/AuthPage";
import SearchPage from "./pages/SearchPage";
import ProfilePage from "./pages/ProfilePage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create" element={<CreatePage />} />
      <Route path="/pin/:id" element={<PostPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/:username" element={<ProfilePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
