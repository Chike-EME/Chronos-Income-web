'use client';

import { localStorageKeys } from '@/utils/localStorageKeys';
import { usePathname, useRouter } from 'next/navigation';
import { logout as logoutService } from '@/components/services/auth/service';
import {
  createContext,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

export interface User {
  username: string;
  email: string;
}

interface IUserProvider {
  user: User;
  setUser: React.Dispatch<SetStateAction<User>>;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
}

interface ChildrenProps {
  children: ReactNode;
}

const AuthContext = createContext({} as IUserProvider);

const publicRoutes = ['/', '/esqueci-senha', '/redefinir-senha'];

const AuthProvider = ({ children }: ChildrenProps) => {
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const dataUser = localStorage.getItem(localStorageKeys.user);
    const token = localStorage.getItem(localStorageKeys.accessToken);

    if (dataUser && token) {
      setUser(JSON.parse(dataUser));
    }

    setLoading(false);
  }, []);

  // critério: token presente + email populado
  const isAuthenticated = !!user.email;

  const logout = async () => {
    const token = localStorage.getItem(localStorageKeys.accessToken);

    if (token) {
      await logoutService(token).catch(() => {
        // ignora erro — limpa local mesmo se o back falhar
      });
    }

    localStorage.removeItem(localStorageKeys.user);
    localStorage.removeItem(localStorageKeys.accessToken);
    setUser({} as User);
    router.push('/');
  };

  useEffect(() => {
    if (!loading && !isAuthenticated && !publicRoutes.includes(pathname)) {
      router.push('/');
    }
  }, [loading, isAuthenticated, pathname]);

  if (loading) return null;

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
