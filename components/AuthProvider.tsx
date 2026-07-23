'use client';

import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';

interface AuthStatus {
  authenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthStatus>({
  authenticated: false,
  isAdmin: false,
  loading: true,
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [auth, setAuth] = useState<AuthStatus>({
    authenticated: false,
    isAdmin: false,
    loading: true,
  });

  useEffect(() => {
    const controller = new AbortController();

    void fetch('/api/auth/status', {
      cache: 'no-store',
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) throw new Error('Unable to load auth status');
        return (await response.json()) as Omit<AuthStatus, 'loading'>;
      })
      .then((status) => setAuth({ ...status, loading: false }))
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError')
          return;
        setAuth({ authenticated: false, isAdmin: false, loading: false });
      });

    return () => controller.abort();
  }, []);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export const AdminOnly = ({ children }: PropsWithChildren) => {
  const { isAdmin } = useAuth();
  return isAdmin ? children : null;
};
