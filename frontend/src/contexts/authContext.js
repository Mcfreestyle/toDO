import { createContext, useCallback, useContext, useMemo } from "react";
import { useLocalStorage } from "hooks/useLocalStorage";

const AuthContext = createContext();

export function AuthContextProvider({children}) {
  const [user, setUser] = useLocalStorage("user", null);

  const login = useCallback(data => {
    setUser(data)
  }, [setUser]);

  const logout = useCallback(() => {
    setUser(null);
  }, [setUser]);

  const value = useMemo(
    () => ({
      login,
      logout,
      user
    }),
    [login, logout, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuthContext() {
  return useContext(AuthContext);
}
