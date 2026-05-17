import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

const AUTH_KEY = "auth";
const TOKEN_KEY = "token";
const USER_KEY = "user";

function readPersistedAuth() {
  try {
    const authValue = localStorage.getItem(AUTH_KEY);
    const userValue = localStorage.getItem(USER_KEY);
    return {
      isAuthenticated: authValue === "true",
      user: userValue || "",
    };
  } catch {
    return { isAuthenticated: false, user: "" };
  }
}

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(readPersistedAuth);

  const login = (email, password) => {
    const normalizedEmail = (email || "").trim();
    const normalizedPassword = (password || "").trim();
    if (!normalizedEmail || !normalizedPassword) {
      return false;
    }

    localStorage.setItem(AUTH_KEY, "true");
    localStorage.setItem(TOKEN_KEY, `session-${Date.now()}`);
    localStorage.setItem(USER_KEY, normalizedEmail);
    setAuthState({ isAuthenticated: true, user: normalizedEmail });
    return true;
  };

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    sessionStorage.removeItem(AUTH_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
    setAuthState({ isAuthenticated: false, user: "" });
  };

  const value = useMemo(
    () => ({
      isAuthenticated: authState.isAuthenticated,
      user: authState.user,
      login,
      logout,
    }),
    [authState]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used inside AuthProvider");
  }
  return context;
}
