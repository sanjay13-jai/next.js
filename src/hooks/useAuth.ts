import { UserProps } from "@/types/user";
import { useUser } from "./useUser";
export const useAuth = () => {
  const {
    user,
    addUser,
    removeUser,
    setUser,
  } = useUser();

  const login = (user: UserProps) => {
    addUser(user);
  };

  const logout = () => {
    removeUser();
  };

  return {
    user,
    login,
    logout,
    setUser,
  };
};
