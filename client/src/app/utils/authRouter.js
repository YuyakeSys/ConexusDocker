// app/utils/authRouter.js
import { useContext } from "react";
import { AuthContext } from "./authContext";
import { useRouter } from "next/navigation";

const useAuth = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const redirectToLogin = () => {
    router.push("user/login");
  };

  const requireAuth = (action) => {
    if (!user) {
      redirectToLogin();
      return;
    }
    action();
  };

  return { requireAuth };
};

export { useAuth };
