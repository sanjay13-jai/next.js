export interface UserProps {
  firstName: string;
  emailID: string;
  token: any;
}

export interface AuthContextProps {
  user: UserProps | null;
  setUser: (user: UserProps | null) => void;
}
