import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./components/ThemeProvider.tsx";
import ToasterProvider from "./components/ToasterProvider.tsx";
import "./global.css";
import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage.tsx";
import CreatePage from "./pages/CreatePage.tsx";
import PostPage from "./pages/PostPage.tsx";
import AuthPage from "./pages/AuthPage.tsx";
import SearchPage from "./pages/SearchPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import Layout from "./Layout/index.tsx";
import AuthLayout from "./Layout/AuthLayout.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
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
  </StrictMode>
);
