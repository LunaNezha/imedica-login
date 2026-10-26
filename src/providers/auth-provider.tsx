import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AuthAdapter, AuthCredentials, AuthUser } from "@src/types/auth";

type AuthStatus =
  | "anonymous"
  | "authenticating"
  | "authenticated"
  | "signing-out";
export type AuthProviderProps = PropsWithChildren<{
  adapter: AuthAdapter;
  onSuccess?: (user: AuthUser) => void | Promise<void>;
  onError?: (error: unknown) => void | Promise<void>;
  onForgotPassword?: () => void | Promise<void>;
}>;
interface AuthContextValue {
  user: AuthUser | null;
  status: AuthStatus;
  error: unknown;
  login: (credentials: AuthCredentials) => Promise<AuthUser>;
  logout: () => Promise<void>;
  forgotPassword?: () => void | Promise<void>;
}
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({
  children,
  adapter,
  onSuccess,
  onError,
  onForgotPassword,
}: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [status, setStatus] = useState<AuthStatus>("anonymous");
  const [error, setError] = useState<unknown>(null);
  const active = useRef<AbortController>();
  useEffect(() => () => active.current?.abort(), []);

  function begin() {
    active.current?.abort();
    const request = new AbortController();
    active.current = request;
    setError(null);
    return request;
  }
  function notify<Argument>(
    callback: ((value: Argument) => void | Promise<void>) | undefined,
    value: Argument,
  ) {
    try {
      void Promise.resolve(callback?.(value)).catch(
        (callbackError: unknown) => {
          console.error("Auth callback failed", callbackError);
        },
      );
    } catch (callbackError) {
      console.error("Auth callback failed", callbackError);
    }
  }
  async function login(credentials: AuthCredentials) {
    const request = begin();
    setStatus("authenticating");
    try {
      const nextUser = await adapter.login(credentials, request.signal);
      if (request.signal.aborted)
        throw new DOMException("Request cancelled", "AbortError");
      setUser(nextUser);
      setStatus("authenticated");
      notify(onSuccess, nextUser);
      return nextUser;
    } catch (failure) {
      if (!request.signal.aborted) {
        setError(failure);
        setStatus(user ? "authenticated" : "anonymous");
        notify(onError, failure);
      }
      throw failure;
    }
  }
  async function logout() {
    const request = begin();
    setUser(null);
    setStatus("signing-out");
    try {
      await adapter.logout?.(request.signal);
    } catch (failure) {
      if (!request.signal.aborted) {
        setError(failure);
        notify(onError, failure);
      }
      throw failure;
    } finally {
      if (!request.signal.aborted) setStatus("anonymous");
    }
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        status,
        error,
        login,
        logout,
        forgotPassword: onForgotPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useOptionalAuth = () => useContext(AuthContext);
export function useAuth() {
  const context = useOptionalAuth();
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
