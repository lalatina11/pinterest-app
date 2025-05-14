import LoginForm from "@/components/Auth/LoginForm";
import RegisterForm from "@/components/Auth/RegisterForm";
import { useState } from "react";

const AuthPage = () => {
  const [type, setType] = useState<"login" | "register" | "verify">("login");
  return (
    <main className="min-h-screen overflow-y-auto flex justify-center items-center">
      {type === "login" ? (
        <LoginForm setType={setType} />
      ) : (
        <RegisterForm setType={setType} />
      )}
    </main>
  );
};

export default AuthPage;
