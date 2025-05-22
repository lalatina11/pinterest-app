import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router";
import { ThemeProvider } from "./components/ThemeProvider.tsx";
import ToasterProvider from "./components/ToasterProvider.tsx";
import AuthLayout from "./Layout/AuthLayout.tsx";
import Layout from "./Layout/index.tsx";
import AuthPage from "./pages/AuthPage.tsx";
import CreatePage from "./pages/CreatePage.tsx";
import HomePage from "./pages/HomePage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import PostPage from "./pages/PostPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import SearchPage from "./pages/SearchPage.tsx";
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="/create" element={<CreatePage />} />
              <Route path="/pin/:id" element={<PostPage />} />
              <Route path="/profile/:username" element={<ProfilePage />} />
              <Route path="/search" element={<SearchPage />} />
            </Route>
            <Route element={<AuthLayout />}>
              <Route path="/auth" element={<AuthPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <ToasterProvider />
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
