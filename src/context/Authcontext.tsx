import { createContext, ReactNode, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export interface User {
    email: string;
    token: string;
}

export interface AuthContextData {
    user: User | null;
    isLoading: boolean;
    login: (email: string, pass: string) => Promise<boolean>;
    logout: () => Promise<void>;
}

const SESSION_KEY = "@campusservice_user_session";

export const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      try {
        const stored = await AsyncStorage.getItem(SESSION_KEY);
        if (stored) {
          setUser(JSON.parse(stored));
        }
      } catch (e) {
        console.error("Error cargando sesión:", e);
      } finally {
        setIsLoading(false);
      }
    };

    loadSession();
  }, []);

  const login = async (email: string, pass: string): Promise<boolean> => {
    if (email.includes("@") && pass.length >= 6) {
      const userData: User = { email, token: "jwt_mock_token_12345" };
      setUser(userData);
      await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(userData));
      return true;
    }
    alertUser("El login está fallando, verifica las credenciales");
    return false;
  };

  const alertUser = (message: string) => {
    Alert.alert("Atención", message);
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem(SESSION_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};