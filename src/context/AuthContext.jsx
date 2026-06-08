import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

const STORAGE_ACCESS  = 'authkit_access';
const STORAGE_REFRESH = 'authkit_refresh';

function loadTokens() {
  try {
    return {
      access:  localStorage.getItem(STORAGE_ACCESS)  || null,
      refresh: localStorage.getItem(STORAGE_REFRESH) || null,
    };
  } catch {
    return { access: null, refresh: null };
  }
}

export function AuthProvider({ children }) {
  const [tokens, setTokens] = useState(loadTokens);

  const saveTokens = useCallback((access, refresh) => {
    try {
      localStorage.setItem(STORAGE_ACCESS,  access);
      localStorage.setItem(STORAGE_REFRESH, refresh);
    } catch {}
    setTokens({ access, refresh });
  }, []);

  const clearTokens = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_ACCESS);
      localStorage.removeItem(STORAGE_REFRESH);
    } catch {}
    setTokens({ access: null, refresh: null });
  }, []);

  return (
    <AuthContext.Provider value={{ tokens, saveTokens, clearTokens, isLoggedIn: !!tokens.access }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
}
