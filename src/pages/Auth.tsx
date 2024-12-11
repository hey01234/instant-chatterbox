import { useState } from "react";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      {isLogin ? (
        <LoginForm onToggle={toggleForm} />
      ) : (
        <RegisterForm onToggle={toggleForm} />
      )}
    </div>
  );
};

export default Auth;