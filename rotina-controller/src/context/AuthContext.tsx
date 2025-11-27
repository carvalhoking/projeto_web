import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from 'react';

interface User {
  name: string;
  email: string;
}

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = '@routine-controller:user';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStoredUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.warn('Falha ao carregar usuário armazenado', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStoredUser();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      throw new Error('Preencha email e senha para continuar.');
    }

    if (!trimmedEmail.includes('@')) {
      throw new Error('Informe um email válido.');
    }

    if (trimmedPassword.length < 4) {
      throw new Error('A senha deve ter ao menos 4 caracteres.');
    }

    const fakeUser: User = {
      name: trimmedEmail.split('@')[0],
      email: trimmedEmail,
    };

    setUser(fakeUser);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(fakeUser));
  }, []);

  const logout = useCallback(async () => {
    setUser(null);
    await AsyncStorage.removeItem(STORAGE_KEY);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      login,
      logout,
    }),
    [user, isLoading, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider.');
  }

  return context;
};
