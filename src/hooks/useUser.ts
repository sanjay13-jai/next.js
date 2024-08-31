import { useContext } from 'react';
import { userService } from '@/services/user.service';
import { removeCookie, setCookie } from 'tiny-cookie';
import { UserProps } from '@/types/user';
import { AuthContext } from '../context/AuthContext';
import { useLocalStorage } from './useLocalStorage';
import { useRouter } from 'next/router';
import { localStorageUtils } from '@/helpers/utils/local-storage';

export const useUser = () => {
  const { user, setUser } = useContext(AuthContext);
  // const { setItem } = useLocalStorage();  
  const router = useRouter();
  const { asPath, query } = router;
  const { setItem } = localStorageUtils();
  const addUser = (user: UserProps) => {
    setUser(user);
    // setItem('user', JSON.stringify(user));
    setItem("user", user);
    setCookie('isLoggedIn', '1');
    setCookie('emailId', user.emailID);
    removeCookie('isGuest');
  };

  
  const removeUser = () => {
    const logoutCB = () => {
      userService.logout();
      setUser?.(null);
      void router.push({ pathname: '/login', query }, asPath);
    };
  
    if (user) { 
      userService
        .logoutService({ emailID: user.emailID })
        .then(() => logoutCB())
        .catch(() => logoutCB()); // Even if the service call fails, proceed with logout
    } else {
      console.error("User is not defined.");
      logoutCB(); // Proceed with logout even if user is not defined
    }
  };
  

  return {
    user,
    addUser,
    removeUser,
    setUser,
  };
};
