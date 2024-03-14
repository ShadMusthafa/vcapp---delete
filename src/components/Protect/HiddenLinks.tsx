import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";

interface ShowOnLoginProps {
  children: ReactNode;
}

const ShowOnLogin = ({ children }: ShowOnLoginProps) => {
  const isLoggedIn: boolean = useSelector(selectIsLoggedIn);

  if (isLoggedIn) {
    return <>{children}</>;
  }
  return null;
};

interface ShowOnLogoutProps {
  children: ReactNode;
}

const ShowOnLogout = ({ children }: ShowOnLogoutProps) => {
  const isLoggedIn: boolean = useSelector(selectIsLoggedIn);

  if (!isLoggedIn) {
    return <>{children}</>;
  }
  return null;
};

export { ShowOnLogin, ShowOnLogout };
