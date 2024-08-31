import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import { AuthContextProps, UserProps } from '@/types/user';
import { localStorageUtils } from '@/helpers/utils/local-storage';
import { userService } from '@/services/user.service';

export const AuthContext = createContext({} as AuthContextProps);

export const AuthWrapper = ({ children }: { children: JSX.Element }) => {
  const { logout } = useAuth();
  // const [user, setUser] = useState<UserProps | null>(null);  // Initialize state appropriately
  // const [user, setUser] = useState<UserProps | null>(() => {
  //   const savedUser = localStorageUtils().getItem("user");
  //   return savedUser ? savedUser : null;
  // });
  const [user, setUser] = useState<UserProps | null>(userService.userValue);
  const router = useRouter();
  const {query} = router
  const { getItem } = localStorageUtils();
  useEffect(() => {
    authCheck(router.asPath);

    // on route change start - run auth check
    router.events.on('routeChangeStart', routeChangeStart);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off('routeChangeStart', routeChangeStart);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function routeChangeStart(url: string) {
    // Avoid using hooks here; use context or state instead
    // const user = JSON.parse(localStorage.getItem('user') || '{}');
    const user = getItem("user") || {};
    const isLoggedIn = getCookie('isLoggedIn');
    const token = getCookie('token');
    if (url.endsWith('/login') && user && isLoggedIn) {
      router.push({ pathname: '/', query });
      return;
    }
    // if (!url.includes('/') && (!user || !isLoggedIn || !token)) {
    //   logout();
    //   return;
    // }
  }

  function authCheck(url: string) {
    const isLoggedIn = getCookie('isLoggedIn');
    // const user = JSON.parse(localStorage.getItem('user') || '{}');
    const user = getItem("user") || {};
    const publicPaths = ['/login', '/register'];
    const path = url.split('?')[0];
    if ((!user || !isLoggedIn) && !publicPaths.includes(path)) {
      router.push({ pathname: '/login', query });
    }
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuthContext() {
  return useContext(AuthContext);
}
